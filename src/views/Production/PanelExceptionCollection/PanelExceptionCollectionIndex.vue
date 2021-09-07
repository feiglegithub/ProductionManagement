<template>
  <div class="g-index">
    <x-header
      class="m-header"
      :left-options="{ showBack: false }"
      style="background-color: #22292c"
    >
      <a slot="left" @click="goWorkIndex">
        <span style="font-size: 26px" class="iconfont icon-weibiaoti-"></span>
      </a>
      异常采集
      <a slot="right" @click="doPost">提交</a>
    </x-header>
    <div class="f-flexvw f-flexg1 f-pdlr5">
      <div class="g-inp">
        <div class="m-inp f-mtb5">
          <span class="laber" style="min-width: 74px">UPI</span>
          <span class="inp s-inpbg">
            <input
              v-model="BarCode"
              ref="BarcodeInp"
              type="text"
              @keyup.enter="getBarCode()"
              class="s-inpbg"
            />
            <span
              class="iconfont icon-iconfontscan"
              @click="scanBarCode"
            ></span>
          </span>
        </div>
      </div>
      <div class="g-scrollbox">
        <div class="f-auto">
          <s-messageheader
            class="f-mt10"
            messagetitle="板件明细"
            v-show="showDetailInfo"
          ></s-messageheader>
          <swipeout class="s-border" v-show="showDetailInfo">
            <swipeout-item
              transition-mode="follow"
              v-for="(item, index) in UpiDataInfo"
              :key="index"
            >
              <div slot="right-menu" style="padding: 5px 0">
                <swipeout-button
                  @click.native="onButtonClick(index, item)"
                  type="warn"
                  >删除</swipeout-button
                >
              </div>
              <div slot="content" class="f-pd5 vux-1px-t">
                <div class="g-tranbox s-bgE7E7E7">
                  <div class="m-ordernumber"></div>
                  <div>
                    <!-- v-for="(item,index) in UpiDataInfo" :key="index" -->
                    <div class="m-baserowbox">
                      <span class="label80">UPI:</span>
                      <span class="text">{{ item.Upi }}</span>
                    </div>
                    <div class="m-baserowbox">
                      <span class="label80">批次:</span>
                      <span class="text">{{ item.BelongBatchNo }}</span>
                    </div>
                    <div class="m-baserowbox">
                      <span class="label80">尺寸:</span>
                      <span class="text">{{
                        item.Length + "*" + item.Width + "*" + item.Height
                      }}</span>
                    </div>
                    <div class="m-baserowbox">
                      <span class="label80">色号:</span>
                      <span class="text">{{ item.ColourCode }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </swipeout-item>
          </swipeout>
        </div>
      </div>
    </div>
    <!-- 点击提交按钮时的消息弹窗 -->

    <s-confirm
      v-model="ShowPostConfirm"
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
      :time="3500"
      :text="Msg"
      position="middle"
    ></toast>
    <loading :show="showThost" :text="loadingtitle"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
import uploadImg from "../../../components/components/uploadImg";
export default {
  data() {
    return {
      ShowConfirm: false, //控制提示弹窗的显隐
      ConfirmMsg: "提交成功",
      BadColor: false,
      Successbtn: false,
      Dangerbtn: false,
      showPositionValue: false, //提示信息显隐
      Msg: "有问题", //提示信息

      showThost: false, //圈圈的显隐
      loadingtitle: "提交中", //圈圈文字
      ShowPostConfirm: false,
      ShowConfirm: false,

      BarCode: null, //条码
      PanelExceptionCollection: {},
      UpiDataInfo: [],
      ProcessName: "", //工序
      ResourceName: "", //设备
      MakerId: 0, //登陆人
      Maker: "",
      checkList: [],
      showDetailInfo: false,
      showDetail: false,
      isSelect: false,
      ProcessId: 0,
      ResourceId: 0,
      WorkshopId: 0,
      ExceptionType: "",
    };
  },
  components: {
    "upload-img": uploadImg,
  },

  //每次回来的时候，可以重新调取单明细的接口，这里可以通过获取传值，判断是返回还是保存过来的。返回就不调用接口。
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      //  这里的vm指的就是vue实例，可以用来当做this使用
      if (vm.$route.params.BtnType == "Save") {
        console.log("调用接口，获取明细");
        // console.log(vm.$route.params.Details);  //获取到的类型
        // vm.Details=vm.$route.params.Details
        // console.log(vm.FeedingReworkData.Details.find(item=>item.UPI == vm.$route.params.Details.UPI));
        // console.log(vm.Details);  //获取到的类型
      } else {
        console.log("不做动作");
      }
    });
  },
  methods: {
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
    //点击提交按钮
    doPost() {
      this.UpiDataInfo.WorkshopId = this.WorkshopId;
      this.UpiDataInfo.ProcessId = this.ProcessId;
      this.UpiDataInfo.ResourcId = this.ResourceId;
      this.$axiosApi
        .savePanelExceptionCollection(this.UpiDataInfo)
        .then((res) => {
          if (res.Success) {
            this.showPositionValue = true;
            this.Msg = "提交成功！";
            this.showDetailInfo = false;
            this.reSet();
          } else {
            this.showPositionValue = true;
            this.Msg = res.Message;
            this.BarCode = null;
          }
        });
    },
    //点击删除按钮，删除当前项
    onButtonClick(index, item) {
      this.UpiDataInfo.splice(index, 1);
    },
    //返回
    goWorkIndex() {
      // this.$store.dispatch("removeKeepAlive", "PanelExceptionCollectionSelect");
      this.$router.push({ name: "PanelExceptionCollectionSelectIndex" });
    },
    //获取条码
    getBarCode() {
      if (this.BarCode == null || this.BarCode == "") {
        this.showPositionValue = true;
        this.Msg = "条码不能为空";
        return;
      }
      console.log(this.saleOrderNo);
      this.scanTaskUpi(this.BarCode);
    },
    //点击提示弹窗的删除按钮
    onCancel() {
      this.BadColor = false;
      this.Successbtn = false;
      this.Dangerbtn = false;
      this.ShowPostConfirm = false;
    },
    //点击提示弹窗的确认按钮
    onConfirm() {
      this.BadColor = false;
      this.Successbtn = false;
      this.Dangerbtn = false;
      this.ShowPostConfirm = false;
    },
    //接口：扫描upi
    scanTaskUpi(barcode) {
      if (this.UpiDataInfo.find((p) => p.Upi == barcode) != null) {
        this.showPositionValue = true;
        this.Msg = barcode + "已存在，扫描失败！";
        this.BarCode = null;
        return;
      }
      this.loadingtitle = "加载中";
      this.showThost = true;
      this.PanelExceptionCollection.Upi = barcode;
      this.PanelExceptionCollection.ProcessId = this.ProcessId;
      this.PanelExceptionCollection.ResourcId = this.ResourceId;
      this.PanelExceptionCollection.WorkPlaceId = this.WorkshopId;
      this.PanelExceptionCollection.PanelExceptionType = this.ExceptionType;
      this.$axiosApi
        .doPanelExceptionCollection(this.PanelExceptionCollection)
        .then((res) => {
          this.showThost = false;
          if (res.Success) {
            this.UpiDataInfo.push(res.Result);
            this.BarCode = null;
            console.log(this.UpiDataInfo);
            this.showDetailInfo = true;
          } else {
            this.showPositionValue = true;
            this.Msg = res.Message;
            this.BarCode = null;
          }
        });
    },
    //接口：获取当前登陆人
    getCurrentEmp() {
      this.$axiosApi.getCurrentEmp().then((res) => {
        console.log(res);
        if (res.Success == true) {
          this.Maker = res.Result.Name;
          this.MakerId = res.Result.Id;
        } else {
          this.showPositionValue = true;
          this.Msg = res.Message;
        }
      });
    },
    reSet() {
      this.BarCode = null;
      this.UpiDataInfo = [];
    },
  },
  created() {
    console.log(this.$route.params);
    //this.getCurrentEmp();
  },
  mounted() {
    console.log(this.$route.params);
    this.ProcessName = this.$route.params.ProcessName;
    this.ResourceName = this.$route.params.ResourceName;
    this.WorkshopName = this.$route.params.WorkshopName;
    this.ProcessId = this.$route.params.ProcessId;
    this.ResourceId = this.$route.params.ResourceId;
    this.WorkshopId = this.$route.params.WorkshopId;
    this.ExceptionType = this.$route.params.ExceptionType;
    //console.log(this.$store.getters.keepAlive);
    //this.$store.dispatch("addKeepAlive", "WorkReportIndex");
    this.$refs.BarcodeInp.focus();
  },
};
</script>

<style lang="less">
</style>
