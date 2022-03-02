<template>
  <div class="g-index">
    <!-- 头部 -->
    <x-header
      class="m-header"
      :left-options="{ backText: '' }"
      style="background-color: #22292c"
    >
      板件喷粉
      <!-- <a slot="right">取消</a> -->
      <a
        slot="right"
        @click="doPost"
        :class="{ 'f-noclick': showThost }"
        v-show="isPrint == '否'"
        >提交</a
      >
    </x-header>
    <div class="f-flexvw f-flexg1 f-pdlr5">
      <div class="g-inp" style="min-height: 80px">
        <div class="m-inp f-mtb5" v-show="isPrint == '否'">
          <span class="laber100" style="width: 35%">条码</span>
          <span class="inp s-inpbg" style="width: 65%">
            <input
              v-model="UPI"
              ref="UPI"
              :disabled="IsChange"
              placeholder="请扫描板件UPI"
              type="text"
              @keyup.enter="getUPI()"
              class="s-inpbg"
            />
          </span>
        </div>
        <div class="m-inp f-mtb5">
          <span class="laber100" style="width: 35%">芯片</span>
          <span class="inp s-inpbg" style="width: 65%">
            <input
              v-model="ChipNo"
              ref="ChipNo"
              placeholder="请扫描芯片ID"
              type="text"
              @keyup="doJudge(isPrint)"
              class="s-inpbg"
            />
          </span>
        </div>
        <div class="m-inp f-mtb5">
          <x-switch
            class="f-mtb5"
            style="
              font-size: 16px;
              padding: 0 10px;
              margin-left: 57px;
              width: 140px;
            "
            title="打印"
            :value-map="['否', '是']"
            v-model="isPrint"
            @on-change="doChangePrintStatus"
          ></x-switch>
          <div style="font-size: 16px; margin-left: 5px">
            {{ isPrint }}
          </div>
        </div>
      </div>
      <div class="g-scrollbox">
        <div
          style="overflow-y: auto"
          v-show="!!this.ReturnData && !!ReturnData.Upi"
        >
          <s-messageheader
            class="f-mt10"
            messagetitle="订单信息"
          ></s-messageheader>
          <swipeout>
            <swipeout-item
              @on-close="handleEvents('on-close')"
              @on-open="handleEvents('on-open')"
              transition-mode="follow"
            >
              <div slot="right-menu" style="padding: 5px 0">
                <swipeout-button type="warn">删除</swipeout-button>
              </div>
              <div slot="content" class="f-pd5 vux-1px-t">
                <div class="m-listbox">
                  <div class="num"></div>
                  <div class="showbox">
                    <div class="showlistmsg">
                      <span class="label">订单号:</span>
                      <span class="showmsg f-ml10">{{
                        ReturnData.OrderNo
                      }}</span>
                    </div>
                    <div class="showlistmsg">
                      <span class="label">花色:</span>
                      <span class="showmsg f-ml10">{{
                        ReturnData.ColorCode
                      }}</span>
                    </div>
                    <div class="showlistmsg">
                      <span class="label">物料名称:</span>
                      <span class="showmsg f-ml10">{{
                        ReturnData.ItemName
                      }}</span>
                    </div>
                    <div class="showlistmsg">
                      <span class="label">批次号:</span>
                      <span class="showmsg f-ml10">{{
                        ReturnData.BatchNo
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </swipeout-item>
          </swipeout>
        </div>
        <div
          style="overflow-y: auto"
          v-show="!!ReturnData && !!ReturnData.ChipNo"
        >
          <s-messageheader
            class="f-mt10"
            messagetitle="芯片绑定"
          ></s-messageheader>
          <swipeout>
            <swipeout-item
              @on-close="handleEvents('on-close')"
              @on-open="handleEvents('on-open')"
              transition-mode="follow"
            >
              <div slot="right-menu" style="padding: 5px 0">
                <swipeout-button type="warn">删除</swipeout-button>
              </div>
              <div slot="content" class="f-pd5 vux-1px-t">
                <div class="m-listbox">
                  <div class="num"></div>
                  <div class="showbox">
                    <div class="showlistmsg">
                      <span class="label">UPI:</span>
                      <span class="showmsg f-ml10">{{ ReturnData.Upi }}</span>
                    </div>
                    <div class="showlistmsg">
                      <span class="label">芯片:</span>
                      <span class="showmsg f-ml10">{{
                        ReturnData.ChipNo
                      }}</span>
                    </div>
                    <div class="showlistmsg">
                      <span class="label"
                        >{{ isPrint == "是" ? "打印" : "绑定" }}结果:</span
                      >
                      <span class="showmsg f-ml10">{{
                        ReturnData.BindingState
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

    <s-confirm
      v-model="ShowConfirm2"
      :content="ConfirmMsg2"
      :showConfirmButton="false"
      :showCancelButton="false"
      :showSuccessButton="Successbtn2"
      :showDangerButton="Dangerbtn2"
      :bad="BadColor"
      @on-cancel="onCancel"
      @on-confirm="onConfirm2"
    >
    </s-confirm>

    <toast
      width="20em"
      v-model="showPositionValue"
      type="text"
      :time="2500"
      :text="Msg"
      position="middle"
    ></toast>
    <loading :show="showThost" :text="loadingtitle"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from "vue";
export default {
  name: "",
  data() {
    return {
      ShowConfirm: false, //控制提示弹窗的显隐
      ConfirmMsg: "提交成功",
      BadColor: false,
      Successbtn: true,
      Dangerbtn2: true,
      Successbtn2: true,
      Dangerbtn: true,
      ShowConfirm2: false, //控制提示弹窗的显隐
      ConfirmMsg2: "提交成功",

      showPositionValue: false, //提示信息显隐
      Msg: "有问题", //提示信息

      showThost: false, //圈圈的显隐
      loadingtitle: "提交中", //圈圈文字
      isPrint: "否",
      ChipNo: null, //芯片
      UPI: null, //UPI
      PostUPI: [], //提交的upi集合
      DataList: [
        // {
        //     "UPI":"c64s9194",
        //     "OldSupportNumber":"457265",
        //     "ProductBatch":"34911964895",
        //     "CurrentProduct":"3358942687",
        //     "NewSupportNumber":"6949582463",
        // },
        // {
        //     "UPI":"c64s9194",
        //     "OldSupportNumber":"457265",
        //     "ProductBatch":"34911964895",
        //     "CurrentProduct":"3358942687",
        //     "NewSupportNumber":"6949582463",
        // },
      ],
      IsChange: false, //控制托号是否能控制
      ReturnData: {},
    };
  },
  components: {},
  methods: {
    doJudge(isPrint) {
      if (isPrint == "否") {
        this.getChipNo();
      } else {
        this.doPrint(0);
      }
    },
    doChangePrintStatus() {
      this.ReturnData = {};
      if (this.isPrint == "是") {
        this.$refs.ChipNo.focus();
      } else {
        this.$refs.UPI.focus();
      }
    },
    //获取芯片
    getChipNo() {
      // if (!!this.ReturnData && !!!this.ReturnData.Upi) {
      //   this.showPositionValue = true;
      //   this.Msg = "请先扫描UPI!";
      //   this.ChipNo = null;
      //   return;
      // }
      if (this.ChipNo != null) {
        this.$axiosApi.judgeHasChipNo(this.ChipNo).then((res) => {
          if (res.Success) {
            this.ReturnData.ChipNo = this.ChipNo;
            this.$refs.UPI.focus();
          } else {
            this.showPositionValue = true;
            this.Msg = res.Message;
          }
          this.ChipNo = null;
        });
      }
    },
    doPrint(isRePrint) {
      if (!!!this.ChipNo) {
        this.showPositionValue = true;
        this.Msg = "请先扫描芯片！";
        return;
      }
      this.loadingtitle = "打印中";
      this.showThost = true;
      var ReturnData = {};
      ReturnData.ChipNo = this.ChipNo;
      ReturnData.IsRePrint = isRePrint;
      this.$axiosApi.doPrintLabel(ReturnData).then((res) => {
        if (res.Success) {
          var returnData = res.Result;
          if (returnData.Msg != null) {
            this.ShowConfirm2 = true;
            this.ConfirmMsg2 = returnData.Msg;
            this.showThost = false;
            return;
          }
          this.showPositionValue = true;
          this.Msg = "打印成功！";
          this.ReturnData = res.Result;
          this.showThost = false;
        } else {
          this.showPositionValue = true;
          this.Msg = "打印失败；" + res.Message;
          this.showThost = false;
        }
        this.ChipNo = null;
      });
    },
    //获取UPI
    getUPI() {
      if (!!this.UPI == false) {
        this.showPositionValue = true;
        this.Msg = "UPI不能为空";
        return;
      }
      // if(this.UPI.length != 13){
      //     this.showPositionValue=true
      //     this.Msg=`UPI：【${this.UPI}】只能为13位,当前位数：${this.UPI.length}`
      //     this.UPI=null
      //     return
      // }
      console.log("执行接口");
      this.GetSprayPowderPlateReturnDataByUpi(this.UPI);
      this.$refs.ChipNo.focus();
      console.log(this.UPI);
      this.UPI = null;
    },
    //触发单项左右滑动
    handleEvents(type) {
      console.log(type);
    },
    //点击删除按钮，删除当前项
    onButtonClick(index, item) {
      //   console.log(index);
      //   console.log(item);
      //   this.DataList.splice(index, 1);
      //   this.PostUPI = this.PostUPI.filter((upidata) => {
      //     return upidata != item.UpiCpode;
      //   });
      //   console.log(this.PostUPI);
    },
    //点击提示弹窗的删除按钮
    onCancel() {
      this.ShowConfirm = false;
      this.ConfirmMsg = "";
      this.BadColor = false;
      this.Successbtn = false;
      this.Dangerbtn = false;
    },
    //点击提示弹窗的确认按钮
    onConfirm() {
      this.ShowConfirm = false;
      this.ConfirmMsg = "";
      this.BadColor = false;
      this.Successbtn = false;
      this.Dangerbtn = false;
    },
    onConfirm2() {
      this.ShowConfirm2 = false;
      this.ConfirmMsg2 = "";
      this.BadColor = false;
      this.Successbtn = false;
      this.Dangerbtn = false;
      this.doPrint(1);
    },
    //点击提交按钮
    doPost() {
      if (!!!this.ReturnData) {
        this.Msg = "提交数据不能为空";
        this.showPositionValue = true;
        return;
      }
      if (!!!this.ReturnData.Upi || !!!this.ReturnData.ChipNo) {
        this.Msg = "提交数据不能为空";
        this.showPositionValue = true;
        return;
      }
      console.log(`${this.SupportNumber}和${this.PostUPI}`);
      this.doBindingChip();
    },
    //接口：根据获取信息
    GetSprayPowderPlateReturnDataByUpi(upi) {
      this.loadingtitle = "加载中";
      this.showThost = true;
      this.$axiosApi.getSprayPowderPlateReturnDataByUpi(upi).then((res) => {
        this.showThost = false;
        if (res.Success) {
          console.log(res);
          this.ReturnData = res.Result;
        } else {
          this.showPositionValue = true;
          this.Msg = res.Message;
        }
        this.UPI = null;
      });
    },

    //接口：提交芯片绑定
    doBindingChip() {
      this.loadingtitle = "提交中";
      this.showThost = true;
      this.$axiosApi.doBindingChip(this.ReturnData).then((res) => {
        this.showThost = false;
        if (res.Success) {
          console.log(res);
          this.ShowConfirm = true;
          this.ConfirmMsg = "提交成功";
          this.BadColor = false;
          this.Successbtn = true;
          this.Dangerbtn = false;
          this.ReturnData = {};
        } else {
          this.ShowConfirm = true;
          this.ConfirmMsg = res.Message;
          this.BadColor = true;
          this.Successbtn = false;
          this.Dangerbtn = true;
        }
      });
    },
  },
  mounted() {
    this.$refs.UPI.focus();
  },
};
</script>

<style lang="less">
</style>
