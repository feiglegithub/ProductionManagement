<template>
    <svg @click="click" class="sie-icon" :style="{'font-size':size+'px','color':color}" aria-hidden="true">
      <use v-bind:xlink:href="type"></use>
    </svg> 
</template>
<script>
  import iconfont from './iconfont.js'
  export default {
    name: "SIcon",
    props: {
      type:{
        type:String,
        default:'#icon-icon'
      },
      size:{
        type:Number,
        default:16
      },
      color:{
        type:String,
        default:'#d7d7d7'
      }
    },
    data() {
      return {}
    },
    computed: {

    },
    methods: {
      click() {
        this.$emit('click');
      }
    }
  }

</script>
<style lang="less" scoped>
  // @import '~@/assets/css/less/reset.less';
.sie-icon{
  width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
}
</style>
