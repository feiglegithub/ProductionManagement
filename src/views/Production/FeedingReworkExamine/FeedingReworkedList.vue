<template>
    <div class="g-index">
        <!-- 头部 -->
        <!-- <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            补料返工单
        </x-header> -->
        <x-header class="m-header" :left-options="{showBack:false}"  style="background-color:#22292C">
            <a slot="left" @click="goBaseIndex">
                <span style="font-size:26px;" class="iconfont icon-weibiaoti-"></span>
            </a>
                补料返工待确认列表
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-scrollbox">
                <div class="f-auto">
                    <s-messageheader class="f-mt10" messagetitle="单据概要信息"></s-messageheader>
                    <div class="f-pd5 s-border">
                        <div class="m-listbox f-mtb5" v-for="(item,index) in DataList" :key="index" @click="doSure(item)">
                            <div class="num">
                                {{index+1}}
                            </div>
                            <div class="showbox">
                                <div class="showlistmsg">
                                    <span class="label">返修单号:</span>
                                    <span class="showmsg f-ml10">{{item.RerpoductNo}}</span>
                                </div>
                                <div class="showlistmsg">
                                    <span class="label">批次号:</span>
                                    <span class="showmsg f-ml10">{{item.BatchNo}}</span>
                                </div>
                                <div class="showlistmsg">
                                    <span class="label">出货日期:</span>
                                    <span class="showmsg f-ml10">{{item.PlanDeliveryDate}}</span>
                                </div>
                                <div class="showlistmsg">
                                    <span class="label">创建日期:</span>
                                    <span class="showmsg f-ml10">{{item.CreateDate}}</span>
                                </div>
                                <div class="showlistmsg">
                                    <span class="label">制单班组:</span>
                                    <span class="showmsg f-ml10">{{item.WorkGroup}}</span>
                                </div>
                            </div>
                            
                        </div>
                        <div v-show="DataList.length<=0" class="s-notdate">暂无数据</div>
                    </div>
                </div>
            </div>
        </div>
        <s-confirm 
        v-model="ShowConfirm" 
        content="提交成功" 
        :showConfirmButton='false' 
        :showCancelButton='false' 
        :showSuccessButton='true'
        :showDangerButton='false'
        @on-cancel="onCancel" 
        @on-confirm="onConfirm">
        </s-confirm>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'FeedingReworkedList',
    data() {
        return {
            ShowConfirm:false,      //控制提示弹窗的显隐
            SupportNumber:null,      //托号
            UPI:null,                //UPI
            DataList:[
                // {
                //     "RepairNumber":"c64s9194",
                //     "BatchNumber":"457265",
                //     "ShippingDate":"34911964895",
                //     "CreationDate":"3358942687",
                //     "ProductionTeam":"6949582463",
                //     "BatchFeeding":true
                // },
                // {
                //     "RepairNumber":"c64s9194",
                //     "BatchNumber":"457265",
                //     "ShippingDate":"34911964895",
                //     "CreationDate":"3358942687",
                //     "ProductionTeam":"6949582463",
                //     "BatchFeeding":false
                // },
                // {
                //     "RepairNumber":"c64s9194",
                //     "BatchNumber":"457265",
                //     "ShippingDate":"34911964895",
                //     "CreationDate":"3358942687",
                //     "ProductionTeam":"6949582463",
                //     "BatchFeeding":true
                // },
                // {
                //     "RepairNumber":"c64s9194",
                //     "BatchNumber":"457265",
                //     "ShippingDate":"34911964895",
                //     "CreationDate":"3358942687",
                //     "ProductionTeam":"6949582463",
                //     "BatchFeeding":false
                // },
            ]

        }
    },
    components: {
    },

    methods: {
        goBaseIndex(){
            this.$router.push({name:'BaseIndex'})
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
        //根据点击的数据的批次补料字段，进行跳转页面
        doSure(item){
            console.log(item);
            // this.$router.push({name:"ResponsibilityRecognition",params:{data:item}})
            if(item.IsBatchReproduce==0){
                this.$router.push({name:"ResponsibilityRecognition",params:{data:item}})
            }else{
                this.$router.push({name:"CriticismResponsibilityRecognition",params:{data:item}})
            }
        },
        //接口：获取暂存单据信息
        getReproduct(){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.getReproduct(1,0,1).then(res=>{
                console.log(res.Result.Datas);
                this.showThost=false
                if(res.Success==true){
                    this.DataList=res.Result.Datas
                    console.log(res);
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    this.BarCode=null 
                }
            })
        },
    },
    mounted () {
        this.getReproduct()
    }
}
</script>

<style lang="less">


</style>
