<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            封边异常换托
            <!-- <a slot="right">取消</a> -->
            <a slot="right" @click="goCollection">下一步</a>
        </x-header>
        <div class="f-flexvw f-flexg1">
            <div class="g-scrollbox">

                <div class="m-inp f-mtb5">
                    <span class="laber">车间</span>
                    <!-- <span class="inp s-bgwhile" @click="ShowProcedure = true">{{choiceDepartments}}</span> -->
                    <div  @click="ShowWorkshop = true" class="m-selector">
                        <popup-picker 
                            :show.sync="ShowWorkshop" 
                            :data="WorkshopList" 
                            @on-change="changeWorkshop"
                            value-text-align='left'
                        ></popup-picker>
                        <div>{{ChoiceWorkshop}}</div>
                    </div>    
                </div>
                
                <div class="m-inp f-mtb5">
                    <span class="laber">工序</span>
                    <!-- <span class="inp s-bgwhile" @click="ShowProcedure = true">{{choiceDepartments}}</span> -->
                    <div  @click="ShowProcess = true" class="m-selector">
                        <popup-picker 
                            :show.sync="ShowProcess" 
                            :data="ProcessList" 
                            @on-change="changeProcess"
                            value-text-align='left'
                        ></popup-picker>
                        <div>{{ChoiceProcess}}</div>
                    </div>    
                </div>
                <div class="m-inp f-mtb5">
                    <span class="laber">资源</span>
                    <!-- <span class="inp s-bgwhile" @click="ShowProcedure = true">{{choiceDepartments}}</span> -->
                    <div  @click="doShowResource" class="m-selector">
                        <popup-picker 
                            :show.sync="ShowResource" 
                            :data="ResourceList" 
                            @on-change="changeResource"
                            value-text-align='left'
                        ></popup-picker>
                        <div>{{ChoiceResource}}</div>
                    </div>    
                </div>
            </div>
        </div>

        <toast width='20em' v-model="showPositionValue" type="text" :time="2500" :text="Msg" position="middle"></toast>
        <loading :show="showThost" :text="loadingtitle"></loading>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'PackResourceSelection',
    data() {
        return {
            showPositionValue:false,        //提示信息显隐
            Msg:'有问题',                         //提示信息

            showThost:false,                //圈圈的显隐
            loadingtitle:'加载中',                //圈圈文字

            ShowConfirm:false,          //控制提交弹窗显隐
            ShowWorkshop:false,         //控制车间弹窗的显隐
            ChoiceWorkshop:null,        //选择的车间名称
            ChoiceWorkshopId:null,      //选择的车间id
            WorkshopList:[[' ']],       //显示的车间列表
            GetWorkshop:null,           //接口获取车间的数据

            ShowProcess:false,          //控制工序弹窗的显隐
            ChoiceProcess:null,         //选择的工序名称
            ChoiceProcessId:null,       //选择的工序id
            GetProcess:null,            //接口获取工序的数据
            ProcessList:[[' ']],        //显示的工序列表

            ShowResource:false,         //控制资源弹窗的显隐
            ChoiceResource:null,        //选择的资源名称
            ChoiceResourceId:null,      //选择的资源id
            ResourceList:[[' ']],       //显示的资源列表
            GetResource:null,           //接口获取资源的数据
        }   
    },
    components: {

    },
    methods: {


        //点击提示弹窗的删除按钮
        onCancel(){
        },
        //点击提示弹窗的确认按钮
        onConfirm(){},
        //点击提交按钮
        goCollection(){
            if(this.ChoiceWorkshopId=='' || this.ChoiceWorkshopId==null){
                this.Msg='请先选择车间'
                this.showPositionValue=true
                return
            }
            if(this.ChoiceProcessId=='' || this.ChoiceProcessId==null){
                this.Msg='请先选择工序'
                this.showPositionValue=true
                return
            }
            if(this.ChoiceResourceId=='' || this.ChoiceResourceId==null){
                this.Msg='请先选择资源'
                this.showPositionValue=true
                return
            }
            // this.$router.push({name:'SealingCollection',params:{
            //     WorkshopId:this.ChoiceWorkshopId,
            //     ProcessId:this.ChoiceProcessId,
            //     ResourceId:this.ChoiceResourceId
            // }})
            this.packageCheckAttendance(this.ChoiceWorkshopId,this.ChoiceProcessId,this.ChoiceResourceId)
            
        },
        //选择某一项车间
        changeWorkshop(value){
            let id = value[0]
            this.ChoiceWorkshopId=value[0]
            localStorage.setItem('AbnormalSealingWorkshopKey',this.ChoiceWorkshopId)
            this.ChoiceWorkshop = this.GetWorkshop.find(item=>item.Id == id).Code
            this.ChoiceResourceId=null
            this.ChoiceResource=null
        },
        //选择某一项工序
        changeProcess(value){
            let id = value[0]
            this.ChoiceProcessId=value[0]
            localStorage.setItem('AbnormalSealingProcessKey',this.ChoiceProcessId)
            this.ChoiceProcess = this.GetProcess.find(item=>item.Id == id).Name
            this.ChoiceResourceId=null
            this.ChoiceResource=null
            localStorage.setItem('AbnormalSealingResourceKey',this.ChoiceResourceId)
        },
        //选择某一项资源
        changeResource(value){
            let id = value[0]
            this.ChoiceResourceId=value[0]
            localStorage.setItem('AbnormalSealingResourceKey',this.ChoiceResourceId)
            this.ChoiceResource = this.GetResource.find(item=>item.Id == id).Name
        },
        //接口：获取车间数据接口
        async getCollectWorkshops(){
            this.loadingtitle='加载中'
            this.showThost=true
            await this.$axiosApi.getCollectWorkshops('',0,1).then(res=>{
                this.showThost=false
                if(res.Success==true){
                    console.log(res);
                    this.GetWorkshop=res.Result.Datas
                    this.WorkshopList=[[]]
                    this.WorkshopList = [this.GetWorkshop.map(item=>{
                       return {name:item.Code,value:item.Id}
                    })]
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            }) 
        },
        //接口：获取工序数据接口
        async getCollectProcesses(){
            this.loadingtitle='加载中'
            this.showThost=true
            await this.$axiosApi.getCollectProcesses('',0,1).then(res=>{
                this.showThost=false
                if(res.Success==true){
                    console.log(res);
                    this.GetProcess=res.Result.Datas
                    this.ProcessList=[[]]
                    this.ProcessList = [this.GetProcess.map(item=>{
                       return {name:item.Name,value:item.Id}
                    })]
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            }) 
        },
        //接口：获取资源数据接口
        async getCollectResources(workshopId,processesId){
            this.loadingtitle='加载中'
            this.showThost=true
            await this.$axiosApi.getCollectResources(workshopId,processesId,'',0,1).then(res=>{
                this.showThost=false
                if(res.Success==true){
                    console.log(res);
                    this.GetResource=res.Result.Datas
                    this.ResourceList=[[]]
                    this.ResourceList = [this.GetResource.map(item=>{
                       return {name:item.Name,value:item.Id}
                    })]
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            }) 
        },
        //接口：查找考勤情况
        packageCheckAttendance(workshopId,processId,resourceId){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.packageCheckAttendance(workshopId,processId,resourceId).then(res=>{
                this.showThost=false
                if(res.Success==true){
                    console.log(res);
                    this.$router.push({name:'AbnormalSealingCollection',params:{
                        WorkshopCode:this.ChoiceWorkshop,
                        ProcessId:this.ChoiceProcessId,
                        ResourceId:this.ChoiceResourceId,
                        WorkGroupNumber:res.Result
                    }})
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            }) 
        },
        //获取存在本地的车间，并且判断之前存储的值是否在当前车间列表中存在，存在才赋值
        async judgeWorkshop(){
            await this.getCollectWorkshops()
            if (localStorage.getItem('AbnormalSealingWorkshopKey')) {
                let newArr=this.GetWorkshop.filter(item=>{
                    return item.Id==localStorage.getItem('AbnormalSealingWorkshopKey')
                })
                if(newArr.length>0){
                    this.ChoiceWorkshopId=localStorage.getItem('AbnormalSealingWorkshopKey')
                    this.ChoiceWorkshop=newArr[0].Code
                }
            }
        },
        //获取存在本地的工序，并且判断之前存储的值是否在当前工序列表中存在，存在才赋值
        async judgeProcess(){
            await this.getCollectProcesses()
            if (localStorage.getItem('AbnormalSealingProcessKey')) {
                let newArr=this.GetProcess.filter(item=>{
                    return item.Id==localStorage.getItem('AbnormalSealingProcessKey')
                })
                if(newArr.length>0){
                    this.ChoiceProcessId=localStorage.getItem('AbnormalSealingProcessKey')
                    this.ChoiceProcess=newArr[0].Name
                }
            }
        },
        //获取存在本地的资源，并且判断之前存储的值是否在当前工序列表中存在，存在才赋值
        async judgeResources(){
            
            await this.getCollectResources(this.ChoiceWorkshopId,this.ChoiceProcessId)
            if (localStorage.getItem('AbnormalSealingResourceKey')) {
                let newArr=this.GetResource.filter(item=>{
                    return item.Id==localStorage.getItem('AbnormalSealingResourceKey')
                })
                if(newArr.length>0){
                    this.ChoiceResourceId=localStorage.getItem('AbnormalSealingResourceKey')
                    this.ChoiceResource=newArr[0].Name
                }
            }
        },
        doShowResource(){
            if(this.ChoiceWorkshopId=='' || this.ChoiceWorkshopId==null){
                this.Msg='请先选择车间'
                this.showPositionValue=true
                return
            }
            if(this.ChoiceProcessId=='' || this.ChoiceProcessId==null){
                this.Msg='请先选择工序'
                this.showPositionValue=true
                return
            }
            this.ShowResource=true
            this.getCollectResources(this.ChoiceWorkshopId,this.ChoiceProcessId)
        },
        async controlExecutionOrder(){
            await this.judgeWorkshop()
            await this.judgeProcess()
            // console.log(!!this.ChoiceWorkshopId && !!this.ChoiceProcessId);
            if(!!this.ChoiceWorkshopId && !!this.ChoiceProcessId){
                this.judgeResources()
            }
        }
    },
    created(){
        this.controlExecutionOrder()
    },
    mounted () {
       
    }
}
</script>

<style lang="less">


</style>
