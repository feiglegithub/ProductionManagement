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
      报工明细
      <a slot="right" @click="doPost">提交</a>
    </x-header>
    <div class="f-flexvw f-flexg1 f-pdlr5">
      <div class="g-inp">
        <div class="m-inp f-mtb5">
          <span class="laber" style="min-width: 74px">条码</span>
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
            messagetitle="概要信息"
            v-show="showInfo"
          ></s-messageheader>

          <div class="g-notflexbox s-bgE7E7E7" v-show="showInfo">
            <div class="m-baserowbox">
              <span class="label80">报工设备:</span>
              <span class="text">{{ ResourceName }}</span>
            </div>
            <div class="m-baserowbox">
              <span class="label80">工序:</span>
              <span class="text">{{ ProcessName }}</span>
            </div>
            <div class="m-baserowbox">
              <span class="label80">报工人:</span>
              <span class="text">{{ Maker }}</span>
            </div>
          </div>

          <s-messageheader
            class="f-mt10"
            messagetitle="板件明细"
            v-show="showInfo"
          ></s-messageheader>
          <swipeout class="s-border" v-show="showInfo">
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
                      <span class="text">{{ item.UpiCode }}</span>
                    </div>
                    <div class="m-baserowbox">
                      <span class="label80">包号:</span>
                      <span class="text">{{ item.TagNumber }}</span>
                    </div>
                    <div class="m-baserowbox">
                      <span class="label80">批次:</span>
                      <span class="text">{{ item.SubBatchCode }}</span>
                    </div>
                    <div class="m-baserowbox">
                      <span class="label80">尺寸:</span>
                      <span class="text">{{ item.FinalSize }}</span>
                    </div>
                    <div class="m-baserowbox">
                      <span class="label80">物料编码:</span>
                      <span class="text">{{ item.ItemCode }}</span>
                    </div>
                    <div class="m-baserowbox">
                      <span class="label80">物料名称:</span>
                      <span class="text">{{ item.ItemName }}</span>
                    </div>
                    <div class="m-baserowbox" v-show="item.ReproduceNo != null">
                      <span class="label80">补料返工单号:</span>
                      <span class="text">{{ item.ReproduceNo }}</span>
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
      scanRequestParam: {},
      UpiDataInfo: [],
      ProcessName: "", //工序
      ResourceName: "", //设备
      MakerId: 0, //登陆人
      Maker: "",
      checkList: [],
      showInfo: false,
      showDetail: false,
      isSelect: false,
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
    //返回
    goWorkIndex() {
      this.$store.dispatch("removeKeepAlive", "WorkReportIndex");
      this.$router.push({ name: "WorkReportIndex" });
    },
    //查看更多信息
    showMore(item, event) {
      //到时候，可以点击显示的时候，循环扫描码重新获取数据，然后插入到显示的数组中
      console.log(this.text);
      console.log(event.currentTarget.parentElement);
      if (item.isHeight == false) {
        event.currentTarget.parentElement.style.height = 420 + "px";
        item.isHeight = true;
      } else {
        event.currentTarget.parentElement.style.height = 130 + "px";
        item.isHeight = false;
      }
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
    //触发单项左右滑动
    handleEvents(type) {
      console.log(type);
    },
    //点击删除按钮，删除当前项
    onButtonClick(index, item) {
      this.UpiDataInfo.splice(index, 1);
    },

    //键盘回车事件
    getEnter() {
      console.log("键盘回车事件");
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
    //点击提交按钮
    doPost() {
      if (this.UpiDataInfo.length > 0) {
        this.scanRequestParam.UpiCodeList = new Array();
        this.UpiDataInfo.forEach((p) => {
          this.scanRequestParam.UpiCodeList.push(p.UpiCode);
        });
      }
      this.showThost = true;
      this.$axiosApi.submitUpiDataInfo(this.scanRequestParam).then((res) => {
        if (res.Success) {
          this.showPositionValue = true;
          this.Msg = res.Result;
          this.showInfo = false;
          this.showThost = false;
          this.reSet();
        } else {
          this.showPositionValue = true;
          this.Msg = res.Message;
          this.BarCode = null;
        }
      });
    },
    //接口：扫描upi
    scanTaskUpi(barcode) {
      this.loadingtitle = "加载中";
      this.showThost = true;
      this.scanRequestParam.ScanCode = barcode;
      this.scanRequestParam.CollectType = 1;
      this.$axiosApi.getUpiData(this.scanRequestParam).then((res) => {
        this.showThost = false;
        if (res.Success == true) {
          this.UpiDataInfo = res.Result.UpiDataInfos;
          console.log(this.UpiDataInfo);
          this.showInfo = true;
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
      this.scanRequestParam.UpiCodeList = new Array();
      this.scanRequestParam.UpiCode = null;
    },
  },
  created() {
    console.log(this.$route.params);
    this.getCurrentEmp();
  },
  mounted() {
    console.log(this.$route.params);
    this.scanRequestParam.ProcessId = this.$route.params.ProcessId;
    this.scanRequestParam.DepartmentId = this.$route.params.WorkshopId;
    this.scanRequestParam.ResourceId = this.$route.params.ResourceId;
    this.ProcessName = this.$route.params.ProcessName;
    this.ResourceName = this.$route.params.ResourceName;
    this.scanRequestParam.CompletedSourceType = 3;
    console.log(this.$store.getters.keepAlive);
    this.$store.dispatch("addKeepAlive", "WorkReportIndex");
    this.$refs.BarcodeInp.focus();
  },
};
</script>

<style lang="less">
</style>
