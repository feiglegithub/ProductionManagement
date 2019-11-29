<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            工序交接采集
            <!-- <a slot="right">取消</a> -->
            <a slot="right" @click="doPost">提交</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-inp" style="min-height:60px;">
                <div class="m-inp f-mtb5">
                    <span class="laber">条码</span>
                    <span class="inp s-inpbg">
                        <input v-model="SupportNumber" placeholder="请扫描托号\板件\清单条码" type="text" @keyup.enter="getSupportNumber()" class="s-inpbg">
                    </span>
                </div>
            </div>
            <div class="g-scrollbox">
                <div class="f-auto">
                    <s-messageheader class="f-mt10" messagetitle="条码信息"></s-messageheader>
                    <swipeout class="s-border">
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
                                            <span class="label">生产批次:</span>
                                            <span class="showmsg f-ml10">{{item.ProductBatch}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">条码:</span>
                                            <span class="showmsg f-ml10">{{item.SupportNumber}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">上工序:</span>
                                            <span class="showmsg f-ml10">{{item.PreBatch}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">当前工序:</span>
                                            <span class="showmsg f-ml10">{{item.CurrentProduct}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">板件数:</span>
                                            <span class="showmsg f-ml10">{{item.PanelNumber}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">板件类型:</span>
                                            <span class="showmsg f-ml10">{{item.PanelNumber}}</span>
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
            SupportNumber:null,      //托号
            DataList:[
                {
                    "ProductBatch":"c64s9194",
                    "SupportNumber":"457265",
                    "PreBatch":"34911964895",
                    "CurrentProduct":"3358942687",
                    "PanelNumber":"6949582463",
                },
                {
                    "ProductBatch":"c64s9194",
                    "SupportNumber":"457265",
                    "PreBatch":"34911964895",
                    "CurrentProduct":"3358942687",
                    "PanelNumber":"6949582463",
                },
            ]
        }
    },
    components: {
    },
    methods: {
        //获取托号
        getSupportNumber(){
            console.log(this.SupportNumber);
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

        },
        //点击提示弹窗的确认按钮
        onConfirm(){},
        //点击提交按钮
        doPost(){
            this.ShowConfirm=true
        },
    },
    mounted () {
    }
}
</script>

<style lang="less">


</style>
