<template>
  <i class="sie-badge" v-if="count>0" :style="{'background-color':backgroundColor,'color':color}">{{count}}</i>
</template>
<script>
  export default {
    name: "SBadge",
    props: {
      count: {
        type: Number,
        default: 0
      },
      backgroundColor:{
        type:String,
        default:''
      },
      color:{
        type:String,
        default:''
      },
    }
  }

</script>
<style lang="less" scoped>
  .sie-badge {
    padding: 2px;
    line-height: 5px;
    text-align: center;
    border-radius: 5px;
    font-size: 7px;
    background-color: red;
    color:#FFF;
  }

</style>
