<template>
  <div class="g-index">
    <x-header
      class="m-header"
      :left-options="{ showBack: false }"
      style="background-color: #22292c"
    >
      <a slot="left" @click="addFeedingRework">
        <span style="font-size: 26px" class="iconfont icon-weibiaoti-"></span>
      </a>
      补料返工单明细
      <a slot="right" @click="doPost">确定</a>
    </x-header>
    <div class="f-flexvw f-flexg1 f-pdlr5">
      <div class="g-scrollbox">
        <div class="f-auto">
          <s-messageheader
            class="f-mt10"
            messagetitle="单明细"
          ></s-messageheader>
          <div class="g-notflexbox s-bgE7E7E7">
            <div>
              <div class="m-baserowbox">
                <span class="label80">板件信息:</span>
                <span class="text">{{ DetailData.UPI }}</span>
              </div>
              <div class="m-baserowbox">
                <span class="label80">物料:</span>
                <span class="text">{{ DetailData.ItemCode }}</span>
              </div>
              <div class="m-baserowbox">
                <span class="label80">规格:</span>
                <span class="text">{{ DetailData.Specifacation }}</span>
              </div>
              <div class="m-baserowbox">
                <span class="label80">名称:</span>
                <span class="text">{{ DetailData.ItemName }}</span>
              </div>
              <!-- <div class="m-baserowbox">
                                <span class="label80" >设备:</span>
                                <span class="text">{{DetailData.UPI}}</span>
                            </div> -->
              <div class="m-baserowbox">
                <span class="label80">封边:</span>
                <span class="text">{{ DetailData.EdgeBandingType }}</span>
              </div>
              <div class="m-baserowbox">
                <span class="label80">花色:</span>
                <span class="text">{{ DetailData.Colour }}</span>
              </div>
              <div class="m-baserowbox">
                <span class="label80">补料板件:</span>
                <div
                  class="select s-bgwhile"
                  @click="clickPanelNum(DetailData.PanelCount)"
                >
                  <popup-picker
                    :show.sync="ShowPanelNum"
                    :data="PanelNumList"
                    @on-change="changePanelNum"
                    value-text-align="left"
                  ></popup-picker>
                  <div class="select-text">{{ PanelNum }}</div>
                </div>
              </div>
              <div class="g-pdabtn">
                <div class="u-pdabtn" @click="doEdit">修改</div>
                <!-- <div class="u-pdabtn" @click="doDelete">删除</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <s-confirm
      v-model="ShowPostConfirm"
      content="提交成功"
      :showConfirmButton="false"
      :showCancelButton="false"
      :showSuccessButton="true"
      :showDangerButton="false"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
    >
    </s-confirm>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "FeedingReworkDetialYes",

  data() {
    return {
      ShowPostConfirm: false,
      ShowConfirm: false,

      DetailData: {
        //单信息
        UPI: null, //板件信息
        ItemCode: null, //物料编码
        Specifacation: null, //规格
        ItemName: null, //物料名称
        EdgeBandingType: null, //封边
        Colour: null, //花色
        SaleOrderNo: null, //销售订单号
        IsModifyBillDetail: null, //是否改变保存。1是点击了保存
        UpiData: null, //修改单明细的信息
        ResponseData: {
          EquipId: null, //设备id
          MachineAndTypeName: null, //设备名称
          DefectCategoryId: null, //出错种类的id
          DefectCategory: null, //出错种类名称
          DefectId: null, //缺陷代码id
          Defect: null, //缺陷代码名称
          DefectDescription: null, //缺陷描述
          ResWorkGroupId: null, //责任班组id
          ResWorkGroup: null, //责任班组名称
          ResEmployeeId: null, //责任人id
          ResEmployee: null, //责任人名称
          QualityInspectionId: null, //定责质检id
          QualityInspection: null, //定责质检名称
          ResEmpAssessment: null, //（责任人的）1已考核，0未考核
          JointEmpId: null, //连带定责质检id
          JointEmp: null, //连带定责质检名称
          JonitEmpAssessment: null, //（连带责任人的）1已考核，0未考核
        },
      },

      ShowPanelNum: false,
      GetPanelNum: null,
      PanelNumList: [[]],
      PanelNum: 1,

      DeepDetailData: {
        //用于保存原数据源
      },
    };
  },
  components: {},
  methods: {
    //点击修改按钮
    doEdit() {
      this.$router.push({
        name: "EditFeedingRework",
        params: {
          Details: this.DetailData,
          DeepDetailData: this.DeepDetailData,
        },
      });
    },
    //点击删除按钮
    doDelete() {
      this.$store.dispatch("removeKeepAlive", "BatchAddFeedingRework");
    },
    //点击补料板件
    clickPanelNum(PanelCount) {
      this.ShowPanelNum = true;
      this.PanelNumList = [[]];
      for (var i = 1; i <= PanelCount; i++) {
        this.PanelNumList[0].push({ name: i, value: i });
      }
    },
    //选择补料板件
    changePanelNum(val) {
      this.PanelNum = val[0];
    },
    //点击提示弹窗的删除按钮
    onCancel() {},
    //点击提示弹窗的确认按钮
    onConfirm() {},
    //点击提交按钮
    doPost() {
      this.DetailData.ResponseData = {};
      this.DetailData.ResponseData.ReproducePanelQty = this.PanelNum;
      this.$store.dispatch("removeKeepAlive", "FeedingReworkDetialYes");
      this.$router.push({
        name: "BatchAddFeedingRework",
        params: {
          BtnType: "Save",
          UPI: this.DetailData.UPI,
          ReproducePanelQty: this.PanelNum,
        },
      });
    },

    addFeedingRework() {
      this.DetailData.ResponseData = this.DeepDetailData.ResponseData;
      console.log(this.DeepDetailData.ResponseData);
      this.$store.dispatch("removeKeepAlive", "FeedingReworkDetialYes");
      this.$router.push({
        name: "BatchAddFeedingRework",
        params: { BtnType: "Back" },
      });
    },
    //深拷贝
    deepClone(obj) {
      let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
      return objClone;
    },
  },
  created() {
    console.log(JSON.stringify(this.$route.params.Details));
    if (this.$route.params.Details) {
      this.DeepDetailData = this.deepClone(this.$route.params.Details);
      this.DetailData = this.$route.params.Details;
      if (this.DetailData.ResponseData != null) {
        this.PanelNum = this.DetailData.ResponseData.ReproducePanelQty;
      }
    }
  },

  mounted() {
    this.$store.dispatch("addKeepAlive", "FeedingReworkDetialYes");
    console.log("BillNo:" + localStorage.getItem("BillNo"));
    console.log("333" + this.$store.getters.getIsBatchFeeding);
    // this.IsBatchFeeding=this.$store.getters.getIsBatchFeeding
  },
};
</script>

<style lang="less">
</style>
