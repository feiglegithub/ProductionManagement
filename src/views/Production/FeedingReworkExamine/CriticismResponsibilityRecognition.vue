<template>
  <div class="g-index">
    <!-- 头部 -->
    <!-- <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            补料返工单
        </x-header> -->
    <x-header
      class="m-header"
      :left-options="{ showBack: false }"
      style="background-color: #22292c"
    >
      <a slot="left" @click="goBaseIndex">
        <span style="font-size: 26px" class="iconfont icon-weibiaoti-"></span>
      </a>
      补料返工批责任确认
      <a slot="right" @click="doPost">责任确认</a>
    </x-header>
    <div class="f-flexvw f-flexg1 f-pdlr5">
      <div class="g-scrollbox">
        <div class="f-auto">
          <s-messageheader
            class="f-mt10"
            messagetitle="单据概要信息"
            v-show="FeedingReworkData.BatchNo"
          ></s-messageheader>

          <div
            class="g-notflexbox s-bgE7E7E7 s-border"
            v-show="FeedingReworkData.BatchNo"
          >
            <div class="m-baserowbox">
              <span class="label100">返修单号:</span>
              <span class="text">{{ FeedingReworkData.RerpoductNo }}</span>
            </div>
            <div class="m-baserowbox">
              <span class="label100">批次号:</span>
              <span class="text">{{ FeedingReworkData.BatchNo }}</span>
            </div>
            <div class="m-baserowbox">
              <span class="label100">出货日期:</span>
              <span class="text">{{ FeedingReworkData.DeliveryDate }}</span>
            </div>
            <div class="m-baserowbox">
              <span class="label100">创建日期:</span>
              <span class="text">{{ FeedingReworkData.CreateDate }}</span>
            </div>
            <div class="m-baserowbox">
              <span class="label100">制单人:</span>
              <span class="text">{{ FeedingReworkData.CreateBy }}</span>
            </div>
            <div class="m-baserowbox">
              <span class="label100">附件:</span>

              <show-upload-img :imgData="arrayImage" />
            </div>
            <div class="m-baserowbox">
              <span class="label80">班组类别:</span>
              <div class="select s-bgwhile" @click="clickGroupType">
                <popup-picker
                  :show.sync="ShowGroupType"
                  :data="GroupTypeList"
                  @on-change="changeGroupType"
                  value-text-align="left"
                ></popup-picker>
                <div class="select-text">{{ GroupType }}</div>
              </div>
            </div>
            <div class="m-baserowbox">
              <span class="label80">责任班组:</span>
              <div class="select s-bgwhile" @click="clickGroup">
                <popup-picker
                  :show.sync="ShowGroup"
                  :data="GroupList"
                  @on-change="changeGroup"
                  value-text-align="left"
                ></popup-picker>
                <div>{{ Group }}</div>
              </div>
              <div
                class="m-inp f-mtb5"
                style="
                  position: fixed;
                  z-index: 9999;
                  width: 60%;
                  left: 20%;
                  top: 63%;
                  overflow: hidden;
                "
                v-show="ShowGroup"
              >
                <input
                  class="inp s-bgwhile"
                  style="
                    text-align: center;
                    width: 1%;
                    margin: 0 auto;
                    opacity: 0.6;
                  "
                  v-model="GroupTypeFilter"
                  @keyup="doGroupFilter"
                />
              </div>
            </div>
            <div class="m-baserowbox" v-if="GroupType != '非生产性责任班组'">
              <span class="label80">责任人:</span>
              <div class="select s-bgwhile" @click="clickPersonLiable">
                <popup-picker
                  :show.sync="ShowPersonLiable"
                  :data="PersonLiableList"
                  @on-change="changePersonLiable"
                  value-text-align="left"
                ></popup-picker>
                <div>{{ PersonLiable }}</div>
              </div>
              <div
                class="m-inp f-mtb5"
                style="
                  position: fixed;
                  z-index: 9999;
                  width: 60%;
                  left: 20%;
                  top: 63%;
                  overflow: hidden;
                "
                v-show="ShowPersonLiable"
              >
                <input
                  class="inp s-bgwhile"
                  style="
                    text-align: center;
                    width: 1%;
                    margin: 0 auto;
                    opacity: 0.6;
                  "
                  v-model="PersonLiableFilter"
                  @keyup="doPersonLiableFilter"
                />
              </div>
            </div>
            <div class="m-baserowbox">
              <span class="label80">考核情况:</span>
              <div class="select s-bgwhile" @click="clickLiableExamine">
                <popup-picker
                  :show.sync="ShowLiableExamine"
                  :data="LiableExamineList"
                  @on-change="changeLiableExamine"
                  value-text-align="left"
                ></popup-picker>
                <div>{{ LiableExamine }}</div>
              </div>
            </div>
            <div class="m-baserowbox">
              <span class="label80">连带责任人:</span>
              <div class="select s-bgwhile" @click="clickRelationPerson">
                <popup-picker
                  :show.sync="ShowRelationPerson"
                  :data="RelationPersonList"
                  @on-change="changeRelationPerson"
                  value-text-align="left"
                ></popup-picker>
                <div class="select-text">{{ RelationPerson }}</div>
              </div>
            </div>
            <div class="m-baserowbox">
              <span class="label80">考核情况:</span>
              <div class="select s-bgwhile" @click="clickRelationExamine">
                <popup-picker
                  :show.sync="ShowRelationExamine"
                  :data="RelationExamineList"
                  @on-change="changeRelationExamine"
                  value-text-align="left"
                ></popup-picker>
                <div class="select-text">{{ RelationExamine }}</div>
              </div>
            </div>
            <div class="m-baserowbox">
              <span class="label80">设备:</span>
              <div class="select s-bgwhile" @click="clickEquipment(index)">
                <popup-picker
                  :show.sync="ShowEquipment"
                  :data="EquipmentList"
                  @on-change="changeEquipment"
                  value-text-align="left"
                ></popup-picker>
                <div class="select-text">
                  {{ ResponsMachine }}
                </div>
              </div>
              <div
                class="m-inp f-mtb5"
                style="
                  position: fixed;
                  z-index: 9999;
                  width: 60%;
                  left: 20%;
                  top: 63%;
                  overflow: hidden;
                "
                v-show="ShowEquipment"
              >
                <input
                  class="inp s-bgwhile"
                  style="
                    text-align: center;
                    width: 1%;
                    margin: 0 auto;
                    opacity: 0.6;
                  "
                  v-model="EquipmentFilter"
                  @keyup="doEquipmentFilter"
                />
              </div>
            </div>
          </div>
          <s-messageheader
            class="f-mt10"
            messagetitle="单据明细"
            v-show="FeedingReworkData.Details.length > 0"
          ></s-messageheader>
          <div
            class="f-pd5 s-border"
            v-show="FeedingReworkData.Details.length > 0"
          >
            <div
              class="m-listbox f-mtb5"
              v-for="(item, index) in FeedingReworkData.Details"
              :key="index"
              @click="doSure"
            >
              <div class="num">
                {{ index + 1 }}
              </div>
              <div class="showbox">
                <div class="showlistmsg">
                  <span class="label">板件信息:</span>
                  <span class="showmsg f-ml10">{{ item.UPI }}</span>
                </div>
                <div class="showlistmsg">
                  <span class="label">订单号:</span>
                  <span class="showmsg f-ml10">{{ item.SaleOrderNo }}</span>
                </div>
                <div class="showlistmsg">
                  <span class="label">物料编码:</span>
                  <span class="showmsg f-ml10">{{ item.ItemCode }}</span>
                </div>
                <div class="showlistmsg">
                  <span class="label">物料名称:</span>
                  <span class="showmsg f-ml10">{{ item.ItemName }}</span>
                </div>
                <div class="showlistmsg">
                  <span class="label">规格:</span>
                  <span class="showmsg f-ml10">{{ item.Specifacation }}</span>
                </div>
                <div class="showlistmsg">
                  <span class="label">缺陷:</span>
                  <span class="showmsg f-ml10"
                    >{{ item.ResponseData.DefectCategory }}_{{
                      item.ResponseData.Defect
                    }}</span
                  >
                </div>
              </div>
            </div>
          </div>
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
  </div>
</template>

<script type="text/ecmascript-6">
import showuploadImg from "../../../components/components/showuploadImg";
export default {
  name: "ResponsibilityRecognition",
  data() {
    return {
      showPositionValue: false, //提示信息显隐
      Msg: "有问题", //提示信息
      ShowConfirm: false, //控制提示弹窗的显隐
      ConfirmMsg: "提交成功",
      BadColor: false,
      Successbtn: true,
      Dangerbtn: true,
      SupportNumber: null, //托号
      UPI: null, //UPI
      DataList: [
        {
          RepairNumber: "c64s9194",
          BatchNumber: "457265",
          ShippingDate: "34911964895",
          CreationDate: "3358942687",
          ProductionTeam: "6949582463",
          BatchFeeding: true,
        },
        {
          RepairNumber: "c64s9194",
          BatchNumber: "457265",
          ShippingDate: "34911964895",
          CreationDate: "3358942687",
          ProductionTeam: "6949582463",
          BatchFeeding: false,
        },
        {
          RepairNumber: "c64s9194",
          BatchNumber: "457265",
          ShippingDate: "34911964895",
          CreationDate: "3358942687",
          ProductionTeam: "6949582463",
          BatchFeeding: true,
        },
        {
          RepairNumber: "c64s9194",
          BatchNumber: "457265",
          ShippingDate: "34911964895",
          CreationDate: "3358942687",
          ProductionTeam: "6949582463",
          BatchFeeding: false,
        },
      ],
      FeedingReworkData: {
        BatchNo: null, //批次号
        CreateDate: null, //创建日期
        DeliveryDate: null, //交货日期
        Details: [], //单明细
        EmergencyFlag: null, //是否加急  1是，0否
        IsBatch: null, //是否批次  1是，0否
        PackingType: null, //装箱类别
        PackingTypeId: null, //装箱类别id
        PhotoList: null, //图片列表
        ProduceTaskId: null, //生产流程单
        ProduceTaskSaleOrderId: null, //生产任务销售订单id
        ResponseData: null, // 单据选择的概要信息
        StockFlowId: null, //备货流程
      },

      ShowGroup: false, //控制班组弹窗的显隐
      GetGroup: null, //接口获取到的班组的数据
      GroupList: [[" "]], //班组的列表
      Group: null, //选择的班组
      GroupId: null, //选择的班组
      GroupTypeFilter: null,

      GetGroupType: null, //获取的班组类别
      ShowGroupType: false, //控制班组班组类别弹窗的显隐
      GroupTypeList: null, //班组类别的列表
      GroupType: null, //选择的班组类别

      ShowPersonLiable: false, //控制责任人的显隐
      GetPersonLiable: null, //接口获取到责任人数据
      PersonLiableList: [[" "]], //责任人列表
      PersonLiable: null, //选择的责任人
      PersonLiableId: null, //责任人id

      ShowLiableExamine: false, //控制考核情况的显隐
      GetLiableExamine: null, //接口获取考核情况的数据
      LiableExamineList: [[" ", "已考核", "未考核"]], //考核情况的列表
      LiableExamine: null, //选择的考核情况
      LiableExamineId: null, //考核情况Id

      ShowRelationPerson: false, //控制连带责任人的显隐
      GetRelationPerson: null, //接口获取连带责任人的数据
      RelationPersonList: [[" "]], //连带责任人的列表
      RelationPerson: null, //选择的连带责任人
      RelationPersonId: null, //连带责任人id
      PersonLiableFilter: null,

      ShowRelationExamine: false, //控制连带考核情况的显隐
      GetRelationExamine: null, //控制连带考核情况的显隐
      RelationExamineList: [[" ", "已考核", "未考核"]], //控制连带考核情况的显隐
      RelationExamine: null, //控制连带考核情况的显隐
      RelationExamineId: null, //控制连带考核情况的显隐
      ChoiceResponseData: null,

      ShowEquipment: false, //控制设备弹窗的显隐
      GetEquipment: null, //接口获取到的设备的数据
      EquipmentList: [[" "]], //设备的列表
      ResponsMachine: null, //选择的设备
      EquipmentId: null, //选择的设备
      EquipmentFilter: null, //搜索的设备
      //上传图片的参数配置开始
      ChoiceEquipIndex: 0,
      arrayImage: [],
      //上传图片的参数配置结束
    };
  },
  components: {
    "show-upload-img": showuploadImg,
  },

  methods: {
    goBaseIndex() {
      this.$router.push({
        name: "FeedingReworkedList",
        params: { ChoiceWorkGroup: this.$route.params.ChoiceWorkGroup },
      });
    },
    //点击提示弹窗的删除按钮
    onCancel() {},
    //点击提示弹窗的确认按钮
    onConfirm() {
      this.$router.push({
        name: "FeedingReworkedList",
        params: { ChoiceWorkGroup: this.$route.params.ChoiceWorkGroup },
      });
    },
    //点击提交按钮
    doPost() {
      this.makePostData();
      debugger;
      console.log(this.FeedingReworkData);
      if (
        this.FeedingReworkData.PcDetails.length > 0 &&
        !this.FeedingReworkData.PcDetails[0].rData.ResWorkGroupId
      ) {
        debugger;
        this.showPositionValue = true;
        this.Msg = "责任班组类别不能为空";
        return;
      }

      this.determineResponse(this.FeedingReworkData);
    },
    //构造暂存和提交的数据
    makePostData() {
      //构造提交的数据
      this.ChoiceResponseData = {};

      // 补充原填写数据
      if (
        !!this.FeedingReworkData.Details &&
        !!this.FeedingReworkData.Details[0].ResponseData
      ) {
        this.ChoiceResponseData.EquipId =
          this.FeedingReworkData.Details[0].ResponseData.EquipId;
        this.ChoiceResponseData.MachineAndTypeName =
          this.FeedingReworkData.Details[0].ResponseData.MachineAndTypeName;
        this.ChoiceResponseData.DefectCategoryId =
          this.FeedingReworkData.Details[0].ResponseData.DefectCategoryId;
        this.ChoiceResponseData.DefectCategory =
          this.FeedingReworkData.Details[0].ResponseData.DefectCategory;
        this.ChoiceResponseData.DefectId =
          this.FeedingReworkData.Details[0].ResponseData.DefectId;
        this.ChoiceResponseData.Defect =
          this.FeedingReworkData.Details[0].ResponseData.Defect;
        this.ChoiceResponseData.DefectDescription =
          this.FeedingReworkData.Details[0].ResponseData.DefectDescription;
        this.ChoiceResponseData.QualityInspectionId =
          this.FeedingReworkData.Details[0].ResponseData.QualityInspectionId;
        this.ChoiceResponseData.QualityInspection =
          this.FeedingReworkData.Details[0].ResponseData.QualityInspection;
      }
      this.ChoiceResponseData.ResRemark = this.GroupType;
      this.ChoiceResponseData.ResWorkGroupId = this.GroupId;
      this.ChoiceResponseData.ResWorkGroup = this.Group;
      this.ChoiceResponseData.ResEmployeeId = this.PersonLiableId;
      this.ChoiceResponseData.ResEmployee = this.PersonLiable;
      if (this.LiableExamine == "已考核") {
        this.ChoiceResponseData.ResEmpAssessment = 1;
      }
      if (this.LiableExamine == "未考核") {
        this.ChoiceResponseData.ResEmpAssessment = 0;
      }
      this.ChoiceResponseData.JointEmpId = this.RelationPersonId;
      this.ChoiceResponseData.JointEmp = this.RelationPerson;
      this.ChoiceResponseData.ResponsMachine = this.ResponsMachine;
      if (this.RelationExamine == "已考核") {
        this.ChoiceResponseData.JonitEmpAssessment = 1;
      }
      if (this.RelationExamine == "未考核") {
        this.ChoiceResponseData.JonitEmpAssessment = 0;
      }
      this.FeedingReworkData.ResponseData = this.ChoiceResponseData;
      this.FeedingReworkData.PcDetails.forEach((item) => {
        item.rData.ResRemark = this.ChoiceResponseData.ResRemark;
        item.rData.ResWorkGroupId = this.ChoiceResponseData.ResWorkGroupId;
        item.rData.ResWorkGroup = this.ChoiceResponseData.ResWorkGroup;
        item.rData.ResEmployeeId = this.ChoiceResponseData.ResEmployeeId;
        item.rData.ResEmployee = this.ChoiceResponseData.ResEmployee;
        item.rData.JointEmpId = this.ChoiceResponseData.JointEmpId;
        item.rData.JointEmp = this.ChoiceResponseData.JointEmp;
        item.rData.ResEmpAssessment = this.ChoiceResponseData.ResEmpAssessment;
        item.rData.JonitEmpAssessment =
          this.ChoiceResponseData.JonitEmpAssessment;
        item.rData.ResponsMachine = this.ChoiceResponseData.ResponsMachine;
      });
    },
    //用于获取接口数据后，显示弹窗的信息
    makeGetData() {
      let getDetails = this.FeedingReworkData.Details[0].ResponseData;
      this.GroupType = getDetails.ResRemark;
      this.GroupId = getDetails.ResWorkGroupId;
      this.Group = getDetails.ResWorkGroup;
      this.PersonLiableId = getDetails.ResEmployeeId;
      this.PersonLiable = getDetails.ResEmployee;
      this.ResponsMachine = getDetails.ResponsMachine;
      if (getDetails.ResEmpAssessment == 1) {
        this.LiableExamine = "已考核";
      }
      if (getDetails.ResEmpAssessment == 0) {
        this.LiableExamine = "未考核";
      }
      this.RelationPersonId = getDetails.JointEmpId;
      this.RelationPerson = getDetails.JointEmp;
      if (getDetails.JonitEmpAssessment == 1) {
        this.RelationExamine = "已考核";
      }
      if (getDetails.JonitEmpAssessment == 0) {
        this.RelationExamine = "未考核";
      }
    },
    //根据点击的数据的批次补料字段，进行跳转页面
    doSure(item) {
      if (item.BatchFeeding == true) {
      } else {
      }
    },
    //选择班组类别
    changeGroupType(val) {
      //只要切换班组类别 就重新设置
      if (this.GroupType != val[0]) {
        this.PersonLiableId = null;
        this.PersonLiable = null;
        this.RelationPersonId = null;
        this.RelationPerson = null;
        this.Group = null;
        this.GroupId = null;
        this.GroupType = val[0];
      }
    },
    //选择班组
    changeGroup(val) {
      let id = val[0];
      //重置与班组关联的查询信息
      if (this.GroupId != val[0]) {
        this.PersonLiableId = null;
        this.PersonLiable = null;
        this.RelationPersonId = null;
        this.RelationPerson = null;
      }
      this.GroupId = val[0];
      if (!!this.GroupId) {
        this.Group = this.GetGroup.find((item) => item.Id == id).Name;
      } else {
        this.GroupId = null;
        this.Group = null;
      }
    },
    doGroupFilter() {
      this.GroupList = [
        this.GetGroup.filter(
          (p) => p.Name.indexOf(this.GroupTypeFilter) >= 0
        ).map((item) => {
          return { name: item.Name, value: item.Id };
        }),
      ];
    },
    //选择的责任人
    changePersonLiable(val) {
      let id = val[0];
      this.PersonLiableId = val[0];
      if (!!this.PersonLiableId) {
        this.PersonLiable = this.GetPersonLiable.find(
          (item) => item.Id == id
        ).Name;
      } else {
        this.PersonLiableId = null;
        this.PersonLiable = null;
      }
    },
    //选择的责任人的考核请款
    changeLiableExamine(val) {
      this.LiableExamine = val[0];
    },
    clickEquipment(index) {
      this.ShowEquipment = true;
      this.ChoiceEquipIndex = index;
      this.$axiosApi.getRepResourceManages(this.DeptId).then((res) => {
        if (res.Success == true) {
          console.log(res);
          this.GetEquipment = res.Result;
          this.EquipmentList = [[{ name: "", value: "" }]];
          let EquipmentListData = [
            this.GetEquipment.map((item) => {
              return { name: item.MachineAndTypeName, value: item.EquipId };
            }),
          ];
          this.EquipmentList[0].push(...EquipmentListData[0]);
        } else {
          this.showPositionValue = true;
          this.Msg = res.Message;
        }
      });
    },
    //选择设备
    changeEquipment(val) {
      let id = val[0];
      this.EquipmentId = val[0];
      if (!!this.EquipmentId) {
        this.ResponsMachine = this.GetEquipment.find(
          (item) => item.EquipId == id
        ).MachineAndTypeName;
      } else {
        this.EquipmentId = null;
        this.Equipment = null;
      }
    },
    doEquipmentFilter() {
      this.EquipmentList = [
        this.GetEquipment.filter(
          (p) => p.MachineAndTypeName.indexOf(this.EquipmentFilter) >= 0
        ).map((item) => {
          return { name: item.MachineAndTypeName, value: item.EquipId };
        }),
      ];
    },
    //选择连带责任人
    changeRelationPerson(val) {
      let id = val[0];
      this.RelationPersonId = val[0];
      if (!!this.RelationPersonId) {
        this.RelationPerson = this.GetRelationPerson.find(
          (item) => item.Id == id
        ).Name;
      } else {
        this.RelationPersonId = null;
        this.RelationPerson = null;
      }
    },
    doPersonLiableFilter() {
      this.PersonLiableList = [
        this.GetPersonLiable.filter(
          (p) => p.Name.indexOf(this.PersonLiableFilter) >= 0
        ).map((item) => {
          return { name: item.Name, value: item.Id };
        }),
      ];
    },
    //连带责任人的考核情况
    changeRelationExamine(val) {
      this.RelationExamine = val[0];
    },
    //点击责任班组类别
    clickGroupType() {
      this.ShowGroupType = true;

      this.$axiosApi.getRepWorkGroupType().then((res) => {
        if (res.Success == true) {
          console.log(res);
          this.GetGroupType = res.Result;
          this.GroupTypeList = [[{ name: "", value: "" }]];
          let GroupTypeListData = [
            this.GetGroupType.map((item) => {
              return { name: item, value: item };
            }),
          ];
          this.GroupTypeList[0].push(...GroupTypeListData[0]);
        } else {
          this.showPositionValue = true;
          this.Msg = res.Message;
          return;
        }
      });
    },
    //点击责任班组
    clickGroup() {
      this.ShowGroup = true;
      if (!this.GroupType) {
        this.showPositionValue = true;
        this.Msg = "请先选择责任班组类别";
        return;
      }
      this.$axiosApi
        .getRepWorkGroups(this.FeedingReworkData.DeptId)
        .then((res) => {
          if (res.Success == true) {
            console.log(res);
            this.GetGroup = res.Result;
            this.GroupList = [[]];
            this.GroupList = [
              this.GetGroup.map((item) => {
                return { name: item.Name, value: item.Id };
              }),
            ];
          } else {
            this.showPositionValue = true;
            this.Msg = res.Message;
          }
        });
    },
    //点击责任人
    clickPersonLiable(item, index) {
      //再执行接口调取
      console.log(this.GroupId);
      if (!this.GroupId) {
        this.showPositionValue = true;
        this.Msg = "请先选择责任班组";
        return;
      }
      this.ShowPersonLiable = true;
      // 0-选择责任人，1-选择连带责任人，2-选择定责质检
      this.$axiosApi.getRepEmps(0, this.GroupId).then((res) => {
        if (res.Success == true) {
          console.log(res);
          this.GetPersonLiable = res.Result;
          this.PersonLiableList = [[{ name: "", value: "" }]];
          let PersonLiableListData = [
            this.GetPersonLiable.map((item) => {
              return { name: item.Name, value: item.Id };
            }),
          ];
          this.PersonLiableList[0].push(...PersonLiableListData[0]);
        } else {
          this.showPositionValue = true;
          this.Msg = res.Message;
        }
        if (this.PersonLiableList[0].length == 0) {
          this.showPositionValue = true;
          this.Msg = "此班组没有责任人";
          return;
        }
      });
    },

    //点击考核情况
    clickLiableExamine() {
      this.ShowLiableExamine = true;
    },

    //点击连带责任人
    clickRelationPerson() {
      let myindex = this.$store.getters.getChoiceIndex;
      //再执行接口调取
      if (!this.GroupId) {
        this.showPositionValue = true;
        this.Msg = "请先选择责任班组";
        return;
      }
      this.ShowRelationPerson = true;
      // 0-选择责任人，1-选择连带责任人，2-选择定责质检
      this.$axiosApi.getRepEmps(1, this.GroupId).then((res) => {
        if (res.Success == true) {
          console.log(res);
          this.GetRelationPerson = res.Result;
          this.RelationPersonList = [[{ name: "", value: "" }]];
          let RelationPersonListData = [
            this.GetRelationPerson.map((item) => {
              return { name: item.Name, value: item.Id };
            }),
          ];
          this.RelationPersonList[0].push(...RelationPersonListData[0]);
        } else {
          this.showPositionValue = true;
          this.Msg = res.Message;
        }
        if (this.RelationPersonList[0].length == 0) {
          this.showPositionValue = true;
          this.Msg = "此班组没有连带责任人";
          return;
        }
      });
    },

    //点击连带责任人的考核情况
    clickRelationExamine() {
      this.ShowRelationExamine = true;
    },
    //接口：补料返工单明细
    getReproduceDetails(reproduceId) {
      this.loadingtitle = "加载中";
      this.showThost = true;
      this.$axiosApi.getReproduceDetails(reproduceId).then((res) => {
        this.showThost = false;
        if (res.Success == true) {
          console.log(res);
          this.FeedingReworkData = res.Result;
          this.arrayImage = this.FeedingReworkData.PhotoList;
          if (this.FeedingReworkData.IsBatch == 1) {
            this.makeGetData();
          }
          this.FeedingReworkData.IsBatch === 1
            ? (this.IsBatchFeeding = "是")
            : (this.IsBatchFeeding = "否");
          this.FeedingReworkData.EmergencyFlag === 1
            ? (this.IsIntercept = "是")
            : (this.IsIntercept = "否");
        } else {
          this.showPositionValue = true;
          this.Msg = res.Message;
          this.BarCode = null;
        }
      });
    },
    //接口：提交责任确认
    determineResponse(data) {
      this.loadingtitle = "提交中";
      this.showThost = true;
      this.$axiosApi.determineResponse(data).then((res) => {
        this.showThost = false;
        console.log(res);
        if (res.Success == true) {
          this.ConfirmMsg = "提交成功";
          this.BadColor = false;
          this.Successbtn = true;
          this.Dangerbtn = false;
          this.ShowConfirm = true;
          console.log(res);
        } else {
          this.ConfirmMsg = res.Message;
          this.BadColor = true;
          this.Successbtn = false;
          this.Dangerbtn = true;
          this.ShowConfirm = true;
        }
      });
    },
  },
  created() {
    console.log(this.$route.params.data.Id);
    this.getReproduceDetails(this.$route.params.data.Id);
  },
  mounted() {},
};
</script>

<style lang="less">
</style>
