<template>
  <!-- <div>
    <s-container>
      <h3>这里是输入框</h3>
      <input class="input" type="text" v-model="iptxt" placeholder="text" style="width:100%;margin-bottom:5px;height:30px;background:#ddd" />
      <input type="number" v-model="ipnum" placeholder="number" style="width:100%;margin-bottom:5px;height:30px;background:#ccc" />
      <input ref="select" @focus="focus" type="number" v-model="ipselect" placeholder="用select的" style="width:100%;margin-bottom:5px;height:30px;background:#999">
      <input ref="blur" siekeyboard="true" @focus="blur" @blur="realblur" type="txt" v-model="ipblur" placeholder="禁掉focus的" style="width:100%;margin-bottom:5px;height:30px;background:#999">
      <div style="width:100%;height:300px;border:1px solid green" contenteditable="true">
        内容可编辑
      </div>
    </s-container> -->
    <div class="sie-keyboard" :class="{'active':focusnum}">
      <p class="fold" @click="focusnum=false">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024"
          version="1.1">
          <path fill="#d7d7d7" d="M153 294.6l351.5 351.5c1.9 1.9 4.5 3.1 7.5 3.1s5.6-1.2 7.6-3.2L871 294.6c13.9-13.9 36.7-13.9 50.6 0 13.9 13.9 13.9 36.7 0 50.6L537.3 729.4c-13.9 13.9-36.7 13.9-50.6 0-0.1-0.1-0.1-0.1-0.1-0.2L102.4 345.1c-13.9-13.9-13.9-36.7 0-50.6 13.9-13.8 36.7-13.8 50.6 0.1zM501.8 641.2c0-0.2-0.1-0.3-0.1-0.5 0 0.2 0 0.3 0.1 0.5zM502.4 642.9c0-0.1-0.1-0.1-0.1-0.2 0 0.1 0 0.1 0.1 0.2zM501.4 638.6v0z" /></svg>
      </p>
      <div class="numwrap">
        <div class="num" @click="type(1)">1</div>
        <div class="num" @click="type(2)">2</div>
        <div class="num" @click="type(3)">3</div>
        <div class="num" @click="type('delect')"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="400px"
            height="400.00px" viewBox="0 0 1024 1024" version="1.1">
            <path fill="#333333" d="M960 736V288a64 64 0 0 0-64-64H340.064c-13.92 0-21.536 7.296-21.536 7.296L71.648 492.48c-8.096 8.128-7.648 18.4-7.648 18.4 0 14.144 8.544 21.856 8.544 21.856l244.16 259.072c6.304 5.984 13.056 8.704 20.224 8.128H896a64 64 0 0 0 64-64z m-216.224-359.776a32 32 0 0 1 0 45.28l-226.272 226.24a32 32 0 0 1-45.248-45.248l226.24-226.24a32 32 0 0 1 45.28 0z m-226.272 0l226.24 226.272a32 32 0 0 1-45.248 45.248l-226.24-226.24a32 32 0 0 1 45.248-45.248zM854.816 735.36h-498.56l-210.112-224 210.976-222.24 1.344-1.28h496.352a32 32 0 0 1 32 32v383.52a32 32 0 0 1-32 32z" /></svg></div>
        <div class="num" @click="type(4)">4</div>
        <div class="num" @click="type(5)">5</div>
        <div class="num" @click="type(6)">6</div>
        <div class="num" @click="type('.')">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024"
            version="1.1">
            <path fill="#333333" d="M512 624a112 112 0 1 0 0-224 112 112 0 0 0 0 224z" /></svg>
        </div>
        <div class="num" @click="type(7)">7</div>
        <div class="num" @click="type(8)">8</div>
        <div class="num" @click="type(9)">9</div>
        <div class="num enter" @click="type(7)"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="200px"
            height="200.00px" viewBox="0 0 1024 1024" version="1.1">
            <path fill="#ffffff" d="M804.248575 157.915589l0 431.250908L393.361461 589.166497 393.361461 407.414013l-265.620613 227.143277 265.620613 227.01741L393.361461 679.95013l456.278931 0c25.086351 0 45.391816-20.36277 45.391816-45.39284L895.032208 157.915589 804.248575 157.915589 804.248575 157.915589zM804.248575 157.915589" /></svg></div>
        <div class="num" @click="type()">00</div>
        <div class="num" @click="type(0)">0</div>
        <div class="num" @click="type('')">空格</div>
      </div>
    </div>
  <!-- </div> -->
</template>
<script>
  export default {
    data() {
      return {
        focusnum: true,
        iptxt: "",
        ipnum: "",
        ipselect: "",
        ipblur: ""
      }
    }

    ,
    // methods: {
    //   focus() {
    //     this.$refs.select.blur();
    //     this.$refs.select.select()
    //   }

    //   ,
    //   blur() {
    //     this.$refs.blur.readonly = 'readonly';
    //     this.focusnum = true;
    //     console.log("激活了")
    //   },
    //   realblur() {
    //     this.focusnum = false
    //     console.log("失焦了")
    //   }

    //   ,
    //   type(num) {
    //     let oldnum = this.ipblur;
    //     let newnum = num + "";
    //     this.ipblur = oldnum + newnum
    //   },
      

    // },
    mounted(){
        
      let inputs=document.getElementsByTagName("input");
      for(var item in inputs){
          inputs[item].addEventListener("focus", function(){
    if(inputs[item].siekeyboard==undefined){this.focusnum = false;}
     if(inputs[item].siekeyboard==true){this.focusnum = true;}     
});
        
      }
    
    }

  }

</script>
<style scoped lang="less">
  .sie-keyboard {
    position: fixed;
    user-select: none;
    z-index: 999;
    bottom: 0;
    width: 100%;
    transform: translateY(100%);
    transition: transform 200ms;
    border-top: 1px solid #D7D7D7;
    background: #fff;

    .fold {
      &:active {
        background: #ececec;
      }

      width:100%;
      text-align: center;
      height:28px;
      line-height: 28px;
      font-size: 16px;
      border-bottom:1px solid #d7d7d7;
    }

    &.active {
      transform: translateY(0);
      transition: transform 200ms;
    }

    .numwrap {
      >div:active {
        background: #ececec;
      }

      .num:nth-child(4n) {
        border-right: none;
      }

      .num {
        &.enter {
          height: 96px;
          line-height: 96px;
          float: right;
          fill: #ffffff;
          background: linear-gradient(to right, #F56567, #B0293C);

          &:active {
            background: linear-gradient(to right, rgba(245, 101, 103, 0.7), rgba(176, 41, 60, 0.7))
          }
        }

        float:left;
        font-weight: 400;
        color:#333333;
        box-sizing: border-box;
        background: #fff;
        border-right: 1px solid #D7D7D7;
        border-bottom: 1px solid #D7D7D7;
        width:25%;
        height:48px;
        line-height:48px;
        text-align: center;
        font-size: 16px
      }
    }
  }

</style>
