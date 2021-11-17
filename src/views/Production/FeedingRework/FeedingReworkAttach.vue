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
      补料附件
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
          <span class="laber" style="min-width: 80px">条码</span>
          <span class="inp s-inpbg">
            <input
              v-model="BarCode"
              type="text"
              class="s-inpbg"
              ref="barinput"
              @keyup.enter="getBarCode()"
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
        messagetitle="单据概要信息"
      ></s-messageheader>
      <div v-show="isShow">
        <div class="m-baserowbox">
          <span class="label80">补料返工订单号:</span>
          <div class="select s-bgwhile">
            <div class="select-text">{{ Info.OrderNo }}</div>
          </div>
        </div>
        <div class="m-baserowbox">
          <span class="label80">制作班组:</span>
          <div class="select s-bgwhile">
            <div class="select-text">{{ Info.MakeGroup }}</div>
          </div>
        </div>
        <div class="m-baserowbox">
          <span class="label80">制单人:</span>
          <div class="select s-bgwhile">
            <div class="select-text">{{ Info.MakeBy }}</div>
          </div>
        </div>
        <div class="m-baserowbox">
          <span class="label80">制单时间:</span>
          <div class="select s-bgwhile">
            <div class="select-text">{{ Info.MakeTime }}</div>
          </div>
        </div>
        <div class="m-baserowbox">
          <span class="label80">附件:</span>
          <upload-img
            :imgData="arrayImage"
            @add="addImg"
            @del="deleteImg"
            :maxLength="imglength"
          />
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

      Info: {},
    };
  },
  components: {
    "upload-img": uploadImg,
  },
  methods: {
    getBarCode() {
      if (this.BarCode == null || this.BarCode == "") {
        this.showPositionValue = true;
        this.Msg = "条码不能为空";
        return;
      }
      this.$axiosApi.getFeedingReworkAttachDetail(this.BarCode).then((res) => {
        if (res.Success == true) {
          this.Info = res.Result;
          console.log(this.Info);
          this.isShow = true;
          this.BarCode = null;
        } else {
          this.showPositionValue = true;
          this.Msg = res.Message;
          return;
        }
      });
    },
    //图片上传的方法开始
    addImg(index, value) {
      console.log(value);
      this.Info.PicPaths = null;
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
      this.$hybridApi.scanCode({
        success: function (res) {
          that.BarCode = res;
          that.getBarCode();
        },
      });
    },
    doPost() {
      if (this.Info.Upi == "" || this.Info.Upi == null) {
        this.showPositionValue = true;
        this.Msg = "条码不能为空！";
        return;
      }
      this.loadingtitle = "提交中";
      this.showThost = true;
      this.$axiosApi.submitFeedReworkAttachInfo(this.Info).then((res) => {
        this.showThost = false;
        if (res.Success == true) {
          this.ShowConfirm = true;
          this.Successbtn = true;
          this.Dangerbtn = false;
          this.BadColor = false;
          this.ConfirmMsg = "提交成功";
          this.Reset();
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
      (this.Info = {}),
        (this.isShow = false),
        (this.BarCode = ""),
        (this.arrayImage = []);
    },
    goToBack() {
      this.$router.push({ name: "BaseIndex" });
    },
  },
};
</script>