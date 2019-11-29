<template>
  <div class="sie-nodata" :style="{'background-color':backgroundColor}">
    <slot name="content">
      <div class="sie-nodata-content">
        <span>{{pointOut}}</span>
        <img src="./img/nodata.png" class="sie-nodata-content-img">
      </div>
    </slot>
  </div>
</template>
<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: "#ffffff"
    },
    pointOut:{
      type:String,
      default:"无数据......"
    }
  },
};
</script>
<style lang="less" scoped>
.sie-nodata{
  width:100%;
  height:100%;
  display:flex;
  flex-grow: 1;
}
.sie-nodata-content{
  display:flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #333333;
  font-weight: 400;
}
.sie-nodata-content-img{
  width: 80vw;
  height: 60vh;
}
</style>