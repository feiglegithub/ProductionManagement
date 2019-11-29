<template>
  <div class="delete">
    <div class="slider" v-show="isLeftSlide" :style="{'height':slideHeight}">
      <div class="content" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd' :style="{'height':slideHeight,'transform':transLateX}">
        <!-- 涅米宁呃呃呃呃呃 -->
        <!-- 插槽中放具体项目中需要内容  -->
        <slot name="content" ref="content"></slot>
      </div>
      <div class="remove active" v-for="(item,i) in actionBtn" :key="i"
       :style="{'height':slideHeight,'transition':transition,
      'line-height':slideHeight,
      'transform':transLateX,
      'width':60+'px',
      'background':item.bgColor,
      'right':-60*(i+1)+'px'}" @click.self.stop="$emit('action',item.action)"  ref='remove'>
        <slot name="actionbtn"></slot>
        {{item.txt}}
      </div>

    </div>
<slot  v-if="!isLeftSlide" name="content" ref="content"></slot>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      isLeftSlide: {
        type: Boolean,
        default: false,
      },
      
      actionBtn:{
        type:Array,
        default:[]              
      },
      propE: {
        type: Object,
        default: function () {},

      },
      slideHeight: {
        type: String,
        default: "30px"
      }
    },
    data() {
      return {        
        startX: 0, //触摸位置
        endX: 0, //结束位置
        moveX: 0, //滑动时的位置
        disX: 0, //移动距离
        transLateX: '', //滑动时的效果,使用
        transition:''
      }
    },

    methods: {
      test(i){
        console.log('单独点击到',i)
      },
      handleClick(v) {
        this.$emit('action');
        this.transLateX = "translateX(0px)";
      },
      touchStart(ev) {
        // console.log(ev)
        ev = ev || event
        //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
        if (ev.touches.length == 1) {
          // 记录开始位置
          this.startX = ev.touches[0].clientX;
        }
      },
      touchMove(ev) {
        ev = ev || event;
        //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
        // let wd = this.$refs.remove.offsetWidth;
        let wd=60*this.actionBtn.length;
        if (ev.touches.length == 1) {
          // 滑动时距离浏览器左侧实时距离
          this.moveX = ev.touches[0].clientX

          //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
          this.disX = this.startX - this.moveX;
          // 如果是向右滑动或者不滑动，不改变滑块的位置
          if (this.disX < 0 || this.disX == 0) {
             this.transition='transform 500ms';
            this.transLateX = "translateX(0px)";
            // 大于0，表示左滑了，此时滑块开始滑动 
          } else if (this.disX > 0) {
             this.transition="";
            //具体滑动距离我取的是 手指偏移距离*5。
            this.transLateX = "translateX(-" + this.disX * 5 + "px)";

            // 最大也只能等于删除按钮宽度 
            if (this.disX * 5 >= wd) {
              this.transLateX = "translateX(-" + wd + "px)";
            }
          }
        }
      },
      touchEnd(ev) {
        ev = ev || event;
        //  console.log(ev)
        let wd = this.$refs.remove.offsetWidth;
        if (ev.changedTouches.length == 1) {
          let endX = ev.changedTouches[0].clientX;

          this.disX = this.startX - endX;
          //如果距离小于删除按钮一半,强行回到起点

          if ((this.disX * 5) < (wd / 2)) {

            this.transLateX = "translateX(0px)";
          } else {
            //大于一半 滑动到最大值
            this.transLateX = "translateX(-" + wd + "px)";
          }
        }
      }
    },
    mounted() {
        // console.log("slider"+this.isLeftSlide)
      // let height = this.$refs.content.height;
      // console.log("高为", height)
    }
  }

</script>
<style scoped>
  .slider {
    width: 100%;

    position: relative;
    user-select: none;
  }

  .slider .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: transparent;
    z-index: 100;
    transition: 0.3s;

  }

  .slider .remove {
    position: absolute;
    width: 60px;
    background: red;
    right: -60px;
    top: 0;
    color: #fff;
    text-align: center;
    font-size: 12px;

  }

</style>
