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
      生产WIP查询
      <!--<a slot="right" @click="doPost" :class="{'f-noclick':showThost}">提交</a>-->
      <!-- <a slot="right" @click="doPost()">提交</a> -->
    </x-header>
    <div
      id="headerOne"
      class="f-flexvw f-flexg1 f-pdlr5"
      style="overflow: auto"
    >
      <div class="f-flexg1" ref="bscroll">
        <div style="padding: 10px">
          <div style="float: right; padding: 0 0 10px 0">
            <el-button @click="doResaerch">刷新</el-button>
            <el-button @click="goDetial">查询条件</el-button>
          </div>
        </div>
        <el-table
          :data="ReturnData"
          highlight-current-row
          :height="divHeight"
          style="font-size: 14px"
          :row-class-name="tableRowClassName"
          @current-change="doChoice"
          @header-click="headerClick"
        >
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column
            prop="ProcessName"
            label="工序"
            min-width="80%"
          ></el-table-column>
          <el-table-column
            prop="ResourceName"
            label="资源"
            min-width="80%"
          ></el-table-column>
          <el-table-column prop="Upi" min-width="100%" label="UPI">
          </el-table-column>
          <el-table-column prop="PalnelState" label="板件状态">
          </el-table-column>
          <el-table-column prop="Route" min-width="120%" label="板件工艺路线">
          </el-table-column>
          <el-table-column
            prop="ProductionEmp"
            min-width="100%"
            label="生产人员"
          >
          </el-table-column>
          <el-table-column prop="CollecTime" min-width="100%" label="采集时间">
          </el-table-column>
          <el-table-column prop="IsReplenish" min-width="100%" label="是否补料">
          </el-table-column>
        </el-table>
        <!-- <div class="u-nodata" v-show="HasData">暂无数据</div> -->
      </div>
      <div class="m-page" style="height: 30px">
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
    <confirm
      v-model="ShowCondition"
      :title="title"
      :show-cancel-button="true"
      style="backgrand-color: #f9f0d8; z-index: 500"
      @on-confirm="doConfirm"
    >
      <div style="width: 300px">
        <el-form>
          <div style="padding: 2px 20px 2px 20px">
            <el-form-item style="text-align: center" label="UPI:">
              <el-input placeholder="请输入UPI" v-model="Upi"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </confirm>
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

      ShowCondition: false, //查询条件显隐
      title: "查询条件",
      BatchNo: "",
      Upi: null,
      divHeight: "",
      Msg: "",
      ConfirmMsg: "",
      ShowConfirm2: false, //控制弹窗的显隐
      ConfirmMsg2: "",
      loadingtitle: "",
      loadingtitle: "",
      WorkshopId: 0,
      WorkshopName: "",
      WorkshopList: [],
      NowPage: 1, //当前页
      PageSize: 100, //每页显示多少条
      JunpPageNum: null, //跳转到第几页
      TotlePageCount: 0, //一共有多少页
      ReturnData: [],
      PostProduceTaskId: 0,
      day: 0,
    };
  },
  components: {
    "upload-img": uploadImg,
  },
  methods: {
    GetProductionWipData() {
      this.$axiosApi
        .getProductWipQuery(this.PageSize, this.NowPage, this.Upi)
        .then((res) => {
          if (res.Success == true) {
            this.ReturnData = res.Result.Datas;
            this.TotlePageCount = res.Result.PageCount;
            console.log(this.ReturnData);
          } else {
            this.showPositionValue = true;
            this.Msg = res.Message;
            return;
          }
        });
    },
    doSelectDep(value) {
      console.log("部门id:" + value);
      this.WorkshopId = value;
      this.getForkliftStock(value);
    },
    goDetial() {
      this.ShowCondition = true;
    },
    doCancel() {
      this.ShowCondition = false;
    },
    doConfirm() {
      if (this.Upi == null) {
        this.showPositionValue = true;
        this.Msg = "请先输入UPI！";
        this.ShowCondition = true;
        return;
      }
      this.GetProductionWipData();
    },
    //获取当前点击的单
    doChoice(item, index) {
      console.log(item);
      this.PostProduceTaskId = item.Id;
    },
    //刷新
    doResaerch() {
      if (this.Upi == null) {
        this.showPositionValue = true;
        this.Msg = "请先选择查询条件！";
        return;
      }
      this.GetProductionWipData();
    },
    //接口：获取备货流程的数据接口
    getForkliftStock(WorkShopId) {
      this.$axiosApi.getStockList(WorkShopId).then((res) => {
        console.log(res);
        if (res.Success == true) {
          console.log(res.Result);
          this.StockList = res.Result;
        }
      });
    },
    //接口：获取部门的数据接口
    getForkliftDepartment() {
      this.$axiosApi.getForkliftDepartment().then((res) => {
        console.log(res);
        if (res.Success == true) {
          console.log(res.Result);
          this.WorkShopList = res.Result;
        }
      });
    },
    Calculate(beginTime, endTime) {
      var dateBegin = new Date(beginTime);
      var dateEnd = new Date(endTime);
      var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
      var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
      return dayDiff;
    },
    //上一页
    perPage() {
      if (this.NowPage <= 1) {
        this.NowPage = 1;
      } else {
        this.NowPage--;
        this.GetProductionWipData();
      }
    },
    //下一页
    nextPage() {
      if (this.NowPage >= this.TotlePageCount) {
        this.NowPage = this.TotlePageCount;
      } else {
        this.NowPage++;
        this.GetProductionWipData();
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
        this.GetProductionWipData();
      } else if (this.JunpPageNum <= 1) {
        this.NowPage = 1;
        this.JunpPageNum = 1;
        this.GetProductionWipData();
      } else {
        this.NowPage = this.JunpPageNum;
        this.GetProductionWipData();
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
    },
    onCancel2() {
      this.ShowConfirm = false;
      this.Successbtn = false;
      this.Dangerbtn = false;
      this.BadColor = false;
      this.ConfirmMsg = "";
    },
    goToBack() {
      this.$router.push({ name: "ReportViewIndex" });
    },
  },
  mounted() {
    this.divHeight = this.$refs.bscroll.offsetHeight - 50;
    console.log(this.divHeight);
  },
  created() {
    this.showPositionValue = true;
    this.Msg = "请先选择查询条件！";
  },
};
</script>