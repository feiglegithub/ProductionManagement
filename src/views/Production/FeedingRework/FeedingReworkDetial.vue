<template>
    <div class="g-index">
        <!-- 头部 -->
        <!-- <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            补料返工单明细
            <a slot="right" @click="doPost">暂存</a>
            <a slot="right" @click="doPost">提交</a>
        </x-header> -->
        <x-header class="m-header" :left-options="{showBack:false}"  style="background-color:#22292C">
            <a slot="left" @click="addFeedingRework">
                <span style="font-size:26px;" class="iconfont icon-weibiaoti-"></span>
            </a>
                补料返工单明细
            <a slot="right" @click="doPost">确定</a>
        </x-header>
        <!-- <div class="g-inp">
                <div class="m-inp f-mtb5">
                    <span class="laber">条码</span>
                    <span class="inp s-inpbg">
                        <input v-model="BarCode" type="text" @keyup.enter="getBarCode()" class="s-inpbg" @focus="getFocus()" @blur="getBlur()">
                    </span>
                </div>
                <div class="m-inp f-mtb5">
                    <x-switch class="f-mtb5" style="font-size: 16px;padding:0 10px;" title="批次补料" :value-map="['否','是']" v-model="Type" @on-change="changeSwitch"></x-switch>
                    <div style="font-size: 16px;">{{Type}}</div>
                </div>
            </div> -->
        <div class="f-flexvw f-flexg1 f-pdlr5">
            
            <div class="g-scrollbox">
                <div class="f-auto">
                    <!-- <g-client-height> -->
                    <s-messageheader class="f-mt10" messagetitle="单明细"></s-messageheader>
                    <div class="g-notflexbox s-bgE7E7E7">
                        <div>
                            <div class="m-baserowbox">
                                <span class="label80" >板件信息:</span>
                                <span class="text">{{DetailData.UPI}}</span>
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80" >物料:</span>
                                <span class="text">{{DetailData.ItemCode}}</span>
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80" >规格:</span>
                                <span class="text">{{DetailData.Specifacation}}</span>
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80" >名称:</span>
                                <span class="text">{{DetailData.ItemName}}</span>
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80" >封边:</span>
                                <span class="text">{{DetailData.EdgeBandingType}}</span>
                            </div>
                            <div class="m-baserowbox">
                                <span class="label80" >花色:</span>
                                <span class="text">{{DetailData.Colour}}</span>
                            </div>
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
                                <input class="inp" type="text" v-model="DefectDescription" name="" id="" style="border: 1px solid #666666;">
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
                            <div class="m-baserowbox"  v-if="GroupType != '非生产性责任班组'">
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
                            <!-- <div class="m-baserowbox">
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
                            </div> -->
                                
                            <div class="g-pdabtn">
                                <div class="u-pdabtn" @click="doEdit">修改</div>
                                <!-- <div class="u-pdabtn" @click="doDelete">删除</div> -->
                            </div>
                        </div>
                    </div>
                    <!-- </g-client-height> -->
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
    name: 'FeedingReworkDetial',
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

            ShowPostConfirm:false,
            ShowConfirm:false,
            ShowProcedure:false,
            DepartmentList:[['']],
            Department:[],
            BarCode:null,           //条码
            Type:'否',            //类型，默认为可用
            IsBatchFeeding:'否',      //是否批次补料，默认为否

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

            // ShowMaker:false,  //控制制单人的显隐
            // GetMaker:null,    //控制制单人的显隐
            // MakerList:[['']],  //控制制单人的显隐
            // Maker:null,       //控制制单人的显隐
            // MakerId:null,       //控制制单人的显隐

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
                    "ResRemark":null,           //责任班组类别
                    "ResWorkGroupId":null,      //责任班组id
                    "ResWorkGroup":null,        //责任班组名称
                    "ResWorkGroupIsProduct":null,   //责任班组是否生产班组
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
            DeepDetailData:{            //用于保存原数据源
            },
            DefectDescription:null,     //出错描述
            DeptId:null,                //部门id

        }
    },
    components: {
    },

    methods: {

        //点击修改按钮
        doEdit(){
            if(this.GroupType=="非生产性责任班组" && this.QualityTest==null){
                this.Msg='责任班组为非生产班组，定责质检必填'
                this.showPositionValue=true
                return
            }
            // console.log(this.EquipmentId);
            this.DetailData.ResponseData={}
            this.DetailData.ResponseData.EquipId=this.EquipmentId
            this.DetailData.ResponseData.MachineAndTypeName=this.Equipment
            this.DetailData.ResponseData.DefectCategoryId=this.MiddleErrorId
            this.DetailData.ResponseData.DefectCategory=this.MiddleError
            this.DetailData.ResponseData.DefectId=this.DefectCodeId
            this.DetailData.ResponseData.Defect=this.DefectCode
            this.DetailData.ResponseData.DefectDescription=this.DefectDescription
            this.DetailData.ResponseData.ResRemark=this.GroupType
            this.DetailData.ResponseData.ResWorkGroupId=this.GroupId
            this.DetailData.ResponseData.ResWorkGroup=this.Group
            this.DetailData.ResponseData.ResWorkGroupIsProduct=this.GroupIsProduct
            this.DetailData.ResponseData.ResEmployeeId=this.PersonLiableId
            this.DetailData.ResponseData.ResEmployee=this.PersonLiable
            this.DetailData.ResponseData.QualityInspectionId=this.QualityTestId
            this.DetailData.ResponseData.QualityInspection=this.QualityTest
            if(this.LiableExamine=='已考核'){
                this.DetailData.ResponseData.ResEmpAssessment=1
            }
            if(this.LiableExamine=='未考核'){
                this.DetailData.ResponseData.ResEmpAssessment=0
            }
            this.DetailData.ResponseData.JointEmpId=this.RelationPersonId
            this.DetailData.ResponseData.JointEmp=this.RelationPerson
            if(this.RelationExamine=='已考核'){
                this.DetailData.ResponseData.JonitEmpAssessment=1
            }
            if(this.RelationExamine=='未考核'){
                this.DetailData.ResponseData.JonitEmpAssessment=0
            }
            // this.DetailData.ResponseData.MakerId=this.MakerId
            // this.DetailData.ResponseData.Maker=this.Maker
            console.log(this.DetailData);
            this.$router.push({name:'EditFeedingRework',params:{Details:this.DetailData,DeepDetailData:this.DeepDetailData}})
        },
        //点击删除按钮
        doDelete(){
            this.$route.params.Details=this.DeepDetailData
            this.$store.dispatch('removeKeepAlive', 'AddFeedingRework')
        },
        //获取条码
        getBarCode(){
            console.log(this.BarCode);
        },
        //触发单项左右滑动
        handleEvents(type){
            console.log(type);
        },
        //点击删除按钮，删除当前项
        onButtonClick(index){
            console.log(index);
            this.checklistdata.splice(index,1)
        },
        //获取焦点事件
        getFocus(){
            console.log('获取焦点事件');
        },
        //失去焦点事件
        getBlur(){
            console.log('失去焦点事件');
        },
        //键盘回车事件
        getEnter(){
            console.log('键盘回车事件');
        },
        //点击提示弹窗的删除按钮
        onCancel(){

        },
        //点击提示弹窗的确认按钮
        onConfirm(){
            this.$router.push({name:'AddFeedingRework',params:{BtnType:'Save'}})
        },
        //点击提交按钮
        doPost(){
            // console.log(this.GroupIsProduct);
            if(this.GroupType=="非生产性责任班组" && this.QualityTest==null){
                this.Msg='责任班组为非生产班组，定责质检必填'
                this.showPositionValue=true
                return
            }
            this.DetailData.ResponseData={}
            console.log(this.DetailData.ResponseData);
            this.DetailData.ResponseData.EquipId=this.EquipmentId
            this.DetailData.ResponseData.MachineAndTypeName=this.Equipment
            this.DetailData.ResponseData.DefectCategoryId=this.MiddleErrorId
            this.DetailData.ResponseData.DefectCategory=this.MiddleError
            this.DetailData.ResponseData.DefectId=this.DefectCodeId
            this.DetailData.ResponseData.Defect=this.DefectCode
            this.DetailData.ResponseData.DefectDescription=this.DefectDescription
            this.DetailData.ResponseData.ResRemark=this.GroupType
            this.DetailData.ResponseData.ResWorkGroupId=this.GroupId
            this.DetailData.ResponseData.ResWorkGroup=this.Group
            this.DetailData.ResponseData.ResWorkGroupIsProduct=this.GroupIsProduct
            this.DetailData.ResponseData.ResEmployeeId=this.PersonLiableId
            this.DetailData.ResponseData.ResEmployee=this.PersonLiable
            this.DetailData.ResponseData.QualityInspectionId=this.QualityTestId
            this.DetailData.ResponseData.QualityInspection=this.QualityTest
            if(this.LiableExamine=='已考核'){
                this.DetailData.ResponseData.ResEmpAssessment=1
            }
            if(this.LiableExamine=='未考核'){
                this.DetailData.ResponseData.ResEmpAssessment=0
            }
            this.DetailData.ResponseData.JointEmpId=this.RelationPersonId
            this.DetailData.ResponseData.JointEmp=this.RelationPerson
            if(this.RelationExamine=='已考核'){
                this.DetailData.ResponseData.JonitEmpAssessment=1
            }
            if(this.RelationExamine=='未考核'){
                this.DetailData.ResponseData.JonitEmpAssessment=0
            }
            // this.DetailData.ResponseData.MakerId=this.MakerId
            // this.DetailData.ResponseData.Maker=this.Maker
            console.log(this.DetailData.ResponseData);
            this.$store.dispatch('removeKeepAlive', 'FeedingReworkDetial')
            this.$router.push({name:'AddFeedingRework',params:{BtnType:'Save'}})
        },

        addFeedingRework(){
            this.DetailData.ResponseData=this.DeepDetailData.ResponseData
            console.log(this.DeepDetailData.ResponseData);
            this.$store.dispatch('removeKeepAlive', 'FeedingReworkDetial')
            this.$router.push({name:'AddFeedingRework',params:{BtnType:'Back'}})
        },

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
                console.log(this.GroupIsProduct);
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
        // changeMaker(val){
        //     let id = val[0]
        //     this.MakerId=val[0]
        //     if(!!this.MakerId){
        //         this.Maker = this.getMaker.find(item=>item.Id == id).Name
        //     }else{
        //         this.MakerId=null
        //         this.Maker=null
        //     }
        // },
        //点击设备
        clickEquipment(){
            this.ShowEquipment=true
            this.$axiosApi.getRepResourceManages(this.DeptId).then(res=>{
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
            this.$axiosApi.getRepWorkGroups(this.DeptId,this.GroupType).then(res=>{
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
            // 0-选择责任人，1-选择连带责任人，2-选择定责质检
            this.$axiosApi.getDetermineEmps(this.$route.params.PostProduceTaskId).then(res=>{
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
        //深拷贝
        deepClone(obj){
            let _obj = JSON.stringify(obj),
                objClone = JSON.parse(_obj);
            return objClone
        } 
    },
    created(){
        console.log(JSON.stringify(this.$route.params.Details));
        this.DeptId=this.$route.params.DeptId
        if(this.$route.params.Details){
            this.DetailData=this.$route.params.Details
            this.DeepDetailData=this.deepClone(this.$route.params.Details)
            if(this.DetailData.ResponseData!=null){
                this.EquipmentId=this.DetailData.ResponseData.EquipId
                this.Equipment=this.DetailData.ResponseData.MachineAndTypeName
                this.MiddleErrorId=this.DetailData.ResponseData.DefectCategoryId
                this.MiddleError=this.DetailData.ResponseData.DefectCategory
                this.DefectCodeId=this.DetailData.ResponseData.DefectId
                this.DefectCode=this.DetailData.ResponseData.Defect
                this.DefectDescription=this.DetailData.ResponseData.DefectDescription
                this.GroupType=this.DetailData.ResponseData.ResRemark
                this.GroupId=this.DetailData.ResponseData.ResWorkGroupId
                this.Group=this.DetailData.ResponseData.ResWorkGroup
                this.GroupIsProduct=this.DetailData.ResponseData.ResWorkGroupIsProduct
                this.PersonLiableId=this.DetailData.ResponseData.ResEmployeeId
                this.PersonLiable=this.DetailData.ResponseData.ResEmployee
                this.QualityTestId=this.DetailData.ResponseData.QualityInspectionId
                this.QualityTest=this.DetailData.ResponseData.QualityInspection
                if(this.DetailData.ResponseData.ResEmpAssessment==1){
                    this.LiableExamine='已考核'
                }
                if(this.DetailData.ResponseData.ResEmpAssessment==0){
                    this.LiableExamine='未考核'
                }
                this.RelationPersonId=this.DetailData.ResponseData.JointEmpId
                this.RelationPerson=this.DetailData.ResponseData.JointEmp
                if(this.DetailData.ResponseData.JonitEmpAssessment==1){
                    this.RelationExamine='已考核'
                }
                if(this.DetailData.ResponseData.JonitEmpAssessment==0){
                    this.RelationExamine='未考核'
                }
                // this.MakerId=this.DetailData.ResponseData.MakerId
                // this.Maker=this.DetailData.ResponseData.Maker
            }
        }
    },
    mounted () {
        this.$store.dispatch('addKeepAlive', 'FeedingReworkDetial')
        console.log("BillNo:"+localStorage.getItem('BillNo'));
        console.log('333'+this.$store.getters.getIsBatchFeeding);
        // this.IsBatchFeeding=this.$store.getters.getIsBatchFeeding
        console.log(this.$route);
    }
}
</script>

<style lang="less">



</style>
