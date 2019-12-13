<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{showBack:true,backText:''}" style="background-color:#22292C">
            <!-- <a slot="left" @click="goFeedingReworkDetial">
                <span style="font-size:26px;" class="iconfont icon-weibiaoti-"></span>
            </a> -->
            返工单明细修改
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            
            <div class="g-scrollbox">
                <div class="f-auto">
                    <s-messageheader class="f-mt10" messagetitle="修改单明细"></s-messageheader>
                    <div 
                        class="g-notflexbox s-bgE7E7E7">
                        <div>
                            <div class="m-baserowbox">
                                <span class="label80" >板件信息:</span>
                                <input class="inp" type="text" name="" id="" v-model="EditData.Sn">
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80" >花色:</span>
                                <input class="inp" type="text" name="" id="" v-model="EditData.Colour">
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80" >物料编码:</span>
                                <input class="inp" type="text" name="" id="" v-model="EditData.ItemCode">
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80" >名称:</span>
                                <input class="inp" type="text" name="" id="" v-model="EditData.Name">
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80" >规格:</span>
                                <span style="flex-shrink: 0;">长:</span><input style="min-width:20px" v-model="EditData.Length" class="inp f-mlr5" type="text" name="" id="">
                                <span style="flex-shrink: 0;">宽:</span><input style="min-width:20px" v-model="EditData.Width" class="inp f-mlr5" type="text" name="" id="">
                                <span style="flex-shrink: 0;">高:</span><input style="min-width:20px" v-model="EditData.Height" class="inp f-mlr5" type="text" name="" id="">
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80" >封边:</span>
                                <div class="select s-bgwhile"  @click="clickSealing">
                                    <popup-picker 
                                        :show.sync="ShowSealing" 
                                        :data="SealingList" 
                                        @on-change="changeSealing"
                                        value-text-align='left'
                                    ></popup-picker>
                                    <div class="select-text">{{Sealing}}</div>
                                </div>
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80" >板件描述:</span>
                                <input class="inp" type="text" name="" id="" v-model="EditData.PlateDesc">
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80" >数量:</span>
                                <input class="inp" type="text" name="" id="" v-model="EditData.Qty">
                            </div>
                            <div class="g-pdabtn" style="justify-content: space-around;">
                                <div class="u-pdabtn" @click="doSave">保存</div>
                                <div class="u-pdabtn" @click="doCancel">取消</div>
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

        <toast width='12em' v-model="showPositionValue" type="text" :time="2500" :text="Msg" position="middle"></toast>
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

            ShowSealing:false,          //控制封边的显隐
            GetSealing:null,           //接口获取到定责质检的数据
            SealingList:[['']], //封边列表
            Sealing:null,               //选择的封边名称
            SealingId:null,             //封边id

            ShowPostConfirm:false,
            ShowConfirm:false,
            ShowProcedure:false,
            
            DetailData:{        //单信息
                "UPI":null,     //板件信息
                "ItemCode":null,    //物料编码
                "Specifacation":null,   //规格
                "ItemName":null,    //物料名称
                "EdgeBandingType":null, //封边
                "Colour":null,      //花色
                "SaleOrderNo":null, //销售订单号
                "IsModifyBillDetail":null,  //是否改变保存。1是点击了保存
                "UpiData":null,     //修改单明细的信息
                "ResponseData":{
                    "EquipId":null,     //设备id
                    "MachineAndTypeName":null,  //设备名称
                    "DefectCategoryId":null,    //出错种类的id
                    "DefectCategory":null,      //出错种类名称
                    "DefectId":null,            //缺陷代码id
                    "Defect":null,              //缺陷代码名称
                    "DefectDescription":null,   //缺陷描述
                    "ResWorkGroupId":null,      //责任班组id
                    "ResWorkGroup":null,        //责任班组名称
                    "ResEmployeeId":null,       //责任人id
                    "ResEmployee":null,         //责任人名称
                    "QualityInspectionId":null, //定责质检id
                    "QualityInspection":null,   //定责质检名称
                    "ResEmpAssessment":null,    //（责任人的）1已考核，0未考核
                    "JointEmpId":null,          //连带定责质检id
                    "JointEmp":null,            //连带定责质检名称
                    "JonitEmpAssessment":null,  //（连带责任人的）1已考核，0未考核
                },
            },
            EditData:{
                Colour: null,
                EdgeBandingType: null,
                Height: null,
                Id: null,
                ItemCode: null,
                ItemId: null,
                Length: null,
                Name: null,
                PlateDesc: null,
                Qty: null,
                Sn: null,
                Width: null,
            },
            DeepDetailData:{            //用于保存原数据源
            },
        }
    },
    components: {
    },
    methods: {
        goFeedingReworkDetial(){
            this.$router.push({name:'FeedingReworkDetial',params:{BtnType:'Back'}})
        },
        doSave(){
            console.log('点击了保存');
            // this.ShowConfirm=true
            this.DetailData.UpiData=this.EditData
            this.DetailData.UPI=this.EditData.Sn
            this.DetailData.ItemCode=this.EditData.ItemCode
            this.DetailData.Specifacation=`${this.EditData.Length}*${this.EditData.Width}*${this.EditData.Height}`
            this.DetailData.ItemName=this.EditData.Name
            this.DetailData.EdgeBandingType=this.EditData.EdgeBandingType
            this.DetailData.Colour=this.EditData.Colour
            this.DetailData.IsModifyBillDetail=1
            //由于没有存在数据库，所以我们要把数据传递回去添加页面。
            this.$store.dispatch('removeKeepAlive', 'FeedingReworkDetial')
            this.$store.dispatch('removeKeepAlive', 'FeedingReworkDetialYes')
            if(this.$store.getters.getAddTtype==0){
                this.$router.push({name:'AddFeedingRework',params:{Details:this.DetailData,BtnType:'Save'}})
            }
            if(this.$store.getters.getAddTtype==1){
                this.$router.push({name:'BatchAddFeedingRework',params:{Details:this.DetailData,BtnType:'Save'}})
            }
            
        },
        doCancel(){

            //当点击取消时，如果我们想重置数据，执行放开下面代码，我们要把之前修改的信息都重置回来
            // this.DetailData.ResponseData=this.DeepDetailData.ResponseData

            if(this.$store.getters.getAddTtype==0){
                this.$store.dispatch('removeKeepAlive', 'FeedingReworkDetial')
                this.$router.push({name:'AddFeedingRework'})
            }
            if(this.$store.getters.getAddTtype==1){
                this.$store.dispatch('removeKeepAlive', 'FeedingReworkDetialYes')
                this.$router.push({name:'BatchAddFeedingRework'})
            }
            
        },
        //选择封边的某一项
        changeSealing(val){
            let id = val[0]
            this.SealingId = val[0]
            if(!!this.SealingId){
                this.Sealing = this.GetSealing.find(item=>item.Id == id).Name
                this.EditData.EdgeBandingType=this.Sealing
            }else{
                this.Sealing=null
            }
        },
        //点击提示弹窗的删除按钮
        onCancel(){

        },
        //点击提示弹窗的确认按钮
        onConfirm(){
            this.$router.push({name:'AddFeedingRework'})
        },
        //点击提交按钮
        doPost(){
            this.ShowConfirm=true
        },
        //点击封边
        clickSealing(){
            this.ShowSealing=true
            this.$axiosApi.getRepEdgeBandingType().then(res=>{
                if(res.Success==true){
                    console.log(res);
                    this.GetSealing=res.Result.Datas
                    this.SealingList=[[{name:'',value:''}]]
                    // this.SealingList = [this.GetSealing]
                    let SealingListData = [this.GetSealing.map(item=>{
                       return {name:item.Name,value:item.Id}
                    })]
                    this.SealingList[0].push(...SealingListData[0])
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            })
        },
        //接口：获取upi信息
        getRepUpiData(upiSn){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.getRepUpiData(upiSn).then(res=>{
                this.showThost=false
                if(res.Success==true){
                    console.log(res);
                    this.EditData=res.Result
                    this.Sealing=this.EditData.EdgeBandingType
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    this.BarCode=null 
                }
            })
        },
        //深拷贝
        deepClone(obj){
            let _obj = JSON.stringify(obj),
                objClone = JSON.parse(_obj);
            return objClone
        } 
    },
    created(){
        console.log(JSON.stringify(this.$route.params));
        if(this.$route.params.Details.IsModifyBillDetail==1){
            this.DetailData=this.$route.params.Details
            this.EditData=this.deepClone(this.$route.params.Details.UpiData)
            this.Sealing=this.EditData.EdgeBandingType
        }else{
            if(this.$route.params.Details){
                this.DetailData=this.$route.params.Details
                this.getRepUpiData(this.DetailData.UPI)
            }
        }
        console.log(this.$route.params.DeepDetailData);
        this.DeepDetailData=this.deepClone(this.$route.params.DeepDetailData)
    },
    mounted () {
        console.log("BillNo:"+localStorage.getItem('BillNo'));
    }
}
</script>

<style lang="less">



</style>
