<template>
  <div class="g-index">
    <!-- 头部 -->
    <!-- <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            补料返工单明细
            <a slot="right" @click="doPost">暂存</a>
            <a slot="right" @click="doPost">提交</a>
        </x-header> -->
    <x-header
      class="m-header"
      :left-options="{ showBack: false }"
      style="background-color: #22292c"
    >
      <a slot="left" @click="goToBack()">
        <span style="font-size: 26px" class="iconfont icon-weibiaoti-"></span>
      </a>
      开料任务板件明细
    </x-header>
    <div class="g-scrollbox">
      <div class="f-auto">
        <s-messageheader
          class="f-mt10"
          messagetitle="板件明细"
        ></s-messageheader>
        <swipeout class="s-border">
          <swipeout-item
            v-for="(item, index) in DetailData"
            :key="index"
            transition-mode="follow"
          >
            <!-- <div slot="right-menu" style="padding: 5px 0">
          <swipeout-button
            @click.native="onButtonClick(index, item)"
            type="warn"
            >删除</swipeout-button
          >
        </div> -->
            <div slot="content" class="f-pd5 vux-1px-t">
              <div class="g-tranbox s-bgE7E7E7">
                <div class="m-ordernumber">
                  {{ item.Seq }}
                </div>
                <div>
                  <div class="m-baserowbox">
                    <span class="label80">UPI:</span>
                    <span class="text">{{ item.DrillingNo }}</span>
                  </div>
                  <div class="m-baserowbox">
                    <span class="label80">托盘类型:</span>
                    <span class="text">{{ item.DrumCategoryCode }}</span>
                  </div>
                  <div class="m-baserowbox">
                    <span class="label80">物料编码:</span>
                    <span class="text">{{ item.ItemCode }}</span>
                  </div>
                  <div class="m-baserowbox">
                    <span class="label80">物料名称:</span>
                    <span class="text">{{ item.ItemName }}</span>
                  </div>
                  <div class="m-baserowbox">
                    <span class="label80">成品长:</span>
                    <span class="text">{{ item.Length }}</span>
                  </div>
                  <div class="m-baserowbox">
                    <span class="label80">成品宽:</span>
                    <span class="text">{{ item.Width }}</span>
                  </div>
                  <div class="m-baserowbox">
                    <span class="label80">成品高:</span>
                    <span class="text">{{ item.Height }}</span>
                  </div>
                  <div class="m-baserowbox">
                    <span class="label80">图号:</span>
                    <span class="text">{{ item.PatternNo }}</span>
                  </div>
                  <div class="m-baserowbox">
                    <span class="label80">板件所属子批次:</span>
                    <span class="text">{{ item.BeloneSubBatchCode }}</span>
                  </div>
                  <div class="m-baserowbox">
                    <span class="label80">板件数:</span>
                    <span class="text">{{ item.PanelCount }}</span>
                  </div>
                  <div class="m-baserowbox">
                    <span class="label80">板件状态:</span>
                    <span class="text">{{ item.PanelState }}</span>
                  </div>
                  <div class="m-baserowbox">
                    <span class="label80">花色:</span>
                    <span class="text">{{ item.ColourCode }}</span>
                  </div>
                </div>
              </div>
            </div>
          </swipeout-item>
        </swipeout>
      </div>
    </div>
    <div class="m-repairfooter">
      <div class="footerlogo">
        <div class="m-page" style="height: 26px; padding-left: 10px">
          <span class="f-marleft10" style="font-size: 15px" @click="perPage"
            >上一页</span
          >
          <span class="f-marleft10">{{ NowPage }}/{{ TotlePageCount }}</span>
          <span class="f-marleft10" style="font-size: 15px" @click="nextPage"
            >下一页</span
          >
          <input
            type="text"
            class="pageinp f-marleft10"
            style="height: 20px"
            v-model="JunpPageNum"
          />
          <span class="f-marleft10" style="font-size: 15px" @click="jumpPage"
            >跳转</span
          >
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
    <loading :show="showThost" :text="loadingtitle"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "FeedingReworkDetial",
  data() {
    return {
      ShowConfirm: false, //控制提示弹窗的显隐
      ConfirmMsg: "提交成功",
      BadColor: false,
      Successbtn: true,
      Dangerbtn: true,

      showPositionValue: false, //提示信息显隐
      Msg: "有问题", //提示信息

      showThost: false, //圈圈的显隐
      loadingtitle: "提交中", //圈圈文字

      ShowPostConfirm: false,
      ShowConfirm: false,
      ShowProcedure: false,
      DepartmentList: [[""]],
      Department: [],
      BarCode: null, //条码
      Type: "否", //类型，默认为可用
      IsBatchFeeding: "否", //是否批次补料，默认为否

      DetailData: [],
      productionTaskId: "",
      NowPage: 1, //当前页
      PageSize: 10, //每页显示多少条
      JunpPageNum: null, //跳转到第几页
      TotlePageCount: 0, //一共有多少页
    };
  },
  components: {},

  methods: {
    getProductionDetailDate(productionTaskId, pageSize, pageNumber) {
      this.$axiosApi
        .getProductionDetailDate(productionTaskId, pageSize, pageNumber)
        .then((res) => {
          if (res.Success) {
            var index = 1;
            this.DetailData = res.Result.Datas;
            this.TotlePageCount = res.Result.PageCount;
            this.DetailData.forEach((element) => {
              element.Seq = (pageNumber - 1) * pageSize + index;
              index++;
            });
            console.log(this.DetailData);
          } else {
            this.showPositionValue = true;
            this.Msg = res.Message;
            return;
          }
        });
    },
    //触发单项左右滑动
    handleEvents(type) {
      console.log(type);
    },
    goToBack() {
      this.$router.push({ name: "CuttingTaskIndex" });
    },
    //上一页
    perPage() {
      if (this.NowPage <= 1) {
        this.NowPage = 1;
      } else {
        this.NowPage--;
        this.getProductionDetailDate(
          this.productionTaskId,
          this.PageSize,
          this.NowPage
        );
      }
    },
    //下一页
    nextPage() {
      if (this.NowPage >= this.TotlePageCount) {
        this.NowPage = this.TotlePageCount;
      } else {
        this.NowPage++;
        this.getProductionDetailDate(
          this.productionTaskId,
          this.PageSize,
          this.NowPage
        );
      }
    },
    jumpPage() {
      // this.ChoiceIndex = null;
      // this.ChoiceBill = null;
      // this.categoryId = null;
      // this.processId = null;
      if (this.JunpPageNum >= this.TotlePageCount) {
        this.NowPage = this.TotlePageCount;
        this.JunpPageNum = this.TotlePageCount;
        this.getProductionDetailDate(
          this.productionTaskId,
          this.PageSize,
          this.NowPage
        );
      } else if (this.JunpPageNum <= 1) {
        this.NowPage = 1;
        this.JunpPageNum = 1;
        this.getProductionDetailDate(
          this.productionTaskId,
          this.PageSize,
          this.NowPage
        );
      } else {
        this.NowPage = this.JunpPageNum;
        this.getProductionDetailDate(
          this.productionTaskId,
          this.PageSize,
          this.NowPage
        );
      }
    },
  },
  created() {
    console.log(JSON.stringify(this.$route.params.productionTaskId));
    this.productionTaskId = this.$route.params.PostProduceTaskId;
    this.getProductionDetailDate(
      this.productionTaskId,
      this.PageSize,
      this.NowPage
    );
  },
};
</script>

<style lang="less">
</style>
