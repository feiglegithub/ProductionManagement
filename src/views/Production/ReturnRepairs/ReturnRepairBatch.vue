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
            <div class="m-rowbutton">
                <div class="rbutton" v-for="(item, index) in ShiftList" :key="index" @click="doChoiceShift(item)" :style="{ 'background-color': item == ChoiceShift ? '#0066CC' : 'transparent' }" style="width:80px">
                    <span :class="item == ChoiceShift ? 'choicelabel' : 'emptylabel'">{{item}}</span>
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

            ShiftList: [],              //班次列表
            ChoiceShift: null,          //选择的班次
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
        //点击班次
        doChoiceShift(item) {
            this.ChoiceShift = item
            this.ShowBatchData = item == '全部' ? this.BatchData : this.BatchData.filter(data => data.ShiftCodeNo == item)
            this.ShowBatchData.sort(this.compareBatch)
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
            this.ShiftList = []
            this.BatchData = []
            this.ShowBatchData = []

            this.$axiosApi.getTaskPlatformSubBatchInfo(departmentId, processId, this.ChoiceProductDate).then(res => {
                this.ShowThost = false

                if (res.Success) {
                    // console.log(res);
                    if (!!res.Result) {
                        this.BatchData = res.Result

                        this.BatchData.forEach(item => {
                            let shiftCodeNo = item.SubBatchCode.substr(0, item.SubBatchCode.indexOf('-')).substr(8)
                            item.ShiftCodeNo = shiftCodeNo

                            if (this.ShiftList.indexOf(shiftCodeNo) < 0) {
                                this.ShiftList.push(shiftCodeNo)
                            }
                        })
                        this.ShowBatchData = this.BatchData
                        this.ShowBatchData.sort(this.compareBatch)
                        
                        //对班次排序
                        if (this.ShiftList.length > 0) {
                            this.ShiftList.sort((shift1, shift2) => {
                                let num1 = Number(shift1.substr(1))
                                let num2 = Number(shift2.substr(1))

                                return num1 < num2 ? -1 : 1
                            })
                            this.ShiftList.unshift('全部')
                            this.ChoiceShift = '全部'
                        }
                    }
                } else {
                    this.ShowPositionValue = true
                    this.Msg = res.Message
                }
            })
        },
        //批次数据排序
        compareBatch(item1, item2) {
            let batchCode1 = item1.SubBatchCode.substr(0, item1.SubBatchCode.indexOf('-'))
            let batchCode2 = item2.SubBatchCode.substr(0, item2.SubBatchCode.indexOf('-'))
            let batchNum1 = Number(item1.SubBatchCode.substr(item1.SubBatchCode.indexOf('-') + 1, item1.SubBatchCode.indexOf('(') - item1.SubBatchCode.indexOf('-') - 1))
            let batchNum2 = Number(item2.SubBatchCode.substr(item2.SubBatchCode.indexOf('-') + 1, item2.SubBatchCode.indexOf('(') - item2.SubBatchCode.indexOf('-') - 1))

            if (batchCode1 < batchCode2) {
                return -1;
            } else if (batchCode1 > batchCode2) {
                return 1;
            } else {
                if (batchNum1 < batchNum2) {
                    return -1;
                } else if (batchNum1 > batchNum2) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }
    },
    mounted () {

    }
}
</script>

<style lang="less">

</style>
