<template>
  <div :class="[{'sie-cell':!nolimitheight,'sie-cell_nolimitheight':nolimitheight},{'sie-cell_border':largeBorderBottom}]"
    @click="click" :style="{'background-color':backgroundColor}">
    <div class="sie-cell-radio">
      <slot name="radio"></slot>
    </div>
    <slot name="content">
      <div :class="[{'sie-cell-content':!nolimitheight,'sie-cell-content_nolimitheight':nolimitheight},{'sie-cell_border':borderBottom}]">
        <div class="sie-cell-leftcontent">
          <slot name="leftContent">
            <div class="sie-cell-img">
              <div v-if="leftImg" class="img" :style="{'background-image':'url('+leftImg+')','background-repeat': 'no-repeat',
            'background-size': 'cover'}">
                <!-- <img :src="leftImg" v-if="leftImg" class="img" > -->
              </div>
            </div>
            <span v-if="title" class="sie-cell-title">{{title}}</span>
            <span v-if="detail" class="sie-cell-detail">{{detail}}</span>
          </slot>
        </div>
        <div class="sie-cell-righticon" @click.stop="clickRight" >
          <slot name="rightIcon">
            <img v-if="rightImg" :src="rightImg" />
            <svg class="icon" :style="{'font-size':rightSize+'px','color':rightColor}" aria-hidden="true" v-if="rightIcon">
              <use v-bind:xlink:href="rightIcon"></use>
            </svg>
          </slot>
        </div>
      </div>
    </slot>
  </div>
</template>
<script>
  import iconfont from './iconfont.js'
  export default {
    name: "SCell",
    props: {
      nolimitheight: {
        type: Boolean,
        default: false
      },
      leftImg: {
        type: String,
        default: ''
      },
      backgroundColor: {
        type: String,
        default: '#FFF'
      },
      rightSize: {
        type: Number,
        default: 13
      },
      rightColor: {
        type: String,
        default: '#D7D7D7'
      },
      borderBottom: {
        type: Boolean,
        default: true
      },
      largeBorderBottom: {
        type: Boolean,
        default: false
      },
      title: [String, Number],
      detail: {
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
    data() {
      return {}
    },
    computed: {

    },
    methods: {
      click() {
        this.$emit('click');
      },
      clickRight() {
        this.$emit('clickRight');
      }
    }
  }

</script>
<style lang="less" scoped>
  /* @import '~@/assets/css/less/reset.less'; */

  /* @import '~@/assets/css/less/theme-color.less'; */

  .sie-cell {
    width: 100%;
    height: 44px;
    line-height: 44px;
    padding: 0 15px 0 15px;
    position: relative;
    .sie-cell-radio {
      position: absolute;
      top: 0;
      left: 0;
    }
    .sie-cell-content {
      width: 100%;
      height: 44px;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 16px;
      color: #333333;
      position: relative;
      .sie-cell-leftcontent {
        height: 44px;
        line-height: 44px;
        /* display: inline-block; */
        /* display: flex;
        flex-direction: row; */
        /* align-items: center; */
      }
      .sie-cell-title {
        margin: 0 15px 0 0;
        display: inline-block;
      }
      .sie-cell-img {
        display: inline-block;
        vertical-align: middle;
        .img{
          margin: 0 15px 0 0;
          width: 22px;
          height: 22px;
        }
      }
      .sie-cell-detail {
        display: inline-block;
      }
      .sie-cell-righticon {
        height: 44px;
        line-height: 44px;
        display: flex;
        align-items: center;
        position: absolute;
        right: 0;
        margin-right: 0;
      }
    }
    .sie-cell-content_nolimitheight {
      width: 100%;
      word-wrap: break-word;
      word-break: normal;
    }
  }

  .sie-cell_nolimitheight {
    width: 100%;
    word-wrap: break-word;
    word-break: normal;
    padding: 0 15px 0 15px;
  }

  .sie-cell_border {
    border-bottom: 1px solid #D7D7D7;
  }

</style>
