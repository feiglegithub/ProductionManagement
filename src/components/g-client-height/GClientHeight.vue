<template>
  <div class="g-scrollbox g-client-height-box" :class="{'f-focusState':hasCss}">
    <slot></slot>
  </div>     

</template>
<script type="text/ecmascript-6">
  export default {
    components:{},
    props: {    
      
    },
    data(){
      return {   
        hasCss:false,
        clientHeight:null
      }
    },
    mounted() {     
      
    },
    watch:{
      clientHeight(val){
        // console.log(val);
          let bodyHeight = localStorage.getItem("clientheight")
          this.hasCss = bodyHeight>val+200
          // if(bodyHeight>val+200){
          //   this.hasCss = true
          // }else{
          //   this.hasCss = false
          // }
      }
    },
    methods: {

    },
    mounted () {
        let self = this;
        // console.log(2222);
        // console.log(localStorage.getItem("clientheight"));
        window.onresize = function() {
            //开启实时修改页面高度值
            return (function() {
                self.clientHeight = document.body.clientHeight;
            })();
        };
    }
   
  }
</script>
<style lang="less" scoped>
  .f-focusState {
      max-height: 230px;
  }
  .g-client-height-box{
    overflow-y: auto
  }
</style>
