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
      打孔欠件
      <!--<a slot="right" @click="doPost" :class="{'f-noclick':showThost}">提交</a>-->
      <!-- <a slot="right" @click="doPost()">提交</a> -->
    </x-header>
    <div
      id="headerOne"
      class="f-flexvw f-flexg1 f-pdlr5"
      style="overflow: auto"
    >
      <div class="f-flexg1" ref="bscroll">
        <div style="padding: 10px" ref="header">
          <div style="float: right; padding: 0 0 10px 0">
            <el-button @click="doResaerch">刷新</el-button>
            <el-button @click="goDetial">查询条件</el-button>
          </div>
        </div>
        <el-table
          :data="ReturnData"
          :height="divHeight"
          highlight-current-row
          style="font-size: 14px"
          :row-class-name="tableRowClassName"
          @current-change="doChoice"
          @header-click="headerClick"
        >
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column
            prop="BatchCode"
            label="批次号"
            min-width="80%"
          ></el-table-column>
          <el-table-column prop="OrderNumber" label="订单号"> </el-table-column>
          <el-table-column prop="CarNo" label="车次号"> </el-table-column>
          <el-table-column prop="UnitLength" min-width="100%" label="成品长">
          </el-table-column>
          <el-table-column prop="UnitWidth" min-width="100%" label="成品宽">
          </el-table-column>
          <el-table-column prop="Color" min-width="100%" label="花色">
          </el-table-column>
          <el-table-column prop="UPI" min-width="100%" label="UPI">
          </el-table-column>
          <el-table-column prop="Route" min-width="100%" label="工艺路线">
          </el-table-column>
          <el-table-column prop="IsReplenish" min-width="100%" label="是否补料">
          </el-table-column>
          <el-table-column
            prop="MakeWorkGroup"
            min-width="135%"
            label="制单班组"
          ></el-table-column>
          <el-table-column prop="PanelStatus" min-width="100%" label="板件状态">
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
          <div style="padding: 15px 10px 0px 20px">
            <el-form-item style="text-align: center" label="批次号:">
              <el-input placeholder="请输入批次号" v-model="BatchNo"></el-input>
            </el-form-item>
          </div>
          <div style="padding: 0px 20px 2px 20px">
            <el-form-item style="text-align: center" label="UPI:">
              <el-input placeholder="请输入UPI" v-model="Upi"></el-input>
            </el-form-item>
          </div>
          <div style="padding: 14px 20px 2px 20px">
            <span style="float: left; padding-bottom: 15px">是否打孔:</span>
            <el-form-item>
              <el-select
                placeholder="请选择"
                v-model="isPunch"
                style="width: 260px"
                @focus="clickPunch()"
              >
                <el-option
                  v-for="item in PunchList"
                  :label="item.Name"
                  :value="item.Id"
                  :key="item.Id"
                  ><span @click="isPunch = item.Id">{{ item.Name }}</span>
                </el-option>
              </el-select>
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
      divHeight: "",
      ShowCondition: false, //查询条件显隐
      title: "查询条件",
      BatchNo: null,
      Upi: null,
      isPunch: null,
      PunchName: "",
      Msg: "",
      ConfirmMsg: "",
      ShowConfirm2: false, //控制弹窗的显隐
      ConfirmMsg2: "",
      loadingtitle: "加载中",
      WorkshopId: 0,
      WorkshopName: "",
      WorkshopList: [],
      PunchList: [
        { Name: null, Id: null },
        { Name: "否", Id: 0 },
        { Name: "是", Id: 1 },
      ],
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
    GetPunchOwe() {
      this.showThost = true;
      this.$axiosApi
        .getPunchOwe(
          this.PageSize,
          this.NowPage,
          this.BatchNo,
          this.Upi,
          this.isPunch
        )
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
      if (this.Upi == null && this.BatchNo == null) {
        this.showPositionValue = true;
        this.Msg = "批次号和UPI不能同时为空！";
        return;
      }
      this.GetPunchOwe();
    },
    //获取当前点击的单
    doChoice(item, index) {
      console.log(item);
      this.PostProduceTaskId = item.Id;
    },
    //刷新
    doResaerch() {
      if (this.Upi == null && this.BatchNo == null) {
        this.showPositionValue = true;
        this.Msg = "请先选择查询条件！";
        return;
      }
      this.GetPunchOwe();
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
        this.GetPunchOwe();
      }
    },
    //下一页
    nextPage() {
      if (this.NowPage >= this.TotlePageCount) {
        this.NowPage = this.TotlePageCount;
      } else {
        this.NowPage++;
        this.GetPunchOwe();
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
        this.GetPunchOwe();
      } else if (this.JunpPageNum <= 1) {
        this.NowPage = 1;
        this.JunpPageNum = 1;
        this.GetPunchOwe();
      } else {
        this.NowPage = this.JunpPageNum;
        this.GetPunchOwe();
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
    // this.$nextTick(() => {
    //   // 页面渲染完成后的回调
    //   this.divHeight = this.$refs.bscroll.offsetHeight;
    //   console.log(this.divHeight);
    // });
    // console.log(this.divHeight);
  },
};
</script>