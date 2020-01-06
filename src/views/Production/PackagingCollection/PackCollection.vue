<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            包装采集
            <!-- <a slot="right">取消</a> -->
            <a slot="right" @click="doPost">提交</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-inp" style="min-height:60px;">
              
                <div class="m-inp f-mtb5">
                    <span class="laber">条码</span>
                    <span class="inp s-inpbg">
                        <input v-model="BarCode" ref="BarcodeInp" placeholder="请扫描包装条码" type="text" @keyup.enter="getSupportNumber()" class="s-inpbg" @blur="getBlur()">
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
                                            <span class="label">包装条码:</span>
                                            <span class="showmsg f-ml10">{{item.PackageBarcode}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">包号:</span>
                                            <span class="showmsg f-ml10">{{item.PackageNumber}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">板件数:</span>
                                            <span class="showmsg f-ml10">{{item.Qty}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">订单:</span>
                                            <span class="showmsg f-ml10">{{item.OrderNo}}</span>
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
            BarCode:null,      //托号
            PostCode:[],             //提交的包装条码集合

            //---计件系统班别信息------
            WorkInfor:{
                'EmpCode':'',
                'EmpName':'',
                'WorkstationCode':'',
                'WorkstationName':'',
                'Production':'',
                'WorkDate':'',
            },
            
            DataList:[
                // {
                //     "ProductBatch":"c64s9194",
                //     "BarCode":"457265",
                //     "PreBatch":"34911964895",
                //     "CurrentProduct":"3358942687",
                //     "PanelNumber":"6949582463",
                // },
                // {
                //     "ProductBatch":"c64s9194",
                //     "BarCode":"457265",
                //     "PreBatch":"34911964895",
                //     "CurrentProduct":"3358942687",
                //     "PanelNumber":"6949582463",
                // },
            ]
        }
    },
    components: {
    },
    methods: {
        getWorkInfor(){
           if(this.WorkInfor!=null){
            return this.WorkInfor.EmpName+' '+this.WorkInfor.WorkstationName+' '+this.WorkInfor.Production;
           }
           return "";
        },
        getWorkDate(){
             if(this.WorkInfor!=null){
              return this.WorkInfor.WorkDate;
             }
           return "";
        },
        //获取条码
        getSupportNumber(){
            console.log(this.BarCode);
            if(!!this.BarCode==false){
                this.showPositionValue=true
                this.Msg='包装条码不能为空'
                return
            }
            if(this.PostCode.indexOf(this.BarCode)>=0){
                this.showPositionValue=true
                this.Msg=`包装条码：${this.BarCode}已存在`
                this.BarCode=null
                return
            }
            console.log(JSON.stringify(this.DataList));
            this.scanPackageCollectPa(this.BarCode,this.DataList)
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
            this.PostCode=this.PostCode.filter((PackageBarcode)=>{
                return PackageBarcode!=item.PackageBarcode
            });  
            console.log(this.PostCode);
        },
        //失去焦点事件
        getBlur(){
            console.log('失去焦点事件');
        },
        //点击提示弹窗的删除按钮
        onCancel(){
            this.ShowConfirm=false
            this.ConfirmMsg=''
            this.BadColor=false
            this.Successbtn=false
            this.Dangerbtn=false
            this.$refs.BarcodeInp.focus()
        },
        //点击提示弹窗的确认按钮
        onConfirm(){
            this.ShowConfirm=false
            this.ConfirmMsg=''
            this.BadColor=false
            this.Successbtn=false
            this.Dangerbtn=false
            this.$refs.BarcodeInp.focus()
        },
        //点击提交按钮
        doPost(){
            if(this.DataList.length<=0){
                this.Msg='提交数据不能为空'
                this.showPositionValue=true
                return
            }
            console.log(JSON.stringify(`${this.DataList}+
            ${this.$store.getters.getPackWorkInfo}+
            ${this.$route.params.WorkshopId}+
            ${this.$route.params.ProcessId}+
            ${this.$route.params.ResourceId}`) );
            let PostWorkShopId = this.$route.params.WorkshopId,
                PostProcessId= this.$route.params.ProcessId,
                PostResourceId = this.$route.params.ResourceId
            this.subPackageWageCollect(this.DataList,this.$store.getters.getPackWorkInfo,PostWorkShopId,PostProcessId,PostResourceId)
        },
        //接口：扫描包装条码
        scanPackageCollectPa(pa,scanedDatas){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.scanPackageCollectPa(pa,scanedDatas).then(res=>{
                this.showThost=false
                if(res.Success==true){
                    console.log(res);
                    if(res.Result.HasMessage===true){
                        this.Msg=res.Result.Message
                        this.showPositionValue=true
                    }
                    this.PostCode.unshift(this.BarCode)
                    this.DataList.unshift(res.Result.Data)
                    this.BarCode=null
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    this.BarCode=null
                }
            }) 
        },
        //接口：提交包装采集
        subPackageWageCollect(packageCollectDatas,worker,workshopId,processId,resourceId){
            this.loadingtitle='提交中'
            this.showThost=true
            this.$axiosApi.subPackageWageCollect(packageCollectDatas,worker,workshopId,processId,resourceId).then(res=>{
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
                }else{
                    this.ShowConfirm=true
                    this.ConfirmMsg=res.Message
                    this.BadColor=true
                    this.Successbtn=false
                    this.Dangerbtn=true
                }
            }) 
        },
        // goBack(){
        //     console.log('回去了');
        // }
    },
    mounted () {
        console.log(this.$route.params);
        this.$refs.BarcodeInp.focus()
        console.log(document.URL);
        console.log(window.history);
    },
    // created(){
    //     if(window.history && window.history.pushState){
    //         console.log(window.history);
    //         console.log(window.history.pushState);
    //         window.addEventListener("popstate", this.goBack(),false)
    //     }
    // },
    // destroyed(){
    //     window.removeEventListener('popState',this.goBack,false)
    // }
}
</script>

<style lang="less">

</style>
