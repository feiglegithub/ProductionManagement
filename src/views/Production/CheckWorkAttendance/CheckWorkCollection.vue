<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            考勤登录
            <!-- <a slot="right">取消</a> -->
            <a slot="right" style="font-size:14px;margin-right:15px" @click="downMachine" v-show="IsSignIn">下机</a>
            <a slot="right" @click="upMachine" v-show="!IsSignIn">上机</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-inp" style="min-height:60px;">
                <div class="m-inp f-mtb5">
                    <span class="laber100">工号</span>
                    <span class="inp s-inpbg">
                        <input v-model="JobNumber" ref="RefJobNumber" :disabled='IsSignIn' placeholder="请输入工号" type="text" @keyup.enter="getJobNumber()" class="s-inpbg">
                    </span>
                </div>
            </div>
            <div class="g-scrollbox">
                <div class="f-auto">
                    <s-messageheader class="f-mt10" v-show='UserInfoList.length>=1' messagetitle="条码信息"></s-messageheader>
                    <swipeout :class="{'s-border':UserInfoList.length>=1}">
                        <swipeout-item :disabled='IsSignIn' v-for="(item,index) in UserInfoList" :key="index" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
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
                                            <span class="label">工号:</span>
                                            <span class="showmsg f-ml10">{{item.EmployeeNo}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">姓名:</span>
                                            <span class="showmsg f-ml10">{{item.EmployeeName}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">岗位:</span>
                                            <span class="showmsg f-ml10">{{item.JobType}}</span>
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
        <toast width='12em' v-model="showPositionValue" type="text" :time="2500" :text="Msg" position="middle"></toast>
        <loading :show="showThost" :text="loadingtitle"></loading>
        <x-dialog v-model="showXdialog">
            <div class="m-dialogbox">
                <div class="itembox" v-for="(item,index) in JobTypeList" :key="index" @click="choiceJob(item)">{{item}}</div>
            </div>
            <div @click="closeXdialog">
                <span class="vux-close"><x-icon type="ios-close-outline" size="30"></x-icon></span>
            </div>
        </x-dialog>
    </div>
</template> 

<script type="text/ecmascript-6">
import { XDialog } from 'vux'
export default {
    name: 'CheckWorkCollection',
    data() {
        return {
            showXdialog:false,
            ShowConfirm:false,      //控制提示弹窗的显隐
            ConfirmMsg:'提交成功',
            BadColor:false,
            Successbtn:true,
            Dangerbtn:true,

            showPositionValue:false,        //提示信息显隐
            Msg:'有问题',                         //提示信息

            showThost:false,                //圈圈的显隐
            loadingtitle:'提交中',                //圈圈文字
            JobNumber:null,           //工号
            NewSupportNumber:null,      //托号
            UserInfoList:[
                
            ],
            JobTypeList:null,             //岗位列表
            ScanUserInfo:{
                AttenceDate: "",
                AttenceFlag: null,
                AttenceTime: "",
                Department: null,
                DepartmentId: null,
                EmployeeId: null,
                EmployeeName: "",
                EmployeeNo: "",
                JobType: "",
                Process: null,
                ProcessId: null,
                ResourceManage: null,
                ResourceManageId: null,
                WorkGroupNumber: "",
            },              //扫描得到的用户信息
            IsSignIn:false      //判断是否有登录
        }
    },
    components: {
        XDialog
    },
    methods: {
        //获取工号
        getJobNumber(){
            if(!!this.JobNumber==false){
                this.showPositionValue=true
                this.Msg='工号不能为空'
                return
            }
            let IsExistence=this.UserInfoList.filter((item)=>{
                return item.EmployeeNo==this.JobNumber
            })
            console.log(IsExistence);
            if(IsExistence!=null && IsExistence.length>0){
                this.Msg=`已存存在工号${this.JobNumber}`
                this.showPositionValue=true
                this.JobNumber=null
                return
            }
            // if(!!this.JobNumber && !!this.NewSupportNumber){
            //     this.doSacnPlatePda(this.JobNumber,this.NewSupportNumber,this.$route.params.ProcessId)
            // }
            this.getEmployee(this.JobNumber)
        },
        //触发单项左右滑动
        handleEvents(type){
            console.log(type);
        },
        //点击删除按钮，删除当前项
        onButtonClick(index){
            console.log(index);
            this.UserInfoList.splice(index,1)
            this.JobNumber=null
        },
        //获取焦点事件
        getFocus(){
            console.log('获取焦点事件');
        },
        //失去焦点事件
        getBlur(){
            console.log('失去焦点事件');
        },
        //键盘回车事件
        getEnter(){
            console.log('键盘回车事件');
        },
        //点击提示弹窗的删除按钮
        onCancel(){

        },
        //点击提示弹窗的确认按钮
        onConfirm(){
            this.getUnFinishAttenceRecord(this.$route.params.ResourceId)
            setTimeout(() => {
                this.$refs.RefJobNumber.focus()
            }, 500);
        },
        //点击提交按钮
        doPost(){
            
            if(this.DataList.length<=0){
                this.showPositionValue=true
                this.Msg='提交数据不能为空'
                return
            }
            this.doSubmitFbChangePda(
                this.PanelNumber,
                this.$route.params.WorkshopCode,
                this.$route.params.ResourceId,
                this.$route.params.ProcessId,
                this.NewSupportNumber,
                this.$route.params.WorkGroupNumber
                )
        },
        //接口：扫描员工代号
        getEmployee(EmplyeeNo){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.getEmployee(EmplyeeNo).then(res=>{
                this.showThost=false
                if(res.Success==true){
                    console.log(res);
                    this.ScanUserInfo=res.Result
                    this.$refs.RefJobNumber.blur()
                    this.showXdialog=true
                }else{
                    this.JobNumber=null
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            }) 
        },
        //接口：获取岗位列表
        getJobTypes(){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.getJobTypes().then(res=>{
                this.showThost=false
                if(res.Success==true){
                    console.log(res);
                    this.JobTypeList=res.Result
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            }) 
        },
        //接口：取资源未关闭考勤
        getUnFinishAttenceRecord(ResourceManageId){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.getUnFinishAttenceRecord(ResourceManageId).then(res=>{
                this.showThost=false
                if(res.Success==true){
                    console.log('人员'+JSON.stringify(res) );
                    if(res.Result!=null && res.Result.length>0){
                        this.IsSignIn=true
                    }else{
                        this.IsSignIn=false
                    }
                    this.UserInfoList=res.Result
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            }) 
        },
        //接口：提交上机记录
        submitLoadAttece(List,DepartmentId,ProcessId,ResourceManageId){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.submitLoadAttece(List,DepartmentId,ProcessId,ResourceManageId).then(res=>{
                this.showThost=false
                console.log(res);
                if(res.Success==true){
                    this.ShowConfirm=true
                    this.ConfirmMsg='提交成功'
                    this.BadColor=false
                    this.Successbtn=true
                    this.Dangerbtn=false
                    this.UserInfoList=[]
                    this.JobNumber=null           //工号
                }else{
                    this.ShowConfirm=true
                    this.ConfirmMsg=res.Message
                    this.BadColor=true
                    this.Successbtn=false
                    this.Dangerbtn=true
                }
            }) 
        },
        //接口：下机
        submitUnLoadAttece(ResourceManageId){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.submitUnLoadAttece(ResourceManageId).then(res=>{
                this.showThost=false
                console.log(res);
                if(res.Success==true){
                    this.ShowConfirm=true
                    this.ConfirmMsg='提交成功'
                    this.BadColor=false
                    this.Successbtn=true
                    this.Dangerbtn=false
                    this.UserInfoList=[]
                    this.JobNumber=null           //工号
                }else{
                    this.ShowConfirm=true
                    this.ConfirmMsg=res.Message
                    this.BadColor=true
                    this.Successbtn=false
                    this.Dangerbtn=true
                }
            }) 
        },
        // 点击上机按钮
        upMachine(){
            console.log('上机');
            
            if(this.UserInfoList.length>0){
                this.UserInfoList.map((item,index)=>{
                    item.DepartmentId=this.$route.params.WorkshopId
                    item.ProcessId=this.$route.params.ProcessId
                    item.ResourceManageId=this.$route.params.ResourceId
                })
                this.submitLoadAttece(
                    this.UserInfoList,
                    this.$route.params.WorkshopId,
                    this.$route.params.ProcessId,
                    this.$route.params.ResourceId
                )
            }else{
                this.Msg='提交数据不能为空'
                this.showPositionValue=true
            }
        },
        // 点击下机按钮
        downMachine(){
            console.log('下机');
            this.submitUnLoadAttece(this.$route.params.ResourceId)
        },
        //选择岗位
        choiceJob(job){
            let IsHasMainForce=this.UserInfoList.filter((item)=>{
                return item.JobType=='主机手'
            })
            console.log(IsHasMainForce);
            if(IsHasMainForce.length>0 && IsHasMainForce[0].JobType==job){
                this.Msg='已存在主机手，请重新选择岗位'
                this.showPositionValue=true
            }else{
                this.ScanUserInfo.JobType=job
                this.UserInfoList.push(this.ScanUserInfo)
                this.showXdialog=false
                this.JobNumber=null
                this.$refs.RefJobNumber.focus()
            }
            
        },
        //关闭弹窗
        closeXdialog(){
            this.showXdialog=false
            this.JobNumber=null
            this.$refs.RefJobNumber.focus()
        }   

    },
    created(){
        this.getJobTypes()
        this.getUnFinishAttenceRecord(this.$route.params.ResourceId)
    },
    mounted () {
        console.log(this.$route);
        this.$refs.RefJobNumber.focus()
    }
}
</script>

<style lang="less">

</style>
