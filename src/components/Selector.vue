<template>
  <div>
    <div class="selector">
      <span class="title">{{ title }}</span
      ><span class="value">{{ value }}</span>
      <span class="iconfont icon-xiala"></span>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ["title", "value"],
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.icon-xiala::before {
  float: right;
}
.selector {
  margin: 5px;
  padding: 5px;
  border: 1px gray solid;
  font-size: 16px;
}
.value{
  margin-left: 30px;
}
.title{
  display: inline-block;
  width: 80px;
  text-align: center;
}
</style>