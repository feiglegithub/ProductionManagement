<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{ backText: '' }" style="background-color: #22292C;">
            发起返修
            <a slot="right" @click="goReturnRepair">下一步</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-inp" style="min-height: 350px; border-bottom: none;">
                <div class="m-inp f-mtb10">
                    <span class="laber100">子批次</span>
                    <span class="inp s-inpgray">
                        <input class="s-inpgray" v-model="SubBatchCode" type="text" disabled>
                    </span>
                </div>
                <div class="m-inp f-mtb5">
                    <span class="laber100">花色</span>
                    <div class="m-selector s-inpbg" @click="ShowColor = true">
                        <popup-picker :show.sync="ShowColor" :data="DetailColorList" @on-change="changeDetailColor" value-text-align='left'></popup-picker>
                        <div>{{ChoiceColorCode}}</div>
                    </div>
                </div>
                <div class="m-inp f-mtb10">
                    <span class="laber100">板件数</span>
                    <span class="inp s-inpgray">
                        <input class="s-inpgray" v-model="MaxRepairQuantity" type="text" disabled>
                    </span>
                </div>
                <div class="m-inp f-mtb10">
                    <span class="laber100">返修数量</span>
                    <span class="inp s-inpbg">
                        <input class="s-inpbg" v-model="RepairQuantity" ref="RepairNumInp" placeholder="请输入返修数量" type="text" oninput="value=value.replace(/[^\d-]/g,'')">
                    </span>
                </div>
            </div>
        </div>

        <toast width='20em' v-model="ShowPositionValue" type="text" :time="2500" :text="Msg" position="middle"></toast>
        <loading :show="ShowThost" :text="LoadingTitle"></loading>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'ReturnRepairBatchDetail',
    data() {
        return {
            ShowPositionValue: false,   //提示信息显隐
            Msg: '有问题',               //提示信息
            ShowThost: false,           //圈圈的显隐
            LoadingTitle: '提交中',      //圈圈文字

            ChoiceProductDate: null,    //选择的日期
            ShowProductDate: false,     //控制日期弹窗的显隐

            BatchInfo: null,            //批次信息
            SubBatchCode: null,         //子批次
            BatchDetailList: [],        //批次明细列表

            ShowColor: false,           //控制花色弹窗的显隐
            DetailColorList: [[' ']],   //显示的花色列表
            ChoiceDetailColor: null,    //选择的花色明细
            ChoiceColorCode: null,      //选择的花色
            MaxRepairQuantity: null,    //最大返修板件数
            RepairQuantity: null,       //返修数量
        }
    },
    components: {
    },
    methods: {
        //点击下一步按钮
        goReturnRepair() {
            if (!this.ChoiceColorCode) {
                this.ShowPositionValue = true
                this.Msg = '请选择返修花色'
                return
            }

            if (!this.RepairQuantity) {
                this.ShowPositionValue = true
                this.Msg = '请输入返修数量'
                return
            }

            if (this.RepairQuantity > this.MaxRepairQuantity) {
                this.ShowPositionValue = true
                this.Msg = '返修数量不能超过板件数'
                return
            }

            let taskDetailData = JSON.parse(JSON.stringify(this.ChoiceDetailColor))
            taskDetailData.RepairQty = Number(this.RepairQuantity)

            this.$router.push({
                name: 'ReturnRepairProcessSelection',
                params: {
                    WorkshopId: this.$route.params.WorkshopId,
                    ProcessId: this.$route.params.ProcessId,
                    ResourceId: this.$route.params.ResourceId,
                    StockFlowId: this.BatchInfo.StockFlowId,
                    IsUpi: false,
                    TaskDetailData: taskDetailData
                }
            })
        },
        //选择某一项明细花色
        changeDetailColor(value) {
            this.ChoiceDetailColor = this.BatchDetailList.find(item => item.Id == value.value)
            this.ChoiceColorCode = this.ChoiceDetailColor.ColorCode
            this.MaxRepairQuantity = this.ChoiceDetailColor.CanRepairQty
            this.$refs.RepairNumInp.focus()
        },
        //接口：获取批次可返修的明细信息
        getTaskPlatformSubBatchDetailInfo(departmentId, processId) {
            this.LoadingTitle = '加载中'
            this.ShowThost = true
            this.BatchDetailList = []

            this.$axiosApi.getTaskPlatformSubBatchDetailInfo(departmentId, processId, this.BatchInfo).then(res => {
                this.ShowThost = false

                if (res.Success) {
                    // console.log(res);
                    if (!!res.Result) {
                        this.BatchDetailList = res.Result
                        this.DetailColorList = [res.Result.map(item => { return { name: item.ColorCode, value: item.Id } })]

                        if (this.DetailColorList.length > 0) {
                            let firstItem = this.DetailColorList[0]
                            this.changeDetailColor({ name: firstItem.ColorCode, value: firstItem.Id })
                        }
                    }
                } else {
                    this.ShowPositionValue = true
                    this.Msg = res.Message
                }
            })
        }
    },
    mounted () {
        this.BatchInfo = this.$route.params.BatchInfo
        this.SubBatchCode = this.BatchInfo.SubBatchCode

        this.getTaskPlatformSubBatchDetailInfo(this.$route.params.WorkshopId, this.$route.params.ProcessId)
    }
}
</script>

<style lang="less">

</style>
