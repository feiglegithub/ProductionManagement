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
      {{ ExamieTitle }}
    </x-header>
    <div class="m-rowbutton" style="width: 100%">
      <div
        class="rbutton"
        v-for="(item, index) in WorkGroupList"
        :key="index"
        @click="doChoiceWorkGroup(item)"
        :style="{
          'background-color':
            item == ChoiceWorkGroup ? '#0066CC' : 'transparent',
        }"
        style="padding: 3px 5px 5px 5px"
      >
        <span :class="item == ChoiceWorkGroup ? 'choicelabel' : 'emptylabel'">{{
          item
        }}</span>
      </div>
    </div>
    <div class="f-flexvw f-flexg1 f-pdlr5">
      <div class="g-scrollbox">
        <div class="f-auto">
          <s-messageheader
            class="f-mt10"
            messagetitle="单据概要信息"
          ></s-messageheader>
          <div class="f-pd5 s-border">
            <div
              class="m-listbox f-mtb5"
              v-for="(item, index) in ShowFeedingList"
              :key="index"
              @click="doSure(item)"
            >
              <div class="num">
                {{ index + 1 }}
              </div>
              <div class="showbox">
                <div class="showlistmsg">
                  <span class="label">返修单号:</span>
                  <span class="showmsg f-ml10">{{ item.RerpoductNo }}</span>
                </div>
                <div class="showlistmsg">
                  <span class="label">批次号:</span>
                  <span class="showmsg f-ml10">{{ item.BatchNo }}</span>
                </div>
                <div class="showlistmsg">
                  <span class="label">出货日期:</span>
                  <span class="showmsg f-ml10">{{
                    item.PlanDeliveryDate
                  }}</span>
                </div>
                <div class="showlistmsg">
                  <span class="label">创建日期:</span>
                  <span class="showmsg f-ml10">{{ item.CreateDate }}</span>
                </div>
                <div class="showlistmsg">
                  <span class="label">制单班组:</span>
                  <span class="showmsg f-ml10">{{ item.WorkGroup }}</span>
                </div>
              </div>
            </div>
            <div v-show="DataList.length <= 0" class="s-notdate">暂无数据</div>
          </div>
        </div>
      </div>
    </div>
    <s-confirm
      v-model="ShowConfirm"
      content="提交成功"
      :showConfirmButton="false"
      :showCancelButton="false"
      :showSuccessButton="true"
      :showDangerButton="false"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
    >
    </s-confirm>
    <loading :show="showThost" :text="loadingtitle"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "FeedingReworkedList",
  data() {
    return {
      ExamieTitle: "补料审核",
      ShowConfirm: false, //控制提示弹窗的显隐
      SupportNumber: null, //托号
      UPI: null, //UPI
      ChoiceWorkGroup: null,
      WorkGroupList: [], //制单班组
      ShowFeedingList: [], //制单班组
      DataList: [
        // {
        //     "RepairNumber":"c64s9194",
        //     "BatchNumber":"457265",
        //     "ShippingDate":"34911964895",
        //     "CreationDate":"3358942687",
        //     "ProductionTeam":"6949582463",
        //     "BatchFeeding":true
        // },
        // {
        //     "RepairNumber":"c64s9194",
        //     "BatchNumber":"457265",
        //     "ShippingDate":"34911964895",
        //     "CreationDate":"3358942687",
        //     "ProductionTeam":"6949582463",
        //     "BatchFeeding":false
        // },
        // {
        //     "RepairNumber":"c64s9194",
        //     "BatchNumber":"457265",
        //     "ShippingDate":"34911964895",
        //     "CreationDate":"3358942687",
        //     "ProductionTeam":"6949582463",
        //     "BatchFeeding":true
        // },
        // {
        //     "RepairNumber":"c64s9194",
        //     "BatchNumber":"457265",
        //     "ShippingDate":"34911964895",
        //     "CreationDate":"3358942687",
        //     "ProductionTeam":"6949582463",
        //     "BatchFeeding":false
        // },
      ],
      showThost: false, //圈圈的显隐
      loadingtitle: "提交中", //圈圈文字
      IsOwn: false, //是否欠件单
    };
  },
  components: {},

  methods: {
    goBaseIndex() {
      this.$router.push({ name: "BaseIndex" });
    },
    //点击提示弹窗的删除按钮
    onCancel() {},
    //点击提示弹窗的确认按钮
    onConfirm() {},
    //点击提交按钮
    doPost() {
      this.ShowConfirm = true;
    },
    //根据点击的数据的批次补料字段，进行跳转页面
    doSure(item) {
      console.log(item);
      // this.$router.push({name:"ResponsibilityRecognition",params:{data:item}})
      if (this.IsOwn) {         
          this.$router.push({
            name: "OwnResponsibilityRecognition",
            params: { data: item, ChoiceWorkGroup: this.ChoiceWorkGroup },
          });
      } else {
        if (item.IsBatchReproduce == 0) {
          this.$router.push({
            name: "ResponsibilityRecognition",
            params: { data: item, ChoiceWorkGroup: this.ChoiceWorkGroup },
          });
        } else {
          this.$router.push({
            name: "CriticismResponsibilityRecognition",
            params: { data: item, ChoiceWorkGroup: this.ChoiceWorkGroup },
          });
        }
      }
    },
    doChoiceWorkGroup(item) {
      this.ChoiceWorkGroup = item;
      console.log(item);
      this.ShowFeedingList =
        item == "全部"
          ? this.DataList
          : this.DataList.filter((data) => data.WorkGroup == item);
      //this.ShowBatchData.sort(this.CreateDate)
    },
    //接口：获取暂存单据信息
    getReproduct(AddType) {
      this.loadingtitle = "加载中";
      this.showThost = true;
      if (AddType == 2) {
        this.IsOwn = true;
        this.$axiosApi.getOwn(1, 0, 1,0).then((res) => {
        //   console.log(res.Result.Datas);
          this.showThost = false;
          if (res.Success == true) {
            this.DataList = res.Result.Datas;
            this.WorkGroupList.push("全部");
            this.DataList.forEach((item) => {
              if (this.WorkGroupList.indexOf(item.WorkGroup) < 0) {
                this.WorkGroupList.push(item.WorkGroup);
              }
            });
            if (
              this.$route.params.ChoiceWorkGroup &&
              this.WorkGroupList.findIndex(
                (item) => item == this.$route.params.ChoiceWorkGroup
              ) > 0
            ) {
              this.ChoiceWorkGroup = this.$route.params.ChoiceWorkGroup;
              this.ShowFeedingList = this.DataList.filter(
                (data) => data.WorkGroup == this.$route.params.ChoiceWorkGroup
              );
            } else {
              this.ShowFeedingList = this.DataList;
              this.ChoiceWorkGroup = "全部";
            }
            console.log(res);
          } else {
            this.showPositionValue = true;
            this.Msg = res.Message;
            this.BarCode = null;
          }
        });
      } else {
        this.IsOwn = false;
        this.$axiosApi.getReproduct(1, 0, 1, AddType).then((res) => {
          console.log(res.Result.Datas);
          this.showThost = false;
          if (res.Success == true) {
            this.DataList = res.Result.Datas;
            this.WorkGroupList.push("全部");
            this.DataList.forEach((item) => {
              if (this.WorkGroupList.indexOf(item.WorkGroup) < 0) {
                this.WorkGroupList.push(item.WorkGroup);
              }
            });
            if (
              this.$route.params.ChoiceWorkGroup &&
              this.WorkGroupList.findIndex(
                (item) => item == this.$route.params.ChoiceWorkGroup
              ) > 0
            ) {
              this.ChoiceWorkGroup = this.$route.params.ChoiceWorkGroup;
              this.ShowFeedingList = this.DataList.filter(
                (data) => data.WorkGroup == this.$route.params.ChoiceWorkGroup
              );
            } else {
              this.ShowFeedingList = this.DataList;
              this.ChoiceWorkGroup = "全部";
            }
            console.log(res);
          } else {
            this.showPositionValue = true;
            this.Msg = res.Message;
            this.BarCode = null;
          }
        });
      }
    },
  },
  created() {
    if (this.$store.getters.getAddTtype == 0) {
      this.ExamieTitle = "补料审核";
    }
    if (this.$store.getters.getAddTtype == 1) {
      this.ExamieTitle = "批次补料审核";
    }
    if (this.$store.getters.getAddTtype == 2) {
      this.ExamieTitle = "欠件单审核";
    }
  },
  mounted() {
    this.getReproduct(this.$store.getters.getAddTtype);
  },
};
</script>

<style lang="less">
</style>
