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
      机台产能报表
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
          <el-table-column prop="ResouceName" label="资源"></el-table-column>
          <el-table-column prop="ProcessName" label="工序"> </el-table-column>
          <el-table-column prop="WorkGroup" label="考勤组"> </el-table-column>
          <el-table-column prop="Quailty" label="数量"> </el-table-column>
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
                multiple
                v-model="ProssIds"
                style="width: 180px"
              >
                <el-option
                  v-for="item in ProssList"
                  :label="item.Name"
                  :value="item.Id"
                  :key="item.Id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div style="padding: 2px 10px 2px 38px">
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
                  @click.native="doSelectDep(item)"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div style="padding: 2px 10px 2px 38px">
          <el-form>
            <el-form-item label="资源:">
              <el-select
                placeholder="请选择资源"
                multiple
                v-model="ResourceIds"
                style="width: 180px"
                @click.native="getCollectResources()"
              >
                <el-option
                  v-for="item in ResourceList"
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
                v-model="BeginTime"
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
      divHeight: "",

      ShowCondition: false, //查询条件显隐
      title: "查询条件",
      BeginTime: new Date(new Date(new Date().toLocaleDateString()).getTime()),
      EndTime: new Date(),
      ResourceIds: [],
      ResourceList: [],

      WorkshopId: 0,
      WorkshopName: "",
      WorkshopList: [],
      Msg: "",
      ConfirmMsg: "",
      ShowConfirm2: false, //控制弹窗的显隐
      ConfirmMsg2: "",
      loadingtitle: "",
      loadingtitle: "",
      ProssIds: [],
      ProssList: [],
      NowPage: 1, //当前页
      PageSize: 100, //每页显示多少条
      JunpPageNum: null, //跳转到第几页
      TotlePageCount: 0, //一共有多少页
      ReturnData: [],
      PostProduceTaskId: 0,
    };
  },
  components: {
    "upload-img": uploadImg,
  },
  methods: {
    GetMachineCapacity() {
      this.$axiosApi
        .getMachineCapacity(
          this.PageSize,
          this.NowPage,
          this.ProssIds,
          this.ResourceIds,
          this.BeginTime,
          this.EndTime
        )
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
    goDetial() {
      this.ShowCondition = true;
      this.getForkliftDepartment();
      this.getCollectProcesses();
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
      this.GetMachineCapacity();
    },
    doSelectDep(value) {
      this.WorkshopId = value.Id;
      console.log("部门id:" + this.WorkshopId);
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
      this.GetMachineCapacity();
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
      if (this.WorkshopId == 0) {
        this.showPositionValue = true;
        this.Msg = "请先选择部门！";
        this.ResourceList = [];
        return;
      }
      this.loadingtitle = "加载中";
      this.showThost = true;
      this.$axiosApi.getResourcesByView(this.WorkshopId).then((res) => {
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
          this.WorkShopList = res.Result;
        }
      });
    },
    //上一页
    perPage() {
      if (this.NowPage <= 1) {
        this.NowPage = 1;
      } else {
        this.NowPage--;
        this.GetMachineCapacity();
      }
    },
    //下一页
    nextPage() {
      if (this.NowPage >= this.TotlePageCount) {
        this.NowPage = this.TotlePageCount;
      } else {
        this.NowPage++;
        this.GetMachineCapacity();
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
        this.GetMachineCapacity();
      } else if (this.JunpPageNum <= 1) {
        this.NowPage = 1;
        this.JunpPageNum = 1;
        this.GetMachineCapacity();
      } else {
        this.NowPage = this.JunpPageNum;
        this.GetMachineCapacity();
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