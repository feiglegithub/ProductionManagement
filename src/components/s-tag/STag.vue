<template>
  <div class="sie-tag" @click="click">
    <div :style="{'background-color':backgroundColor,'color':color}" :class="[{'sie-tag_radius':radius},{'sie-tag_small':small,'sie-tag_medium':medium,'sie-tag_large':large},{'sie-tag_ghost':ghost,'sie-tag_dark':dark,'sie-tag_warn':warn,'sie-tag_primary':primary,'sie-tag_danger':danger,'sie-tag_darkred':darkred}]">
      <span class="sie-tag-text">{{text}}</span>
      <svg class="icon sie-tag-close" aria-hidden="true" v-if="close">
        <use xlink:href="#icon-close"></use>
      </svg>
    </div>
  </div>
</template>
<script>
  import iconfont from './iconfont.js'
  export default {
    name: "SPopup",
    props: {
      close: {
        type: Boolean,
        default: false
      },
      radius: {
        type: Boolean,
        default: true
      },
      size: {
        type: String,
        default: 'medium'
      },
      type: {
        type: String,
        default: 'primary'
      },
      text: {
        type: String,
        default: '默认'
      },
      backgroundColor:{
        type:String,
        default:''
      },
      color:{
        type:String,
        default:''
      }
    },
    data() {
      return {}
    },
    computed: {
      small: function () {
        return this.isSize('small');
      },
      medium: function () {
        return this.isSize('medium');
      },
      large: function () {
        return this.isSize('large');
      },
      ghost: function () {
        return this.isType('ghost');
      },
      dark: function () {
        return this.isType('dark');
      },
      warn: function () {
        return this.isType('warn');
      },
      primary: function () {
        return this.isType('primary');
      },
      danger: function () {
        return this.isType('danger');
      },
      darkred:function(){
        return this.isType('darkred');
      }
    },
    methods: {
      isType(value) {
        if (this.type === value) {
          return true;
        } else {
          return false; 
        }
      },
      isSize(value) {
        if (this.size === value) {
          return true;
        } else {
          return false;
        }
      },
      click() {
        this.$emit('click');
      }
    }
  }

</script>
<style lang="less" scoped>
  /* @import '~@/assets/css/less/reset.less'; */
  /* @import '~@/assets/css/less/px2rem.less'; */

  /* @import '~@/assets/css/less/theme-color.less'; */
  .sie-tag {
    display: inline-block;
    text-align: center;
    position: relative;
  }

  .sie-tag_radius {
    border-radius: 2px;
  }

  .sie-tag_small {
    /* width:32px; */
    padding: 0 6px;
    height: 15px;
    line-height: 15px;
    font-size: 10px;
  }

  .sie-tag_medium {
    width: 72px;
    /* padding: 0 10px; */
    height: 24px;
    line-height: 24px;
    font-size: 14px;
  }

  .sie-tag_large {
    /* width:50px; */
    padding: 0 15px 0 5px;
    max-width: 108px;
    min-width: 56px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .sie-tag_ghost {
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    color: #333333;
  }

  .sie-tag_dark {
    background-color: rgb(80, 74, 70);
    color: white;
  }

  .sie-tag_warn {
    background-color: #FF9038;
    color: white;
  }

  .sie-tag_primary {
    background-color: #00CC99;
    color: white;
  }

  .sie-tag_danger {
    background-color: #DE3939;
    color: white;
  }

  .sie-tag_darkred{
    background-color: #B0293C;
    color: white;
  }

  .sie-tag-close {
    position: absolute;
    right: 5px;
    top:50%;
    transform: translateY(-50%);
    height: 50%;
    line-height: 50%;
    font-size: 8px;
  }

</style>
