<template>
    <div class="m-padheader">
        <div @click="goBack()" class="backbox">
            <span class="iconfont icon-web__bitebizuojiantou"></span>
            <span class="backtitle">{{backtitle}}</span>
        </div>
        <div class="btnbox" v-show="showbtn">
            <div class="btn" @click="doAllStart">
                <span class="iconfont icon-jiahao"></span>
                <span>开始</span>
            </div>
            <div class="btn" @click="doSave">
                <span class="iconfont icon-baocun"></span>
                <span>保存</span>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: '',
    props: {
        backtitle: {
            type: String,
            default: "索菲亚"
        }, 
        showbtn: {
            type: Boolean,
            default: false
        }, 
        url:{
            type: String,
            default: ""
        }, 
        parameter:{
            type: String,
            default: ""
        }
    },
    data() {
        return {}
    },
    components: {},
    methods: {
        goBack(){
            console.log(this.url);
            if(this.url!=""){
                this.$router.push({path:this.url,query:{parameter:this.parameter}})
            }else{
                this.$router.back(-1)
            }
            
        },
        doAllStart(){
            this.$emit('allStart');
        },
        doSave(){
            this.$emit('doSave');
        }
    },
}
</script>

<style lang="less">
.m-padheader{
  height: 80px;
  width: 100%;
  background-color: #6E5428;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .backbox{
      height: 80px;
      font-size: 36px;
      font-weight: 500;
      line-height: 80px;
      color: white;
      padding-left:20px; 
      .backicon{

      }
      .backtitle{

      }
  }
  .btnbox{
        display: flex;
        flex-direction: row;
        align-items: center;
        .btn{
            font-family: 微软雅黑;
            font-weight: 400;
            font-style: normal;
            font-size: 20px;
            color: rgb(255, 255, 255);
            width: 91px;
            height: 41px;
            line-height: 41px;
            border: 1px solid white;
            border-radius: 3px;
            text-align: center;
            margin: 0 10px;
            .iconfont{
                font-size: 24px;
            }
        }
  }
  .iconfont{
      font-size: 30px;
  }
}
</style>
