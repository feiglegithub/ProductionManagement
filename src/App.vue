<template>
  <div id="app" class="g-flex flex-vertical">
    <keep-alive :include="aKeepAlive">
      <router-view class="flexwrap" style="overflow:auto"></router-view>
    </keep-alive>
      <div v-show="ShowBar" class="bottombar"></div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    computed: {
      aKeepAlive() {
        return  this.$store.getters.keepAlive
      }
    },
    data(){
      return{
        clientHeight:null,
        ShowBar:false
      }
    },
    methods:{
     
    },
    watch:{
      clientHeight(val){
        // console.log(val);
        let bodyHeight = localStorage.getItem("clientheight")
        if(val+150<bodyHeight){
          this.ShowBar=true
        }else{
          this.ShowBar=false
        }
      },
    },
    updated: function () {
      // console.log("router",this.$router)
    },
    mounted(){
      //等所有组件都渲染完成 初始时固定住整体高度,不让键盘顶起底部导航
   setTimeout(function () {       
       let screenHeight = document.body.clientHeight
     let  app=document.getElementById("app")
     app.style.height=screenHeight+'px'},1000)
    localStorage.setItem("clientheight", document.body.clientHeight);
      let self = this;
      window.onresize = function() {
          //开启实时修改页面高度值
          return (function() {
              self.clientHeight = document.body.clientHeight;
          })();
      };
    }
    
  }
  
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import "./assets/css/global.less";
  .bottombar{
    display: block;
    flex-shrink: 0;
    height: 280px;
  }
</style>
