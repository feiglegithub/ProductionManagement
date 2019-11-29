<template>
  <div class="sie-loadingplugin" v-show="isShow">
    <img v-if="img" src="./img/loading.png" :class="['sie-loadingplugin-img',{'sie-loadingplugin_transition':transition}]" />
    <svg v-if="type" :class="['icon',{'sie-loadingplugin_transition':transition}]" :style="{'font-size':size+'px'}" aria-hidden="true">
      <use v-bind:xlink:href="type"></use>
    </svg>
    <span>
      {{title}}
    </span>
    <span>
      {{detail}}
    </span>
  </div>
</template>
<script>
  import iconfont from './iconfont.js';
  export default {
    name: "SLoadingPlugin",
    props: {
      isShow: Boolean,
      img: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: ""
      },
      transition: {
        type: Boolean,
        default: false
      },
      duration: {
        type: Number,
        default: 2000
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
      return {}
    },
    methods: {

    },
  }

</script>
<style lang="less" scoped>
  /* @import '~@/assets/css/less/reset.less'; */
  .sie-loadingplugin {
    z-index:5001;
    position: absolute;
    top: 40%;
    left:33%;
    width: 120px;
    padding: 11px 0;
    background-color: rgba(0, 0, 0, 1);
    opacity: 0.8;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    color: #FFFFFF;
    border-radius: 2px;
    .sie-loadingplugin-img {
      width: 39px;
      height: 39px;
    }
    .sie-loadingplugin_transition {
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
