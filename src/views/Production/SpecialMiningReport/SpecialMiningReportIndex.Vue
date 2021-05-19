<template>
  <div class="g-index">
    <!-- 头部 -->
    <x-header
      class="m-header"
      :left-options="{ showBack: false }"
      style="background-color: #22292c"
    >
      <a slot="left" @click="goToBack()">
        <span style="font-size: 26px" class="iconfont icon-weibiaoti-"></span>
      </a>
      <!-- <p v-show="MessageTitle='更换配件信息'">更换配件</p>
            <p v-show="MessageTitle='拆卸配件信息'">拆卸配件</p> -->
      特采板件
      <!--<a slot="right" @click="doPost" :class="{'f-noclick':showThost}">提交</a>-->
      <a slot="right" @click="doPost()">提交</a>
    </x-header>
    <div
      id="headerOne"
      class="f-flexvw f-flexg1 f-pdlr5"
      style="overflow: auto"
    >
      <div class="g-inp" style="min-height: 60px">
        <div class="m-inp f-mtb5">
          <span class="laber" style="min-width: 80px">UPI</span>
          <span class="inp s-inpbg">
            <input
              v-model="BarCode"
              type="text"
              class="s-inpbg"
              ref="barinput"
              @keyup.enter="scanBarCode()"
            />
            <span
              class="iconfont icon-iconfontscan"
              @click="scanBarCode"
            ></span>
          </span>
        </div>
      </div>
      <s-messageheader
        class="f-mt10"
        v-show="isShow"
        messagetitle="当前特采信息"
      ></s-messageheader>
      <div v-show="isShow">
        <div class="m-baserowbox">
          <span class="label80">附件:</span>
          <upload-img
            :imgData="arrayImage"
            @add="addImg"
            @del="deleteImg"
            :maxLength="imglength"
          />
        </div>
        <div class="m-baserowbox">
          <span class="label80">出错类型:</span>
          <div class="select s-bgwhile" @click="clickMiddleError">
            <popup-picker
              :show.sync="ShowMiddleError"
              :data="MiddleErrorList"
              @on-change="changeMiddleError"
              value-text-align="left"
            ></popup-picker>
            <div class="select-text">{{ MiddleError }}</div>
          </div>
        </div>
        <div class="m-baserowbox">
          <span class="label80">缺陷代码:</span>
          <div class="select s-bgwhile" @click="clickDefectCode">
            <popup-picker
              :show.sync="ShowDefectCode"
              :data="DefectCodeList"
              @on-change="changeDefectCode"
              value-text-align="left"
            ></popup-picker>
            <div class="select-text">{{ DefectCode }}</div>
          </div>
        </div>
        <div class="m-baserowbox">
          <span class="label80">特采审批人:</span>
          <div class="select s-bgwhile" @click="clickSpecialMiningBy">
            <popup-picker
              :show.sync="ShowSpecialMiningBy"
              :data="SpecialMiningByList"
              @on-change="changeSpecialMiningBy"
              value-text-align="left"
            ></popup-picker>
            <div class="select-text">{{ SpecialMiningBy }}</div>
          </div>
        </div>
      </div>
    </div>
    <s-confirm
      v-model="ShowConfirm"
      :content="ConfirmMsg"
      :showConfirmButton="false"
      :showCancelButton="false"
      :showSuccessButton="Successbtn"
      :showDangerButton="Dangerbtn"
      :bad="BadColor"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
    >
    </s-confirm>
    <toast
      width="12em"
      v-model="showPositionValue"
      type="text"
      :time="2500"
      :text="Msg"
      position="middle"
    ></toast>
    <!-- <s-loading v-show="showThost" :title="loadingtitle" :img="true" :transition="true"></s-loading> -->

    <loading :show="showThost" :text="loadingtitle"></loading>
  </div>
</template>
<script>
import uploadImg from "../../../components/components/uploadImg";
export default {
  data() {
    return {
      isShow: false,
      BadColor: false, //提交失败的字体颜色
      Successbtn: false, //成功的按钮
      Dangerbtn: false, //失败的按钮
      ConfirmMsg: "", //弹窗提示的提示信息
      ShowConfirm: false, //控制弹窗的显隐
      BarCode: "", //扫描的条码
      MessageTitle: "", //标题
      showPositionValue: false, //显示消息提示
      showThost: false,
      Msg: "",
      ConfirmMsg: "",
      loadingtitle: "",
      loadingtitle: "",
      scanCode: "",

      arrayImage: [],
      imglength: 1,

      ShowDefectCode: false, //控制缺陷代码弹窗的显隐
      GetDefectCode: null, //接口获取到的缺陷代码的数据
      DefectCodeList: [[" "]], //缺陷代码的列表
      DefectCode: null, //选择的缺陷代码
      DefectCodeId: null, //选择的缺陷代码

      ShowMiddleError: false, //控制出错中类弹窗的显隐
      GetMiddleError: null, //接口获取到的出错中类的数据
      MiddleErrorList: [[" "]], //出错中类的列表
      MiddleError: null, //选择的出错中类
      MiddleErrorId: null, //选择的出错中类

      ShowSpecialMiningBy: false, //控制特采审批人弹窗的显隐
      GetSpecialMiningBy: null, //接口获取到的特采审批人的数据
      SpecialMiningByList: [[" "]], //特采审批人的列表
      SpecialMiningBy: null, //选择的特采审批人
      SpecialMiningById: null, //选择的特采审批人

      Info: {
        upi: "",
        orderNo: "",
        defectId: "",
        SpecialMiningBy: "",
        PicPaths: "",
      },
    };
  },
  components: {
    "upload-img": uploadImg,
  },
  methods: {
    clickDefectCode() {
      console.log(this.MiddleErrorId);
      if (this.MiddleErrorId === null || this.MiddleErrorId === "") {
        this.showPositionValue = true;
        this.Msg = "请先填出错中类";
        return;
      }
      this.ShowDefectCode = true;
      this.$axiosApi.getRepDefectCodes(this.MiddleErrorId).then((res) => {
        if (res.Success == true) {
          console.log(res);
          this.GetDefectCode = res.Result;
          this.DefectCodeList = [[{ name: "", value: "" }]];
          let DefectCodeListData = [
            this.GetDefectCode.map((item) => {
              return { name: item.Name, value: item.Id };
            }),
          ];
          this.DefectCodeList[0].push(...DefectCodeListData[0]);
        } else {
          this.showPositionValue = true;
          this.Msg = res.Message;
        }
      });
    },

    //点击出错中类
    clickMiddleError() {
      this.ShowMiddleError = true;
      this.$axiosApi.getRepDefectCategories().then((res) => {
        if (res.Success == true) {
          console.log(res);
          this.GetMiddleError = res.Result;
          this.MiddleErrorList = [[{ name: "", value: "" }]];
          let MiddleErrorListData = [
            this.GetMiddleError.map((item) => {
              return { name: item.Name, value: item.Id };
            }),
          ];
          this.MiddleErrorList[0].push(...MiddleErrorListData[0]);
        } else {
          this.showPositionValue = true;
          this.Msg = res.Message;
        }
      });
    },

    //点击特采审批人
    clickSpecialMiningBy() {
      this.ShowSpecialMiningBy = true;
      this.$axiosApi.getSpecialMiningBy().then((res) => {
        if (res.Success == true) {
          console.log(res);
          this.GetSpecialMiningBy = res.Result;
          this.SpecialMiningByList = [[{ name: "", value: "" }]];
          let SpecialMiningByListData = [
            this.GetSpecialMiningBy.map((item) => {
              return { name: item.Name, value: item.Code };
            }),
          ];
          this.SpecialMiningByList[0].push(...SpecialMiningByListData[0]);
        } else {
          this.showPositionValue = true;
          this.Msg = res.Message;
        }
      });
    },
    //选择缺陷代码
    changeDefectCode(val) {
      let id = val[0];
      this.DefectCodeId = val[0];
      this.Info.defectId = val[0];
      if (!!this.DefectCodeId) {
        this.DefectCode = this.GetDefectCode.find((item) => item.Id == id).Name;
      } else {
        this.DefectCodeId = null;
        this.DefectCode = null;
      }
    },
    //选择错误中类
    changeMiddleError(val) {
      let id = val[0];
      this.MiddleErrorId = val[0];
      this.DefectCodeId = null;
      this.DefectCode = null;
      if (!!this.MiddleErrorId) {
        this.MiddleError = this.GetMiddleError.find(
          (item) => item.Id == id
        ).Name;
      } else {
        this.MiddleErrorId = null;
        this.MiddleError = null;
      }
    },
    //选择特采审批人
    changeSpecialMiningBy(val) {
      let Code = val[0];
      this.SpecialMiningById = val[0];
      this.Info.SpecialMiningBy = val[0];
      //   this.DefectCodeId = null;
      //   this.DefectCode = null;
      if (!!this.SpecialMiningById) {
        this.SpecialMiningBy = this.GetSpecialMiningBy.find(
          (item) => item.Code == Code
        ).Name;
      } else {
        this.SpecialMiningById = null;
        this.SpecialMiningBy = null;
      }
    },
    //图片上传的方法开始
    addImg(index, value) {
      console.log(value);
      this.Info.PicPaths = value;
    },
    deleteImg(index, currenIndex) {
      console.log("img-del");
      // this.arrayImage.splice(currenIndex, 1);
      this.Info.PicPaths = "";
    },
    //图片上传的方法结束

    scanBarCode() {
      let that = this;
      console.log("调用扫描接口");
      this.Info.upi = this.BarCode;
      console.log(this.Info.upi);
      this.isShow = true;
    },
    doPost() {
      if (this.Info.upi == "" || this.Info.upi == null) {
        this.showPositionValue = true;
        this.Msg = "UPI不能为空！";
        return;
      }
      if (this.Info.defectId == 0 || this.Info.defectId == null) {
        this.showPositionValue = true;
        this.Msg = "缺陷代码不能为空";
        return;
      }
      if (this.Info.SpecialMiningBy == 0 || this.Info.SpecialMiningBy == null) {
        this.showPositionValue = true;
        this.Msg = "特采审批人不能为空";
        return;
      }
      this.loadingtitle = "提交中";
      this.showThost = true;
      this.Info.SpecialMiningBy = this.SpecialMiningById;
      this.Info.defectId = this.DefectCodeId;
      this.$axiosApi.submitSpecialMiningInfo(this.Info).then((res) => {
        this.showThost = false;
        if (res.Success == true) {
          this.ShowConfirm = true;
          this.Successbtn = true;
          this.Dangerbtn = false;
          this.BadColor = false;
          this.ConfirmMsg = "提交成功";
        } else {
          this.ShowConfirm = true;
          this.Successbtn = false;
          this.Dangerbtn = true;
          this.BadColor = true;
          this.ConfirmMsg = res.Message + "—提交失败";
        }
      });
    },
    onCancel() {
      this.ShowConfirm = false;
      this.Successbtn = false;
      this.Dangerbtn = false;
      this.BadColor = false;
      this.ConfirmMsg = "";
    },
    //点击提示弹窗的确认按钮
    onConfirm() {
      this.ShowConfirm = false;
      this.Successbtn = false;
      this.Dangerbtn = false;
      this.BadColor = false;
      this.ConfirmMsg = "";
      this.Reset();
    },
    Reset() {
      (this.Info.upi = ""),
        (this.Info.orderNo = ""),
        (this.Info.defectId = ""),
        (this.Info.SpecialMiningBy = ""),
        (this.Info.PicPaths = ""),
        (this.isShow = false),
        (this.BarCode = "");
    },
    goToBack() {
      this.$router.push({ name: "BaseIndex" });
    },
  },
};
</script>