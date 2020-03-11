<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            仓库原材料接收
            <!-- <a slot="right">取消</a> -->
            <a slot="right" @click="doPost" :class="{'f-noclick':showThost}">提交</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-inp" style="min-height:40px;">
                <div class="m-inp f-mtb5">
                    <span class="laber100" style="width:35%">大板标签</span>
                    <span class="inp s-inpbg" style="width:65%">
                        <input v-model="BoardLabel" ref="BoardLabelInp" placeholder="请扫描大板标签" type="text" @keyup.enter="getBoardLabel()" class="s-inpbg">
                    </span>
                </div>
            </div>
            <div class="g-scrollbox">
                <div style="overflow-y: auto;">
                    <s-messageheader class="f-mt10" messagetitle="仓库信息" v-show="DataList.length>=1"></s-messageheader>
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
                                            <span class="label">卡位:</span>
                                            <span class="showmsg f-ml10">{{item.WarehouseAreaNo}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">子批次:</span>
                                            <span class="showmsg f-ml10">{{item.SubBatchCode}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">任务号:</span>
                                            <span class="showmsg f-ml10">{{item.TaskNumber}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">任务花色:</span>
                                            <span class="showmsg f-ml10">{{item.TaskColor}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">大板数量:</span>
                                            <span class="showmsg f-ml10">{{item.BoardQty}}</span>
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
            ShowConfirm:false,       //控制提示弹窗的显隐
            ConfirmMsg:'提交成功',
            BadColor:false,
            Successbtn:true,
            Dangerbtn:true,
            showPositionValue:false,  //提示信息显隐
            Msg:'有问题',             //提示信息
            showThost:false,          //圈圈的显隐
            loadingtitle:'提交中',    //圈圈文字
            BoardLabel:null,          //大板标签
            DataList:[],             //显示的数据
        }
    },
    components: {
    },
    methods: {
        //获取大板标签对应的数据
        getBoardLabel(){
            if(!this.BoardLabel){
                this.showPositionValue=true
                this.Msg='大板标签不能为空'
                return
            }

            var boardLabel = this.BoardLabel
            var idxChar = boardLabel.lastIndexOf('_')

            if(idxChar > 0){
                // 条形码的任务号为英文括号，而后台任务号为中文括号
                var left = boardLabel.substring(0, idxChar)
                var right = boardLabel.substr(idxChar + 1).replace('(', '（').replace(')', '）')
                boardLabel = `${left}_${right}`
            }

            this.getWarehouseMaterialData(boardLabel)
            console.log(this.BoardLabel);
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
            if(!this.DataList || this.DataList.length <= 0){
                this.Msg='提交数据不能为空'
                this.showPositionValue=true
                return
            }

            console.log(`${this.DataList}`);
            this.confirmWarehouseMaterialDetail(this.DataList)
        },
        //接口：获取仓库材料数据
        getWarehouseMaterialData(boardLabel){
            this.loadingtitle='加载中'
            this.showThost=true

            this.$axiosApi.getWarehouseMaterialData(boardLabel).then(res=>{
                this.showThost=false

                if(res.Success){
                    console.log(res);

                    if (!!res.Result.WarehouseDetailList){
                        this.DataList=res.Result.WarehouseDetailList
                    }
                    
                    this.BoardLabel=null
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    this.BoardLabel=null
                }
            })
        },
        //接口：仓库原材料明细接收确认
        confirmWarehouseMaterialDetail(confirmDetails){
            this.loadingtitle='提交中'
            this.showThost=true
            var detailIds = []

            this.DataList.forEach((item, index) => {
                detailIds.push(item.DetailId)
            })

            this.$axiosApi.confirmWarehouseMaterialDetail(detailIds).then(res=>{
                this.showThost=false

                if(res.Success){
                    console.log(res);
                    this.ShowConfirm=true
                    this.ConfirmMsg='提交成功'
                    this.BadColor=false
                    this.Successbtn=true
                    this.Dangerbtn=false
                    this.DataList=[]
                    this.$refs.BoardLabelInp.focus()
                }else{
                    this.ShowConfirm=true
                    this.ConfirmMsg=res.Message
                    this.BadColor=true
                    this.Successbtn=false
                    this.Dangerbtn=true
                }
            })
        }
    },
    mounted () {
        this.$refs.BoardLabelInp.focus()
    }
}
</script>

<style lang="less">

</style>
