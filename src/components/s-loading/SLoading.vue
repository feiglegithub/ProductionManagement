<template>
  <div class="sie-loading">
    <slot name="content">
      <img v-if="img" src="./img/loading.png" :class="['sie-loading-img',{'sie-loading_transition':transition}]"/>
      <svg v-if="type" :class="['icon',{'sie-loading_transition':transition}]" :style="{'font-size':size+'px'}" aria-hidden="true">
        <use v-bind:xlink:href="type"></use>
      </svg>
      <span>
        <slot name="title">
          {{title}}
        </slot>
      </span>
      <span>
        <slot name="detail">
          {{detail}}
        </slot>
      </span>
    </slot>
  </div>
</template>
<script>
  import iconfont from './iconfont.js';
  export default {
    name: "SLoadingPlugin",
    props: {
      img:{
        type:Boolean,
        default:false
      },
      type: {
        type: String,
        default: ""
      },
      transition: {
        type: Boolean,
        default: false
      },
      size: {
        type: Number,
        default: 38
      },
      title: {
        type: String,
        default: "加载中"
      },
      detail: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
      }
    },
    methods: {

    },
  }

</script>
<style lang="less" scoped>
  /* @import '~@/assets/css/less/reset.less'; */
  .sie-loading {
    position: absolute;
    top: 40%;
    left:33%;
    z-index: 99;
    width: 120px;
    padding: 11px 0;
    background: rgb(0, 0, 0);
    opacity: 0.8;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    color: #FFFFFF;
    border-radius: 2px;
    .sie-loading-img{
      width:39px;
      height:39px;
    }
    .sie-loading_transition {
      -webkit-animation: spin 1s linear 1s 1 alternate;
      animation: spin 1s linear infinite;
    }
  }

  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

</style>
