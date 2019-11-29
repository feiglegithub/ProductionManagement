<template>
  <div class="sie-search" :style="styleBackgroundColor">
    <!-- 运用插槽，来插入左边的图标 -->
    <div class="left-icon" :style="styleLeft">
      <slot name="left-icon" >
      </slot>
    </div>
    <div class="sie-search-input" :style="styleInput">
      <input type="text" :style="{'-webkit-user-select': 'auto','width':inputWidth+'%','height':100+'%'}" contenteditable="true" placeholder="" v-model="inputValue" @keyup.enter="pushToSerach" />
      <svg class="icon icon-search" aria-hidden="true">
        <use xlink:href="#icon-search"></use>
      </svg>
      <!-- <div class="input-right">
        <slot name="input-icon"></slot>
      </div> -->
    </div>
    <!-- 运用插槽，来插入右边的图标
        点击通知父组件触发clickRightIcon事件
     -->
    <div class="right-icon" :style="styleRight" @click="$emit('clickRightIcon')">
      <slot name="right-icon">
      </slot>
    </div>
  </div>
</template>
<script>
import iconfont from "./iconfont.js";
export default {
  props: {
    //搜索框的背景颜色
    backgroundColor: {
      type: String
    },
    //搜索宽的宽度属性
    inputWidth:{
      type:Number,
      default:100
    },
    //搜索框的颜色属性
    inputBackgroundColor: {   
      type: String,
      default: "#ffffff"
    },
    //左边图标颜色
    leftIconColor: {
      type: String
    },

    //右边图标颜色
    rightIconColor: {
      type: String
    }
  },
  data() {
    return {
      inputValue: "",
      styleBackgroundColor: {
        backgroundColor: this.backgroundColor
      },
      styleInput: {
        backgroundColor: this.inputBackgroundColor
      },
      styleLeft: {
        color: this.leftIconColor
      },
      styleRight: {
        color: this.rightIconColor
      }
    };
  },
  methods: {
    pushToSerach() {
      this.$emit("click-search");
    }
  },
  mounted() {
    console.log(this.inputBackgroundColor);
    console.log(this.leftIconColor);
  }
};
</script>
<style lang="less" scoped>
.sie-search {
  // width: 100vw;//块级元素默认宽度100%
  height: 30px;
  display: flex;
  align-items: center;
  position: relative;

  .left-icon {
    // width: 16px;
    // height: 16px;
    // color: #ffffff;
    // display: flex;
    // align-items: center;
     height: 30px;
     line-height: 30px;
    position: absolute;
    top:0;
    left: 6px;
    font-size: 10px;
    .icon{font-size: 16px;vertical-align: middle}
    // p {
    //   width: 40px;
    //   position: absolute;
    //   top: 10px;
    //   left: -10px;
    //   color: #333333;
    // }
  }
  .sie-search-input {
    display: inline-block;
    width: 77%;
    height: 29px;
    font-size: 16px;
    margin: 0 auto;
    padding-left: 25px;
    background: #ffffff;
    border-radius: 4px;
    position: relative;

    .icon-search {
      width: 16px;
      height: 16px;
      color: #cccccc;
      position: absolute;
      top: 50%;
      left: 5px;
      margin-top: -8px;
    }

    .input-right {
      width: 16px;
      height: 16px;
      color: #cccccc;
      position: absolute;
      top: 50%;
      right: 5px;
      margin-top: -8px;
      display: flex;
      align-items: center;
    }
  }

  .right-icon {
    // width: 16px;
    // height: 16px;
    // color: #ffffff;
    // display: flex;
    // align-items: center;
    height: 30px;
     line-height: 30px;
    position: absolute;
    right: 12px;
    top:0;
    font-size: 10px;
    .icon{font-size: 16px;vertical-align: middle}
    // p {
    //   width: 25px;
    //   position: absolute;
    //   top: 10px;
    //   right: -6px;
    //   color: #333333;
    // }
  }
}
</style>