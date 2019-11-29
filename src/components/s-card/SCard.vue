<template>
  <div :class="['sie-card',{'sie-card_noborder':!border},{'sie-card_radius':radius}]" @click="$emit('click')">
    <div class="sie-card-header">
      <!-- @click.stop="$emit('clickHeader')" -->
      <slot name="head">
        <div class="sie-card-header-content">
          <slot name="leftIcon">
            <img class="sie-card-header-lefticon" :src="leftImg" v-if="leftImg" />
            <!-- @click.stop="clickLeftIcon" -->
            <!-- <i :class="leftIcon" v-if="leftIcon" @click.stop="clickLeftIcon"></i> -->
            <svg class="icon" aria-hidden="true" v-if="leftIcon" @click.stop="clickLeftIcon">
              <use v-bind:xlink:href="leftIcon"></use>
            </svg>
          </slot>
        </div>
        <div class="sie-card-header-title">
          <slot name="title">{{ title }}</slot>
        </div>
      </slot>
      <div class="sie-card-header-righticon">
        <slot name="rightIcon">
          <img :src="rightImg" v-if="rightImg" />
          <!-- @click.stop="clickRightIcon" -->
          <!-- <i :class="rightIcon" v-if="rightIcon" @click.stop="clickRightIcon"></i> -->
          <svg class="icon" v-if="rightIcon" aria-hidden="true" @click.stop="clickRightIcon">
            <use v-bind:xlink:href="rightIcon"></use>
          </svg>
        </slot>
      </div>
      </slot>
    </div>

    <slot name="content"></slot>
    <left-slider :isLeftSlide="isLeftSlide" :index="1" @action="action" :slideHeight="slideHeight" :actionBtn="actionBtn">
      <div slot="content" class="sie-card-content" v-for="content in contents" v-show="contents">
        <div class="sie-card-line" v-show="borderBottom"></div>
        <div class="sie-card-content-row" v-show="content" v-for="(row,i) in content.rows">
          <div class="sie-card-content-col" :style="{'width':100/row.cols.length+'%','height':row.height+'px','line-height':row.height+'px'}"
            v-if="row.cols" v-for="(col,ii) in row.cols">
            <span class="sie-card-content-attr" :style="{'width':col.attrWidth+'%'}">{{col.attr}}</span>
            <span class="sie-card-content-value" :style="{'width':col.valueWidth+'%'}">{{col.value}}</span>
          </div>
        </div>
      </div>
    </left-slider>
  </div>
</template>
<script>
  import iconfont from './iconfont.js';
  import leftSlider from './SLeftSlider.vue'
  import {
    Icon
  } from 'vux';
  export default {
    props: {
      actionBtn: {
        type: Array,
        default: function () {
          return []
        }
      },
      isLeftSlide: {
        type: Boolean,
        default: false,
      },
      slideHeight: {
        type: String,
        default: "30px"
      },
      haha: {
        type: String,
        default: '测试'
      },
      border: {
        type: Boolean,
        default: true
      },
      borderBottom: {
        type: Boolean,
        default: false
      },
      radius: {
        type: Boolean,
        default: false
      },
      contents: {
        type: Array,
        default: function () {
          return []
        }
      },
      leftImg: {
        type: String,
        default: require('./img/ASN.png')
      },
      leftIcon: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      rightImg: {
        type: String,
        default: ''
      },
      rightIcon: {
        type: String,
        default: ''
      }
    },
    components: {
      Icon,
      leftSlider
    },
    methods: {
      action(item) {
        this.$emit(item)
      },
      // clickRightIcon() {
      //   this.$emit('clickRightIcon', this.title);
      // },
      // clickLeftIcon() {
      //   this.$emit('clickLeftIcon', this.title);
      // },      
    }
  }

</script>

<style lang="less" scoped>
  // @import '~@/assets/css/less/reset.less';
  @import './variable.less';
  .sie-card {
    overflow: hidden;
    /* position: relative; */
    background: white;
    border: 1px solid @s-card-border-color;
    font-family: 微软雅黑;
    &.islink:active {
      background: #ececec;
    }
    .sie-card-header {
      background: @s-card-header-background-color;
      display: flex;
      align-items: center;
      height: 44px;
      padding: 14px 0px 14px 15px;
      font-size: @s-card-header-font-size;
      position: relative;
      .sie-card-header-content {
        font-family: @s-card-header-font-family;
        font-size: @s-card-header-font-size;
        .sie-card-header-lefticon {
          display: inline-block;
          width: 17px;
          height: 17px;
          position: relative;
          bottom: 2px;
          right: 3px;
          margin: auto;
          overflow: hidden;
          background-size: cover;
          vertical-align: middle
        }
        .sie-card-header-title {
          height: 44px;
          line-height: 44px;
        }
      }
      .sie-card-header-righticon {
        position: absolute;
        top: 10px;
        right: 15px;
        height: 16px;
        font-size: 14px;
        color: #80848f;
        padding-left: 15px;
      }
    }
    .sie-card-line {
      width: 100%;
      /* margin: 0px auto 8px auto; */
      height: 1px;
      background-color: #D7D7D7;
    }
    .sie-card-content {
      position: relative;
      /* font-family: @card-content-font-family; */
      padding: 0px 15px 0px 15px;
      background: @s-card-content-background-color;
      color: @s-card-content-text-color;
      font-size: @s-card-content-font-size;
      .sie-card-content-row {
        width: 100%;
        display: flex;
        direction: row;
        /* margin-bottom: 11px; */
        .sie-card-content-col {
          height: @s-card-content-row-height;
          line-height: @s-card-content-row-height;
          /* overflow:hidden; */
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 400;
          .sie-card-content-attr {
            display: inline-block;
            width: 30%;
            font-size: 14px;
            color: #888888;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .sie-card-content-value {
            display: inline-block;
            width: 70%;
            font-size: 16px;
            color: rgba(51, 51, 51, 1);
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
    }
  }

  .sie-card_radius {
    border-radius: 2px;
  }

  .sie-card_noborder {
    border: none;
  }

</style>
