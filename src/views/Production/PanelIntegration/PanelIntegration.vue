<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            板件整托合托
            <!-- <a slot="right">取消</a> -->
            <a slot="right" @click="doPost" :class="{'f-noclick':showThost}">提交</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-inp" style="min-height:150px;">
                <div class="m-inp f-mtb5">
                    <span class="laber100" style="width:35%">目标托号</span>
                    <span class="inp s-inpbg" style="width:65%">
                        <input v-model="SupportNumber" ref="SupportInp" placeholder="请扫描新托号" type="text" @keyup.enter="getSupportNumber()" class="s-inpbg">
                    </span>
                </div>
                <div class="m-inp f-mtb5">
                    <span class="laber100" style="width:35%">源托号</span>
                    <span class="inp s-inpbg" style="width:65%">
                        <input v-model="SourceNumber" ref="SourceNumberInp" placeholder="请扫描源托号" type="text" @keyup.enter="getSourceNumber()" class="s-inpbg">
                    </span>
                </div>

                <div class="m-inp f-mtb5">
                    <x-switch class="f-mtb5" style="font-size: 16px;padding:0 10px;margin-left: 57px;width:140px" title="生产中" :value-map="['否','是']" v-model="IsProduction" @on-change="changeIsProduction" :disabled='DataList.length>0'></x-switch>
                    <div style="font-size: 16px;margin-left: 5px;">{{IsProduction}}</div>
                </div>
            </div>
            <div class="g-scrollbox">
                <div style="overflow-y: auto;">
                    <s-messageheader class="f-mt10" messagetitle="条码信息" v-show="DataList.length>=1"></s-messageheader>
                    
                    <div class="f-pd5" v-for="(item,index) in DataList" :key="index">
                        <div class="m-listbox">
                            <div class="num">
                                {{index+1}}
                            </div>
                            <div class="showbox">
                                <div class="showlistmsg">
                                    <span class="label">UPI:</span>
                                    <span class="showmsg f-ml10">{{item.UpiCpode}}</span>
                                </div>
                                <!-- <div class="showlistmsg">
                                    <span class="label">旧托号:</span>
                                    <span class="showmsg f-ml10">{{item.PlateCode}}</span>
                                </div> -->
                                <div class="showlistmsg">
                                    <span class="label">生产批次:</span>
                                    <span class="showmsg f-ml10">{{item.UpiBatchNo}}</span>
                                </div>
                                <div class="showlistmsg">
                                    <span class="label">当前工序:</span>
                                    <span class="showmsg f-ml10">{{item.ProcessName}}</span>
                                </div>
                                <!-- <div class="showlistmsg">
                                    <span class="label">新托号:</span>
                                    <span class="showmsg f-ml10">{{SupportNumber}}</span>
                                </div> -->
                            </div>
                            
                        </div>
                    </div>
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
            SourceNumber:null,                //源托号
            PostSupportNumber:null,     //提交的目标托号
            PostSourceNumber:null,      //提交的源托号
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
            IsProduction:'否',          //是否生产中
        }
    },
    components: {
    },
    methods: {
        //改变切换按钮
        changeIsProduction(value){
            console.log(this.IsProduction)
        },

        //获取托号
        getSupportNumber(){
            if(!!this.SupportNumber==false){
                this.showPositionValue=true
                this.Msg='目标托号不能为空'
                return
            }
            // this.IsChange=true
            this.$refs.SourceNumberInp.focus()
            if(!!this.SupportNumber && !!this.SourceNumber){
                if(this.IsProduction=="是"){
                    this.checkWorkPlateJustChangePlateCodePda(this.SupportNumber,this.SourceNumber)
                }
                if(this.IsProduction=="否"){
                    this.checkWorkPlateMixableByPlate(this.SupportNumber,this.SourceNumber)
                }
            }
            console.log(this.SupportNumber);
        },
        //获取源托号
        getSourceNumber(){
            if(!!this.SourceNumber==false){
                this.showPositionValue=true
                this.Msg='源托号不能为空'
                return
            }
            if(!!this.SupportNumber && !!this.SourceNumber){
                console.log('执行接口');
                if(this.IsProduction=="是"){
                    this.checkWorkPlateJustChangePlateCodePda(this.SupportNumber,this.SourceNumber)
                }
                if(this.IsProduction=="否"){
                    this.checkWorkPlateMixableByPlate(this.SupportNumber,this.SourceNumber)
                }
            }
            console.log(this.SourceNumber);
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
            if(this.DataList.length<=0){
                this.Msg='提交数据不能为空'
                this.showPositionValue=true
                return
            }
            console.log(`${this.PostSupportNumber}和${this.PostSourceNumber}`);
            if(this.IsProduction=="是"){
                console.log('是')
                this.doChangeWorkPlateJustChangePlateCodePda(this.PostSupportNumber,this.PostSourceNumber)
            }
            if(this.IsProduction=="否"){
                console.log('否')
                this.doChangeWorkPlateByPlatePda(this.PostSupportNumber,this.PostSourceNumber)
            }
        },
        //接口：检查Upi能否合托
        checkWorkPlateMixableByPlate(TargetBasePlateNo,SourceBasePlateNo){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.checkWorkPlateMixableByPlate(TargetBasePlateNo,SourceBasePlateNo).then(res=>{
                this.showThost=false
                if(res.Result.Result==true){
                    console.log(res);
                    this.SourceNumber=res.Result.Upis[0].PlateCode
                    this.PostSupportNumber=this.SupportNumber
                    this.PostSourceNumber=this.SourceNumber
                    this.DataList=res.Result.Upis
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Result.ErrorMsg
                    this.SupportNumber=null
                    this.SourceNumber=null
                    this.PostSupportNumber=null
                    this.PostSourceNumber=null
                    this.$refs.SupportInp.focus()
                }
            })
        },
        //接口：检查Upi能否合托(生产中情况)
        checkWorkPlateJustChangePlateCodePda(TargetBasePlateNo,SourceBasePlateNo){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.checkWorkPlateJustChangePlateCodePda(TargetBasePlateNo,SourceBasePlateNo).then(res=>{
                this.showThost=false
                if(res.Result.Result==true){
                    console.log(res);
                    this.SourceNumber=res.Result.Upis[0].PlateCode
                    this.PostSupportNumber=this.SupportNumber
                    this.PostSourceNumber=this.SourceNumber
                    this.DataList=res.Result.Upis
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Result.ErrorMsg
                    this.SupportNumber=null
                    this.SourceNumber=null
                    this.PostSupportNumber=null
                    this.PostSourceNumber=null
                    this.$refs.SupportInp.focus()
                }
            })
        },

        //接口：提交转托动作
        doChangeWorkPlateByPlatePda(TargetBasePlateNo,SourceBasePlateNo){
            this.loadingtitle='提交中'
            this.showThost=true
            this.$axiosApi.doChangeWorkPlateByPlatePda(TargetBasePlateNo,SourceBasePlateNo).then(res=>{
                this.showThost=false
                if(res.Result.Result==true){
                    console.log(res);
                    this.ShowConfirm=true
                    this.ConfirmMsg='提交成功'
                    this.BadColor=false
                    this.Successbtn=true
                    this.Dangerbtn=false
                    this.DataList=[]
                    this.SupportNumber=null
                    this.SourceNumber=null
                    this.PostSupportNumber=null
                    this.PostSourceNumber=null
                    // this.IsChange=false
                    this.$refs.SupportInp.focus()
                }else{
                    this.ShowConfirm=true
                    this.ConfirmMsg=res.Result.ErrorMsg
                    this.BadColor=true
                    this.Successbtn=false
                    this.Dangerbtn=true
                    this.SupportNumber=null
                    this.SourceNumber=null
                    // this.PostSupportNumber=null
                    // this.PostSourceNumber=null
                    this.$refs.SupportInp.focus()
                }
            })
        },
        //接口：提交转托动作（生产中）
        doChangeWorkPlateJustChangePlateCodePda(TargetBasePlateNo,SourceBasePlateNo){
            this.loadingtitle='提交中'
            this.showThost=true
            this.$axiosApi.doChangeWorkPlateJustChangePlateCodePda(TargetBasePlateNo,SourceBasePlateNo).then(res=>{
                this.showThost=false
                if(res.Result.Result==true){
                    console.log(res);
                    this.ShowConfirm=true
                    this.ConfirmMsg='提交成功'
                    this.BadColor=false
                    this.Successbtn=true
                    this.Dangerbtn=false
                    this.DataList=[]
                    this.SupportNumber=null
                    this.SourceNumber=null
                    this.PostSupportNumber=null
                    this.PostSourceNumber=null
                    // this.IsChange=false
                    this.$refs.SupportInp.focus()
                }else{
                    this.ShowConfirm=true
                    this.ConfirmMsg=res.Result.ErrorMsg
                    this.BadColor=true
                    this.Successbtn=false
                    this.Dangerbtn=true
                    this.SupportNumber=null
                    this.SourceNumber=null
                    // this.PostSupportNumber=null
                    // this.PostSourceNumber=null
                    this.$refs.SupportInp.focus()
                }
            })
        }

    },
    mounted () {
        this.$refs.SupportInp.focus()
    }
}
</script>

<style lang="less">

</style>
