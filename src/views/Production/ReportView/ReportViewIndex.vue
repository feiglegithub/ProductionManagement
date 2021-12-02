<template>
  <div class="g-index">
    <!-- 头部 -->
    <x-header
      class="m-header"
      :left-options="{ showBack: false }"
      style="background-color: #22292c"
    >
      报表查看
      <a slot="left" @click="goToBack()">
        <span style="font-size: 26px" class="iconfont icon-weibiaoti-"></span>
      </a>
      <!-- <a slot="right" @click="doPost" :class="{ 'f-noclick': showThost }"
        >提交</a
      > -->
    </x-header>
    <div class="f-flexvw f-flexg1 f-pdlr5" style="background-color: #fff">
      <grid
        :show-lr-borders="false"
        :show-vertical-dividers="false"
        class="m-navgrid"
        :cols="3"
      >
        <grid-item
          class="f-flexjscen"
          @click.native="$router.push({ name: 'ProductionProgressIndex' })"
          v-show="showProductionProgress"
        >
          <div class="m-otherchoice">
            <div>
              <span class="iconfont icon-dianjian"></span>
              <p class="operationtitle">生产进度报表</p>
            </div>
          </div>
        </grid-item>
        <grid-item
          class="f-flexjscen"
          @click.native="$router.push({ name: 'PunchOweIndex' })"
          v-show="showPunchOwe"
        >
          <div class="m-otherchoice">
            <div>
              <span class="iconfont icon-dianjian"></span>
              <p class="operationtitle">打孔欠件</p>
            </div>
          </div>
        </grid-item>
        <grid-item
          class="f-flexjscen"
          @click.native="$router.push({ name: 'MachineCapacityIndex' })"
          v-show="showMachineCapacity"
        >
          <div class="m-otherchoice">
            <div>
              <span class="iconfont icon-dianjian"></span>
              <p class="operationtitle">机台产能报表</p>
            </div>
          </div>
        </grid-item>
        <grid-item
          class="f-flexjscen"
          @click.native="$router.push({ name: 'ProductWIPQueryIndex' })"
          v-show="showProductWIPQuery"
        >
          <div class="m-otherchoice">
            <div>
              <span class="iconfont icon-dianjian"></span>
              <p class="operationtitle">生产WIP查询</p>
            </div>
          </div>
        </grid-item>
        <grid-item
          class="f-flexjscen"
          @click.native="$router.push({ name: 'PanelExCollectReportIndex' })"
          v-show="showPanelExCollectReport"
        >
          <div class="m-otherchoice">
            <div>
              <span class="iconfont icon-dianjian"></span>
              <p class="operationtitle">板件异常采集</p>
            </div>
          </div>
        </grid-item>
      </grid>
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
      width="20em"
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
import Vue from "vue";
export default {
  name: "",
  data() {
    return {
      showProductionProgress: false,
      showPunchOwe: false,
      showMachineCapacity: false,
      showProductWIPQuery: false,
      showPanelExCollectReport: false,
    };
  },
  components: {},
  methods: {
    //获取app权限
    getAuthorizedAppMenus() {
      this.$axiosApi
        .getAuthorizedAppMenus("生产管理", this.$store.getters.getUserId)
        .then((res) => {
          // console.log(res);
          if (res !== null) {
            this.RoleController = res.Result;
            //console.log(this.RoleController.childs);
            this.RoleController.childs.forEach((element) => {
              element.childs.forEach((m) => {
                if (m.code == "生产进度报表") {
                  this.showProductionProgress = true;
                }
                if (m.code == "打孔欠件") {
                  this.showPunchOwe = true;
                }
                if (m.code == "机台产能报表") {
                  this.showMachineCapacity = true;
                }
                if (m.code == "生产WIP查询") {
                  this.showProductWIPQuery = true;
                }
                if (m.code == "板件异常采集") {
                  this.showPanelExCollectReport = true;
                }
              });
            });
          }
        });
    },
    //点击提示弹窗的删除按钮
    onCancel() {
      this.ShowConfirm = false;
      this.ConfirmMsg = "";
      this.BadColor = false;
      this.Successbtn = false;
      this.Dangerbtn = false;
    },
    //点击提示弹窗的确认按钮
    onConfirm() {
      this.ShowConfirm = false;
      this.ConfirmMsg = "";
      this.BadColor = false;
      this.Successbtn = false;
      this.Dangerbtn = false;
    },
    goToBack() {
      this.$router.push({ name: "BaseIndex" });
    },
  },
  created() {
    this.getAuthorizedAppMenus();
  },
  mounted() {
    this.$refs.SupportInp.focus();
  },
};
</script>

<style lang="less">
</style>
