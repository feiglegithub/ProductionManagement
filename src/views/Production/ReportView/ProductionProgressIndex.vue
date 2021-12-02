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
      生产进度报表
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
            prop="ProductTime"
            label="生产日期"
            min-width="80%"
          ></el-table-column>
          <el-table-column prop="DepartMent" label="部门"> </el-table-column>
          <el-table-column prop="StockFlow" label="备货流程"> </el-table-column>
          <el-table-column prop="Klxwc" min-width="100%" label="开料需完成">
          </el-table-column>
          <el-table-column prop="Klywc" min-width="100%" label="开料已完成">
          </el-table-column>
          <el-table-column prop="Klwcl" min-width="100%" label="开料完成率">
          </el-table-column>
          <el-table-column prop="Fbxwc" min-width="100%" label="封边需完成">
          </el-table-column>
          <el-table-column prop="Fbywc" min-width="100%" label="封边已完成">
          </el-table-column>
          <el-table-column prop="Fbwcl" min-width="100%" label="封边完成率">
          </el-table-column>
          <el-table-column prop="Pzxwc" min-width="100%" label="排钻需完成">
          </el-table-column>
          <el-table-column prop="Pzywc" min-width="100%" label="排钻已完成">
          </el-table-column>
          <el-table-column prop="Pzwcl" min-width="100%" label="排钻完成率">
          </el-table-column>
          <el-table-column prop="Jyxwc" min-width="100%" label="检验需完成">
          </el-table-column>
          <el-table-column prop="Jyywc" min-width="100%" label="检验已完成">
          </el-table-column>
          <el-table-column prop="Jywcl" min-width="100%" label="检验完成率">
          </el-table-column>

          <el-table-column
            prop="Rcxwcd"
            min-width="135%"
            label="入仓需完成（单）"
          >
          </el-table-column>
          <el-table-column
            prop="Rcywcd"
            min-width="135%"
            label="入仓已完成（单）"
          >
          </el-table-column>
          <el-table-column
            prop="Rcwcld"
            min-width="135%"
            label="入仓完成率（单）"
          >
          </el-table-column>

          <el-table-column
            prop="Rcxwc"
            min-width="135%"
            label="入仓需完成（包）"
          >
          </el-table-column>
          <el-table-column
            prop="Rcywc"
            min-width="135%"
            label="入仓已完成（包）"
          >
          </el-table-column>
          <el-table-column
            prop="Rcwcl"
            min-width="135%"
            label="入仓完成率（包）"
          >
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
        <div style="padding: 15px 10px 2px 38px">
          <el-form>
            <el-form-item style="text-align: center" label="部门:">
              <el-select
                placeholder="请选择部门"
                v-model="WorkshopName"
                style="width: 180px"
              >
                <el-option
                  v-for="item in WorkShopList"
                  :label="item.Name"
                  :value="item.Id"
                  :key="item.Id"
                >
                  <span @click="doSelectDep(item.Id)">{{ item.Name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div style="padding: 2px 20px 2px 20px">
          <el-form>
            <el-form-item label="备货流程:">
              <el-select
                placeholder="请选择备货流程"
                multiple=""
                v-model="StockFlowIds"
                style="width: 180px"
              >
                <el-option
                  v-for="item in StockList"
                  :label="item.Name"
                  :value="item.Id"
                  :key="item.Id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="m-selfselect" style="padding: 2px 10px 2px 20px">
          <el-form>
            <el-form-item style="text-align: center" label="生产时间:">
              <el-date-picker
                type="date"
                placeholder="请选择开始时间"
                value-format="yyyy-MM-dd"
                popper-class="begin_time"
                v-model="BeginTime"
                style="width: 180px; margin-right: 11px"
              ></el-date-picker>
              <el-date-picker
                type="date"
                placeholder="请选择结束时间"
                value-format="yyyy-MM-dd"
                popper-class="end_time"
                v-model="EndTime"
                style="width: 180px; margin-left: 61px; margin-top: 2px"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
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
      BeginTime: new Date(new Date(new Date().toLocaleDateString()).getTime()),
      EndTime: new Date(
        new Date(new Date().toLocaleDateString()).getTime() +
          24 * 60 * 60 * 1000 -
          1
      ),
      StockFlowIds: [],
      StockFlowName: "",
      StockList: [],
      divHeight: "",
      Msg: "",
      ConfirmMsg: "",
      ShowConfirm2: false, //控制弹窗的显隐
      ConfirmMsg2: "",
      loadingtitle: "加载中",
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
    GetProductionSchedule() {
      this.showThost = true;
      this.$axiosApi
        .getProductionSchedule(
          this.PageSize,
          this.NowPage,
          this.WorkshopId,
          this.StockFlowIds,
          this.BeginTime,
          this.EndTime
        )
        .then((res) => {
          if (res.Success == true) {
            this.showThost = false;
            this.ReturnData = res.Result.Datas;
            this.TotlePageCount = res.Result.PageCount;
            this.ReturnData.forEach((item) => {
              item.ProductTime = item.ProductTime.Format("yyyy-MM-dd");
            });
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
      this.getForkliftDepartment();
      this.getForkliftStock(this.WorkshopId);
    },
    doCancel() {
      this.ShowCondition = false;
    },
    doConfirm() {
      if (this.EndTime == null && this.BeginTime == null) {
        this.showPositionValue = true;
        this.Msg = "生产时间不能为空！";
        return;
      }
      if (this.Calculate(this.BeginTime, this.EndTime) > 7) {
        this.showPositionValue = true;
        this.Msg = "生产时间只限制7天之内！";
        return;
      }
      this.GetProductionSchedule();
    },
    //获取当前点击的单
    doChoice(item, index) {
      console.log(item);
      this.PostProduceTaskId = item.Id;
    },
    //刷新
    doResaerch() {
      if (this.BeginTime == null && this.EndTime == null) {
        this.showPositionValue = true;
        this.Msg = "请先选择查询条件！";
        return;
      }
      this.GetProductionSchedule();
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
        this.GetProductionSchedule();
      }
    },
    //下一页
    nextPage() {
      if (this.NowPage >= this.TotlePageCount) {
        this.NowPage = this.TotlePageCount;
      } else {
        this.NowPage++;
        this.GetProductionSchedule();
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
        this.GetProductionSchedule();
      } else if (this.JunpPageNum <= 1) {
        this.NowPage = 1;
        this.JunpPageNum = 1;
        this.GetProductionSchedule();
      } else {
        this.NowPage = this.JunpPageNum;
        this.GetProductionSchedule();
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