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
                补料返工责任确认
            <a slot="right" @click="doPost">责任确认</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5" style="overflow-y: auto;">
            <div class="g-scrollbox">
                <div class="f-auto">
                    <s-messageheader class="f-mt10" messagetitle="单据概要信息" v-show='FeedingReworkData.BatchNo'></s-messageheader>
                   
                    <div class="g-notflexbox s-bgE7E7E7" v-show='FeedingReworkData.BatchNo'>
                        <div class="m-baserowbox">
                            <span class="label100" >返修单号:</span>
                            <span class="text">{{FeedingReworkData.RerpoductNo}}</span>
                        </div>
                        <div class="m-baserowbox">
                            <span class="label100" >批次号:</span>
                            <span class="text">{{FeedingReworkData.BatchNo}}</span>
                        </div>
                        <div class="m-baserowbox">
                            <span class="label100" >出货日期:</span>
                            <span class="text">{{FeedingReworkData.DeliveryDate}}</span>
                        </div>
                        <div class="m-baserowbox">
                            <span class="label100" >创建日期:</span>
                            <span class="text">{{FeedingReworkData.CreateDate}}</span>
                        </div>
                        <div class="m-baserowbox">
                            <span class="label100" >制单人:</span>
                            <span class="text">{{FeedingReworkData.CreateBy}}</span>
                        </div>
                        <div class="m-baserowbox">
                            <span class="label100">附件:</span>

                            <show-upload-img :imgData="arrayImage"/>

                        </div>
                    </div>
                    <s-messageheader class="f-mt10" messagetitle="单据明细" v-show='FeedingReworkData.Details.length>0'></s-messageheader>
                    <div class="f-pd5 s-border" v-show='FeedingReworkData.Details.length>0'>
                        <div class="m-listbox f-mtb5 s-bgE7E7E7" v-for="(item,index) in DataList" :key="index" @click="clickChoice(item,index)">
                            <div class="num">
                                {{index+1}}
                            </div>
                            <div class="showbox">
                                <div class="m-baserowbox">
                                    <span class="label80">板件信息:</span>
                                    <span class="text">{{item.UPI}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label80">订单号:</span>
                                    <span class="text">{{item.SaleOrderNo}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label80">物料编码:</span>
                                    <span class="text">{{item.ItemCode}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label80">物料名称:</span>
                                    <span class="text">{{item.ItemName}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label80">缺陷:</span>
                                    <span class="text">{{item.ResponseData.DefectCategory}}_{{item.ResponseData.Defect}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label80">规格:</span>
                                    <span class="text">{{item.Specifacation}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label80" >责任班组类别:</span>
                                    <div class="select s-bgwhile"  @click="clickGroupType">
                                        <div>{{item.ResponseData.ResRemark}}</div>
                                    </div>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label80" >责任班组:</span>
                                    <div class="select s-bgwhile"  @click="clickGroup">
                                        <div>{{item.ResponseData.ResWorkGroup}}</div>
                                    </div>
                                </div>
                                <div class="m-baserowbox"  v-if="item.ResponseData.ResRemark != '非生产性责任班组'">
                                    <span class="label80" >责任人:</span>
                                    <div class="select s-bgwhile"  @click="clickPersonLiable(item,index)">
                                        <div>{{item.ResponseData.ResEmployee}}</div>
                                    </div>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label80" >考核情况:</span>
                                    <div class="select s-bgwhile"  @click="clickLiableExamine">
                                        
                                        <div>{{item.ResponseData.ResEmpAssessmentName}}</div>
                                    </div>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label80" >连带责任人:</span>
                                    <div class="select s-bgwhile"  @click="clickRelationPerson(item,index)">
                                        
                                        <div>{{item.ResponseData.JointEmp}}</div>
                                    </div>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label80" >考核情况:</span>
                                    <div class="select s-bgwhile"  @click="clickRelationExamine">
                                        
                                        <div>{{item.ResponseData.JonitEmpAssessmentName}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="overflow-x: hidden;">
                        <!-- 责任班组类别 -->
                        <popup-picker 
                            :show.sync="ShowGroupType" 
                            :data="GroupTypeList" 
                            @on-change="changeGroupType"
                            value-text-align='left'
                        ></popup-picker>
                        <!-- 责任班组 -->
                        <popup-picker 
                            :show.sync="ShowGroup" 
                            :data="GroupList" 
                            @on-change="changeGroup"
                            value-text-align='left'
                        ></popup-picker>
                        <!-- 责任人 -->
                        <popup-picker 
                            :show.sync="ShowPersonLiable" 
                            :data="PersonLiableList" 
                            @on-change="changePersonLiable"
                            value-text-align='left'
                        ></popup-picker>
                        <!-- 考核情况 -->
                        <popup-picker 
                            :show.sync="ShowLiableExamine" 
                            :data="LiableExamineList" 
                            @on-change="changeLiableExamine"
                            value-text-align='left'
                        ></popup-picker>
                        <!-- 连带责任人 -->
                        <popup-picker 
                            :show.sync="ShowRelationPerson" 
                            :data="RelationPersonList" 
                            @on-change="changeRelationPerson"
                            value-text-align='left'
                        ></popup-picker>
                        <!-- 考核情况 -->
                        <popup-picker 
                            :show.sync="ShowRelationExamine"
                            :data="RelationExamineList"
                            @on-change="changeRelationExamine"
                            value-text-align='left'
                        ></popup-picker>
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
import showuploadImg from '../../../components/components/showuploadImg'
export default {
    name: 'ResponsibilityRecognition',
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
            UPI:null,                //UPI
            DataList:[
                
            ],
            FeedingReworkData:{
                BatchNo:null,           //批次号
                CreateDate:null,        //创建日期
                DeliveryDate:null,      //交货日期
                Details:[],           //单明细
                EmergencyFlag:null,     //是否加急  1是，0否
                IsBatch:null,           //是否批次  1是，0否
                PackingType:null,       //装箱类别
                PackingTypeId:null,     //装箱类别id
                PhotoList:null,         //图片列表
                ProduceTaskId:null,     //生产流程单
                ProduceTaskSaleOrderId:null,    //生产任务销售订单id
                ResponseData:null,      // 单据选择的概要信息
                StockFlowId:null,       //备货流程
            },

            ShowGroup:false,        //控制班组弹窗的显隐
            GetGroup:null,             //接口获取到的班组的数据
            GroupList:[[' ']],     //班组的列表
            ResWorkGroup:null,                //选择的班组
            ResWorkGroupId:null,            //选择的班组

            GetGroupType:null,                //获取的班组类别
            ShowGroupType:false,        //控制班组班组类别弹窗的显隐
            GroupTypeList:null,     //班组类别的列表
            GroupType:null,                //选择的班组类别

            ShowPersonLiable:false,     //控制责任人的显隐
            GetPersonLiable:null,       //接口获取到责任人数据
            PersonLiableList:[[' ']],  //责任人列表
            ResEmployee:null,          //选择的责任人
            ResEmployeeId:null,        //责任人id

            ShowLiableExamine:false,    //控制考核情况的显隐
            GetLiableExamine:null,      //接口获取考核情况的数据
            LiableExamineList:[[' ','已考核','未考核']],    //考核情况的列表
            ResEmpAssessment:null,         //选择的考核情况
            LiableExamineName:null,       //考核情况Id

            ShowRelationPerson:false,   //控制连带责任人的显隐
            GetRelationPerson:null,     //接口获取连带责任人的数据
            RelationPersonList:[[' ']],    //连带责任人的列表
            JointEmp:null,        //选择的连带责任人
            JointEmpId:null,      //连带责任人id

            ShowRelationExamine:false,  //控制连带考核情况的显隐
            GetRelationExamine:null,    //控制连带考核情况的显隐
            RelationExamineList:[[' ','已考核','未考核']],  //控制连带考核情况的显隐
            JonitEmpAssessment:null,       //控制连带考核情况的显隐
            RelationExamineName:null,       //控制连带考核情况的显隐
            //上传图片的参数配置开始

            arrayImage: [
            ],
            //上传图片的参数配置结束
        }
    },
    components: {
        'show-upload-img':showuploadImg
    },

    methods: {
        goBaseIndex(){
            this.$router.push({name:'FeedingReworkedList',params:{ChoiceWorkGroup:this.$route.params.ChoiceWorkGroup}})
        },
        //点击提示弹窗的删除按钮
        onCancel(){

        },
        //点击提示弹窗的确认按钮
        onConfirm(){
            this.$router.push({name:'FeedingReworkedList',params:{ChoiceWorkGroup:this.$route.params.ChoiceWorkGroup}})
        },
        //点击提交按钮
        doPost(){
            // this.ShowConfirm=true
            console.log(this.FeedingReworkData);
            this.determineResponse(this.FeedingReworkData)
        },
        //根据点击单明细，保存点击的单据
        clickChoice(item,index){
            console.log(index);
            this.$store.dispatch('changeUserInfo',{attr:"choiceindex",val:index}); 
        },
        //选择班组类别
        changeGroupType(val){
            let myindex = this.$store.getters.getChoiceIndex
            //只要切换班组类别 就重新设置
            if(this.GroupType!=val[0])
            {
                this.DataList[myindex].ResponseData.ResWorkGroupId=null
                this.DataList[myindex].ResponseData.ResWorkGroup = null
                this.DataList[myindex].ResponseData.ResEmployeeId=null
                this.DataList[myindex].ResponseData.ResEmployee=null
                this.DataList[myindex].ResponseData.JointEmpId=null
                this.DataList[myindex].ResponseData.JointEmp=null
                this.DataList[myindex].ResponseData.ResRemark=val[0]
            }
        },
        //选择班组
        changeGroup(val){
            console.log(val[0]);
            console.log(val[0]);
            let myindex = this.$store.getters.getChoiceIndex
            if(this.DataList[myindex].ResponseData.ResWorkGroupId!=val[0]){
                this.DataList[myindex].ResponseData.ResEmployeeId=null
                this.DataList[myindex].ResponseData.ResEmployee=null
                this.DataList[myindex].ResponseData.JointEmpId=null
                this.DataList[myindex].ResponseData.JointEmp=null
            }
            let id = val[0]
            this.DataList[myindex].ResponseData.ResWorkGroupId=val[0]
            this.DataList[myindex].ResponseData.ResWorkGroup = this.GetGroup.find(item=>item.Id == id).Name
        },
        //选择的责任人
        changePersonLiable(val){
            let myindex = this.$store.getters.getChoiceIndex
            let id = val[0]
            this.DataList[myindex].ResponseData.ResEmployeeId=val[0]
            if(!!this.DataList[myindex].ResponseData.ResEmployeeId){
                this.DataList[myindex].ResponseData.ResEmployee = this.GetPersonLiable.find(item=>item.Id == id).Name
            }else{
                this.DataList[myindex].ResponseData.ResEmployeeId=null
                this.DataList[myindex].ResponseData.ResEmployee=null
            }
        },
        //选择的责任人的考核情况
        changeLiableExamine(val){
            let myindex = this.$store.getters.getChoiceIndex
            this.DataList[myindex].ResponseData.ResEmpAssessmentName = val[0]
            if(this.DataList[myindex].ResponseData.ResEmpAssessmentName=='已考核'){
                this.DataList[myindex].ResponseData.ResEmpAssessment=1
            }
            if(this.DataList[myindex].ResponseData.ResEmpAssessmentName=='未考核'){
                this.DataList[myindex].ResponseData.ResEmpAssessment=0
            }
        },

        //选择连带责任人
        changeRelationPerson(val){
            let myindex = this.$store.getters.getChoiceIndex
            let id = val[0]
            this.DataList[myindex].ResponseData.JointEmpId=val[0]
            if(!!this.DataList[myindex].ResponseData.JointEmpId){
                this.DataList[myindex].ResponseData.JointEmp = this.GetRelationPerson.find(item=>item.Id == id).Name
            }else{
                this.DataList[myindex].ResponseData.JointEmpId=null
                this.DataList[myindex].ResponseData.JointEmp=null
            }
            
        },
        //连带责任人的考核情况
        changeRelationExamine(val){
            let myindex = this.$store.getters.getChoiceIndex
            this.DataList[myindex].ResponseData.JonitEmpAssessmentName = val[0]
            if(this.DataList[myindex].ResponseData.JonitEmpAssessmentName=='已考核'){
                this.DataList[myindex].ResponseData.JonitEmpAssessment=1
            }
            if(this.DataList[myindex].ResponseData.JonitEmpAssessmentName=='未考核'){
                this.DataList[myindex].ResponseData.JonitEmpAssessment=0
            }
        },
        //点击责任班组类别
        clickGroupType(){
            this.ShowGroupType=true
            
            this.$axiosApi.getRepWorkGroupType().then(res=>{
                if(res.Success==true){
                    console.log(res);
                    this.GetGroupType =  res.Result
                    this.GroupTypeList=[[{name:'',value :''}]]
                     let GroupTypeListData = [this.GetGroupType.map(item=>{
                       return {name:item,value:item}
                    })]
                    this.GroupTypeList[0].push(...GroupTypeListData[0])
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    return
                }
            })

        },
        //点击责任班组
        clickGroup(){
            this.ShowGroup=true
            let myindex = this.$store.getters.getChoiceIndex
            if(!this.DataList[myindex].ResponseData.ResRemark){
                this.showPositionValue=true
                this.Msg='请先选择责任班组类别'
                return
            }
            this.$axiosApi.getRepWorkGroups(this.FeedingReworkData.DeptId,this.DataList[myindex].ResponseData.ResRemark).then(res=>{
                if(res.Success==true){
                    console.log(res);
                    this.GetGroup=res.Result
                    this.GroupList=[[]]
                    this.GroupList = [this.GetGroup.map(item=>{
                       return {name:item.Name,value:item.Id}
                    })]
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    return
                }
            })
        },
        
        //点击责任人
        clickPersonLiable(item,index){
            //这里需要先执行当前点击单的保存
            this.clickChoice(item,index)
            let myindex = this.$store.getters.getChoiceIndex
            console.log(this.DataList[myindex].ResponseData.ResWorkGroupId);
            //再执行接口调取
            if(this.DataList[myindex].ResWorkGroupId===null || this.DataList[myindex].ResWorkGroupId===''){
                this.showPositionValue=true
                this.Msg='请先选择责任班组'
                return
            }
            this.ShowPersonLiable=true
            // 0-选择责任人，1-选择连带责任人，2-选择定责质检
            this.$axiosApi.getRepEmps(0,this.DataList[myindex].ResponseData.ResWorkGroupId).then(res=>{
                if(res.Success==true){
                    console.log(res);
                    this.GetPersonLiable=res.Result
                    this.PersonLiableList=[[{name:'',value:''}]]
                    let PersonLiableListData = [this.GetPersonLiable.map(item=>{
                       return {name:item.Name,value:item.Id}
                    })]
                    this.PersonLiableList[0].push(...PersonLiableListData[0])
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
                if(this.PersonLiableList[0].length==0){
                    this.showPositionValue=true
                    this.Msg='此班组没有责任人'
                    return
                }
            })
        },

        //点击考核情况
        clickLiableExamine(){
            this.ShowLiableExamine=true
        },

        //点击连带责任人
        clickRelationPerson(item,index){
            //这里需要先执行当前点击单的保存
            this.clickChoice(item,index)
            let myindex = this.$store.getters.getChoiceIndex
            console.log(this.DataList[myindex].ResponseData.ResWorkGroupId);
            //再执行接口调取
            if(this.DataList[myindex].ResponseData.ResWorkGroupId===null || this.DataList[myindex].ResponseData.ResWorkGroupId===''){
                this.showPositionValue=true
                this.Msg='请先选择责任班组'
                return
            }
            this.ShowRelationPerson=true
            // 0-选择责任人，1-选择连带责任人，2-选择定责质检
            this.$axiosApi.getRepEmps(1,this.DataList[myindex].ResponseData.ResWorkGroupId).then(res=>{
                if(res.Success==true){
                    console.log(res);
                    this.GetRelationPerson=res.Result
                    this.RelationPersonList=[[{name:'',value:''}]]
                    let RelationPersonListData = [this.GetRelationPerson.map(item=>{
                       return {name:item.Name,value:item.Id}
                    })]
                    this.RelationPersonList[0].push(...RelationPersonListData[0])
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
                if(this.RelationPersonList[0].length==0){
                    this.showPositionValue=true
                    this.Msg='此班组没有连带责任人'
                    return
                }
            })
        },

        //点击连带责任人的考核情况
        clickRelationExamine(){
            this.ShowRelationExamine=true
        },
        //接口：获取补料返工单信息
        getReproduceDetails(reproduceId){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.getReproduceDetails(reproduceId).then(res=>{
                this.showThost=false
                if(res.Success==true){
                    console.log(res);
                    this.FeedingReworkData=res.Result
                    this.arrayImage=this.FeedingReworkData.PhotoList
                    this.FeedingReworkData.IsBatch===1?this.IsBatchFeeding='是':this.IsBatchFeeding='否'
                    this.FeedingReworkData.EmergencyFlag===1?this.IsIntercept='是':this.IsIntercept='否'
                    console.log(this.FeedingReworkData.Details[0].ResponseData);
                    this.FeedingReworkData.Details.map(item=>{
                        if(item.ResponseData.JonitEmpAssessment==0){
                            item.ResponseData.JonitEmpAssessmentName='未考核'
                        }
                        if(item.ResponseData.JonitEmpAssessment==1){
                            item.ResponseData.JonitEmpAssessmentName='已考核'
                        }
                        if(item.ResponseData.ResEmpAssessment==0){
                            item.ResponseData.ResEmpAssessmentName='未考核'
                        }
                        if(item.ResponseData.ResEmpAssessment==1){
                            item.ResponseData.ResEmpAssessmentName='已考核'
                        }
                    })
                    this.DataList=this.FeedingReworkData.Details
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    this.BarCode=null 
                }
            })
        },
        //接口：提交责任确认
        determineResponse(data){
            this.loadingtitle='提交中'
            this.showThost=true
            this.$axiosApi.determineResponse(data).then(res=>{
                this.showThost=false
                console.log(res);
                if(res.Success==true){
                    this.ConfirmMsg='提交成功'
                    this.BadColor=false
                    this.Successbtn=true
                    this.Dangerbtn=false
                    this.ShowConfirm=true
                    console.log(res);
                }else{
                    this.ConfirmMsg=res.Message
                    this.BadColor=true
                    this.Successbtn=false
                    this.Dangerbtn=true
                    this.ShowConfirm=true
                }
            })
        },
    },
    created(){
        console.log(this.$route.params.data.Id);
        this.getReproduceDetails(this.$route.params.data.Id)
    },
    mounted () {
    }
}
</script>

<style lang="less">


</style>
