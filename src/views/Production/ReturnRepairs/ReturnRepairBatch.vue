<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{ backText: '' }" style="background-color: #22292C;">
            发起返修
            <!-- <a slot="right" @click="goReturnRepair">下一步</a> -->
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-inp" style="min-height: 40px;">
                <div class="m-inp f-mtb5">
                    <span class="laber100">日期</span>
                    <div class="m-selector s-inpbg" @click="ShowProductDate = true">
                        <datetime v-model="ChoiceProductDate" :show="ShowProductDate" format="YYYY-MM-DD" @on-confirm="onConfirmProductDate" @on-hide="ShowProductDate = false"></datetime>
                    </div>
                </div>
            </div>
            <div class="g-scrollbox">
                <div style="overflow-y: auto;">
                    <s-messageheader class="f-mt10" messagetitle="选择返修批次"></s-messageheader>
                    <div class="f-pd5 s-border">
                        <div class="m-listbox f-mtb5" v-for="(item, index) in ShowBatchData" :key="index" @click="doReturnRepair(item)">
                            <div class="num">{{index + 1}}</div>
                            <div class="showbox">
                                <div class="showlistmsg">
                                    <span class="label">子批次:</span>
                                    <span class="showmsg f-ml10">{{item.SubBatchCode}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="s-notdate" v-show="ShowBatchData.length <= 0">无数据</div>
                    </div>
                </div>
            </div>
        </div>

        <toast width='20em' v-model="ShowPositionValue" type="text" :time="2500" :text="Msg" position="middle"></toast>
        <loading :show="ShowThost" :text="LoadingTitle"></loading>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'ReturnRepairBatch',
    data() {
        return {
            ShowPositionValue: false,   //提示信息显隐
            Msg: '有问题',               //提示信息
            ShowThost: false,           //圈圈的显隐
            LoadingTitle: '提交中',      //圈圈文字

            ChoiceProductDate: null,    //选择的日期
            ShowProductDate: false,     //控制日期弹窗的显隐

            BatchData: [],              //批次数据
            ShowBatchData: [],          //显示批次数据
        }
    },
    components: {
    },
    methods: {
        //确认生产日期
        onConfirmProductDate() {
            if (!this.ChoiceProductDate) {
                this.ShowPositionValue = true
                this.Msg = '请选择日期'
                return
            }

            this.getTaskPlatformSubBatchInfo(this.$route.params.WorkshopId, this.$route.params.ProcessId)
        },
        //点击返修批次
        doReturnRepair(batchInfo) {
            // console.log(JSON.stringify(batchInfo))
            this.$router.push({
                name: 'ReturnRepairBatchDetail',
                params: {
                    WorkshopId: this.$route.params.WorkshopId,
                    ProcessId: this.$route.params.ProcessId,
                    ResourceId: this.$route.params.ResourceId,
                    BatchInfo: batchInfo
                }
            })
        },
        //接口：获取标准层板批次信息
        getTaskPlatformSubBatchInfo(departmentId, processId) {
            this.LoadingTitle = '加载中'
            this.ShowThost = true
            this.BatchData = []
            this.ShowBatchData = []

            this.$axiosApi.getTaskPlatformSubBatchInfo(departmentId, processId, this.ChoiceProductDate).then(res => {
                this.ShowThost = false

                if (res.Success) {
                    // console.log(res);
                    if (!!res.Result) {
                        this.BatchData = res.Result
                        this.ShowBatchData = res.Result
                    }
                } else {
                    this.ShowPositionValue = true
                    this.Msg = res.Message
                }
            })
        }
    },
    mounted () {

    }
}
</script>

<style lang="less">

</style>
