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
        >
          <div class="m-otherchoice">
            <div>
              <span class="iconfont icon-dianjian"></span>
              <p class="operationtitle">生产WIP查询</p>
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
    return {};
  },
  components: {},
  methods: {
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
  mounted() {
    this.$refs.SupportInp.focus();
  },
};
</script>

<style lang="less">
</style>
