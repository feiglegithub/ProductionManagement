<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            异形板采集
            <!-- <a slot="right">取消</a> -->
            <a slot="right" @click="doPost">提交</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-inp" style="min-height: 100px;">
                <!-- <div class="m-selectinp f-mtb5" style="justify-content: space-around;" v-if="ShowSwitch">
                    <div :class="{activestyle:Edge=='2'}" style="font-size: 16px;margin-left: 5px;">两边</div>
                    <s-switch @changeSwitch='changeSwitch' :inputValue='inputValue'></s-switch>
                    <div :class="{activestyle:Edge=='4'}" style="font-size: 16px;margin-left: 5px;">四边</div>
                </div> -->
                <div class="m-inp f-mtb5">
                    <span class="laber100">前垫板/UPI</span>
                    <span class="inp s-inpbg">
                        <input ref="BarcodeInp" v-model="Barcode" placeholder="请扫描前垫板/UPI" type="text" @keyup.enter="getBarcode()" class="s-inpbg" @focus="getFocus()" @blur="getBlur()" :disabled='DisableBarcode'>
                    </span>
                </div>
                <div class="m-inp f-mtb5">
                    <span class="laber100">后垫板</span>
                    <span class="inp s-inpbg">
                        <input ref="PlateInp" v-model="PlateCode" placeholder="请扫描后垫板" type="text" @keyup.enter="getPlateCode()" class="s-inpbg" @focus="getFocus()" @blur="getBlur()">
                    </span>
                </div>
            </div>
            <div class="g-inp" v-if="!!Task" style="min-height: 220px;">
                <s-messageheader class="f-mt10" messagetitle="任务信息"></s-messageheader>
                <div class="m-inp f-mtb5">
                    <span class="laber100">班次</span>
                    <span class="inp">{{Task.ShiftCode}}</span>
                </div>
                <div class="m-inp f-mtb5">
                    <span class="laber100">批次号</span>
                    <span class="inp">{{Task.BatchCode}}</span>
                </div>
                <div class="m-inp f-mtb5">
                    <span class="laber100">托盘类型</span>
                    <span class="inp">{{Task.PalletcatoryCode}}</span>
                </div>
                <div class="m-inp f-mtb5">
                    <span class="laber100">板件数</span>
                    <span class="inp">{{PanelCount}}</span>
                </div>
            </div>
            <div class="g-scrollbox">
                <div class="f-auto">
                    <div class="m-dangermsg" v-show="ErrMsg">
                        {{ErrMsg}}
                    </div>
                    <s-messageheader class="f-mt10" messagetitle="条码信息" v-show="DataList.length>0"></s-messageheader>
                    <!-- <swipeout class="s-border">
                        <swipeout-item v-for="(item,index) in DataList" :key="index" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
                            <div slot="right-menu" style="padding:5px 0;">
                            <swipeout-button @click.native="onButtonClick(index)" type="warn">删除</swipeout-button>
                            </div> -->
                            <div class="f-pd5 vux-1px-t">
                                <div class="m-listbox f-mtb5" v-for="(item,index) in DataList" :key="index" :style="!!ScanUpis && ScanUpis.findIndex(upi => upi.Upi == item.UpiCode) >= 0 ? 'background: #7FFF50;' : ''">
                                    <div class="num">
                                        {{index+1}}
                                    </div>
                                    <div class="showbox">
                                        <div class="showlistmsg">
                                            <span class="label">UPI:</span>
                                            <span class="showmsg f-ml10">{{item.UpiCode}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">是否特殊:</span>
                                            <span class="showmsg f-ml10">{{item.SecondaryProcess ? '是' : '否'}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">尺寸:</span>
                                            <span class="showmsg f-ml10">{{item.Height}}</span>
                                        </div>
                                        <div class="showlistmsg">
                                            <span class="label">扫描时间:</span>
                                            <span class="showmsg f-ml10">{{getUpiScanTime(item.UpiCode)}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <!-- </swipeout-item>
                    </swipeout> -->
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
        <toast width='12em' v-model="showPositionValue" type="text" :time="2500" :text="Msg" position="middle"></toast>
        <loading :show="showThost" :text="loadingtitle"></loading>
    </div>
</template> 

<script type="text/ecmascript-6">
import SWitch from '../../../components/s-switch.vue';
export default {
    name: '',
    data() {
        return {
            ShowConfirm:false,      //控制提示弹窗的显隐
            ConfirmMsg:'提交成功',
            BadColor:false,
            Successbtn:true,
            Dangerbtn:true,
            ConfirmType:null,           //确认类型，默认为空，1-UPI确认
            showPositionValue:false,     //提示信息显隐
            Msg:'有问题',                //提示信息
            showThost:false,             //圈圈的显隐
            loadingtitle:'提交中',       //圈圈文字
            CollectByUpi:false,         //按UPI采集
            DisableBarcode:false,       //条码输入是否失效
            Barcode:null,               //条码
            PlateCode:null,             //托号
            ScanUpis:[],                //已扫描UPI信息
            FinishUpis:[],              //已完成的UPI
            UnfinishUpis:[],            //未完成的UPI
            Task:null,                  //任务信息
            PanelCount:null,            //板件数
            DataList:[],
            ErrMsg:null,                //报错信息
            Edge:4,                     //多少边
            inputValue:true,            //控制选择组件的状态
            ShowSwitch:false,           //控制是否显示切换switch
        }
    },
    components: {
        's-switch':SWitch
    },
    methods: {
        // 切换switch的事件
        changeSwitch(value){
            // console.log(value);
            this.inputValue=value
            this.inputValue==false?this.Edge=2:this.Edge=4
            // console.log(this.inputValue);
        },
        //获取托号
        getBarcode(){
            console.log(this.Barcode);
            if(!this.Barcode){
                this.showPositionValue = true
                this.Msg = '前垫板/UPI不能为空'
                return
            }

            if(this.CollectByUpi && this.DataList.length > 0){
                if(this.ScanUpis.findIndex(item => item.Upi == this.Barcode) >= 0){
                    this.showPositionValue = true
                    this.Msg = `UPI：${this.Barcode}已扫描`
                    this.Barcode = null
                    return
                }

                if(this.DataList.findIndex(item => item.UpiCode == this.Barcode) < 0){
                    this.showPositionValue = true
                    this.Msg = `UPI：${this.Barcode}不存在于当前任务中`
                    this.Barcode = null
                    return
                }

                this.scanUpi(this.Barcode)
                this.Barcode = null
                return
            }

            this.scanDataGetTask(this.$route.params.WorkshopId,this.$route.params.ProcessId,this.$route.params.ResourceManageId,this.Barcode)
        },
        //获取托号
        getPlateCode(){
            console.log(this.PlateCode);
            if(!this.PlateCode){
                this.showPositionValue = true
                this.Msg = "后垫板不能为空"
            }
        },
        //触发单项左右滑动
        handleEvents(type){
            console.log(type);
        },
        //点击删除按钮，删除当前项
        onButtonClick(index){
            console.log(index);
        },
        //获取焦点事件
        getFocus(){
            // console.log('获取焦点事件');
        },
        //失去焦点事件
        getBlur(){
            // console.log('失去焦点事件');
        },
        //键盘回车事件
        getEnter(){
            // console.log('键盘回车事件');
        },
        //点击提示弹窗的删除按钮
        onCancel(){
            // this.$refs.BarcodeInp.focus()
        },
        //点击提示弹窗的确认按钮
        onConfirm(){
            // this.$refs.BarcodeInp.focus()
            if(this.ConfirmType == 1){
                // 异步触发提交，避免确认窗口直接关闭
                setTimeout(() => {
                    this.submitUpi(this.$route.params.WorkshopId,this.$route.params.ProcessId,this.$route.params.ResourceManageId,this.Task.Id,this.PlateCode,this.FinishUpis,this.UnfinishUpis)
                }, 500)
            }
        },
        //点击提交按钮
        doPost(){
            // this.ShowConfirm=true
            // console.log(this.DataList);
            // console.log(this.Edge);
            if(this.$route.params.ProcessName != '封边'){
                this.Edge = -1
            }

            if(!this.PlateCode){
                this.Msg = '后垫板不能为空'
                this.showPositionValue = true
                return
            }

            if(this.CollectByUpi){
                if(this.ScanUpis.length <= 0){
                    this.Msg = '提交的UPI数据不能为空'
                    this.showPositionValue = true
                    return
                }

                this.FinishUpis = []
                this.UnfinishUpis = []

                if(this.DataList.length > 0){
                    this.DataList.forEach((item, index) => {
                        if(this.ScanUpis.findIndex(info => info.Upi == item.UpiCode) >= 0){
                            this.FinishUpis.push(item.UpiCode)
                        }else{
                            this.UnfinishUpis.push(item.UpiCode)
                        }
                    })

                    if(this.UnfinishUpis.length > 0){
                        this.ShowConfirm = true
                        this.ConfirmMsg = '以下UPI尚未采集，是否确认提交？\n' + this.UnfinishUpis.join('\n')
                        this.BadColor = false
                        this.Successbtn = true
                        this.Dangerbtn = true
                        this.ConfirmType = 1
                        return
                    }
                }

                this.submitUpi(this.$route.params.WorkshopId,this.$route.params.ProcessId,this.$route.params.ResourceManageId,this.Task.Id,this.PlateCode,this.FinishUpis,this.UnfinishUpis)
            }else{
                if(!this.Barcode){
                    this.Msg = '前垫板不能为空'
                    this.showPositionValue = true
                    return
                }

                this.changePlateCode(this.$route.params.WorkshopId,this.$route.params.ProcessId,this.$route.params.ResourceManageId,this.Task.WorkPlateId,this.Barcode,this.PlateCode)
            }
        },
        //接口：扫描前垫板/UPI
        scanDataGetTask(departmentId,processId,resourceId,barcode){
            this.loadingtitle = '加载中'
            this.showThost = true

// let res = {"Success": true,
// "Result": {
//     "Id": 12,
//     "ShiftCode": "SE200329A1",
//     "BatchCode": "SE200329A1-1",
//     "PalletcatoryCode": "L",
//     "WorkPlateId": 189,
//     "PlanNumber": 10,
//     "FinishDimensionType": 0,
//     "WorkPlateDataDetailLst": [{"UpiCode": "0036515481001", "Height": 18, "SecondaryProcess": false, "ScanDateTime": null},
//     {"UpiCode": "0036515481002", "Height": 18, "SecondaryProcess": false, "ScanDateTime": null},
//     {"UpiCode": "0036515481003", "Height": 25, "SecondaryProcess": true, "ScanDateTime": null},
//     {"UpiCode": "0036515481004", "Height": 35, "SecondaryProcess": true, "ScanDateTime": null},]
// }}

           this.$axiosApi.scanDataGetTask(departmentId,processId,resourceId,barcode).then(res=>{
                this.showThost = false
                console.log(res);
                if(res.Success){
                    this.CollectByUpi = res.Result.FinishDimensionType == 0
                    this.Task = res.Result

                    if(this.CollectByUpi){
                        // 按UPI采集
                        if(!!res.Result.WorkPlateDataDetailLst){
                            this.DataList = res.Result.WorkPlateDataDetailLst
                        }
                        this.DisableBarcode = false
                        this.Barcode = null
                        this.scanUpi(barcode)
                        this.$refs.BarcodeInp.focus();
                    }else{
                        // 按托盘采集
                        this.DisableBarcode = true
                        this.PanelCount = res.Result.PlanNumber
                        this.PlateCode = null
                        this.$refs.PlateInp.focus()
                    }
                }else{
                    this.showPositionValue = true
                    this.Msg = res.Message
                    this.Barcode = null
                    this.$refs.BarcodeInp.focus()
                }
           })
        },
        //接口：提交垫板换托采集
        changePlateCode(departmentId,processId,resourcesId,workPlateId,startPlateCode,endPlateCode){
            this.loadingtitle = '提交中'
            this.showThost = true
            this.$axiosApi.changePlateCode(departmentId,processId,resourcesId,workPlateId,startPlateCode,endPlateCode).then(res=>{
                // console.log(`departmentId:${departmentId}, processId:${processId}, resourcesId:${resourcesId}, workPlateId:${workPlateId}, startPlateCode:${startPlateCode}, endPlateCode:${endPlateCode}`);
                // console.log(res);
                this.showThost = false
                this.doApiResult(res)
            })
        },
        //接口：提交UPI采集
        submitUpi(departmentId,processId,resourcesId,taskId,endPlateCode,finishUpiList,unFinishUpiList){
            this.loadingtitle = '提交中'
            this.showThost = true
            this.$axiosApi.submitUpi(departmentId,processId,resourcesId,taskId,endPlateCode,finishUpiList,unFinishUpiList).then(res=>{
                // console.log(`departmentId:${departmentId}, processId:${processId}, resourcesId:${resourcesId}, taskId:${taskId}, endPlateCode:${endPlateCode}, finishUpiList:${finishUpiList}, unFinishUpiList:${unFinishUpiList}`);
                // console.log(res);
                this.showThost = false
                this.doApiResult(res)
            })
        },
        doApiResult(res){
            if(res.Success){
                console.log(res);
                this.ShowConfirm = true
                this.ConfirmMsg = '提交成功'
                this.BadColor = false
                this.Successbtn = true
                this.Dangerbtn = false
                this.ConfirmType = null
                this.CollectByUpi = false
                this.Task = null
                this.DisableBarcode = false
                this.PlateCode = null
                this.Barcode = null
                this.PanelCount = null
                this.ScanUpis = []
                this.FinishUpis = []
                this.UnfinishUpis = []
                this.DataList = []
                this.ErrMsg = null
            }else{
                this.ShowConfirm = true
                this.ConfirmMsg = '提交失败'
                this.ErrMsg = res.Message
                this.BadColor = true
                this.Successbtn = false
                this.Dangerbtn = true
                this.ConfirmType = null
            }
        },
        scanUpi(upi){
            let date = new Date()
            let scanTime = date.getFullYear() + '-' + this.padLeft(date.getMonth() + 1, 2) + '-' + this.padLeft(date.getDate(), 2) + ' ' + this.padLeft(date.getHours(), 2) + ':' + this.padLeft(date.getMinutes(), 2) + ':' + this.padLeft(date.getSeconds(), 2)
            let upiInfo = {"Upi": upi, "ScanTime": scanTime}
            this.ScanUpis.push(upiInfo)
            this.PanelCount = `${this.ScanUpis.length}/${this.Task.PlanNumber}`
        },
        padLeft(number,totalWidth){
            let res = number.toString()
            
            if(!!res){
                while(res.length < totalWidth){
                    res = '0' + res
                }
            }

            return res
        },
        getUpiScanTime(upi){
            if(!!this.ScanUpis){
                let upiInfo = this.ScanUpis.find(item => item.Upi == upi)

                if(!!upiInfo){
                    return upiInfo.ScanTime
                }
            }

            return null
        },
    },
    created(){
        // if(this.$route.params.ProcessName=='封边'){
        //     this.ShowSwitch=true
        // }
    },
    mounted () {
        this.$refs.BarcodeInp.focus()
        console.log(this.$route.params);
    }
}
</script>

<style lang="less">

</style>
