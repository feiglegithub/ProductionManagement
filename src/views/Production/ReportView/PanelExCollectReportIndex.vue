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
      板件异常采集报表
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
            prop="WorkPlaceName"
            label="车间"
            min-width="80%"
          ></el-table-column>
          <el-table-column prop="ProcessName" label="工序"> </el-table-column>
          <el-table-column prop="ResourceName" label="资源"> </el-table-column>
          <el-table-column
            prop="ExceptionCollectBy"
            min-width="100%"
            label="采集人"
          >
          </el-table-column>
          <el-table-column prop="Upi" min-width="100%" label="Upi">
          </el-table-column>
          <el-table-column
            prop="PanelExceptionType"
            min-width="100%"
            label="异常类型"
          >
          </el-table-column>
          <el-table-column prop="StockFlow" min-width="100%" label="备货流程">
          </el-table-column>
          <el-table-column
            prop="ExceptionCollectDate"
            min-width="100%"
            label="采集时间"
          >
          </el-table-column>
          <el-table-column prop="Length" min-width="100%" label="板件长">
          </el-table-column>
          <el-table-column prop="Width" min-width="100%" label="板件宽">
          </el-table-column>
          <el-table-column prop="Height" min-width="100%" label="板件高">
          </el-table-column>
          <el-table-column prop="ColourCode" min-width="100%" label="花色">
          </el-table-column>
          <el-table-column prop="BelongBatchNo" min-width="100%" label="批次">
          </el-table-column>
          <el-table-column prop="OrderNo" min-width="100%" label="订单号">
          </el-table-column>
          <el-table-column prop="UpdateDate" min-width="100%" label="修改人">
          </el-table-column>
          <el-table-column prop="UpdateDate" min-width="100%" label="修改时间">
          </el-table-column>
          <el-table-column prop="CreateBy" min-width="100%" label="创建人">
          </el-table-column>
          <el-table-column prop="CreateDate" min-width="100%" label="创建时间">
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
            <el-form-item style="text-align: center" label="工序:">
              <el-select
                placeholder="请选择工序"
                v-model="ProcessName"
                style="width: 180px"
                @click.native="getCollectProcesses()"
              >
                <el-option
                  v-for="item in ProssList"
                  :label="item.Name"
                  :value="item.Id"
                  :key="item.Id"
                  @click.native="doSelectPro(item.Id)"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="text-align: center" label="部门:">
              <el-select
                placeholder="请选择部门"
                v-model="WorkshopName"
                style="width: 180px"
                @click.native="getForkliftDepartment()"
              >
                <el-option
                  v-for="item in WorkPlaceList"
                  :label="item.Name"
                  :value="item.Id"
                  :key="item.Id"
                  @click.native="doSelectDep(item.Id)"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="资源:">
              <el-select
                placeholder="请选择资源"
                v-model="ResourceName"
                style="width: 180px"
                @click.native="getCollectResources()"
              >
                <el-option
                  v-for="item in ResourceList"
                  :label="item.Name"
                  :value="item.Id"
                  :key="item.Id"
                  @click.native="doSelectRes(item.Id)"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="text-align: center" label="UPI:">
              <el-input
                placeholder="请输入UPI"
                v-model="criteria.Upi"
                style="width: 180px; margin-left: 3px"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="m-selfselect" style="padding: 2px 10px 2px 20px">
          <el-form>
            <el-form-item style="text-align: center" label="批次号:">
              <el-input
                placeholder="请输入批次号"
                v-model="criteria.BelongBatchNo"
                style="width: 180px; margin-left: 2px"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="m-selfselect" style="padding: 2px 10px 2px 20px">
          <el-form>
            <el-form-item label="异常类型:">
              <el-select
                placeholder="请选择异常类型"
                v-model="criteria.PanelExceptionType"
                style="width: 180px; margin-right: 11px"
                @click.native="doShowExceptionType()"
              >
                <el-option
                  v-for="item in ExceptionTypeList"
                  :label="item.Name"
                  :value="item.Name"
                  :key="item.Id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="m-selfselect" style="padding: 2px 10px 2px 20px">
          <el-form>
            <el-form-item label="备货流程:">
              <el-select
                placeholder="请选择备货流程"
                multiple
                v-model="criteria.StockFlowIds"
                style="width: 180px; margin-right: 11px"
                @click.native="getForkliftStock()"
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
            <el-form-item style="text-align: center" label="采集时间:">
              <el-date-picker
                type="datetime"
                placeholder="请选择开始时间"
                :clearable="false"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                popper-class="begin_time"
                v-model="criteria.ExceptionCollectDateBegin"
                style="width: 180px; margin-right: 11px"
                :default-time="'00:00:00'"
              ></el-date-picker>
              <el-date-picker
                type="datetime"
                placeholder="请选择结束时间"
                :clearable="false"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                popper-class="end_time"
                v-model="criteria.ExceptionCollectDateEnd"
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
      loadingtitle: "加载中",
      criteria: {
        WorkPlaceId: "",
        ProcessId: "",
        ResourcId: "",
        Upi: "",
        BelongBatchNo: "",
        PanelExceptionType: "",
        StockFlowIds: "",
        ExceptionCollectDateBegin: new Date(
          new Date(new Date().toLocaleDateString()).getTime()
        ),
        ExceptionCollectDateEnd: new Date(
          new Date(new Date().toLocaleDateString()).getTime() +
            24 * 60 * 60 * 1000 -
            1
        ),
      }, //查询条件实体
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
      WorkPlaceId: 0,
      WorkshopName: "",
      WorkPlaceList: [],
      ProssList: [],
      ProcessName: "",
      ResourceList: [],
      ResourceName: "",
      ExceptionTypeList: [], //显示的异常类型列表
      NowPage: 1, //当前页
      PageSize: 10, //每页显示多少条
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
    GetPanelExCollectionReport() {
      this.showThost = true;
      this.$axiosApi
        .getPanelExCollectionReport(this.PageSize, this.NowPage, this.criteria)
        .then((res) => {
          if (res.Success == true) {
            this.showThost = false;
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
    //接口：获取工序数据接口
    getCollectProcesses() {
      this.loadingtitle = "加载中";
      this.showThost = true;
      this.$axiosApi.getCollectProcesses("", 0, 1).then((res) => {
        this.showThost = false;
        if (res.Success == true) {
          // console.log(res);
          this.ProssList = res.Result.Datas;
        } else {
          this.showPositionValue = true;
          this.Msg = res.Message;
        }
      });
    },
    //接口：获取资源的数据接口
    getCollectResources() {
      if (this.criteria.WorkPlaceId == 0) {
        this.showPositionValue = true;
        this.Msg = "请先选择部门！";
        this.ResourceList = [];
        return;
      }
      this.loadingtitle = "加载中";
      this.showThost = true;
      this.$axiosApi
        .getResourcesByView(this.criteria.WorkPlaceId)
        .then((res) => {
          this.showThost = false;
          if (res.Success == true) {
            console.log(res.Result.Datas);
            this.ResourceList = res.Result.Datas;
          } else {
            this.showPositionValue = true;
            this.Msg = res.Message;
          }
        });
    },
    //接口：获取部门的数据接口
    getForkliftDepartment() {
      this.$axiosApi.getForkliftDepartment().then((res) => {
        console.log(res);
        if (res.Success == true) {
          console.log(res.Result);
          this.WorkPlaceList = res.Result;
        }
      });
    },
    //接口：获取备货流程的数据接口
    getForkliftStock() {
      this.$axiosApi.getStockList(this.criteria.WorkPlaceId).then((res) => {
        console.log(res);
        if (res.Success == true) {
          console.log(res.Result);
          this.StockList = res.Result;
        }
      });
    },
    doShowExceptionType() {
      this.$axiosApi.getExceptionTypeList().then((res) => {
        if (res.Success) {
          this.ExceptionTypeList = res.Result;
        } else {
          this.showPositionValue = true;
          this.Msg = resl.Message;
        }
      });
    },
    doSelectDep(value) {
      console.log("部门id:" + value);
      this.criteria.WorkPlaceId = value;
    },
    doSelectPro(value) {
      console.log("工序id:" + value);
      this.criteria.ProcessId = value;
    },
    doSelectRes(value) {
      console.log("资源id:" + value);
      this.criteria.ResourcId = value;
    },
    goDetial() {
      this.ShowCondition = true;
    },
    doCancel() {
      this.ShowCondition = false;
    },
    doConfirm() {
      //   if (this.EndTime == null && this.BeginTime == null) {
      //     this.showPositionValue = true;
      //     this.Msg = "生产时间不能为空！";
      //     return;
      //   }
      //   if (this.Calculate(this.BeginTime, this.EndTime) > 7) {
      //     this.showPositionValue = true;
      //     this.Msg = "生产时间只限制7天之内！";
      //     return;
      //   }
      this.GetPanelExCollectionReport();
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
      this.GetPanelExCollectionReport();
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
        this.GetPanelExCollectionReport();
      }
    },
    //下一页
    nextPage() {
      if (this.NowPage >= this.TotlePageCount) {
        this.NowPage = this.TotlePageCount;
      } else {
        this.NowPage++;
        this.GetPanelExCollectionReport();
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
        this.GetPanelExCollectionReport();
      } else if (this.JunpPageNum <= 1) {
        this.NowPage = 1;
        this.JunpPageNum = 1;
        this.GetPanelExCollectionReport();
      } else {
        this.NowPage = this.JunpPageNum;
        this.GetPanelExCollectionReport();
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
    // this.showPositionValue = true;
    // this.Msg = "请先选择查询条件！";
  },
};
</script>