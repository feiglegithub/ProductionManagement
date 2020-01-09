<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            过站采集
            <!-- <a slot="right">取消</a> -->
            <a slot="right" @click="doPost">提交</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-inp" style="min-height: 110px;">
                <div class="m-selectinp f-mtb5" style="justify-content: space-around;" v-if="ShowSwitch">
                    <div :class="{activestyle:Edge=='2'}" style="font-size: 16px;margin-left: 5px;">两边</div>
                    <!-- <x-switch class="f-mtb5" style="font-size: 16px;padding:0 10px;" title="" :value-map="['2','4']" v-model="Edge" @on-change="changeEdge"></x-switch> -->
                    <s-switch @changeSwitch='changeSwitch' :inputValue='inputValue'></s-switch>
                    <div :class="{activestyle:Edge=='4'}" style="font-size: 16px;margin-left: 5px;">四边</div>
                </div>
                <div class="m-inp f-mtb5">
                    <span class="laber100">UPI/清单号</span>
                    <span class="inp s-inpbg">
                        <input ref="BarcodeInp" v-model="SupportNumber" placeholder="请扫描UPI/清单号" type="text" @keyup.enter="getSupportNumber()" class="s-inpbg" @focus="getFocus()" @blur="getBlur()">
                    </span>
                </div>
                <div class="m-inp f-mtb5">
                    <span class="laber100">子批次</span>
                    <span class="inp ">{{SubBatch}}</span>
                </div>
            </div>
            <div class="g-scrollbox">
                <div class="f-auto">
                    <div class="m-dangermsg" v-show="ErrMsg">
                        {{ErrMsg}}
                    </div>
                    <s-messageheader class="f-mt10" messagetitle="条码信息" v-show="DataList.length>0"></s-messageheader>
                    <!-- <swipeout class="s-border">
                        <swipeout-item v-for="(item,index) in DataList" :key="index" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
                            <div slot="right-menu" style="padding:5px 0;">
                            <swipeout-button @click.native="onButtonClick(index)" type="warn">删除</swipeout-button>
                            </div> -->
                            <div class="f-pd5 vux-1px-t">
                                <div class="m-listbox f-mtb5" v-for="(item,index) in DataList" :key="index">
                                    <div class="num">
                                        {{index+1}}
                                    </div>
                                    <div class="showbox">
                                        <div class="showlistmsg">
                                            <span class="label">开料范围:</span>
                                            <span class="showmsg f-ml10">{{item.CuttingRange}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">资源:</span>
                                            <span class="showmsg f-ml10">{{item.SourceResourceName}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">计划数量:</span>
                                            <span class="showmsg f-ml10">{{item.PlanNumber}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">报工数量:</span>
                                            <span class="showmsg f-ml10">
                                                <input class="" v-model="item.SubmitNumber" type="number" name="" id="" @keyup="getValue(item,item.SubmitNumber)">
                                            </span>
                                        </div>
                                        <div class="showlistmsg f-mtb5">
                                            <span class="label">报工资源:</span>
                                            <div  @click="doShowResource(item)" class="m-selector f-ml10">
                                                
                                                <div>{{item.ChoiceResource}}</div>
                                            </div> 
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        <!-- </swipeout-item>
                    </swipeout> -->
                </div>
                <div>
                    <popup-picker 
                        :show.sync="ShowResource" 
                        :data="ResourceList" 
                        @on-change="changeResource"
                        value-text-align='left'
                    ></popup-picker>
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
    </div>
</template> 

<script type="text/ecmascript-6">
import SWitch from '../../../components/s-switch.vue';
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
            "checklistdata": [
                {
                    "No": "310000200102010111",
                    "Name": "Margaret",
                    "Machine": "24台机",
                    "state": "1",
                    "Type":"可用"
                },
                {
                    "No": "65000019871119214X",
                    "Name": "Robert Wilson",
                    "Machine": "27台机www",
                    "state": "1",
                    "Type":"可用"
                },
                {
                    "No": "540000199611293110",
                    "Name": "Mark Jones",
                    "Machine": "17台机",
                    "state": "1",
                    "Type":"可用"
                },
                {
                    "No": "620000199802249374",
                    "Name": "Jeffrey Wilson",
                    "Machine": "29台机",
                    "state": "1",
                    "Type":"可用"
                },
                {
                    "No": "420000201102175768",
                    "Name": "Deborah Brown",
                    "Machine": "14台机",
                    "state": "1",
                    "Type":"报废"
                },
                {
                    "No": "71000019750429118X",
                    "Name": "Matthew Brown",
                    "Machine": "12台机",
                    "state": "1",
                    "Type":"报废"
                },
                {
                    "No": "820000199011205532",
                    "Name": "Karen Thomas",
                    "Machine": "22台机",
                    "state": "1",
                    "Type":"报废"
                },
                {
                    "No": "51000019911202237X",
                    "Name": "Robert Miller",
                    "Machine": "19台机",
                    "state": "1",
                    "Type":"报废"
                },
                {
                    "No": "44000019921004753X",
                    "Name": "Gary Williams",
                    "Machine": "21台机",
                    "state": "1",
                    "Type":"报废"
                },
                {
                    "No": "500000200401058188",
                    "Name": "Edward Lee",
                    "Machine": "24台机",
                    "state": "1",
                    "Type":"报废"
                },
                {
                    "No": "310000200102010111",
                    "Name": "Margaret Anderson",
                    "Machine": "24台机",
                    "state": "1",
                    "Type":"报废"
                },
                {
                    "No": "65000019871119214X",
                    "Name": "Robert Wilson",
                    "Machine": "27台机",
                    "state": "1",
                    "Type":"报废"
                },
                {
                    "No": "540000199611293110",
                    "Name": "Mark Jones",
                    "Machine": "17台机",
                    "state": "1",
                    "Type":"报废"
                },
            ],
            SupportNumber:null,      //托号
            DataList:[
                // {
                //     "ProductBatch":"c64s9194",
                //     "SupportNumber":"457265",
                //     "PreBatch":"34911964895",
                //     "CurrentProduct":"3358942687",
                //     "PanelNumber":"6949582463",
                // },
                // {
                //     "ProductBatch":"c64s9194",
                //     "SupportNumber":"457265",
                //     "PreBatch":"34911964895",
                //     "CurrentProduct":"3358942687",
                //     "PanelNumber":"6949582463",
                // },
            ],
            SubBatch:null,              //子批次
            ShowResource:false,         //控制资源弹窗的显隐
            ChoiceResource:null,        //选择的资源名称
            ChoiceResourceId:null,      //选择的资源id
            ResourceList:[[' ']],       //显示的资源列表
            GetResource:null,           //接口获取资源的数据

            nowItem:null,               //当前选择的项目

            ScanSupportNumberList:[],   //已经扫描的upi

            ErrMsg:null,                //报错信息
            SaveNumber:null,            //保存的剩余量
            Edge:4,                  //多少边
            inputValue:true,               //控制选择组件的状态
            ShowSwitch:false,           //控制是否显示切换switch
        }
    },
    components: {
        's-switch':SWitch
    },
    methods: {
        // 切换switch的事件
        changeSwitch(value){
            // console.log(value);
            this.inputValue=value
            this.inputValue==false?this.Edge=2:this.Edge=4
            // console.log(this.inputValue);
        },
        //获取托号
        getSupportNumber(){
            console.log(this.SupportNumber);
            if(!!this.SupportNumber==false){
                this.showPositionValue=true
                this.Msg='UPI/清单号不能为空'
                return
            }
            this.scanListOrUpi(this.$route.params.WorkshopId,this.$route.params.ProcessId,this.SupportNumber)
        },

        //选择某一项资源
        changeResource(value){
            let id = value[0]
            // this.ChoiceResourceId=value[0]
            // console.log(value[0]);
            // // localStorage.setItem('PackResourceKey',this.ChoiceResourceId)
            // this.ChoiceResource = this.GetResource.find(item=>item.Id == id).Name
            this.nowItem.SubmitResourceId=value[0]
            this.nowItem.SubmitResourceName=this.GetResource.find(item=>item.Id == id).Name
            this.nowItem.ChoiceResource=this.GetResource.find(item=>item.Id == id).Name
        },
        doShowResource(item){
            this.ShowResource=true
            this.nowItem=item
            this.getCollectResources(this.$route.params.WorkshopId,this.$route.params.ProcessId)
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
            this.$refs.BarcodeInp.focus()
        },
        //点击提示弹窗的确认按钮
        onConfirm(){
            this.$refs.BarcodeInp.focus()
        },
        //点击提交按钮
        doPost(){
            // this.ShowConfirm=true
            // console.log(this.DataList);
            // console.log(this.Edge);
            if(this.$route.params.ProcessName!='封边'){
                this.Edge=-1
            }
            if(this.DataList.length>0){
                this.submintSmallPlate(this.DataList,this.Edge)
            }else{
                this.Msg='提交数据不能为空'
                this.showPositionValue=true
            }
            
        },
        //监控输入值不能大于剩余量
        getValue(item,value){
            console.log(item);
            console.log(value);
            if(value>item.SaveSubmitNumber){
                item.SubmitNumber = null
            }
        },


        getCollectResources(workshopId,processesId){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.getCollectResources(workshopId,processesId,'',0,1).then(res=>{
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

        //接口：扫描UPI或清单号
        scanListOrUpi(departmentId,processId,scanData){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.scanListOrUpi(departmentId,processId,scanData).then(res=>{
                this.showThost=false
                console.log(res);
                if(res.Success==true){
                    console.log(res.Result[0]);
                    this.SubBatch=res.Result[0].SubBatch
                    
                    res.Result.map((item,index)=>{
                        item.ChoiceResource=item.SubmitResourceName
                        item.SubmitResourceId=item.SubmitResourceId
                        item.SaveSubmitNumber=item.SubmitNumber
                    })
                    this.DataList=res.Result


                    this.SupportNumber=null
                    // this.SubBatch=null
                    this.$refs.BarcodeInp.focus()
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    this.SupportNumber=null
                    this.SubBatch=null
                    this.$refs.BarcodeInp.focus()
                }
                
            }) 
        },

        //接口：提交小板件报工采集
        submintSmallPlate(dataList,numberOfEdges){
            this.loadingtitle='提交中'
            this.showThost=true
            this.$axiosApi.submintSmallPlate(dataList,numberOfEdges).then(res=>{
                console.log(res);
                this.showThost=false
                if(res.Success==true){
                    console.log(res);
                    this.ShowConfirm=true
                    this.ConfirmMsg='提交成功'
                    this.BadColor=false
                    this.Successbtn=true
                    this.Dangerbtn=false
                    this.PostCode=[]
                    this.BarCode=null
                    this.DataList=[]
                    this.ErrMsg=null
                    this.SubBatch=null
                }else{
                    this.ShowConfirm=true
                    this.ConfirmMsg='提交失败'
                    this.ErrMsg=res.Message
                    this.BadColor=true
                    this.Successbtn=false
                    this.Dangerbtn=true
                }
            }) 
        },
    },
    created(){
        if(this.$route.params.ProcessName=='封边'){
            this.ShowSwitch=true
        }
    },
    mounted () {
        this.$refs.BarcodeInp.focus()
        console.log(this.$route.params);
    }
}
</script>

<style lang="less">

</style>
