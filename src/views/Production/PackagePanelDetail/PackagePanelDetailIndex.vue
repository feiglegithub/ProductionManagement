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
      包板件明细查询
      <!--<a slot="right" @click="doPost" :class="{'f-noclick':showThost}">提交</a>-->
      <!-- <a slot="right" @click="doPost()">提交</a> -->
    </x-header>
    <div
      id="headerOne"
      class="f-flexvw f-flexg1 f-pdlr5"
      style="overflow: auto"
    >
      <div class="g-inp" style="min-height: 60px">
        <div class="m-inp f-mtb5">
          <span class="laber" style="min-width: 110px">扫描包号</span>
          <span class="inp s-inpbg">
            <input
              v-model="scanCode"
              type="text"
              class="s-inpbg"
              ref="barinput"
              @keyup.enter="GetPackagePanelDetail()"
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
        messagetitle="包板件明细"
      ></s-messageheader>
      <div class="g-notflexbox" v-for="(lst, index) in Info" :key="index">
        <div class="m-baserowbox">
          <span class="label80">包号:</span>
          <span class="text">{{ lst.TagNumber }}</span>
        </div>
        <div class="m-baserowbox">
          <span class="label80">物料名称:</span>
          <span class="text">{{ lst.ItemName }}</span>
        </div>
        <div class="m-baserowbox">
          <span class="label80">花色:</span>
          <span class="text">{{ lst.ColorCode }}</span>
        </div>
        <div class="m-baserowbox">
          <span class="label80">尺寸规格:</span>
          <span class="text">{{ lst.FinishSize }}</span>
        </div>
        <div class="m-baserowbox">
          <span class="label80">数量:</span>
          <span class="text">{{ lst.Quantity }}</span>
        </div>
        <div class="m-baserowbox">
          <span class="label80">包重:</span>
          <span class="text">{{ lst.PackageWeight }}</span>
        </div>
        <div class="m-baserowbox">
          <span class="label80">封板类型:</span>
          <span class="text">{{ lst.EdgeBandingType }}</span>
        </div>
        <div class="m-baserowbox">
          <span class="label80">打孔编码:</span>
          <span class="text">{{ lst.DrilingNo }}</span>
        </div>
        <div class="m-baserowbox">
          <span class="label80">备注:</span>
          <span class="text">{{ lst.Remark }}</span>
        </div>
      </div>
    </div>

    <!-- <s-confirm
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
    ></toast> -->
    <!-- <s-loading v-show="showThost" :title="loadingtitle" :img="true" :transition="true"></s-loading> -->

    <!-- <loading :show="showThost" :text="loadingtitle"></loading> -->
  </div>
</template>
<script>
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
      Info: {},
    };
  },
  methods: {
    scanBarCode() {
      let that = this;
      console.log("调用扫描接口");
      this.$hybridApi.scanCode({
        success: function (res) {
          that.scanCode = res;
          that.GetPackagePanelDetail();
        },
      });
    },
    GetPackagePanelDetail() {
      this.$axiosApi.getPackagePanelDetail(this.scanCode).then((res) => {
        console.log(res.Result);
        if ((res.Success = true)) {
          this.Info = res.Result;
          this.isShow = true;
        }
      });
    },
    goToBack() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>