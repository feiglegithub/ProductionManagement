<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            二次加工单
            <!-- <a slot="right">取消</a> -->
            <a slot="right" @click="doPost" :class="{'f-noclick':showThost}">提交</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-inp" style="min-height:40px;">
                <div class="m-inp f-mtb5">
                    <span class="laber100" style="width:35%">UPI</span>
                    <span class="inp s-inpbg" style="width:65%">
                        <input v-model="UPI" ref="UPIInp" placeholder="请扫描UPI条码" type="text" @keyup.enter="getUPI()" class="s-inpbg">
                    </span>
                </div>
            </div>
            <div class="g-scrollbox">
                <div style="overflow-y: auto;">
                    <s-messageheader class="f-mt10" messagetitle="条码信息" v-show="DataList.length>=1"></s-messageheader>
                    <swipeout :class="{'s-border':DataList.length>=1}">
                        <swipeout-item v-for="(item,index) in DataList" :key="index" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
                            <div slot="right-menu" style="padding:5px 0;">
                            <swipeout-button @click.native="onButtonClick(index,item)" type="warn">删除</swipeout-button>
                            </div>
                            <div slot="content" class="f-pd5 vux-1px-t">
                                <div class="m-listbox">
                                    <div class="num">
                                        {{index+1}}
                                    </div>
                                    <div class="showbox">
                                        <div class="showlistmsg">
                                            <span class="label">UPI:</span>
                                            <span class="showmsg f-ml10">{{item.Upi}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">生产批次:</span>
                                            <span class="showmsg f-ml10">{{item.SubBatchNo}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">当前工序:</span>
                                            <span class="showmsg f-ml10">{{item.CurrentProcessName}}</span>
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
            ShowConfirm:false,       //控制提示弹窗的显隐
            ConfirmMsg:'提交成功',
            BadColor:false,
            Successbtn:true,
            Dangerbtn:true,

            showPositionValue:false,  //提示信息显隐
            Msg:'有问题',              //提示信息

            showThost:false,          //圈圈的显隐
            loadingtitle:'提交中',     //圈圈文字

            UPI:null,                //UPI
            PostUPI:[],              //提交的upi集合
            DataList:[],             //显示的数据
        }
    },
    components: {
    },
    methods: {
        //获取UPI
        getUPI(){
            if(!this.UPI){
                this.showPositionValue=true
                this.Msg='UPI不能为空'
                return
            }

            if(this.PostUPI.indexOf(this.UPI)>=0){
                this.showPositionValue=true
                this.Msg=`UPI：${this.UPI}已存在`
                this.UPI=null
                return
            }

            console.log('执行接口');
            //深拷贝，做一个临时提交的upi集合
            let myupi=[...this.PostUPI]
            myupi.unshift(this.UPI)
            this.getSecondaryProcessUpiData(myupi)

            console.log(this.UPI);
        },
        //触发单项左右滑动
        handleEvents(type){
            console.log(type);
        },
        //点击删除按钮，删除当前项
        onButtonClick(index,item){
            console.log(index);
            console.log(item);
            this.DataList.splice(index,1)
            this.PostUPI=this.PostUPI.filter((upidata)=>{
                return upidata!=item.Upi
            });
            console.log(this.PostUPI);
        },
        //点击提示弹窗的删除按钮
        onCancel(){
            this.ShowConfirm=false
            this.ConfirmMsg=''
            this.BadColor=false
            this.Successbtn=false
            this.Dangerbtn=false
        },
        //点击提示弹窗的确认按钮
        onConfirm(){
            this.ShowConfirm=false
            this.ConfirmMsg=''
            this.BadColor=false
            this.Successbtn=false
            this.Dangerbtn=false
        },
        //点击提交按钮
        doPost(){
            if(this.PostUPI.length<=0){
                this.Msg='提交数据不能为空'
                this.showPositionValue=true
                return
            }

            console.log(`${this.PostUPI}`);
            this.submitSecondaryProcess(this.PostUPI)
        },
        //接口：获取Upi信息
        getSecondaryProcessUpiData(upis){
            this.loadingtitle='加载中'
            this.showThost=true

            this.$axiosApi.getSecondaryProcessUpiData(upis).then(res=>{
                this.showThost=false

                if(res.Success){
                    console.log(res);
                    this.PostUPI.unshift(this.UPI)

                    if (!!res.Result.UpiList){
                        this.DataList=res.Result.UpiList
                    }
                    
                    this.UPI=null
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    this.UPI=null
                }
            })
        },
        //接口：提交二次加工单
        submitSecondaryProcess(upis){
            this.loadingtitle='提交中'
            this.showThost=true

            this.$axiosApi.submitSecondaryProcess(upis).then(res=>{
                this.showThost=false

                if(res.Success){
                    console.log(res);
                    this.ShowConfirm=true
                    this.ConfirmMsg='提交成功'
                    this.BadColor=false
                    this.Successbtn=true
                    this.Dangerbtn=false
                    this.PostUPI=[]
                    this.DataList=[]
                    this.$refs.UPIInp.focus()
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
        this.$refs.UPIInp.focus()
    }
}
</script>

<style lang="less">

</style>
