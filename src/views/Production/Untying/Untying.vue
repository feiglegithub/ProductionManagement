<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            板件不良登记
            <!-- <a slot="right">取消</a> -->
            <a slot="right" @click="doPost">提交</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-inp" style="min-height:60px;">
                <!-- <div class="m-inp f-mtb5">
                    <span class="laber100">托号\清单</span>
                    <span class="inp s-inpbg">
                        <input v-model="SupportNumber" ref="SupportInp" :disabled='IsChange' placeholder="请扫描托号或清单" type="text" @keyup.enter="getSupportNumber()" class="s-inpbg" @blur="getBlur()">
                    </span>
                </div> -->
                <div class="m-inp f-mtb5">
                    <span class="laber100">UPI</span>
                    <span class="inp s-inpbg">
                        <input v-model="UPI" ref="UPIInp" placeholder="请扫描UPI条码" type="text" @keyup.enter="getUPI()" class="s-inpbg">
                    </span>
                </div>
            </div>
            <div class="g-scrollbox">
                <div class="f-auto">
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
                                            <span class="label">原托号:</span>
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
                //     "SupportNumber":"457265",
                //     "ProductBatch":"34911964895",
                //     "CurrentProduct":"3358942687",
                // },
                // {
                //     "UPI":"c64s9194",
                //     "SupportNumber":"457265",
                //     "ProductBatch":"34911964895",
                //     "CurrentProduct":"3358942687",
                // },
            ],
            IsChange:false,         //控制托号是否能控制
            SourceBasePlateNo:null,     //提交的源基板编号
        }
    },
    components: {
    },
    methods: {
        //获取托号
        getSupportNumber(){
            if(!!this.SupportNumber==false){
                this.showPositionValue=true
                this.Msg='托号或清单不能为空'
                return
            }
            this.IsChange=true
            this.$refs.UPIInp.focus()
            if(!!this.SupportNumber && !!this.UPI){
                let myupi=[...this.PostUPI]
                myupi.unshift(this.UPI)
                this.checkRemovableWorkPlatePDA(this.SupportNumber,myupi)
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
            if(!!this.UPI==true){
                console.log('执行接口');
                //深拷贝，做一个临时提交的upi集合
                // let myupi=[...this.PostUPI]
                // myupi.unshift(this.UPI)
                this.checkRemovableWorkPlatePDA(this.UPI)
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

        //失去焦点事件
        getBlur(){
            console.log('失去焦点事件');
            if(!!this.SupportNumber!=false){
                this.IsChange=true
            }
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
            console.log(`${this.SourceBasePlateNo}和${this.PostUPI}`);
            this.removeWorkPlatesPda(this.SourceBasePlateNo,this.PostUPI)
        },

        //接口：检查Upi能否合托
        checkRemovableWorkPlatePDA(NeedRemoveUpis){
            console.log(333);
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.checkRemovableWorkPlatePda(NeedRemoveUpis).then(res=>{
                this.showThost=false
                if(res.Result.Result==true){
                    console.log(res.Result.Upis);
                    this.SourceBasePlateNo=res.Result.PlateInfo.PlateCode
                    this.PostUPI.unshift(this.UPI)
                    this.DataList.unshift(res.Result.Upis[0])
                    this.UPI=null
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Result.ErrorMsg
                    this.UPI=null
                }
            })
        },

        //接口：提交转托动作
        removeWorkPlatesPda(SourceBasePlateNo,NeedRemoveUpis){
            this.loadingtitle='提交中'
            this.showThost=true
            this.$axiosApi.removeWorkPlatesPda(SourceBasePlateNo,NeedRemoveUpis).then(res=>{
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
        this.$refs.UPIInp.focus()
    }
}
</script>

<style lang="less">
</style>
