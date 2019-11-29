<template>
  <div class="sie-button">
    <button v-bind:disabled="isDisabled" :style="{'background':background,'color':color,'border-color':borderColor}" :class="[{'sie-button_disable':isDisabled},{'sie-button_border':border,'sie-button_noborder':!border},{'sie-button_radius':radius},{'sie-button_small':small,'sie-button_medium':medium,'sie-button_large':large}]"
      @click="click">
      {{text}}
    </button>
  </div>
</template>
<script>
  import _debounce from 'lodash/debounce';
  export default {
    name: "SButton",
    props: {
      isDisabled:{
        type:Boolean,
        default:false
      },
      size: {
        type: String,
        default: 'small'
      },
      text: {
        type: String,
        default: ''
      },
      radius: {
        type: Boolean,
        default: false
      },
      background: {
        type: String,
        default:""
      },
      color:{
        type: String,
        default: "#FFF"
      },
      borderColor:{
        type: String,
        default:""
      },
      border:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
      }
    },
    computed: {
      small: function () {
        return this.isSize('small');
      },
      medium: function () {
        return this.isSize('medium');
      },
      large: function () {
        return this.isSize('large');
      }
    },
    methods: {
      isSize(value) {
        if (this.size === value) {
          return true;
        } else {
          return false;
        }
      },
      click:_debounce(function(){
      // click(){
        this.$emit('click');
      // }, 
      },500,{
        'leading': true,
        'trailing': false
      }), 
    },
  }

</script>
<style lang="less" scoped>
  /* @import '~@/assets/css/less/reset.less'; */
  .sie-button {
    display: inline;
  }

  .sie-button_small {
    height: 24px;
    line-height: 24px;
    padding: 0 8px;
    font-size:12px;
  }

  .sie-button_medium {
    height: 34px;
    line-height: 34px;
    padding: 0 65px;
    font-size:16px;
    font-weight:400;
  }

  .sie-button_large {
    height: 48px;
    line-height: 48px;
    padding: 0 46px;
    font-size:16px;
  }
  
  .sie-button_radius {
    border-radius: 4px;
  }
  .sie-button_border{
    border:1px solid #fff;
  }
  .sie-button_noborder{
    border:none;
  }
  .sie-button_disable{
    opacity:0.6;
  }

</style>
