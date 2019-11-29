<template>
  <div :class="alert" v-show="isShow" :style="{'color':color,'background-color':backgroundColor}">
    {{content}}
  </div>
</template>
<script>
const sieCls = "sie-alert";
export default {
  name: "SAlert",
  props: {
    isShow:Boolean,
    duration:Number,
    type: String,
    color:{
      type:String,
      default:""
    },
    backgroundColor:{
      type:String,
      default:""
    },
    content:{
      type:String,
      default:""
    }
  },

  data() {
    return {
      sieCls: sieCls
    };
  },
  computed: {
    alert() {
      return [`${sieCls}`, `${sieCls}_${this.type}`];
    }
  }
};
</script>
<style lang="less">
.sie-alert {
  width: 100%;
  padding: 5px 20px;
  font-size: 14px;
}
.sie-alert_success {
  color: #ffffff;
  background-color: #00cc99;
}
.sie-alert_err {
  color: #ffffff;
  background-color: #de3939;
}
.sie-alert_warning {
  color: #e18e0a;
  background-color: #ffe3b6;
}
</style>