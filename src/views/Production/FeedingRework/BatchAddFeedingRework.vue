<template>
    <div class="g-index">
        <x-header class="m-header" :left-options="{showBack:false}"  style="background-color:#22292C">
            <a slot="left" @click="goFeedingReworkIndex">
                <span style="font-size:26px;" class="iconfont icon-weibiaoti-"></span>
            </a>
                批次补料返创建
            <a slot="right" @click="doTemporaryStorage">暂存</a>
            <a slot="right" @click="doPost">提交</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-inp">
                <div class="m-inp f-mtb5">
                    <span class="laber" style="min-width:74px">条码</span>
                    <span class="inp s-inpbg">
                        <input v-model="BarCode" ref="BarcodeInp" type="text" @keyup.enter="getBarCode()" class="s-inpbg">
                    </span>
                </div>
            </div>
            <div class="g-scrollbox">
                <div class="f-auto">
                    <s-messageheader class="f-mt10" messagetitle="单据概要信息" v-show='FeedingReworkData.BatchNo'></s-messageheader>
                    
                    <div class="g-notflexbox s-bgE7E7E7" v-show='FeedingReworkData.BatchNo'>
                        
                        <div class="m-baserowbox">
                            <span class="label80" >装箱类型:</span>
                            <span class="text">{{FeedingReworkData.PackingType}}</span>
                        </div>
                        <div class="m-baserowbox">
                            <span class="label80" >批次号:</span>
                            <span class="text">{{FeedingReworkData.BatchNo}}</span>
                        </div>
                        <div class="m-baserowbox">
                            <div class="m-inp f-mtb5">
                                <x-switch class="f-mtb5" style="font-size: 16px;color:#666666;padding:0 10px;margin-left: 1px;width:140px" title="是否加急:" :value-map="['否','是']" v-model="IsIntercept" @on-change="changeIsIntercept"></x-switch>
                                <div style="font-size: 16px;margin-left: 5px;">{{IsIntercept}}</div>
                            </div>
                        </div>
                        <div class="m-baserowbox">
                            <span class="label80" >出货日期:</span>
                            <span class="text">{{FeedingReworkData.DeliveryDate}}</span>
                        </div>
                        <div class="m-baserowbox">
                            <span class="label80" >创建日期:</span>
                            <span class="text">{{FeedingReworkData.CreateDate}}</span>
                        </div>
                        
                        <div class="m-baserowbox">
                            <span class="label80" >制单人:</span>
                            <div class="select s-bgwhile"  @click="clickMaker">
                                <popup-picker 
                                    :show.sync="ShowMaker"
                                    :data="MakerList"
                                    @on-change="changeMaker"
                                    value-text-align='left'
                                ></popup-picker>
                                <div class="select-text">{{Maker}}</div>
                            </div>
                        </div>
                        <!-- 批次补料 类型为：是  的情况 -->
                        <div>
                            
                            <div class="m-baserowbox">
                                <span class="label80" >设备:</span>
                                <div class="select s-bgwhile"  @click="clickEquipment">
                                    <popup-picker 
                                        :show.sync="ShowEquipment" 
                                        :data="EquipmentList" 
                                        @on-change="changeEquipment"
                                        value-text-align='left'
                                    ></popup-picker>
                                    <div class="select-text">{{Equipment}}</div>
                                </div>
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80" >出错中类:</span>
                                <div class="select s-bgwhile"  @click="clickMiddleError">
                                    <popup-picker 
                                        :show.sync="ShowMiddleError" 
                                        :data="MiddleErrorList" 
                                        @on-change="changeMiddleError"
                                        value-text-align='left'
                                    ></popup-picker>
                                    <div class="select-text">{{MiddleError}}</div>
                                </div>
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80" >缺陷代码:</span>
                                <div class="select s-bgwhile"  @click="clickDefectCode">
                                    <popup-picker 
                                        :show.sync="ShowDefectCode" 
                                        :data="DefectCodeList" 
                                        @on-change="changeDefectCode"
                                        value-text-align='left'
                                    ></popup-picker>
                                    <div class="select-text">{{DefectCode}}</div>
                                </div>
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80" >出错描述:</span>
                                <input class="inp" v-model="DefectDescription" type="text" name="" id="" style="border: 1px solid #666666;">
                            </div>
                             <div class="m-baserowbox">
                                <span class="label80" >班组类别:</span>
                                <div class="select s-bgwhile"  @click="clickGroupType">
                                    <popup-picker 
                                        :show.sync="ShowGroupType" 
                                        :data="GroupTypeList"
                                        @on-change="changeGroupType"
                                        value-text-align='left'
                                    ></popup-picker>
                                    <div class="select-text">{{GroupType}}</div>
                                </div>
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80" >责任班组:</span>
                                <div class="select s-bgwhile"  @click="clickGroup">
                                    <popup-picker 
                                        :show.sync="ShowGroup" 
                                        :data="GroupList"
                                        @on-change="changeGroup"
                                        value-text-align='left'
                                    ></popup-picker>
                                    <div class="select-text">{{Group}}</div>
                                </div>
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80" >责任人:</span>
                                <div class="select s-bgwhile"  @click="clickPersonLiable">
                                    <popup-picker 
                                        :show.sync="ShowPersonLiable" 
                                        :data="PersonLiableList" 
                                        @on-change="changePersonLiable"
                                        value-text-align='left'
                                    ></popup-picker>
                                    <div class="select-text">{{PersonLiable}}</div>
                                </div>
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80" >定责质检:</span>
                                <div class="select s-bgwhile"  @click="clickQualityTest">
                                    <popup-picker 
                                        :show.sync="ShowQualityTest" 
                                        :data="QualityTestList" 
                                        @on-change="changeQualityTest"
                                        value-text-align='left'
                                    ></popup-picker>
                                    <div class="select-text">{{QualityTest}}</div>
                                </div>
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80" >考核情况:</span>
                                <div class="select s-bgwhile"  @click="clickLiableExamine">
                                    <popup-picker 
                                        :show.sync="ShowLiableExamine" 
                                        :data="LiableExamineList" 
                                        @on-change="changeLiableExamine"
                                        value-text-align='left'
                                    ></popup-picker>
                                    <div class="select-text">{{LiableExamine}}</div>
                                </div>
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80" >连带责任人:</span>
                                <div class="select s-bgwhile"  @click="clickRelationPerson">
                                    <popup-picker 
                                        :show.sync="ShowRelationPerson" 
                                        :data="RelationPersonList" 
                                        @on-change="changeRelationPerson"
                                        value-text-align='left'
                                    ></popup-picker>
                                    <div class="select-text">{{RelationPerson}}</div>
                                </div>
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80" >考核情况:</span>
                                <div class="select s-bgwhile"  @click="clickRelationExamine">
                                    <popup-picker 
                                        :show.sync="ShowRelationExamine"
                                        :data="RelationExamineList"
                                        @on-change="changeRelationExamine"
                                        value-text-align='left'
                                    ></popup-picker>
                                    <div class="select-text">{{RelationExamine}}</div>
                                </div>
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80">附件:</span>
                                <upload-img :imgData="arrayImage" @add="addImg" @del="deleteImg" :maxLength='imglength'/>
                            </div>
                        </div>

                    </div>
                    
                    <s-messageheader class="f-mt10" messagetitle="单明细" v-show='FeedingReworkData.Details.length>0'></s-messageheader>
                    <swipeout class="s-border" v-show='FeedingReworkData.Details.length>0'>
                        <swipeout-item v-for="(item,index) in FeedingReworkData.Details" :key="index" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
                            <div slot="right-menu" style="padding:5px 0;">
                            <swipeout-button @click.native="onButtonClick(index,item)" type="warn">删除</swipeout-button>
                            </div>
                            <div slot="content" class="f-pd5 vux-1px-t">
                                <div class="g-tranbox s-bgE7E7E7" @click="goDetial(item)">
                                    <div class="m-ordernumber">{{index+1}}</div>
                                    <div>
                                        <div class="m-baserowbox">
                                            <span class="label80" >板件信息:</span>
                                            <span class="text">{{item.UPI}}</span>
                                        </div>
                                        <div class="m-baserowbox">
                                            <span class="label80" >物料:</span>
                                            <span class="text">{{item.ItemCode}}</span>
                                        </div>
                                        <div class="m-baserowbox">
                                            <span class="label80" >规格:</span>
                                            <span class="text">{{item.Specifacation}}</span>
                                        </div>
                                        <div class="m-baserowbox">
                                            <span class="label80" >名称:</span>
                                            <span class="text">{{item.ItemName}}</span>
                                        </div>
                                        <!-- <div class="m-baserowbox">
                                            <span class="label80" >设备:</span>
                                            <span class="text">{{item.ItemName}}</span>
                                        </div> -->
                                        
                                    </div>
                                    <!-- <div class="target" @click.stop="showMore(item,$event)">点击展示</div> -->
                                </div>
                            </div>
                        </swipeout-item>
                    </swipeout>
                </div>
            </div>

        </div>
        <!-- 点击提交按钮时的消息弹窗 -->

        <s-confirm 
            v-model="ShowPostConfirm" 
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
import uploadImg from '../../../components/components/uploadImg'
export default {
    name: 'BatchAddFeedingRework',
    data() {
        return {
            ShowConfirm:false,      //控制提示弹窗的显隐
            ConfirmMsg:'提交成功',
            BadColor:false,
            Successbtn:false,
            Dangerbtn:false,

            showPositionValue:false,        //提示信息显隐
            Msg:'有问题',                         //提示信息

            showThost:false,                //圈圈的显隐
            loadingtitle:'提交中',                //圈圈文字

            imglength:5,

            FeedingReworkData:{
                BatchNo:null,           //批次号
                CreateDate:null,        //创建日期
                DeliveryDate:null,      //交货日期
                Details:[],           //单明细
                EmergencyFlag:null,     //是否加急  1是，0否
                IsBatch:null,           //是否批次  1是，0否
                PackingType:null,       //装箱类别
                PackingTypeId:null,     //装箱类别id
                PhotoList:[],         //图片列表
                ProduceTaskId:null,     //生产流程单
                ResponseData:null,      // 单据选择的概要信息
                StockFlowId:null,       //备货流程
            },

            DefectDescription:null,     //出错描述
            ShowEquipment:false,        //控制设备弹窗的显隐
            GetEquipment:null,             //接口获取到的设备的数据
            EquipmentList:[[' ']],     //设备的列表
            Equipment:null,                //选择的设备
            EquipmentId:null,            //选择的设备

            ShowMiddleError:false,        //控制出错中类弹窗的显隐
            GetMiddleError:null,             //接口获取到的出错中类的数据
            MiddleErrorList:[[' ']],     //出错中类的列表
            MiddleError:null,                //选择的出错中类
            MiddleErrorId:null,            //选择的出错中类

            ShowDefectCode:false,        //控制缺陷代码弹窗的显隐
            GetDefectCode:null,             //接口获取到的缺陷代码的数据
            DefectCodeList:[[' ']],     //缺陷代码的列表
            DefectCode:null,                //选择的缺陷代码
            DefectCodeId:null,            //选择的缺陷代码

            ShowGroup:false,        //控制班组弹窗的显隐
            GetGroup:null,             //接口获取到的班组的数据
            GroupList:[[' ']],     //班组的列表
            Group:null,                //选择的班组
            GroupId:null,            //选择的班组
            GroupIsProduct:null,        //选择的班组是否为生产班组

            GetGroupType:null,                //获取的班组类别
            ShowGroupType:false,        //控制班组班组类别弹窗的显隐
            GroupTypeList:null,     //班组类别的列表
            GroupType:null,                //选择的班组类别

            ShowQualityTest:false,      //控制定责质检的显隐
            GetQualityTest:null,           //接口获取到定责质检的数据
            QualityTestList:[[{name:'',value:''}]],  //定责质检的列表
            QualityTest:null,       //选择的定责质检
            QualityTestId:null,         //定责质检id

            ShowPersonLiable:false,     //控制责任人的显隐
            GetPersonLiable:null,       //接口获取到责任人数据
            PersonLiableList:[[' ']],  //责任人列表
            PersonLiable:null,          //选择的责任人
            PersonLiableId:null,        //责任人id
            
            ShowLiableExamine:false,    //控制考核情况的显隐
            GetLiableExamine:null,      //接口获取考核情况的数据
            LiableExamineList:[[' ','已考核','未考核']],    //考核情况的列表
            LiableExamine:null,         //选择的考核情况
            LiableExamineId:null,       //考核情况Id

            ShowRelationPerson:false,   //控制连带责任人的显隐
            GetRelationPerson:null,     //接口获取连带责任人的数据
            RelationPersonList:[[' ']],    //连带责任人的列表
            RelationPerson:null,        //选择的连带责任人
            RelationPersonId:null,      //连带责任人id

            ShowRelationExamine:false,  //控制连带考核情况的显隐
            GetRelationExamine:null,    //控制连带考核情况的显隐
            RelationExamineList:[[' ','已考核','未考核']],  //控制连带考核情况的显隐
            RelationExamine:null,       //控制连带考核情况的显隐
            RelationExamineId:null,       //控制连带考核情况的显隐

            ShowMaker:false,  //控制制单人的显隐
            GetMaker:null,    //控制制单人的显隐
            MakerList:[[' ']],  //控制制单人的显隐
            Maker:null,       //控制制单人的显隐
            MakerId:null,       //控制制单人的显隐

            ShowPostConfirm:false,
            ShowConfirm:false,

            BarCode:null,           //条码
            IsBatchFeeding:'否',            //是否批次补料类型，默认为否
            IsIntercept:'否',               //是否拦截，默认为否
            //上传图片的参数配置开始

            arrayImage: [
            ],
            //上传图片的参数配置结束

            Details:null,      //当前操作的明细信息
            saleOrderNo:null,   //订单号
            IsChange:false,

            ChoiceResponseData:{
                "EquipId":null,     //设备id
                "MachineAndTypeName":null,  //设备名称
                "DefectCategoryId":null,    //出错种类的id
                "DefectCategory":null,      //出错种类名称
                "DefectId":null,            //缺陷代码id
                "Defect":null,              //缺陷代码名称
                "DefectDescription":null,   //缺陷描述
                "ResRemark":null,           //责任班组类别
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
            IsPost:null,                     //判断是暂存还是提交

            FeedingId:null,                 //单ID
            NowBatchNo:null,                //当前批次
            PostIsBatch:1,                  //非批次补料传1
            HasMessage:0,                   //判断upi条码是否已经补料过。0为没有，1为有
            TempFeedingReworkData:null      //存放临时获得的扫描数据
        }
    },
    components: {
        'upload-img':uploadImg
    },

    //每次回来的时候，可以重新调取单明细的接口，这里可以通过获取传值，判断是返回还是保存过来的。返回就不调用接口。
    beforeRouteEnter(to, from, next) {
        next(vm=>{          //  这里的vm指的就是vue实例，可以用来当做this使用
            if(vm.$route.params.BtnType=='Save'){
                console.log('调用接口，获取明细');
                // console.log(vm.$route.params.Details);  //获取到的类型
                // vm.Details=vm.$route.params.Details
                // console.log(vm.FeedingReworkData.Details.find(item=>item.UPI == vm.$route.params.Details.UPI));
                // console.log(vm.Details);  //获取到的类型
            }else{
                console.log('不做动作');
            }
        })
    },
    methods: {
        //返回
        goFeedingReworkIndex(){
            this.$store.dispatch('removeKeepAlive', 'BatchAddFeedingRework')
            this.$router.push({name:'FeedingReworkIndex'})
        },

        //根据批次补料的类型，跳转到不同页面
        goDetial(item){
            console.log(item);
            this.Details=item
            this.$router.push({name:'FeedingReworkDetialYes',params:{Details:this.Details}})
            this.$store.dispatch('removeKeepAlive', 'FeedingReworkDetialYes')

            // if(this.IsBatchFeeding=='否'){
            //     this.$router.push({name:'FeedingReworkDetial',params:{Details:this.Details}})
            //     this.$store.dispatch('removeKeepAlive', 'FeedingReworkDetial')
            // }
            // if(this.IsBatchFeeding=='是'){
            //     this.$router.push({name:'FeedingReworkDetialYes',params:{Details:this.Details}})
            //     this.$store.dispatch('removeKeepAlive', 'FeedingReworkDetialYes')
            // }
        },

        //查看更多信息
        showMore(item,event){
            //到时候，可以点击显示的时候，循环扫描码重新获取数据，然后插入到显示的数组中
            console.log(this.text);
            console.log(event.currentTarget.parentElement);
            if(item.isHeight==false){
                event.currentTarget.parentElement.style.height=420+'px'
                item.isHeight=true
            }else{
                event.currentTarget.parentElement.style.height=130+'px'
                item.isHeight=false
            }
            // console.log(event.currentTarget);
        },

        //获取条码
        getBarCode(){
            if(this.BarCode==null || this.BarCode==''){
                this.showPositionValue=true
                this.Msg='条码不能为空'
                return
            }
            
            let Isrepeat = this.FeedingReworkData.Details.map(item=>{
                console.log(item.UPI);
                return item.UPI==this.BarCode
            })
            console.log(Isrepeat[0]);

            if(Isrepeat[0]==true){
                this.showPositionValue=true
                this.Msg='此条码已经存在'
                this.BarCode=null
                return
            }
            // this.MakerId=this.$store.getters.getUserId
            // this.Maker=this.$store.getters.getUserName.split("[")[0]
            console.log(this.saleOrderNo);
            this.scanProduceTaskUpi(this.BarCode,this.FeedingReworkData.IsBatch,this.saleOrderNo)
        },
        //触发单项左右滑动
        handleEvents(type){
            console.log(type);
        },
        //点击删除按钮，删除当前项
        onButtonClick(index,item){
            console.log(item);
            this.FeedingReworkData.Details.splice(index,1)
            this.deleteProduceTaskDetail(item.UPI)
        },

        //键盘回车事件
        getEnter(){
            console.log('键盘回车事件');
        },
        //点击提示弹窗的删除按钮
        onCancel(){
            if(this.HasMessage==1){
                this.BarCode=null
                this.$refs.BarcodeInp.focus()
            }
            this.BadColor=false
            this.Successbtn=false
            this.Dangerbtn=false
            this.ShowPostConfirm=false
        },
        //点击提示弹窗的确认按钮
        onConfirm(){
            this.BadColor=false
            this.Successbtn=false
            this.Dangerbtn=false
            this.ShowPostConfirm=false
            
            if(this.HasMessage==0){
                this.getReproduceDetails(this.FeedingId)
                if(this.IsPost==1){
                    this.$router.push({name:'FeedingReworkIndex'})
                }
            }
            if(this.HasMessage==1){
                console.log(this.TempFeedingReworkData);
                this.saleOrderNo=this.TempFeedingReworkData.Details[0].SaleOrderNo
                if(this.FeedingReworkData.Details.length>0){
                    this.FeedingReworkData.Details.unshift(this.TempFeedingReworkData.Details[0])
                }else{
                    this.FeedingReworkData=this.TempFeedingReworkData
                }
                this.NowBatchNo=this.TempFeedingReworkData.BatchNo
                this.BarCode=null 
            }
        },
        //构造暂存和提交的数据
        makePostData(){
            //构造提交的数据
            this.ChoiceResponseData.EquipId=this.EquipmentId
            this.ChoiceResponseData.MachineAndTypeName=this.Equipment
            this.ChoiceResponseData.DefectCategoryId=this.MiddleErrorId
            this.ChoiceResponseData.DefectCategory=this.MiddleError
            this.ChoiceResponseData.DefectId=this.DefectCodeId
            this.ChoiceResponseData.Defect=this.MiddleError
            this.ChoiceResponseData.DefectDescription=this.DefectDescription
            this.ChoiceResponseData.ResRemark=this.GroupType
            this.ChoiceResponseData.ResWorkGroupId=this.GroupId
            this.ChoiceResponseData.ResWorkGroup=this.Group
            this.ChoiceResponseData.ResWorkGroupIsProduct=this.GroupIsProduct
            this.ChoiceResponseData.ResEmployeeId=this.PersonLiableId
            this.ChoiceResponseData.ResEmployee=this.PersonLiable
            this.ChoiceResponseData.QualityInspectionId=this.QualityTestId
            this.ChoiceResponseData.QualityInspection=this.QualityTest
            if(this.LiableExamine=='已考核'){
                this.ChoiceResponseData.ResEmpAssessment=1
            }
            if(this.LiableExamine=='未考核'){
                this.ChoiceResponseData.ResEmpAssessment=0
            }
            this.ChoiceResponseData.JointEmpId=this.RelationPersonId
            this.ChoiceResponseData.JointEmp=this.RelationPerson
            if(this.RelationExamine=='已考核'){
                this.ChoiceResponseData.JonitEmpAssessment=1
            }
            if(this.RelationExamine=='未考核'){
                this.ChoiceResponseData.JonitEmpAssessment=0
            }
            // this.ChoiceResponseData.MakerId=this.MakerId
            // this.ChoiceResponseData.Maker=this.Maker
            console.log(this.MakerId);
            console.log(this.Maker);
            this.FeedingReworkData.CreateById=this.MakerId
            this.FeedingReworkData.CreateBy=this.Maker
            this.FeedingReworkData.ResponseData=this.ChoiceResponseData
        },
        //用于获取接口数据后，显示弹窗的信息
        makeGetData(){
            let getDetails=this.FeedingReworkData.Details[0].ResponseData
            this.EquipmentId=getDetails.EquipId
            this.Equipment=getDetails.MachineAndTypeName
            this.MiddleErrorId=getDetails.DefectCategoryId
            this.MiddleError=getDetails.DefectCategory
            this.DefectCode=getDetails.Defect
            this.DefectCodeId=getDetails.DefectId
            this.DefectDescription=getDetails.DefectDescription
            this.GroupType=getDetails.ResRemark
            this.GroupType=getDetails.ResRemark
            this.GroupId=getDetails.ResWorkGroupId
            this.Group=getDetails.ResWorkGroup
            this.GroupIsProduct=getDetails.ResWorkGroupIsProduct
            this.PersonLiableId=getDetails.ResEmployeeId
            this.PersonLiable=getDetails.ResEmployee
            this.QualityTestId=getDetails.QualityInspectionId
            this.QualityTest=getDetails.QualityInspection
            if(getDetails.ResEmpAssessment==1){
                this.LiableExamine='已考核'
            }
            if(getDetails.ResEmpAssessment==0){
                this.LiableExamine='未考核'
            }
            this.RelationPersonId=getDetails.JointEmpId
            this.RelationPerson=getDetails.JointEmp
            if(getDetails.JonitEmpAssessment==1){
                console.log(9999);
                this.RelationExamine='已考核'
            }
            if(getDetails.JonitEmpAssessment==0){
                this.RelationExamine='未考核'
            }
            this.MakerId=this.FeedingReworkData.CreateById
            this.Maker=this.FeedingReworkData.CreateBy
        },
        //点击暂存
        doTemporaryStorage(){
            console.log(this.FeedingReworkData.PhotoList);
            if(this.FeedingReworkData.Details.length<=0){
                this.showPositionValue=true
                this.Msg='无数据，不能暂存'
                return
            }
            // if(this.FeedingReworkData.IsBatch==0){
            //     this.FeedingReworkData.CreateById=this.MakerId
            //     this.FeedingReworkData.CreateBy=this.Maker
            //     if(!this.FeedingReworkData.CreateById){
            //         this.showPositionValue=true
            //         this.Msg='制单人不能为空'
            //         return
            //     }
            //     this.FeedingReworkData.PhotoList=this.arrayImage
            //     if(this.FeedingReworkData.PhotoList==null || this.FeedingReworkData.PhotoList==''){
            //         this.FeedingReworkData.PhotoList=[]
            //     }
            //     console.log(JSON.stringify(this.FeedingReworkData) );
            //     this.saveReproduce(this.FeedingReworkData)
            //     return
            // }
            if(this.FeedingReworkData.IsBatch==1){
                this.makePostData()
                if(!this.FeedingReworkData.CreateById){
                    this.showPositionValue=true
                    this.Msg='制单人不能为空'
                    return
                }
                this.FeedingReworkData.PhotoList=this.arrayImage
                if(this.FeedingReworkData.PhotoList==null || this.FeedingReworkData.PhotoList==''){
                    this.FeedingReworkData.PhotoList=[]
                }
                console.log(JSON.stringify(this.FeedingReworkData));
                this.saveReproduce(this.FeedingReworkData)
                return
            }
        },
        //点击提交按钮
        doPost(){
            if(this.FeedingReworkData.Details.length<=0){
                this.showPositionValue=true
                this.Msg='无数据，不能提交'
                return
            }
            // console.log(this.FeedingReworkData.Details);

            // if(this.FeedingReworkData.IsBatch==0){
            //     this.FeedingReworkData.CreateById=this.MakerId
            //     this.FeedingReworkData.CreateBy=this.Maker
            //     if(!this.FeedingReworkData.CreateById){
            //         this.showPositionValue=true
            //         this.Msg='制单人不能为空'
            //         return
            //     }
            //     for(let item of this.FeedingReworkData.Details){
            //         if(!item.ResponseData){
            //             this.showPositionValue=true
            //             this.Msg=`明细${item.UPI}缺陷代码和责任班组不能为空`
            //             return
            //         }else{
            //             if(!item.ResponseData.DefectId){
            //                 this.showPositionValue=true
            //                 this.Msg=`明细${item.UPI}缺陷代码不能为空`
            //                 return
            //             }
            //             if(!item.ResponseData.ResWorkGroupId){
            //                 this.showPositionValue=true
            //                 this.Msg=`明细${item.UPI}责任班组不能为空`
            //                 return
            //             }
            //         }
            //     }
            //     console.log(333);
            //     this.FeedingReworkData.PhotoList=this.arrayImage
            //     if(this.FeedingReworkData.PhotoList==null || this.FeedingReworkData.PhotoList==''){
            //         this.FeedingReworkData.PhotoList=[]
            //     }
            //     console.log(JSON.stringify(this.FeedingReworkData) );
            //     this.submitReproduce(this.FeedingReworkData)
            //     return
            // }
            if(this.FeedingReworkData.IsBatch==1){
                this.makePostData()
                console.log(this.FeedingReworkData);
                if(!this.FeedingReworkData.CreateById){
                    this.showPositionValue=true
                    this.Msg='制单人不能为空'
                    return
                }
                if(!this.FeedingReworkData.ResponseData.DefectId){
                    this.showPositionValue=true
                    this.Msg=`缺陷代码不能为空`
                    return
                }
                if(!this.FeedingReworkData.ResponseData.ResRemark){
                    this.showPositionValue=true
                    this.Msg=`责任班组不能为空`
                    return
                }
                if(!this.FeedingReworkData.ResponseData.ResWorkGroupId){
                    this.showPositionValue=true
                    this.Msg=`责任班组不能为空`
                    return
                }
                if(this.FeedingReworkData.ResponseData.ResRemark=="非生产性责任班组" && this.FeedingReworkData.ResponseData.QualityInspection==null){
                    this.Msg='责任班组为非生产班组，定责质检必填'
                    this.showPositionValue=true
                    return
                }
                this.FeedingReworkData.PhotoList=this.arrayImage
                if(this.FeedingReworkData.PhotoList==null || this.FeedingReworkData.PhotoList==''){
                    this.FeedingReworkData.PhotoList=[]
                }
                this.FeedingReworkData.Details.forEach(element => {
                   element.ResponseData =  this.FeedingReworkData.ResponseData
                });
                this.submitReproduce(this.FeedingReworkData)
                return
            }
        },
        //当类型的值变化时，执行此方法
        // changeIsBatchFeeding(value){
        //     console.log(value);
        //     if(value=='是'){
        //         this.FeedingReworkData.IsBatch=1
        //     }else{
        //         this.FeedingReworkData.IsBatch=0
        //     }
        // },

        //当是否加急的值变化时，执行此方法
        changeIsIntercept(value){
            console.log(value);
            if(value=='是'){
                this.FeedingReworkData.EmergencyFlag=1
            }else{
                this.FeedingReworkData.EmergencyFlag=0
            }
        },

        //图片上传的方法开始
        addImg(index,value){
            console.log(value);
            this.arrayImage.push(value)
        },
        deleteImg(index,currenIndex){
            console.log('img-del')
            // this.arrayImage.splice(currenIndex, 1);
            this.arrayImage.splice(currenIndex, 1);
        },
        //图片上传的方法结束



        //选择设备
        changeEquipment(val){
            let id = val[0]
            this.EquipmentId=val[0]
            if(!!this.EquipmentId){
                this.Equipment = this.GetEquipment.find(item=>item.EquipId == id).MachineAndTypeName
            }else{
                this.EquipmentId=null
                this.Equipment=null
            }
        },
        //选择错误中类
        changeMiddleError(val){
            let id = val[0]
            this.MiddleErrorId=val[0]
            this.DefectCodeId=null
            this.DefectCode=null
            if(!!this.MiddleErrorId){
                this.MiddleError = this.GetMiddleError.find(item=>item.Id == id).Name
            }else{
                this.MiddleErrorId=null
                this.MiddleError=null
            }
        },
        //选择缺陷代码
        changeDefectCode(val){
            let id = val[0]
            this.DefectCodeId=val[0]
            
            if(!!this.DefectCodeId){
                this.DefectCode = this.GetDefectCode.find(item=>item.Id == id).Name
            }else{
                this.DefectCodeId=null
                this.DefectCode=null
            }
        },
        //选择班组类别
        changeGroupType(val){
            //只要切换班组类别 就重新设置
            if(this.GroupType!=val[0])
            {
                this.PersonLiableId=null
                this.PersonLiable=null
                this.QualityTestId=null
                this.QualityTest=null
                this.RelationPersonId=null
                this.RelationPerson=null
                this.Group=null
                this.GroupId=null
                this.GroupType=val[0]
            }
        },
        
        //选择班组
        changeGroup(val){
            let id = val[0]
            //重置与班组关联的查询信息
            if(this.GroupId!=val[0]){
                this.PersonLiableId=null
                this.PersonLiable=null
                this.QualityTestId=null
                this.QualityTest=null
                this.RelationPersonId=null
                this.RelationPerson=null
            }
            this.GroupId=val[0]
            if(!!this.GroupId){
                this.Group = this.GetGroup.find(item=>item.Id == id).Name
                this.GroupIsProduct=this.GetGroup.find(item=>item.Id == id).IsProduct
            }else{
                this.GroupId=null
                this.Group=null
            }
        },
        
        //选择的责任人
        changePersonLiable(val){
            let id = val[0]
            this.PersonLiableId=val[0]
            if(!!this.PersonLiableId){
                this.PersonLiable = this.GetPersonLiable.find(item=>item.Id == id).Name
            }else{
                this.PersonLiableId=null
                this.PersonLiable=null
            }
        },
        //选择定责质检
        changeQualityTest(val){
            let id = val[0]
            this.QualityTestId=val[0]
            if(!!this.QualityTestId){
                this.QualityTest = this.GetQualityTest.find(item=>item.Id == id).Name
            }else{
                this.QualityTestId=null
                this.QualityTest=null
            }
        },
        //选择的责任人的考核请款
        changeLiableExamine(val){
            this.LiableExamine = val[0]
        },
        //选择连带责任人
        changeRelationPerson(val){
            let id = val[0]
            this.RelationPersonId=val[0]
            if(!!this.RelationPersonId){
                this.RelationPerson = this.GetRelationPerson.find(item=>item.Id == id).Name
            }else{
                this.RelationPersonId=null
                this.RelationPerson=null
            }
        },
        //连带责任人的考核情况
        changeRelationExamine(val){
            this.RelationExamine = val[0]
        },
        //选择制单人
        changeMaker(val){
            let id = val[0]
            this.MakerId=val[0]
            if(!!this.MakerId){
                this.Maker = this.getMaker.find(item=>item.Id == id).Name
            }else{
                this.MakerId=null
                this.Maker=null
            }
        },
        //点击设备
        clickEquipment(){
            this.ShowEquipment=true
            this.$axiosApi.getRepResourceManages(this.FeedingReworkData.DeptId).then(res=>{
                if(res.Success==true){
                    console.log(res);
                    this.GetEquipment=res.Result
                    this.EquipmentList=[[{name:'',value:''}]]
                    let EquipmentListData =[this.GetEquipment.map(item=>{
                       return {name:item.MachineAndTypeName,value:item.EquipId}
                    })]
                    this.EquipmentList[0].push(...EquipmentListData[0])
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            })
        },

        //点击出错中类
        clickMiddleError(){
            this.ShowMiddleError=true
            this.$axiosApi.getRepDefectCategories().then(res=>{
                if(res.Success==true){
                    console.log(res);
                    this.GetMiddleError=res.Result
                    this.MiddleErrorList=[[{name:'',value:''}]]
                    let MiddleErrorListData = [this.GetMiddleError.map(item=>{
                       return {name:item.Name,value:item.Id}
                    })]
                    this.MiddleErrorList[0].push(...MiddleErrorListData[0])
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            })
        },
        
        //点击缺陷代码
        clickDefectCode(){
            console.log(this.MiddleErrorId);
            if(this.MiddleErrorId===null || this.MiddleErrorId===''){
                this.showPositionValue=true
                this.Msg='请先填出错中类'
                return
            }
            this.ShowDefectCode=true
            this.$axiosApi.getRepDefectCodes(this.MiddleErrorId).then(res=>{
                if(res.Success==true){
                    console.log(res);
                    this.GetDefectCode=res.Result
                    this.DefectCodeList=[[{name:'',value:''}]]
                    let DefectCodeListData = [this.GetDefectCode.map(item=>{
                       return {name:item.Name,value:item.Id}
                    })]
                    this.DefectCodeList[0].push(...DefectCodeListData[0])
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            })
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
             if(!this.GroupType){
                this.showPositionValue=true
                this.Msg='请先选择责任班组类别'
                return
            }
            this.$axiosApi.getRepWorkGroups(this.FeedingReworkData.DeptId,this.GroupType).then(res=>{
                if(res.Success==true){
                    console.log(res);
                    this.GetGroup=res.Result
                    this.GroupList=[[{name:'',value:''}]]
                    let GroupListData = [this.GetGroup.map(item=>{
                       return {name:item.Name,value:item.Id}
                    })]
                    this.GroupList[0].push(...GroupListData[0])
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    return
                }
            })
        },
        //点击责任人
        clickPersonLiable(){
            console.log(!this.GroupId);
            if(!this.GroupId){
                this.showPositionValue=true
                this.Msg='请先选择责任班组'
                return
            }
            this.ShowPersonLiable=true
            // 0-选择责任人，1-选择连带责任人，2-选择定责质检
            this.$axiosApi.getRepEmps(0,this.GroupId).then(res=>{
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
        //点击定责质检
        clickQualityTest(){
            // if(!this.GroupId){
            //     this.showPositionValue=true
            //     this.Msg='请先选择责任班组'
            //     return
            // }
            this.ShowQualityTest=true
            this.$axiosApi.getDetermineEmps(this.FeedingReworkData.ProduceTaskId).then(res=>{
                if(res.Success==true){
                    console.log(res);
                    this.GetQualityTest=res.Result
                    this.QualityTestList=[[{name:'',value:''}]]
                    let QualityTestListData = [this.GetQualityTest.map(item=>{
                       return {name:item.Name,value:item.Id}
                    })]
                    this.QualityTestList[0].push(...QualityTestListData[0])
                    console.log(this.QualityTestList);
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
                if(this.QualityTestList[0].length==0){
                    this.showPositionValue=true
                    this.Msg='此班组没有定责质检'
                    return
                }
            })
        },

        //点击考核情况
        clickLiableExamine(){
            this.ShowLiableExamine=true
        },

        //点击连带责任人
        clickRelationPerson(){
            if(!this.GroupId){
                this.showPositionValue=true
                this.Msg='请先选择责任班组'
                return
            }
            this.ShowRelationPerson=true
            // 0-选择责任人，1-选择连带责任人，2-选择定责质检
            this.$axiosApi.getRepEmps(1,this.GroupId).then(res=>{
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
        //点击制单人
        clickMaker(){
            this.ShowMaker=true
            this.$axiosApi.getMaker().then(res=>{
                if(res.Success==true){
                    console.log(res);
                    this.getMaker=res.Result
                    this.MakerList=[[{name:'',value:''}]]
                    let MakerListData = [this.getMaker.map(item=>{
                       return {name:item.Name,value:item.Id}
                    })]
                    this.MakerList[0].push(...MakerListData[0])
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            })
        },


        //接口：补料返工单明细
        getReproduceDetails(reproduceId){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.getReproduceDetails(reproduceId).then(res=>{
                this.showThost=false
                if(res.Success==true){
                    console.log(res);
                    this.FeedingReworkData=res.Result
                    this.arrayImage=this.FeedingReworkData.PhotoList
                    this.MakerId=this.FeedingReworkData.CreateById
                    this.Maker=this.FeedingReworkData.CreateBy
                    if(this.FeedingReworkData.IsBatch==1){
                        this.makeGetData()
                    }
                    if(!this.MakerId){
                        this.getCurrentEmp()
                    }
                    // this.FeedingReworkData.IsBatch===1?this.IsBatchFeeding='是':this.IsBatchFeeding='否'
                    this.FeedingReworkData.EmergencyFlag===1?this.IsIntercept='是':this.IsIntercept='否'
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    this.BarCode=null 
                }
            })
        },
        //接口：扫描upi
        scanProduceTaskUpi(barcode,isBatch,saleOrderNo){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.scanProduceTaskUpi(barcode,isBatch,saleOrderNo).then(res=>{
                this.showThost=false
                if(res.Success==true){
                    console.log(res);
                    
                    this.saleOrderNo=res.Result.Details[0].SaleOrderNo

                    //12月5日，用于卡控，不同订单相同批次不允许加入
                    console.log(res.Result.BatchNo);
                    if(this.NowBatchNo!=null && res.Result.BatchNo!=this.NowBatchNo){
                        console.log(res.Result.BatchNo);
                        this.showPositionValue=true
                        this.Msg='不同批次都不能添加'
                        this.BarCode=null 
                        return
                    }

                    if(res.Result.Message!=null){
                        this.HasMessage=1
                        this.TempFeedingReworkData=res.Result
                        this.ConfirmMsg=res.Result.Message
                        this.BadColor=false
                        this.Successbtn=true
                        this.Dangerbtn=true
                        this.ShowPostConfirm=true
                    }else{
                        if(this.FeedingReworkData.Details.length>0){
                            this.FeedingReworkData.Details.unshift(res.Result.Details[0])
                        }else{
                            this.FeedingReworkData=res.Result
                        }
                        this.NowBatchNo=res.Result.BatchNo
                        this.BarCode=null 
                    }
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    this.BarCode=null 
                }
            })
        },
        //接口：暂存数据
        saveReproduce(data){
            this.loadingtitle='暂存中'
            this.showThost=true
            this.$axiosApi.saveReproduce(data).then(res=>{
                this.IsPost=0
                this.showThost=false
                console.log(res);
                this.HasMessage=0
                if(res.Success==true){
                    this.FeedingId=res.Result
                    this.ConfirmMsg='暂存成功'
                    this.BadColor=false
                    this.Successbtn=true
                    this.Dangerbtn=false
                    this.ShowPostConfirm=true
                    console.log(res);

                }else{
                    this.ConfirmMsg=res.Message
                    this.BadColor=true
                    this.Successbtn=false
                    this.Dangerbtn=true
                    this.ShowPostConfirm=true
                }
            })
        },
        //接口：提交补料返工单
        submitReproduce(data){
            this.loadingtitle='提交中'
            this.showThost=true
            this.$axiosApi.submitReproduce(data).then(res=>{
                this.showThost=false
                this.IsPost=1
                this.HasMessage=0
                if(res.Success==true){
                    console.log(res);
                    this.ConfirmMsg='提交成功'
                    this.BadColor=false
                    this.Successbtn=true
                    this.Dangerbtn=false
                    this.ShowPostConfirm=true
                }else{
                    this.ConfirmMsg=res.Message
                    this.BadColor=true
                    this.Successbtn=false
                    this.Dangerbtn=true
                    this.ShowPostConfirm=true
                }
            })
        },
        //接口：删除补料返工单
        deleteProduceTask(id){
            this.loadingtitle='删除中'
            this.showThost=true
            let that = this
            console.log('jinlail ');
            this.$axiosApi.deleteProduceTask(id).then(res=>{
                console.log('jinlail ');
                this.showThost=false
                if(res.Success==true){
                    console.log(res);
                    this.showPositionValue=true
                    this.Msg='删除成功'
                    that.goFeedingReworkIndex()
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    this.BarCode=null 
                }
            })
        },
        //接口：删除补料返工单明细
        deleteProduceTaskDetail(id){
            this.loadingtitle='删除中'
            this.showThost=true
            let that = this
            this.$axiosApi.deleteProduceTaskDetail(id).then(res=>{
                this.showThost=false
                if(res.Success==true){
                    console.log(res);
                    this.showPositionValue=true
                    this.Msg='删除成功'
                    if(that.FeedingReworkData.Details.length<=0){
                        // console.log(this.$route.params.data.Id==undefined);
                        if(!that.$route.params.data){
                            that.goFeedingReworkIndex()
                        }else{
                            that.deleteProduceTask(that.$route.params.data.Id)
                        }
                        
                    }
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    this.BarCode=null 
                }
            })
        },
        //接口：获取当前登陆人
        getCurrentEmp(){
            this.$axiosApi.getCurrentEmp().then(res=>{
                if(res.Success==true){
                    this.Maker=res.Result.Name
                    this.MakerId=res.Result.Id
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            })
        }
    },
    created(){
        //一进来先判断一下是否存在单号。如果存在单号，就获取数据，如果没有，就不获取。
        console.log(this.$route.params.data);
        if(this.$route.params.data){
            //存在单号，进行查询
            this.getReproduceDetails(this.$route.params.data.Id)
        }else{
            //为新增单，不进行查询
            this.getCurrentEmp()
        }
        this.FeedingReworkData.IsBatch=this.PostIsBatch
    },
    mounted () {
        console.log(this.FeedingReworkData.BatchNo);
        console.log(this.$store.getters.keepAlive);
        this.$store.dispatch('addKeepAlive', 'BatchAddFeedingRework')
        this.$refs.BarcodeInp.focus()
        
    }
}
</script>

<style lang="less">


</style>
