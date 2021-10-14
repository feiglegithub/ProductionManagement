<template>
  <div class="g-index">
    <!-- 头部 -->
    <x-header
      class="m-header"
      :left-options="{ backText: '' }"
      style="background-color: #22292c"
    >
      发起返修
      <a slot="right" @click="goReturnRepair">下一步</a>
    </x-header>
    <div class="f-flexvw f-flexg1 f-pdlr5">
      <div class="g-inp" style="min-height: 40px">
        <div class="m-inp f-mtb5">
          <span class="laber100">UPI</span>
          <span class="inp s-inpbg">
            <input
              class="s-inpbg"
              v-model="Upi"
              ref="UpiInp"
              placeholder="请扫描UPI条码"
              type="text"
              @keyup.enter="getUpi()"
            />
            <span
              class="iconfont icon-iconfontscan"
              @click="scanBarCode"
            ></span>
          </span>
        </div>
      </div>
      <div class="g-scrollbox">
        <div style="overflow-y: auto">
          <s-messageheader
            class="f-mt10"
            messagetitle="条码信息"
            v-show="UpiDataList.length >= 1"
          ></s-messageheader>
          <swipeout :class="{ 's-border': UpiDataList.length >= 1 }">
            <swipeout-item
              v-for="(item, index) in UpiDataList"
              :key="index"
              transition-mode="follow"
            >
              <div slot="right-menu" style="padding: 5px 0">
                <swipeout-button
                  @click.native="onButtonClick(index, item)"
                  type="warn"
                  >删除</swipeout-button
                >
              </div>
              <div slot="content" class="f-pd5 vux-1px-t">
                <div class="m-listbox">
                  <div class="num">{{ index + 1 }}</div>
                  <div class="showbox">
                    <div class="showlistmsg">
                      <span class="label">UPI:</span>
                      <span class="showmsg f-ml10">{{ item.UpiCode }}</span>
                    </div>
                    <div class="showlistmsg">
                      <span class="label">子批次:</span>
                      <span class="showmsg f-ml10">{{
                        item.SubBatchCode
                      }}</span>
                    </div>
                    <div class="showlistmsg">
                      <span class="label">成品尺寸:</span>
                      <span class="showmsg f-ml10">{{
                        item.FinalSizeInfo
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </swipeout-item>
          </swipeout>
        </div>
      </div>
    </div>

    <toast
      width="20em"
      v-model="ShowPositionValue"
      type="text"
      :time="2500"
      :text="Msg"
      position="middle"
    ></toast>
    <loading :show="ShowThost" :text="LoadingTitle"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "ReturnRepairUpi",
  data() {
    return {
      ShowPositionValue: false, //提示信息显隐
      Msg: "有问题", //提示信息
      ShowThost: false, //圈圈的显隐
      LoadingTitle: "提交中", //圈圈文字

      Upi: null, //UPI
      UpiDataList: [], //UPI数据
    };
  },
  components: {},
  methods: {
    scanBarCode() {
      let that = this;
      console.log("调用扫描接口");
      this.$hybridApi.scanCode({
        success: function (res) {
          that.Upi = res;
          that.getUPI();
        },
      });
    },
    //获取UPI
    getUpi() {
      if (!this.Upi) {
        this.ShowPositionValue = true;
        this.Msg = "UPI不能为空";
        return;
      }

      if (this.UpiDataList.findIndex((item) => item.UpiCode == this.Upi) >= 0) {
        this.ShowPositionValue = true;
        this.Msg = `UPI：${this.Upi}已存在`;
        this.Upi = null;
        return;
      }

      this.scanUpiReturnRepair(
        this.$route.params.WorkshopId,
        this.$route.params.ProcessId
      );
    },
    //点击删除按钮，删除当前项
    onButtonClick(index, item) {
      this.UpiDataList = this.UpiDataList.filter((upiData) => {
        return upiData.UpiCode != item.UpiCode;
      });
    },
    //点击下一步按钮
    goReturnRepair() {
      if (this.UpiDataList.length <= 0) {
        this.Msg = "返修数据不能为空";
        this.ShowPositionValue = true;
        return;
      }

      this.$router.push({
        name: "ReturnRepairProcessSelection",
        params: {
          WorkshopId: this.$route.params.WorkshopId,
          ProcessId: this.$route.params.ProcessId,
          ResourceId: this.$route.params.ResourceId,
          StockFlowId: this.UpiDataList[0].StockFlowId,
          IsUpi: true,
          UpiDataList: this.UpiDataList,
        },
      });
    },
    //接口：获取Upi信息
    scanUpiReturnRepair(departmentId, processId) {
      this.LoadingTitle = "加载中";
      this.ShowThost = true;

      this.$axiosApi
        .scanUpiReturnRepair(
          departmentId,
          processId,
          this.UpiDataList,
          this.Upi
        )
        .then((res) => {
          this.ShowThost = false;

          if (res.Success) {
            // console.log(res);
            if (!!res.Result) {
              this.UpiDataList.unshift(res.Result);
            }
          } else {
            this.ShowPositionValue = true;
            this.Msg = res.Message;
          }

          this.Upi = null;
        });
    },
  },
  mounted() {
    this.$refs.UpiInp.focus();
  },
};
</script>

<style lang="less">
</style>
