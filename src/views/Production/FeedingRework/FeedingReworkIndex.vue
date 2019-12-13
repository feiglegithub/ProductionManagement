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
                {{ReworkTitle}}
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="u-add f-mt10" style="flex-shrink: 0;" @click="addFeedingRework(0)">+</div>
            <div class="g-scrollbox">
                <div class="f-auto">
                    <s-messageheader class="f-mt10" messagetitle="暂存单据信息"></s-messageheader>
                    <swipeout class="s-border">
                        <swipeout-item v-for="(item,index) in DataList" :key="index" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
                            <div slot="right-menu" style="padding:5px 0;">
                            <swipeout-button @click.native="onButtonClick(item,index)" type="warn">删除</swipeout-button>
                            </div>
                            <div slot="content" class="f-pd5 vux-1px-t">
                                <div class="m-listbox" @click="addFeedingRework(item)">
                                    <div class="num">
                                        {{DataList.length-index}}
                                    </div>
                                    <div class="showbox">
                                        <div class="showlistmsg">
                                            <span class="label">单号:</span>
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
                                    </div>
                                    
                                </div>
                            </div>
                        </swipeout-item>
                        <div v-show="DataList.length<=0" class="s-notdate">暂无数据</div>
                    </swipeout>
                    
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
        <toast width='12em' v-model="showPositionValue" type="text" :time="2500" :text="Msg" position="middle"></toast>
        <loading :show="showThost" :text="loadingtitle"></loading>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'FeedingReworkIndex',
    data() {
        return {
            ReworkTitle:'补料返工',
            showThost:false,                //圈圈的显隐
            loadingtitle:'加载中',                //圈圈文字

            showPositionValue:false,        //提示信息显隐
            Msg:'有问题', 
            ShowConfirm:false,      //控制提示弹窗的显隐
            SupportNumber:null,      //托号
            UPI:null,                //UPI
            DataList:[
            ]

        }
    },
    components: {
    },

    methods: {
        goBaseIndex(){
            this.$router.push({name:'BaseIndex'})
        },
        //触发单项左右滑动
        handleEvents(type){
            console.log(type);
        },
        //点击删除按钮，删除当前项
        onButtonClick(item,index){
            console.log(item);
            // this.DataList.splice(index,1)
            this.deleteProduceTask(item.Id)
        },
        //点击提示弹窗的删除按钮
        onCancel(){

        },
        //点击提示弹窗的确认按钮
        onConfirm(){},

        //点击添加按钮
        addFeedingRework(item){
            console.log(!!item);
            this.showThost=true
            if(!!item){
                //点击暂存的单据信息单，需要把信息传过去。
                this.$store.dispatch('removeKeepAlive', 'AddFeedingRework')
                this.$store.dispatch('removeKeepAlive', 'BatchAddFeedingRework')
                if(this.$store.getters.getAddTtype==0){
                    this.$router.push({name:'AddFeedingRework',params:{data:item}})
                }
                if(this.$store.getters.getAddTtype==1){
                    this.$router.push({name:'BatchAddFeedingRework',params:{data:item}})
                }
            }else{
                this.$store.dispatch('removeKeepAlive', 'AddFeedingRework')
                this.$store.dispatch('removeKeepAlive', 'BatchAddFeedingRework')
                if(this.$store.getters.getAddTtype==0){
                    this.$router.push({name:'AddFeedingRework'})
                }
                if(this.$store.getters.getAddTtype==1){
                    this.$router.push({name:'BatchAddFeedingRework'})
                }
            }
            
        },
        //接口：获取暂存单据信息
        getReproduct(AddType){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.getReproduct(0,0,1,AddType).then(res=>{
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
        //接口：删除补料返工单
        deleteProduceTask(id){
            this.loadingtitle='删除中'
            this.showThost=true
            this.$axiosApi.deleteProduceTask(id).then(res=>{
                this.showThost=false
                if(res.Success==true){
                    console.log(res);
                    this.showPositionValue=true
                    this.Msg='删除成功'
                    this.getReproduct()
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    this.BarCode=null 
                }
            })
        },
    },
    created(){
        if(this.$store.getters.getAddTtype==0){
            this.ReworkTitle='补料返工'
        }
        if(this.$store.getters.getAddTtype==1){
            this.ReworkTitle='批次补料返工'
        }
    },
    mounted () {
        this.$store.dispatch('removeKeepAlive', 'AddFeedingRework')
        this.$store.dispatch('removeKeepAlive', 'BatchAddFeedingRework')
        this.$store.dispatch('removeKeepAlive', 'FeedingReworkDetial')
        this.getReproduct(this.$store.getters.getAddTtype)
    }
}
</script>

<style lang="less">


</style>
