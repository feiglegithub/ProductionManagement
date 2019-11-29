<template>
  <div class="sie-container" :style="{'flex-grow':flexGrow,'padding-top':paddingTop+'px'}">
    <slot name="container"></slot>
    <div class="container-wrap" :class="{nopaddinglr:!paddinglr}" :style="{'background':bgColor,'position': wrapPosition}">
      <div class="container-content">
          <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    paddinglr:{
      type:Boolean,
      default:true
    },
    paddingTop:{
      type:Number,
      default:10
    },
    bgColor: {
      type: String,
      default: "#ffffff"
    },  
    flexGrow: {
      type:Number,
      default: 0
    },  
    isFlex:{
      type:Boolean,
      default:false
    }
  },
  computed:{
    wrapPosition(){
      if(this.isFlex){return 'absolute'}else{return 'static'}
    }
  }
};
</script>
<style lang="less" scoped>
.sie-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  .container-wrap{
    // position: absolute;
    width: 100%;
    height:100%;
    padding:0 15px 10px 15px;
    &.nopaddinglr{
      padding:0;
    }
    .container-content{
      position: relative;
      height: 100%;
      margin:0 auto;
    }
 }
}
</style>