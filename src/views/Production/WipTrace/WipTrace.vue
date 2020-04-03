<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            板件追溯
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-inp" style="min-height:40px;">
                <div class="m-inp f-mtb5">
                    <span class="laber100">UPI</span>
                    <span class="inp s-inpbg">
                        <input v-model="UPI" ref="UPIInp" placeholder="请扫描UPI条码" type="text" @keyup.enter="getUPI()" class="s-inpbg">
                    </span>
                </div>
            </div>
            <div class="g-scrollbox">
                <div style="overflow-y: auto;">
                    <!-- <s-messageheader class="f-mt10" messagetitle="条码信息" v-show="DataList.length>=1"></s-messageheader> -->
                    <s-messageheader class="f-mt10" messagetitle="条码信息" ></s-messageheader>
                    <swipeout :class="{'s-border':DataList.length>=1}">
                        <swipeout-item v-for="(item,index) in DataList" :key="index" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
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
                                            <span class="label">工序:</span>
                                            <span class="showmsg f-ml10">{{item.CurrentWork}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">机台:</span>
                                            <span class="showmsg f-ml10">{{item.ResourceName}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">采集时间:</span>
                                            <span class="showmsg f-ml10">{{item.WorkTime}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">前垫板:</span>
                                            <span class="showmsg f-ml10">{{item.FirstPlateCode}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">后垫板:</span>
                                            <span class="showmsg f-ml10">{{item.LastPlateCode}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">过站方式:</span>
                                            <span class="showmsg f-ml10">{{item.Direction}}</span>
                                        </div>
                                        <div class="showlistmsg" v-if="item.CurrentWork == '开料'">
                                            <span class="label">满托时间:</span>
                                            <span class="showmsg f-ml10">{{item.ConfirmFullTime}}</span>
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

            
            UPI:null,                //UPI
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
           
        },
        //获取UPI
        getUPI(){
            if(!!this.UPI==false){
                this.showPositionValue=true
                this.Msg='UPI不能为空'
                return
            }
            this.wipTrace(this.UPI)
            console.log(this.UPI);
        },
        //触发单项左右滑动
        handleEvents(type){
            console.log(type);
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
        },
        //接口：查询UPI过站信息
        wipTrace(upi){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.panelTrace(upi).then(res=>{
                this.showThost=false
                if(res.Success==true){
                    console.log(res);
                    this.DataList=res.Result.Workstations
                    this.UPI=null
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Result.ErrorMsg
                    this.UPI=null
                }
            })
        },

    },
    mounted () {
        // console.log(this.$refs.SupportInp);
        this.$refs.UPIInp.focus()
    }
}
</script>

<style lang="less">

</style>
