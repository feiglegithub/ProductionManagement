<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            封边返修合托
            <!-- <a slot="right">取消</a> -->
            <a slot="right" @click="doPost" :class="{'f-noclick':showThost}">提交</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-inp" style="min-height:80px;">
                <div class="m-inp f-mtb5">
                    <span class="laber100" style="width:35%">目标托号</span>
                    <span class="inp s-inpbg" style="width:65%">
                        <input v-model="SupportNumber" ref="SupportInp" :disabled='IsChange' placeholder="请扫描新托号" type="text" @keyup.enter="getSupportNumber()" @blur="getBlur()" class="s-inpbg">
                    </span>
                </div>
                <div class="m-inp f-mtb5">
                    <span class="laber100" style="width:35%">源UPI</span>
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
                                            <span class="showmsg f-ml10">{{item.UpiCpode}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">旧托号:</span>
                                            <span class="showmsg f-ml10">{{item.PlateCode}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">生产批次:</span>
                                            <span class="showmsg f-ml10">{{item.UpiBatchNo}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">当前工序:</span>
                                            <span class="showmsg f-ml10">{{item.ProcessName}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">新托号:</span>
                                            <span class="showmsg f-ml10">{{SupportNumber}}</span>
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
            UPI:null,                //UPI
            PostUPI:[],             //提交的upi集合
            DataList:[
                // {
                //     "UPI":"c64s9194",
                //     "OldSupportNumber":"457265",
                //     "ProductBatch":"34911964895",
                //     "CurrentProduct":"3358942687",
                //     "NewSupportNumber":"6949582463",
                // },
                // {
                //     "UPI":"c64s9194",
                //     "OldSupportNumber":"457265",
                //     "ProductBatch":"34911964895",
                //     "CurrentProduct":"3358942687",
                //     "NewSupportNumber":"6949582463",
                // },
            ],
            IsChange:false,         //控制托号是否能控制

        }
    },
    components: {
    },
    methods: {
        //失去焦点事件
        getBlur(){
            console.log('失去焦点事件');
            if(!!this.SupportNumber!=false){
                this.IsChange=true
            }
        },
        //获取托号
        getSupportNumber(){
            if(!!this.SupportNumber==false){
                this.showPositionValue=true
                this.Msg='托号不能为空'
                return
            }
            this.IsChange=true
            this.$refs.UPIInp.focus()
            if(!!this.SupportNumber && !!this.UPI){
                let myupi=[...this.PostUPI]
                myupi.unshift(this.UPI)
                this.checkWorkPlateRepairMixablePda(this.SupportNumber,myupi)
            }
            console.log(this.SupportNumber);
        },
        //获取UPI
        getUPI(){
            if(!!this.UPI==false){
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
            if(!!this.SupportNumber && !!this.UPI){
                console.log('执行接口');
                //深拷贝，做一个临时提交的upi集合
                let myupi=[...this.PostUPI]
                myupi.unshift(this.UPI)
                this.checkWorkPlateRepairMixablePda(this.SupportNumber,myupi)
            }
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
                return upidata!=item.UpiCpode
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
            console.log(`${this.SupportNumber}和${this.PostUPI}`);
            this.doRepairWorkPlatePda(this.SupportNumber,this.PostUPI)
        },
        //接口：检查Upi能否合托
        checkWorkPlateRepairMixablePda(TargetBasePlateNo,NeedChangeUpis){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.checkWorkPlateRepairMixablePda(TargetBasePlateNo,NeedChangeUpis).then(res=>{
                this.showThost=false
                if(res.Result.Result==true){
                    console.log(res);
                    this.PostUPI.unshift(this.UPI)
                    this.DataList=res.Result.Upis
                    this.UPI=null
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Result.ErrorMsg
                    this.UPI=null
                }
            })
        },

        //接口：提交转托动作
        doRepairWorkPlatePda(TargetBasePlateNo,NeedChangeUpis){
            this.loadingtitle='提交中'
            this.showThost=true
            this.$axiosApi.doRepairWorkPlatePda(TargetBasePlateNo,NeedChangeUpis).then(res=>{
                this.showThost=false
                if(res.Result.Result==true){
                    console.log(res);
                    this.ShowConfirm=true
                    this.ConfirmMsg='提交成功'
                    this.BadColor=false
                    this.Successbtn=true
                    this.Dangerbtn=false
                    this.PostUPI=[]
                    this.SupportNumber=null
                    this.DataList=[]
                    this.IsChange=false
                    this.$refs.SupportInp.focus()
                }else{
                    this.ShowConfirm=true
                    this.ConfirmMsg=res.Result.ErrorMsg
                    this.BadColor=true
                    this.Successbtn=false
                    this.Dangerbtn=true
                }
            })
        }

    },
    mounted () {
        // console.log(this.$refs.SupportInp);
        this.$refs.SupportInp.focus()
    }
}
</script>

<style lang="less">

</style>
