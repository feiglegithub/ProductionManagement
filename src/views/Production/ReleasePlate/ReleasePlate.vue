<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            垫板释放
            <!-- <a slot="right">取消</a> -->
            <a slot="right" @click="doPost" :class="{'f-noclick':showThost}">提交</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-inp" style="min-height:60px;">
                <div class="m-inp f-mtb5">
                    <span class="laber100" style="width:35%">垫板号</span>
                    <span class="inp s-inpbg" style="width:65%">
                        <input v-model="SupportNumber" ref="SupportInp" placeholder="请扫描垫板号" type="text" @keyup.enter="getSupportNumber()" @blur="getBlur()" class="s-inpbg">
                    </span>
                </div>
            </div>
            <div class="g-scrollbox">
                <div style="overflow-y: auto;">
                    <s-messageheader class="f-mt10" messagetitle="垫板信息" v-show="DataList.length>=1"></s-messageheader>
                    <swipeout :class="{'s-border':DataList.length>=1}">
                        <swipeout-item v-for="(item,index) in DataList" :key="index" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
                            <div slot="right-menu" style="padding:5px 0;">
                            <swipeout-button @click.native="onButtonClick(index)" type="warn">删除</swipeout-button>
                            </div>
                            <div slot="content" class="f-pd5 vux-1px-t">
                                <div class="m-listbox">
                                    <div class="num">
                                        {{index+1}}
                                    </div>
                                    <div class="showbox">
                                        <div class="showlistmsg">
                                            <span class="label">垫板号:</span>
                                            <span class="showmsg f-ml10">{{item}}</span>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                            </div>
                        </swipeout-item>
                    </swipeout>
                </div>
            </div>
        </div>
        <s-confirm 
            v-model="ShowConfirm" 
            :content="ConfirmMsg" 
            :showConfirmButton='false' 
            :showCancelButton='false' 
            :showSuccessButton='Successbtn'
            :showDangerButton='Dangerbtn' 
            :bad='BadColor'
            @on-cancel="onCancel"
            @on-confirm="onConfirm">
        </s-confirm>

        <toast width='20em' v-model="showPositionValue" type="text" :time="2500" :text="Msg" position="middle"></toast>
        <loading :show="showThost" :text="loadingtitle"></loading>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: '',
    data() {
        return {
            ShowConfirm:false,      //控制提示弹窗的显隐
            ConfirmMsg:'提交成功',
            BadColor:false,
            Successbtn:true,
            Dangerbtn:true,

            showPositionValue:false,        //提示信息显隐
            Msg:'有问题',                         //提示信息

            showThost:false,                //圈圈的显隐
            loadingtitle:'提交中',                //圈圈文字

            
            SupportNumber:null,      //托号
            DataList:[
            ],

        }
    },
    components: {
    },
    methods: {
        //失去焦点事件
        getBlur(){
            console.log('失去焦点事件');
        },
        //获取托号
        getSupportNumber(){
            if(!!this.SupportNumber==false){
                this.showPositionValue=true
                this.Msg='垫板号不能为空'
                return
            }
            if(!this.DataList.includes(this.SupportNumber)){
                this.DataList.unshift(this.SupportNumber)
                this.SupportNumber=null
            }else{
                this.showPositionValue=true
                this.Msg=`垫板号${this.SupportNumber}已存在`
                this.SupportNumber=null
                return
            }
            
            console.log(this.SupportNumber);
        },
        //触发单项左右滑动
        handleEvents(type){
            console.log(type);
        },
        //点击删除按钮，删除当前项
        onButtonClick(index){
            console.log(index);
            this.DataList.splice(index,1)  
            this.$refs.SupportInp.focus()
        },
        //点击提示弹窗的删除按钮
        onCancel(){
            this.ShowConfirm=false
            this.ConfirmMsg=''
            this.BadColor=false
            this.Successbtn=false
            this.Dangerbtn=false
            this.SupportNumber=null
            this.DataList=[]
            this.$refs.SupportInp.focus()
        },
        //点击提示弹窗的确认按钮
        onConfirm(){
            this.ShowConfirm=false
            this.ConfirmMsg=''
            this.BadColor=false
            this.Successbtn=false
            this.Dangerbtn=false
            this.$refs.SupportInp.focus()
        },
        //点击提交按钮
        doPost(){
            if(this.DataList.length<=0){
                this.Msg='提交数据不能为空'
                this.showPositionValue=true
                return
            }
            this.subPlateReleaseCollect(this.DataList)
            console.log(`${this.DataList}`);
        },

        //接口：提交转托动作
        subPlateReleaseCollect(plateList){
            this.loadingtitle='提交中'
            this.showThost=true
            this.$axiosApi.subPlateReleaseCollect(plateList).then(res=>{
                this.showThost=false
                if(res.Result==true){
                    console.log(res);
                    this.ShowConfirm=true
                    this.ConfirmMsg='提交成功'
                    this.BadColor=false
                    this.Successbtn=true
                    this.Dangerbtn=false
                    this.SupportNumber=null
                    this.DataList=[]
                }else{
                    this.ShowConfirm=true
                    this.ConfirmMsg=res.Message
                    this.BadColor=true
                    this.Successbtn=false
                    this.Dangerbtn=true
                }
            })
        }

    },
    mounted () {
        this.$refs.SupportInp.focus()
    }
}
</script>

<style lang="less">

</style>
