<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            封边异常换托
            <!-- <a slot="right">取消</a> -->
            <a slot="right" @click="doPost">提交</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-inp" style="min-height:174px;">
                <div class="m-selectinp f-mtb5" style="justify-content: space-around;">
                    <div :class="{activestyle:Edge=='2'}" style="font-size: 16px;margin-left: 5px;">两边</div>
                    <!-- <x-switch class="f-mtb5" style="font-size: 16px;padding:0 10px;" title="" :value-map="['2','4']" v-model="Edge" @on-change="changeEdge"></x-switch> -->
                    <s-switch @changeSwitch='changeSwitch' :inputValue='inputValue'></s-switch>
                    <div :class="{activestyle:Edge=='4'}" style="font-size: 16px;margin-left: 5px;">四边</div>
                </div>
                <div class="m-inp f-mtb5" v-show="!transformation">
                    <span class="laber100">源托UPI</span>
                    <span class="inp s-inpbg">
                        <input v-model="PanelNumber" ref="RefPanelNumber" :disabled='DataList.length>=1' placeholder="请扫描源托号" type="text" @keyup.enter="getSupportNumber()" class="s-inpbg">
                    </span>
                </div>
                <div class="m-inp f-mtb5">
                    <span class="laber100">新托号</span>
                    <span class="inp s-inpbg">
                        <input v-model="NewSupportNumber" ref="RefNewSupportNumber" :disabled='DataList.length>=1' placeholder="请扫描托号" type="text" @keyup.enter="getNewSupportNumber()" class="s-inpbg" @focus="getFocus()" @blur="getBlur()">
                    </span>
                </div>

                
                <div class="m-inp f-mtb5" v-show="transformation">
                    <span class="laber100">源托UPI</span>
                    <span class="inp s-inpbg">
                        <input v-model="PanelNumber" ref="RefPanelNumberSecond" :disabled='DataList.length>=1' placeholder="请扫描源托号" type="text" @keyup.enter="getSupportNumber()" class="s-inpbg">
                    </span>
                </div>
                <div class="m-selectinp f-mtb5" style="justify-content: space-around;">
                    <div style="font-size: 16px;margin-left: 5px;">切换</div>
                    <!-- <x-switch class="f-mtb5" style="font-size: 16px;padding:0 10px;" title="" :value-map="['2','4']" v-model="Edge" @on-change="changeEdge"></x-switch> -->
                    <s-switch @changeSwitch='changeTransformation' :inputValue='transformation'></s-switch>
                    <div style="font-size: 16px;margin-left: 5px;visibility: hidden;">占位</div>
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
        <s-confirm 
            v-model="ShowSure" 
            :content="ConfirmSureMsg" 
            :showConfirmButton='false' 
            :showCancelButton='false' 
            :showSuccessButton='true'
            :showDangerButton='true' 
            :bad='BadColor'
            @on-cancel="onCancelSure"
            @on-confirm="onConfirmSure">
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
            ShowSure:false,          //控制确认信息弹窗的显隐
            ConfirmSureMsg:'',      //确定弹窗的提示信息
            ShowConfirm:false,      //控制提示弹窗的显隐
            ConfirmMsg:'提交成功',      //弹窗显示信息
            BadColor:false,         //失败时候的文字颜色
            Successbtn:true,        //成功按钮
            Dangerbtn:true,         //失败按钮

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
            Edge:4,                  //多少边
            GetData:null,               //扫描获取的数据
            inputValue:true,               //控制选择组件的状态
            transformation:false,         //用来控制输入排序
            ShowConfirmType:0,              //0是检验四边的问题，1是检验以封边两边的问题
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

        // 切换switch的事件
        changeTransformation(value){
            console.log(value);
            this.transformation=value
            if(value==false){
                // 这里使用定时器的目的时假装进行异步，目的是在dom生成后再执行
                setTimeout(() => {
                    this.$refs.RefPanelNumber.focus()
                }, 500);
            }
            if(value==true){
                this.$refs.RefNewSupportNumber.focus()
            }
        },
        // 选择边数
        changeEdge(value){
            this.Edge=value
        },
        //获取托号
        getSupportNumber(){
            if(!!this.PanelNumber==false){
                this.showPositionValue=true
                this.Msg='源托号不能为空'
                return
            }
            if(this.transformation==false){
                this.$refs.RefNewSupportNumber.focus()
            }
            if(!!this.PanelNumber && !!this.NewSupportNumber){
                this.doSacnPlateOnIgnoreSourcePlateCodePda(this.PanelNumber,this.NewSupportNumber,this.$route.params.ProcessId)
            }
            console.log(this.PanelNumber,this.NewSupportNumber,this.$route.params.ProcessId);
        },
        getNewSupportNumber(){
            if(!!this.NewSupportNumber==false){
                this.showPositionValue=true
                this.Msg='新托号不能为空'
                return
            }
            if(this.transformation==true){
                this.$refs.RefPanelNumberSecond.focus()
            }
            if(!!this.PanelNumber && !!this.NewSupportNumber){
                this.doSacnPlateOnIgnoreSourcePlateCodePda(this.PanelNumber,this.NewSupportNumber,this.$route.params.ProcessId)
            }
            console.log(this.PanelNumber,this.NewSupportNumber,this.$route.params.ProcessId);
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
        onConfirm(){
            if(this.transformation==false){
                this.$refs.RefPanelNumber.focus()
            }else{
                this.$refs.RefNewSupportNumber.focus()
            }
            
        },
        // 点击确认信息的返回按钮
        onCancelSure(){
            console.log('点击了返回');
            if(this.ShowConfirmType==0){
                this.DataList.push(this.GetData)
                this.inputValue=false
                this.Edge=2
            }
            if(this.ShowConfirmType==1){
                this.PanelNumber=null           //旧托号
                this.NewSupportNumber=null      //新托号
                if(this.transformation==true){
                    this.$refs.RefPanelNumberSecond.focus()
                }else{
                    this.$refs.RefPanelNumber.focus()
                }
            }
            
        },
        // 点击确认信息的确认按钮
        onConfirmSure(){
            //无论ShowConfirmType等于什么，都表示可以添加
            // console.log('点击了确认');
            // this.DataList.push(this.GetData)
            console.log(this.GetData)
            if(this.ShowConfirmType==1){
                if(this.GetData.ExceptionMsg!=null && this.Edge==4){
                    this.ShowConfirmType=0
                    this.ConfirmSureMsg=this.GetData.ExceptionMsg
                    this.ShowSure=true
                }else{
                    this.DataList.push(this.GetData)
                }
            }
            if(this.ShowConfirmType==0){
                this.DataList.push(this.GetData)
            }
        },
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
                this.$route.params.WorkGroupNumber,
                Number(this.Edge));
            this.doSubmitFbChangeOnIgnoreSourcePlateCodePda(
                this.PanelNumber,
                this.$route.params.WorkshopCode,
                this.$route.params.ResourceId,
                this.$route.params.ProcessId,
                this.NewSupportNumber,
                this.$route.params.WorkGroupNumber,
                Number(this.Edge)
                )
        },
        //接口：封边采集PDA端[不校验源托状态]-扫前垫板与后垫板
        doSacnPlateOnIgnoreSourcePlateCodePda(OldPlateUpiCode,EndPlateCode,CurrentProcessId){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.doSacnPlateOnIgnoreSourcePlateCodePda(OldPlateUpiCode,EndPlateCode,CurrentProcessId).then(res=>{
                this.showThost=false
                
                if(res.Success==true){
                    console.log(res)
                    this.GetData=res.Result
                    if(res.Result.Had_FB_Count==2){
                        this.ShowConfirmType=1
                        this.ConfirmSureMsg=`此托${this.PanelNumber}封边已过2边，是否继续过站`
                        this.ShowSure=true
                        return
                    }
                    this.DataList.push(res.Result)
                    //12月19日修改
                    // if(res.Result.ExceptionMsg!=null && this.Edge==4){
                    //     this.ShowConfirmType=0
                    //     this.ConfirmSureMsg=res.Result.ExceptionMsg
                    //     this.ShowSure=true
                    // }else{
                    //     this.DataList.push(res.Result)
                    // }
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            }) 
        },
        //接口：封边采集PDA端[不校验源托状态]-提交
        doSubmitFbChangeOnIgnoreSourcePlateCodePda(OldPlateCode,DepartmentCode,ResourceManageId,CurrentProcessId,NewPlateCode,WorkGroupNumber,P_UnitWorkTime){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.doSubmitFbChangeOnIgnoreSourcePlateCodePda(OldPlateCode,DepartmentCode,ResourceManageId,CurrentProcessId,NewPlateCode,WorkGroupNumber,P_UnitWorkTime).then(res=>{
                this.showThost=false
                if(res.Success==true){
                    console.log(res);
                    this.ShowConfirm=true
                    this.ConfirmMsg='提交成功'
                    this.BadColor=false
                    this.Successbtn=true
                    this.Dangerbtn=false
                    this.DataList=[]
                    this.PanelNumber=null           //旧托号
                    this.NewSupportNumber=null      //新托号
                    this.$refs.RefPanelNumber.focus()
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
