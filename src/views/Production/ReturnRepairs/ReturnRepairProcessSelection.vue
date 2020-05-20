<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{ backText: '' }" style="background-color: #22292C;">
            发起返修
            <a slot="right" :class="{'f-noclick': ShowThost}" @click="doPost">提交</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-scrollbox">
                <div style="overflow-y: auto;">
                    <s-messageheader class="f-mt10" messagetitle="选择经过工序"></s-messageheader>
                    <div class="f-pd5 s-border">
                        <div class="m-listbox f-mtb5" v-for="(item, index) in ProcessModelList" :key="index" @click="choiceProcess(item, index)" :style="{ background: item.ProcessModelingType == 1 ? '#F8CBAD' : '#AFABAB'}">
                            <div class="showbox">
                                <div class="showlistmsg">
                                    <span class="showmsg f-ml10" style="font-size: 20px; font-weight: bold; text-align: center;">{{item.ProcessName}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="s-notdate" v-show="ProcessModelList.length <= 0">无数据</div>
                    </div>
                </div>
            </div>
        </div>
        <s-confirm v-model="ShowConfirm"
            :content="ConfirmMsg"
            :showConfirmButton='false'
            :showCancelButton='false'
            :showSuccessButton='SuccessBtn'
            :showDangerButton='DangerBtn'
            :bad='BadColor'
            @on-cancel="onCancel"
            @on-confirm="onConfirm">
        </s-confirm>

        <toast width='20em' v-model="ShowPositionValue" type="text" :time="2500" :text="Msg" position="middle"></toast>
        <loading :show="ShowThost" :text="LoadingTitle"></loading>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'ReturnRepairProcessSelection',
    data() {
        return {
            ShowConfirm: false,         //控制提示弹窗的显隐
            ConfirmMsg: '提交成功',      //提示弹窗信息
            BadColor: false,            //是否显示背景色
            SuccessBtn: true,           //是否显示确认按钮
            DangerBtn: true,            //是否显示返回按钮

            ShowPositionValue: false,   //提示信息显隐
            Msg: '有问题',               //提示信息
            ShowThost: false,           //圈圈的显隐
            LoadingTitle: '提交中',      //圈圈文字

            ProcessModelList: [],       //工序列表
        }
    },
    components: {
    },
    methods: {
        //点击提示弹窗的返回按钮
        onCancel(){
            this.ShowConfirm = false
            this.ConfirmMsg = ''
            this.BadColor = false
            this.SuccessBtn = false
            this.DangerBtn = false
        },
        //点击提示弹窗的确认按钮
        onConfirm(){
            this.ShowConfirm = false
            this.ConfirmMsg = ''
            this.BadColor = false
            this.SuccessBtn = false
            this.DangerBtn = false
            this.$router.push({ name: 'ReturnRepairResourceSelection' })
        },
        //点击提交按钮
        doPost() {
            if (this.ProcessModelList.length <= 0) {
                this.Msg = '工序数据不能为空'
                this.ShowPositionValue = true
                return
            }

            debugger

            if (this.$route.params.IsUpi) {
                this.submitUpiReturnRepair(this.$route.params.WorkshopId, this.$route.params.ProcessId, this.$route.params.ResourceId, this.$route.params.UpiDataList)
            } else {
                this.submitTaskPlatformSubBatchDetailInfo(this.$route.params.WorkshopId, this.$route.params.ProcessId, this.$route.params.ResourceId, this.$route.params.TaskDetailData)
            }
        },
        //点击工序
        choiceProcess(item, index) {
            // 第一道工序和最后一道工序不能改变
            if (index != 0 && index < this.ProcessModelList.length - 1) {
                item.ProcessModelingType = item.ProcessModelingType == 1 ? 2 : 1
            }
        },
        //接口：获取工艺建模列表
        getProcessModeling(departmentId, processId, stockFlowId, palletCategoryCode) {
            this.LoadingTitle = '加载中'
            this.ShowThost = true
            this.ProcessModelList = []

            this.$axiosApi.getProcessModeling(departmentId, processId, stockFlowId, palletCategoryCode).then(res => {
                this.ShowThost = false

                if (res.Success) {
                    // console.log(res);
                    this.ProcessModelList = res.Result
                    this.ProcessModelList.forEach((item, index) => {
                        item.ProcessModelingType = index == 0 || index == this.ProcessModelList.length - 1 ? 1 : 2  // 1-需要返修的工序，2-不需要返修的工序，前后两道工序固定返修
                    })
                } else {
                    this.ShowPositionValue = true
                    this.Msg = res.Message
                }
            })
        },
        //接口：提交UPI返修数据
        submitUpiReturnRepair(departmentId, processId, resourceManageId, upiDataList) {
            this.LoadingTitle = '加载中'
            this.ShowThost = true

            this.$axiosApi.submitUpiReturnRepair(departmentId, processId, resourceManageId, upiDataList, this.ProcessModelList).then(res => {
                this.ShowThost = false

                if (res.Success) {
                    // console.log(res);
                    this.ShowConfirm = true
                    this.ConfirmMsg = '提交成功'
                    this.BadColor = false
                    this.SuccessBtn = true
                    this.DangerBtn = false
                } else {
                    this.ShowConfirm = true
                    this.ConfirmMsg = res.Message
                    this.BadColor = true
                    this.SuccessBtn = false
                    this.DangerBtn = true
                }
            })
        },
        //接口：提交子批次返修数据
        submitTaskPlatformSubBatchDetailInfo(departmentId, processId, resourceId, taskDetailData) {
            this.LoadingTitle = '加载中'
            this.ShowThost = true

            this.$axiosApi.submitTaskPlatformSubBatchDetailInfo(departmentId, processId, resourceId, taskDetailData, this.ProcessModelList).then(res => {
                this.ShowThost = false

                if (res.Success) {
                    // console.log(res);
                    this.ShowConfirm = true
                    this.ConfirmMsg = '提交成功'
                    this.BadColor = false
                    this.SuccessBtn = true
                    this.DangerBtn = false
                } else {
                    this.ShowConfirm = true
                    this.ConfirmMsg = res.Message
                    this.BadColor = true
                    this.SuccessBtn = false
                    this.DangerBtn = true
                }
            })
        }
    },
    mounted () {
        let palletCategoryCode = this.$route.params.IsUpi ? 'X1' : 'E'

        this.getProcessModeling(this.$route.params.WorkshopId, this.$route.params.ProcessId, this.$route.params.StockFlowId, palletCategoryCode)
    }
}
</script>

<style lang="less">

</style>
