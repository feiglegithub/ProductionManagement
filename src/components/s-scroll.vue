<template>
  <div class="m-scrollwrap f-pr" ref="scrollw">
  
     <div ref="wrapper" class="wrap" >        
       <div style="min-height:101%"> 
         <load-more class="bettterloadm" v-show="refreshdata" :tip="'正在刷新'"></load-more>
              <slot></slot>
          <load-more v-show="loadmore" :tip="'正在加载'"></load-more>
          <p class="u-finalpage" v-show="finishalldata">已经是最后一页</p>
     </div>
    </div>     
</div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {LoadMore} from 'vux'
  export default {
    components:{LoadMore},
    props: {    
      /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
      probeType: {
        type: Number,
        default: 1
      },
      stopPullUp:{
        type:Boolean,
        default:false
      },
      threshold:{type:Number,
                default:-20},
      /**
       * 点击列表是否派发click事件
       */
      click: {
        type: Boolean,
        default: true
      },
      /**
       * 是否开启横向滚动
       */
      scrollX: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发滚动事件
       */
      listenScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 列表的数据
       */
      data: {
        type: Array,
        default: null
      },
      /**
       * 是否派发滚动到底部的事件，用于上拉加载
       */
      pullup: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发顶部下拉的事件，用于下拉刷新
       */
      pulldown: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发列表滚动开始的事件
       */
      beforeScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 当数据更新后，刷新scroll的延时。
       */
      refreshDelay: {
        type: Number,
        default: 20
      },     
    },
    data(){
      return {   
      loadmore:false,
      finishalldata:false,
      refreshdata:false,
      }
    },
    // methods:{
    //   initScroll(){
    //     this.scroll = new BScroll(this.$refs.wrapper, {
    //        scrollY: true,
    //        tap:true,
    //        click: true,
    //        bounce: {
    //           top: false,
    //           bottom: true,            
    //         },
    //        pullUpLoad:{
    //          threshold:-60
    //        }
    //      }
    //     );
    //      this.scroll.on('pullingUp', (pos) => {
              
    //               this.pullUp()
        
    //           })
         
    
    //   },
     
    // },
    // mounted: function () {
    //   this.$nextTick(function () {
    //     this.$on('childMethod', function () {
    //       console.log('监听成功')
    //     })
    //   })
    // },
    mounted() {     
      // 保证在DOM渲染完毕后初始化better-scroll
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    watch:{
      stopPullUp(newval,oldval){       
         if(newval){
           this.loadmore=false;this.finishalldata=true
           }else{this.finishalldata=false}
      },
      // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
      data(newval,oldval){
        setTimeout(() => {
          // this.refreshdata=false;
         this.scroll.finishPullDown();      
       this.refresh();      
        }, this.refreshDelay);
         setTimeout(() => {this.refreshdata=false;},2000)
      },
      //初始第一次数据加载后
    //  isScrollDataReady(newvalue,oldvalue){ 
       
    //      if(newvalue){
           
    //         setTimeout(() => {
    //     this._initScroll()
    //   }, 20)
    //      }
    //   }
    },
    methods: {
      isScrollDataReady(){
        let _this=this;      
         setTimeout(() => {
        _this._initScroll()
      }, 20)
      },
      _initScroll() {
          //  console.log('初始化scrool');
        if (!this.$refs.wrapper) {
          return
        }
        // better-scroll的初始化       
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,   
          bounce: {//是否可上拉跟下拉并有缓冲动作
              top: this.pulldown,
              bottom: this.pullup,            
            },       
          scrollX: this.scrollX,
          pullUpLoad:{           
              threshold:this.threshold
           },
           pullDownRefresh: {
              threshold: 50,
                // stop: 0
              // stop: 20
            }
        })        
        // 是否派发滚动事件
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        };
        //上拉加载更多
        if (this.pullup) {
          //是否滚动停止，用于任何方向滚动后松手的监听
        this.scroll.on('scrollEnd', (pos) => { 
            // console.log("scrollend")                           
            
                if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                  if( !this.stopPullUp){ this.$emit('pullup');} 
              //  console.log("上拉高度超过内容50");   
              //  this.finishalldata=false;
                this.finishPullUp();   
             
              // this.$emit('scrollToEnd')
            }        
              })};
        // 是否派发滚动到底部事件，用于上拉一段不松手时再加载
        if (this.pullup) {
          this.scroll.on('pullingUp', () => {
              //  console.log("调用了this.pullup");  
               // 滚动到底部
            
          })
        }
       // 是否派发顶部下拉事件，用于下拉一段松手再刷新
        if (this.pulldown) {
          this.scroll.on('pullingDown',() => {
            //  console.log("下拉刷新了");    
            this.refreshdata=true;
           this.$emit('pullDownRefresh')
          })
        }
// if (this.pulldown) { 
//           this.scroll.on('touchend', (pos) => {  
//             console.log("touchend")                
//            if (pos.y > 50) {
           
//               this.$emit('pulldown')
//             }
            
//           })
//         }
        // 是否派发列表滚动开始的事件
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        // 代理better-scroll的disable方法
        this.scroll && this.scroll.disable()
      },
      enable() {
        // 代理better-scroll的enable方法
        this.scroll && this.scroll.enable()
      },
      refresh() {
        // console.log("已更新");
        // this.finishalldata=false;
        // 代理better-scroll的refresh方法
        this.scroll && this.scroll.refresh()
      },
      finishPullUp(){
        // console.log("完成上拉");
        this.scroll && this.scroll.finishPullUp()
      },
      scrollTo() {
        // 代理better-scroll的scrollTo方法
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        // 代理better-scroll的scrollToElement方法
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    }
   
  }
</script>
<style lang="less" scoped>
.bettterloadm{
  position: absolute;
  top:-50px;
  left:17.5%;
}
.u-finalpage {
  padding: 10px;
  text-align: center;
  font-size: 14px;
  color: #ccc
}
/*滚动轴*/
.m-scrollwrap{
  // position: relative;
  // margin-top: 10*@ptr;
  flex: 1;
  overflow-y: scroll;
  .wrap{
      position:absolute;
      top:0;
      left:0; 
      height:100%;
      width:100%;
      .scrollw{
          position: relative;
          overflow: scroll;
          flex-grow: 1;
          .scrolldot{
          content:"";
          display:block;
          position: absolute;
          height:100%;
          }
          .m-billli:nth-child(1){margin-top:0}
          }
    }
  }
</style>
