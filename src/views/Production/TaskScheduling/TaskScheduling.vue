<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            任务分派
            <!-- <a slot="right" style="margin-right:16px;" @click="doDelete">取消</a>
            <a slot="right" style="font-size:24px" @click="doPost">提交</a> -->
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-scrollbox">
                <div class="g-inp" style="min-height:350px; border-bottom: none">
                    <div class="m-inp f-mtb10">
                        <span class="laber100" style="width:120px;">托号\板件号</span>
                        <span class="inp s-inpbg">
                            <input v-model="PanelNumber" ref="UPIInp" placeholder="请扫描托号\板件号" type="text" @keyup.enter="getPanelNumber()" class="s-inpbg">
                        </span>
                    </div>
                    <div class="m-inp f-mtb10">
                        <span class="laber100" style="width:120px;">托盘序号</span>
                        <span class="inp s-inpgray">
                            <input v-model="BasePlate" type="text" class="s-inpgray" disabled>
                        </span>
                    </div>
                    <div class="m-inp f-mtb10">
                        <span class="laber100" style="width:120px;">子批次</span>
                        <span class="inp s-inpgray">
                            <input v-model="TaskBatch" type="text" class="s-inpgray" disabled>
                        </span>
                    </div>
                    <div class="m-inp f-mtb10">
                        <span class="laber100" style="width:120px;">当前工序</span>
                        <span class="inp s-inpgray">
                            <input v-model="CurrentProcesses" type="text" class="s-inpgray" disabled>
                        </span>
                    </div>
                    <div class="m-inp f-mtb10">
                        <span class="laber100" style="width:120px;">来源机台</span>
                        <span class="inp s-inpgray">
                            <input v-model="SourceMachine" type="text" class="s-inpgray" disabled>
                        </span>
                    </div>
                    <div class="m-inp f-mtb10">
                        <span class="laber100" style="width:120px;">目标机台</span>
                        <div  @click="Showmachine" class="m-selector s-inpbg" style="width: 80%;">
                            <popup-picker 
                                :show.sync="ShowMachine" 
                                :data="MachineList" 
                                @on-change="changeMachine"
                                value-text-align='left'
                            ></popup-picker>
                            <div>{{ChoiceMachine}}</div>
                        </div>    
                    </div>
                    <div class="m-taskbtn">
                        <span class="fixbarbtn success" @click="doPost">提交</span>
                        <span class="fixbarbtn danger" @click="doDelete">取消</span>
                    </div>
                </div>
                <!-- <div class="m-fixbar">
                    <span class="fixbarbtn" @click="doPost">提交</span>
                    <span class="fixbarbtn" @click="doDelete">取消</span>
                </div> -->
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
    </div>
</template> 

<script type="text/ecmascript-6">
export default {
    name: 'TaskScheduling',
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


            PanelNumber:null,           //板件号
            BasePlate:null,             //托盘序号
            TaskBatch:null,             //任务批次
            CurrentProcesses:null,      //当前工序
            CurrentProcessesId:null,    //当前工序id
            SourceMachine:null,         //来源机台
            SourceMachineId:null,         //来源机台Id
            DepartmentId:null,          //部门Id
            ShowMachine:false,         //控制目标机台弹窗的显隐
            ChoiceMachine:null,         //选择的目标机台
            ChoiceMachineId:null,         //选择的目标机台Id
            MachineList:[['']],        //目标机台的列表
            GetMachine:null,            //获取到的机台信息
            PostId:null,                //需要提交的id

        }
    },
    components: {
    },
    methods: {
        //获取托号
        getPanelNumber(){
            if(!this.PanelNumber){
                this.showPositionValue=true
                this.Msg=`托号/板件号不能为空`
            }
            this.scanPlateOrUpi(this.PanelNumber)
            console.log(this.PanelNumber);
        },
        //点击机台
        Showmachine(){
            if(!!this.PanelNumber){
                this.ShowMachine=true
                //选择机台
                this.targetMachines(this.DepartmentId,this.CurrentProcessesId,this.SourceMachineId)
            }else{
                this.showPositionValue=true
                this.Msg=`托号/板件号不能为空`
                this.ShowMachine=false
            }
        },
        //触发单项左右滑动
        handleEvents(type){
            console.log(type);
        },
        //点击删除按钮，删除当前项
        onButtonClick(index){
            console.log(index);
            this.checklistdata.splice(index,1)
        },
        //键盘回车事件
        getEnter(){
            console.log('键盘回车事件');
        },
        //点击提示弹窗的删除按钮
        onCancel(){
            this.ShowConfirm=false
            this.ConfirmMsg=''
            this.BadColor=false
            this.Successbtn=false
            this.Dangerbtn=false
            this.$refs.UPIInp.focus()
        },
        //点击提示弹窗的确认按钮
        onConfirm(){
            this.ShowConfirm=false
            this.ConfirmMsg=''
            this.BadColor=false
            this.Successbtn=false
            this.Dangerbtn=false
            this.doDelete()
            this.$refs.UPIInp.focus()
        },
        //点击取消
        doDelete(){
            this.PanelNumber=null           //板件号
            this.BasePlate=null             //托盘序号
            this.TaskBatch=null             //任务批次
            this.CurrentProcesses=null      //当前工序
            this.CurrentProcessesId=null    //当前工序id
            this.SourceMachine=null         //来源机台
            this.SourceMachineId=null       //来源机台id
            this.ChoiceMachine=null         //目标机台
            this.ChoiceMachineId=null       //目标机台Id
            this.PostId=null                //提交的Id
        },
        //点击提交按钮
        doPost(){
            if(this.ChoiceMachineId==null){
                this.showPositionValue=true
                this.Msg=`目标机台不能为空`
                return
            }
            console.log(`${this.PostId},${this.ChoiceMachineId}`)
            this.submintTaskScheduling(this.PostId,this.ChoiceMachineId)
        },
        // 选择机台
        changeMachine(value){
            let id = value[0]
            this.ChoiceMachineId=value[0]
            this.ChoiceMachine = this.GetMachine.find(item=>item.Id == id).Name
        },

        // 接口：扫描垫板或upi
        scanPlateOrUpi(scanData){
            this.loadingtitle='加载中'
            this.showThost=true
            console.log(scanData)
            this.$axiosApi.scanPlateOrUpi(scanData).then(res=>{
                this.showThost=false
                if(res.Success==true){
                    console.log(res);
                    this.BasePlate=res.Result.BasePlate
                    this.TaskBatch=res.Result.SubBatch
                    this.CurrentProcesses=res.Result.Process
                    this.CurrentProcessesId=res.Result.ProcessId
                    this.SourceMachine=res.Result.SourceResourceName
                    this.SourceMachineId=res.Result.SourceResourceId
                    this.DepartmentId=res.Result.DepartmentId
                    this.PostId=res.Result.Id
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    this.PanelNumber=null
                }
            }) 
        },

        // 接口：获取目标机台
        targetMachines(departmentId,processId,sourceResourceId){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.targetMachines(departmentId,processId,sourceResourceId).then(res=>{
                this.showThost=false
                if(res.Success==true){
                    console.log(res);
                    this.GetMachine=res.Result
                    this.MachineList=[[]]
                    this.MachineList = [this.GetMachine.map(item=>{
                       return {name:item.Name,value:item.Id}
                    })]
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            }) 
        },

        // 接口：提交任务调度采集
        submintTaskScheduling(commonTaskPlatformId,targetResourceId){
            this.loadingtitle='提交中'
            this.showThost=true
            this.$axiosApi.submintTaskScheduling(commonTaskPlatformId,targetResourceId).then(res=>{
                this.showThost=false
                if(res.Success==true){
                    this.ShowConfirm=true
                    this.ConfirmMsg='提交成功'
                    this.BadColor=false
                    this.Successbtn=true
                    this.Dangerbtn=false
                }else{
                    this.ShowConfirm=true
                    this.ConfirmMsg=res.Message
                    this.BadColor=true
                    this.Successbtn=false
                    this.Dangerbtn=true
                }
            }) 
        },
    },
    mounted () {
        this.$refs.UPIInp.focus()
    }
}
</script>

<style lang="less">

</style>
