<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            封边换托采集
            <!-- <a slot="right">取消</a> -->
            <a slot="right" @click="doPost">提交</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-inp" style="min-height:60px;">
                <div class="m-inp f-mtb5">
                    <span class="laber100">托号\板件</span>
                    <span class="inp s-inpbg">
                        <input v-model="PanelNumber" ref="RefPanelNumber" :disabled='DataList.length>=1' placeholder="请扫描托号\板件号" type="text" @keyup.enter="getSupportNumber()" class="s-inpbg">
                    </span>
                </div>
                <div class="m-inp f-mtb5">
                    <span class="laber100">新托号</span>
                    <span class="inp s-inpbg">
                        <input v-model="NewSupportNumber" ref="RefNewSupportNumber" :disabled='DataList.length>=1' placeholder="请扫描托号" type="text" @keyup.enter="getNewSupportNumber()" class="s-inpbg" @focus="getFocus()" @blur="getBlur()">
                    </span>
                </div>
            </div>
            <div class="g-scrollbox">
                <div class="f-auto">
                    <s-messageheader class="f-mt10" v-show='DataList.length>=1' messagetitle="条码信息"></s-messageheader>
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
                                            <span class="label">原垫板号:</span>
                                            <span class="showmsg f-ml10">{{item.StartPlateCode}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">生产批次:</span>
                                            <span class="showmsg f-ml10">{{item.SubBatchNo}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">板件数:</span>
                                            <span class="showmsg f-ml10">{{item.UpiSumQty}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">板件类型:</span>
                                            <span class="showmsg f-ml10">{{item.PalletCategoryCode}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">新垫板号:</span>
                                            <span class="showmsg f-ml10">{{item.EndPlateCode}}</span>
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
            PanelNumber:null,           //板件号
            NewSupportNumber:null,      //托号
            DataList:[
                // {
                //     "ProductBatch":"c64s9194",
                //     "SupportNumber":"457265",
                //     "PreBatch":"34911964895",
                //     "CurrentProduct":"3358942687",
                //     "PanelNumber":"6949582463",
                // },
            ],

        }
    },
    components: {
    },
    methods: {
        //获取托号
        getSupportNumber(){
            if(!!this.PanelNumber==false){
                this.showPositionValue=true
                this.Msg='托号/板件不能为空'
                return
            }
            this.$refs.RefNewSupportNumber.focus()
            // if(this.PostCode.indexOf(this.PanelNumber)>=0){
            //     this.showPositionValue=true
            //     this.Msg=`包装条码：${this.BarCode}已存在`
            //     this.BarCode=null
            //     return
            // }
            if(!!this.PanelNumber && !!this.NewSupportNumber){
                this.doSacnPlatePda(this.PanelNumber,this.NewSupportNumber,this.$route.params.ProcessId)
            }
            console.log(this.PanelNumber);
        },
        getNewSupportNumber(){
            if(!!this.NewSupportNumber==false){
                this.showPositionValue=true
                this.Msg='新托号不能为空'
                return
            }
            if(!!this.PanelNumber && !!this.NewSupportNumber){
                this.doSacnPlatePda(this.PanelNumber,this.NewSupportNumber,this.$route.params.ProcessId)
            }
            // if(this.PostCode.indexOf(this.PanelNumber)>=0){
            //     this.showPositionValue=true
            //     this.Msg=`包装条码：${this.BarCode}已存在`
            //     this.BarCode=null
            //     return
            // }
            console.log(this.NewSupportNumber);
        },
        //触发单项左右滑动
        handleEvents(type){
            console.log(type);
        },
        //点击删除按钮，删除当前项
        onButtonClick(index){
            console.log(index);
            this.DataList.splice(index,1)
            this.PanelNumber=null
            this.NewSupportNumber=null
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
        onConfirm(){},
        //点击提交按钮
        doPost(){
            
            if(this.DataList.length<=0){
                this.showPositionValue=true
                this.Msg='提交数据不能为空'
                return
            }
            console.log(this.PanelNumber,
                this.$route.params.WorkshopCode,
                this.$route.params.ResourceId,
                this.$route.params.ProcessId,
                this.NewSupportNumber,
                this.$route.params.WorkGroupNumber);
            this.doSubmitFbChangePda(
                this.PanelNumber,
                this.$route.params.WorkshopCode,
                this.$route.params.ResourceId,
                this.$route.params.ProcessId,
                this.NewSupportNumber,
                this.$route.params.WorkGroupNumber
                )
        },
        changeDefectName(value){
            this.ChoiceDefectName=value[0]
        },
        changeSmallDefect(value){
            this.ChoiceSmallDefect=value[0]
        },
        //接口：封边采集PDA端-扫前垫板与后垫板
        doSacnPlatePda(StartPlateCode,EndPlateCode,CurrentProcessId){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.doSacnPlatePda(StartPlateCode,EndPlateCode,CurrentProcessId).then(res=>{
                this.showThost=false
                if(res.Success==true){
                    console.log(res);
                    this.DataList.push(res.Result)
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            }) 
        },
        //接口：封边采集PDA端-提交
        doSubmitFbChangePda(OldPlateCode,DepartmentCode,ResourceManageId,CurrentProcessId,NewPlateCode,WorkGroupNumber){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.doSubmitFbChangePda(OldPlateCode,DepartmentCode,ResourceManageId,CurrentProcessId,NewPlateCode,WorkGroupNumber).then(res=>{
                this.showThost=false
                if(res.Success==true){
                    console.log(res);
                    this.ShowConfirm=true
                    this.ConfirmMsg='提交成功'
                    this.BadColor=false
                    this.Successbtn=true
                    this.Dangerbtn=false
                    this.DataList=[]
                    this.PanelNumber=null           //板件号
                    this.NewSupportNumber=null      //托号
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
        // console.log(this.$route.params.ProcessId);
        this.$refs.RefPanelNumber.focus()
    }
}
</script>

<style lang="less">

</style>
