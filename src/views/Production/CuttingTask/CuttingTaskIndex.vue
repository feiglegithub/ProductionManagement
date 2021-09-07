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
      开料任务
      <!--<a slot="right" @click="doPost" :class="{'f-noclick':showThost}">提交</a>-->
      <!-- <a slot="right" @click="doPost()">提交</a> -->
    </x-header>
    <div
      id="headerOne"
      class="f-flexvw f-flexg1 f-pdlr5"
      style="overflow: auto"
    >
      <div class="f-flexg1" style="overflow: scroll" ref="bscroll">
        <div style="padding: 10px">
          <el-button @click="judgeIsExec"
            >补扫UPI</el-button
          >
          <el-button @click="goDetial">查看板件明细</el-button>
        </div>
        <el-table
          :data="ProductionTaskData"
          highlight-current-row
          style="font-size: 14px"
          :row-class-name="tableRowClassName"
          @current-change="doChoice"
          @header-click="headerClick"
        >
          <el-table-column prop="" label="序号"></el-table-column>
          <el-table-column prop="DepartMentCode" label="部门">
          </el-table-column>
          <el-table-column prop="SubBatchCode" label="子批次">
          </el-table-column>
          <el-table-column prop="TaskNumber" label="任务号"> </el-table-column>
          <el-table-column prop="PanelCont" label="板件数"> </el-table-column>
          <el-table-column prop="ProductionState" label="任务状态">
          </el-table-column>
          <el-table-column prop="SawFile" label="SAW文件"> </el-table-column>
          <el-table-column prop="CompletedCount" label="已完成数">
          </el-table-column>
          <el-table-column prop="BoardCount" label="大板数"> </el-table-column>
          <el-table-column prop="StockFlowName" label="备货流程">
          </el-table-column>
          <el-table-column prop="ProcessingOrder" label="加工序号">
          </el-table-column>
          <el-table-column prop="AssingRule" label="分派规则">
          </el-table-column>
          <el-table-column prop="MacheCode" label="机台号"> </el-table-column>
          <el-table-column prop="AssingTime" label="分派时间">
          </el-table-column>
          <el-table-column prop="MainColor" label="批次主花色">
          </el-table-column>
          <el-table-column prop="EmergencyType" label="加急标识">
          </el-table-column>
          <el-table-column prop="SectionFlag" label="分段标识">
          </el-table-column>
        </el-table>
        <!-- <div class="u-nodata" v-show="HasData">暂无数据</div> -->
      </div>
      <div class="m-page" style="height:30px">
        <span class="f-marleft10" style="font-size:15px" @click="perPage">上一页</span>
        <span class="f-marleft10">{{ NowPage }}/{{ TotlePageCount }}</span>
        <span class="f-marleft10" style="font-size:15px" @click="nextPage">下一页</span>
        <input type="text" class="pageinp f-marleft10" style="height:20px" v-model="JunpPageNum" />
        <span class="f-marleft10" style="font-size:15px" @click="jumpPage">跳转</span>
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
      :showSuccessButton="true"
      :showDangerButton="true"
      :bad="BadColor"
      @on-cancel="onCancel2"
      @on-confirm="onConfirm2"
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
      ShowConfirm2: false, //控制弹窗的显隐
      ConfirmMsg2:"",
      loadingtitle: "",
      loadingtitle: "",
      scanCode: "",
      WorkshopId: "",
      ProcessId: "",
      ResourceId: "",
      NowPage: 1, //当前页
      PageSize: 10, //每页显示多少条
      JunpPageNum: null, //跳转到第几页
      TotlePageCount: 0, //一共有多少页
      ProductionTaskData: [],
      PostProduceTaskId: 0,
    };
  },
  components: {
    "upload-img": uploadImg,
  },
  methods: {
    getProductionDate(
      pageSize,
      pageNumber,
      DepartmentId,
      ResourceId,
      Processid
    ) {
      this.$axiosApi
        .getProductionDate(
          pageSize,
          pageNumber,
          DepartmentId,
          ResourceId,
          Processid
        )
        .then((res) => {
          if (res.Success == true) {
            this.ProductionTaskData = res.Result.Datas;
            this.TotlePageCount = res.Result.PageCount;
            console.log(this.ProductionTaskData);
          } else {
            this.showPositionValue = true;
            this.Msg = res.Message;
            return;
          }
        });
    },
    goDetial() {
      if (this.PostProduceTaskId == 0) {
        this.showPositionValue = true;
        this.Msg = "请选择一条数据！";
        return;
      }
      this.$router.push({
        name: "CuttingTaskDetailIndex",
        params: {
          PostProduceTaskId: this.PostProduceTaskId,
        },
      });
    },
    //获取当前点击的检验单
    doChoice(item, index) {
      console.log(item);
      this.PostProduceTaskId = item.Id;
    },
    judgeIsExec() {
      this.ShowConfirm2 = true;
      this.ConfirmMsg2 = "是否确定补扫？";
    },
    finishProductionTaskDetailByFocus() {
      this.$axiosApi
        .finishProductionTaskDetailByFocus(this.PostProduceTaskId)
        .then((res) => {
          if (res.Success) {
            this.showPositionValue = true;
            this.Msg = "补扫成功";
          } else {
            this.showPositionValue = true;
            this.Msg = res.Message;
          }
        });
    },
    //上一页
    perPage() {
      if (this.NowPage <= 1) {
        this.NowPage = 1;
      } else {
        this.NowPage--;
        this.getProductionDate(
          this.PageSize,
          this.NowPage,
          this.WorkshopId,
          this.ResourceId,
          this.ProcessId
        );
      }
    },
    //下一页
    nextPage() {
      if (this.NowPage >= this.TotlePageCount) {
        this.NowPage = this.TotlePageCount;
      } else {
        this.NowPage++;
        this.getProductionDate(
          this.PageSize,
          this.NowPage,
          this.WorkshopId,
          this.ResourceId,
          this.ProcessId
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
        this.getProductionDate(
          this.PageSize,
          this.NowPage,
          this.WorkshopId,
          this.ResourceId,
          this.ProcessId
        );
      } else if (this.JunpPageNum <= 1) {
        this.NowPage = 1;
        this.JunpPageNum = 1;
        this.getProductionDate(
          this.PageSize,
          this.NowPage,
          this.WorkshopId,
          this.ResourceId,
          this.ProcessId
        );
      } else {
        this.NowPage = this.JunpPageNum;
        this.getProductionDate(
          this.PageSize,
          this.NowPage,
          this.WorkshopId,
          this.ResourceId,
          this.ProcessId
        );
      }
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
    },
    onConfirm2() {
      this.ShowConfirm = false;
      this.Successbtn = false;
      this.Dangerbtn = false;
      this.BadColor = false;
      this.ConfirmMsg = "";
      this.finishProductionTaskDetailByFocus();
    },
    onCancel2() {
      this.ShowConfirm = false;
      this.Successbtn = false;
      this.Dangerbtn = false;
      this.BadColor = false;
      this.ConfirmMsg = "";
    },
    goToBack() {
      this.$router.push({ name: "CuttingTaskSelectionIndex" });
    },
  },
  created() {
    this.WorkshopId =
      this.$route.params.WorkshopId != null && this.$route.params.WorkshopId > 0
        ? this.$route.params.WorkshopId
        : localStorage.getItem("CuttingTaskWorkshopKey");
    this.ProcessId =
      this.$route.params.ProcessId != null && this.$route.params.ProcessId > 0
        ? this.$route.params.ProcessId
        : localStorage.getItem("CuttingTaskProcessKey");
    this.ResourceId =
      this.$route.params.ResourceId != null && this.$route.params.ResourceId > 0
        ? this.$route.params.ResourceId
        : localStorage.getItem("CuttingTaskResourceKey");
    this.getProductionDate(
      this.PageSize,
      this.NowPage,
      this.WorkshopId,
      this.ResourceId,
      this.ProcessId
    );
  },
};
</script>