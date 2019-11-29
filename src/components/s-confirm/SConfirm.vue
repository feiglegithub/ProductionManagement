<template>
  <div class="sie-confirm">
     <x-dialog
      v-model="showValue"
      :mask-transition="maskTransition"
      :hide-on-blur="hideOnBlur"
      :mask-z-index="maskZIndex"
      @on-hide="$emit('on-hide')">
      <div class="sie-dialog-bd" >
        <p style="text-align:center;" :class="['danger-color',{'badcolor':bad}]">{{this.content}}</p>
        <slot></slot>
      </div>
      <div class="sie-dialog-ft">
        <a v-if="showCancelButton" href="javascript:;" class="sie-dialog-btn sie-dialog-btn_cancel" @click="_onCancel">取消</a>
        <a v-if="showConfirmButton" href="javascript:;" class="sie-dialog-btn sie-dialog-btn_confirm" @click="_onConfirm">确认</a>
        <a v-if="showSuccessButton" href="javascript:;" class="sie-dialog-btn sie-dialog-btn-success" @click="_onConfirm">确认</a>
        <a v-if="showDangerButton" href="javascript:;" class="sie-dialog-btn sie-dialog-btn-danger" @click="_onCancel">返回</a>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import { XDialog } from "vux";
export default {
  name: "SConfirm",
  components: {
    XDialog
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    hideOnBlur: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: "vux-fade"
    },
    maskZIndex: [Number, String],
    dialogTransition: {
      type: String,
      default: "vux-dialog"
    },
    content: String,
    closeOnConfirm: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    showSuccessButton: {
      type: Boolean,
      default: true
    },
    showDangerButton: {
      type: Boolean,
      default: true
    },
    bad: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.showValue = this.show;
    if (this.value) {
      this.showValue = this.value;
    }
  },
  watch: {
    value(val) {
      this.showValue = val;
    },
    showValue(val) {
      this.$emit("input", val);
      if (val) {
        this.$emit("on-show"); // emit just after msg is cleared
      }
    }
  },
  data() {
    return {
      msg: "",
      showValue: false,
      mycolor:'',
    };
  },
  methods: {
    _onConfirm() {
      if (!this.showValue) {
        return;
      }
      if (this.closeOnConfirm) {
        this.showValue = false;
      }
      this.$emit("on-confirm", this.msg);
    },
    _onCancel() {
      if (!this.showValue) {
        return;
      }
      this.showValue = false;
      this.$emit("on-cancel");
    }
  },
  mounted() {
    // if(this.bad==true){
    //   this.mycolor='red'
    // }
  },
};
</script>
<style lang="less" scoped>
/* @import "~@/assets/css/less/reset.less"; */
/* @import "~@/assets/css/less/theme-color.less"; */
.sie-confirm /deep/ .weui-dialog {
  position: fixed;
  display: table;
  z-index: 5000;
  width: 200px;
  max-width: 230px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background-color: #ffffff;
  text-align: center;
  border-radius: 4px;
  overflow: hidden;
  .sie-dialog-bd {
    min-height: 40px;
    font-size: @dialog-text-fontSize;
    font-family: @dialog-text-fontFamily;
    font-weight: @dialog-text-fontWeight;
    color: #333333;
    padding: 34px 16px;
  }
  .sie-dialog-ft {
    position: relative;
    line-height: 32px;
    font-size: @dialog-text-fontSize;
    font-family: @dialog-text-fontFamily;
    font-weight: @dialog-text-fontWeight;
    display: flex;
    .sie-dialog-btn {
      display: block;
      flex: 1;
      text-decoration: none;
    }
    .sie-dialog-btn_cancel {
      color: @dialog-btn_cancel-color;
      background-color: @dialog-btn_cancel-backgroundColor;
    }
    .sie-dialog-btn_confirm {
      color: @dialog-btn_confirm-color;
      background-color: @dialog-btn_confirm-backgroundColor;
    }
    .sie-dialog-btn-success {
      font-size: 20px;
      color: white;
      background-color: #57b5dd;
      opacity: 0.8;
    }
    .sie-dialog-btn-danger {
      font-size: 20px;
      color: white;
      background-color: #f84646;
      opacity: 0.8;
    }
    .danger-color {
      color: white;
    }
  }
}
.badcolor{
  color: red
}
</style>