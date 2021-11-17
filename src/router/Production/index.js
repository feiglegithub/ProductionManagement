import BaseIndex from '../../views/Production/BaseIndex.vue'
// 板件拆合拖
import ExcretePanel from '../../views/Production/ExcretePanel/ExcretePanel.vue'
// 板件解绑
import Untying from '../../views/Production/Untying/Untying.vue'
// 工序交接
import ResourceSelection from '../../views/Production/ProcessHandover/ResourceSelection.vue'
import Collection from '../../views/Production/ProcessHandover/Collection.vue'
//过站采集
import OverCollection from '../../views/Production/OverStatiionCollection/OverStatiionCollection.vue'
import OverResourceSelection from '../../views/Production/OverStatiionCollection/OverStatiionResourceSelection.vue'
// 异形板采集
import SpecialPanelCollection from '../../views/Production/SpecialPanelCollection/SpecialPanelCollection.vue'
import SpecialPanelResourceSelection from '../../views/Production/SpecialPanelCollection/SpecialPanelResourceSelection.vue'
//补料返工单
import FeedingReworkIndex from '../../views/Production/FeedingRework/FeedingReworkIndex.vue'
import AddFeedingRework from '../../views/Production/FeedingRework/AddFeedingRework.vue'
import BatchAddFeedingRework from '../../views/Production/FeedingRework/BatchAddFeedingRework.vue'
import FeedingReworkDetial from '../../views/Production/FeedingRework/FeedingReworkDetial.vue'
import EditFeedingRework from '../../views/Production/FeedingRework/EditFeedingRework.vue'
import FeedingReworkDetialYes from '../../views/Production/FeedingRework/FeedingReworkDetialYes.vue'
import FeedingReworkedList from '../../views/Production/FeedingReworkExamine/FeedingReworkedList.vue'
import ResponsibilityRecognition from '../../views/Production/FeedingReworkExamine/ResponsibilityRecognition.vue'
import CriticismResponsibilityRecognition from '../../views/Production/FeedingReworkExamine/CriticismResponsibilityRecognition.vue'
//欠件单
import OwnResponsibilityRecognition from '../../views/Production/FeedingReworkExamine/OwnResponsibilityRecognition.vue'
// 包装采集
import PackCollection from '../../views/Production/PackagingCollection/PackCollection.vue'
import PackResourceSelection from '../../views/Production/PackagingCollection/PackResourceSelection.vue'

// 维修采集
import RepairCollection from '../../views/Production/RepairCollection/RepairCollection.vue'
import RepairResourceSelection from '../../views/Production/RepairCollection/RepairResourceSelection.vue'


//封边换托采集
import SealingCollection from '../../views/Production/SealingCollection/SealingCollection.vue'
import SealingResourceSelection from '../../views/Production/SealingCollection/SealingResourceSelection.vue'
// 任务调度采集
import TaskScheduling from '../../views/Production/TaskScheduling/TaskScheduling.vue'

// 板件整合
import PanelIntegration from '../../views/Production/PanelIntegration/PanelIntegration.vue'

//封边异常换托
import AbnormalSealingCollection from '../../views/Production/AbnormalSealingCollection/AbnormalSealingCollection.vue'
import AbnormalSealingResourceSelection from '../../views/Production/AbnormalSealingCollection/AbnormalSealingResourceSelection.vue'

// 垫板释放
import ReleasePlate from '../../views/Production/ReleasePlate/ReleasePlate.vue'

// 考勤登录
import CheckWorkCollection from '../../views/Production/CheckWorkAttendance/CheckWorkCollection.vue'
import CheckWorkResourceSelection from '../../views/Production/CheckWorkAttendance/CheckWorkResourceSelection.vue'

import WipTrace from '../../views/Production/WipTrace/WipTrace.vue'

// 二次加工单
import SecondaryProcess from '../../views/Production/SecondaryProcess/SecondaryProcess.vue'
import SecondaryProcessResourceSelection from '../../views/Production/SecondaryProcess/SecondaryProcessResourceSelection.vue'

// 仓库原材料接收
import WarehouseRawMaterial from '../../views/Production/WarehouseRawMaterial/WarehouseRawMaterial.vue'

// 发起返修
import ReturnRepairResourceSelection from '../../views/Production/ReturnRepairs/ReturnRepairResourceSelection.vue'
import ReturnRepairUpi from '../../views/Production/ReturnRepairs/ReturnRepairUpi.vue'
import ReturnRepairBatch from '../../views/Production/ReturnRepairs/ReturnRepairBatch.vue'
import ReturnRepairBatchDetail from '../../views/Production/ReturnRepairs/ReturnRepairBatchDetail.vue'
import ReturnRepairProcessSelection from '../../views/Production/ReturnRepairs/ReturnRepairProcessSelection.vue'

import PackagePanelDetail from '../../views/Production/PackagePanelDetail/PackagePanelDetailIndex.vue'//包明细

import SpecialMiningReport from '../../views/Production/SpecialMiningReport/SpecialMiningReportIndex.vue'//特采
import WorkReportIndex from '../../views/Production/WorkReportToScan/WorkReportIndex.vue'//报工扫描
import WorkReportDetailIndex from '../../views/Production/WorkReportToScan/WorkReportDetailIndex.vue'//报工扫描
import CuttingTaskSelectionIndex from '../../views/Production/CuttingTask/CuttingTaskSelectionIndex.vue'//开料任务-选择页面
import CuttingTaskIndex from '../../views/Production/CuttingTask/CuttingTaskIndex.vue'//开料任务
import CuttingTaskDetailIndex from '../../views/Production/CuttingTask/CuttingTaskDetailIndex.vue'//开料任务明细
import PanelExceptionCollectionSelectIndex from '../../views/Production/PanelExceptionCollection/PanelExceptionCollectionSelectIndex.vue'//板件异常采集选择页面
import PanelExceptionCollectionIndex from '../../views/Production/PanelExceptionCollection/PanelExceptionCollectionIndex.vue'//板件异常采集
import SprayPowderPlateIndex from '../../views/Production/SprayPowderPlate/SprayPowderPlateIndex.vue'//板件喷粉
import ReportViewIndex from '../../views/Production/ReportView/ReportViewIndex.vue'//报表查看
import ProductionProgressIndex from '../../views/Production/ReportView/ProductionProgressIndex.vue'
import MachineCapacityIndex from '../../views/Production/ReportView/MachineCapacityIndex.vue'
import PunchOweIndex from '../../views/Production/ReportView/PunchOweIndex.vue'
import ProductWIPQueryIndex from '../../views/Production/ReportView/ProductWIPQueryIndex.vue'
import FeedingReworkAttach from '../../views/Production/FeedingRework/FeedingReworkAttach.vue'
export default [

  {
    path: '/',
    name: 'BaseIndex',
    component: BaseIndex,
  },
  // 板件拆合拖
  {
    path: '/ExcretePanel',
    name: 'ExcretePanel',
    component: ExcretePanel,
  },
  // 板件解绑
  {
    path: '/Untying',
    name: 'Untying',
    component: Untying,
  },
  // 工序交接
  {
    path: '/ResourceSelection',
    name: 'ResourceSelection',
    component: ResourceSelection,
  },
  {
    path: '/Collection',
    name: 'Collection',
    component: Collection,
  },
  //过站采集
  {
    path: '/OverCollection',
    name: 'OverCollection',
    component: OverCollection,
  },
  {
    path: '/OverResourceSelection',
    name: 'OverResourceSelection',
    component: OverResourceSelection,
  },
  //异形板采集
  {
    path: '/SpecialPanelCollection',
    name: 'SpecialPanelCollection',
    component: SpecialPanelCollection,
  },
  {
    path: '/SpecialPanelResourceSelection',
    name: 'SpecialPanelResourceSelection',
    component: SpecialPanelResourceSelection,
  },
  //补料返工单
  {
    path: '/FeedingReworkIndex',
    name: 'FeedingReworkIndex',
    component: FeedingReworkIndex,
  },
  {
    path: '/AddFeedingRework',
    name: 'AddFeedingRework',
    component: AddFeedingRework,
  },
  {
    path: '/BatchAddFeedingRework',
    name: 'BatchAddFeedingRework',
    component: BatchAddFeedingRework,
  },
  {
    path: '/FeedingReworkDetial',
    name: 'FeedingReworkDetial',
    component: FeedingReworkDetial,
  },
  {
    path: '/EditFeedingRework',
    name: 'EditFeedingRework',
    component: EditFeedingRework,
  },
  {
    path: '/FeedingReworkDetialYes',
    name: 'FeedingReworkDetialYes',
    component: FeedingReworkDetialYes,
  },
  {
    path: '/FeedingReworkedList',
    name: 'FeedingReworkedList',
    component: FeedingReworkedList,
  },
  {
    path: '/ResponsibilityRecognition',
    name: 'ResponsibilityRecognition',
    component: ResponsibilityRecognition,
  },
  {
    path: '/CriticismResponsibilityRecognition',
    name: 'CriticismResponsibilityRecognition',
    component: CriticismResponsibilityRecognition,
  },
  //欠件单
  {
    path: '/OwnResponsibilityRecognition',
    name: 'OwnResponsibilityRecognition',
    component: OwnResponsibilityRecognition,
  },
  //包装采集
  {
    path: '/PackCollection',
    name: 'PackCollection',
    component: PackCollection,
  },
  {
    path: '/PackResourceSelection',
    name: 'PackResourceSelection',
    component: PackResourceSelection,
  },

  //维修采集
  {
    path: '/RepairCollection',
    name: 'RepairCollection',
    component: RepairCollection,
  },
  {
    path: '/RepairResourceSelection',
    name: 'RepairResourceSelection',
    component: RepairResourceSelection,
  },
  //封边换托采集
  {
    path: '/SealingCollection',
    name: 'SealingCollection',
    component: SealingCollection,
  },
  {
    path: '/SealingResourceSelection',
    name: 'SealingResourceSelection',
    component: SealingResourceSelection,
  },
  // 任务调度采集
  {
    path: '/TaskScheduling',
    name: 'TaskScheduling',
    component: TaskScheduling,
  },
  // 板件整合
  {
    path: '/PanelIntegration',
    name: 'PanelIntegration',
    component: PanelIntegration,
  },

  // 封边异常换托
  {
    path: '/AbnormalSealingCollection',
    name: 'AbnormalSealingCollection',
    component: AbnormalSealingCollection,
  },
  {
    path: '/AbnormalSealingResourceSelection',
    name: 'AbnormalSealingResourceSelection',
    component: AbnormalSealingResourceSelection,
  },

  // 垫板释放
  {
    path: '/ReleasePlate',
    name: 'ReleasePlate',
    component: ReleasePlate,
  },

  // 考勤登录
  {
    path: '/CheckWorkCollection',
    name: 'CheckWorkCollection',
    component: CheckWorkCollection,
  },
  {
    path: '/CheckWorkResourceSelection',
    name: 'CheckWorkResourceSelection',
    component: CheckWorkResourceSelection,
  },
  {
    path: '/WipTrace',
    name: 'WipTrace',
    component: WipTrace,
  },

  // 二次加工单
  {
    path: '/SecondaryProcess',
    name: 'SecondaryProcess',
    component: SecondaryProcess,
  },
  {
    path: '/SecondaryProcessResourceSelection',
    name: 'SecondaryProcessResourceSelection',
    component: SecondaryProcessResourceSelection,
  },

  // 仓库原材料接收
  {
    path: '/WarehouseRawMaterial',
    name: 'WarehouseRawMaterial',
    component: WarehouseRawMaterial,
  },

  // 发起返修
  {
    path: '/ReturnRepairResourceSelection',
    name: 'ReturnRepairResourceSelection',
    component: ReturnRepairResourceSelection,
  },
  {
    path: '/ReturnRepairUpi',
    name: 'ReturnRepairUpi',
    component: ReturnRepairUpi,
  },
  {
    path: '/ReturnRepairBatch',
    name: 'ReturnRepairBatch',
    component: ReturnRepairBatch,
  },
  {
    path: '/ReturnRepairBatchDetail',
    name: 'ReturnRepairBatchDetail',
    component: ReturnRepairBatchDetail,
  },
  {
    path: '/ReturnRepairProcessSelection',
    name: 'ReturnRepairProcessSelection',
    component: ReturnRepairProcessSelection,
  },
  {
    path: '/PackagePanelDetail',
    name: 'PackagePanelDetailIndex',
    component: PackagePanelDetail,
  },
  {
    path: '/SpecialMiningReport',
    name: 'SpecialMiningReportIndex',
    component: SpecialMiningReport,
  },
  {
    path: '/WorkReportToScan',
    name: 'WorkReportIndex',
    component: WorkReportIndex,
  },
  {
    path: '/WorkReportDetail',
    name: 'WorkReportDetailIndex',
    component: WorkReportDetailIndex,
  },
  {
    path: '/CuttingTaskSelection',
    name: 'CuttingTaskSelectionIndex',
    component: CuttingTaskSelectionIndex,
  },
  {
    path: '/CuttingTask',
    name: 'CuttingTaskIndex',
    component: CuttingTaskIndex,
  },
  {
    path: '/CuttingTaskDetail',
    name: 'CuttingTaskDetailIndex',
    component: CuttingTaskDetailIndex,
  },
  {
    path: '/PanelExceptionCollectionSelect',
    name: 'PanelExceptionCollectionSelectIndex',
    component: PanelExceptionCollectionSelectIndex,
  }
  ,
  {
    path: '/PanelExceptionCollection',
    name: 'PanelExceptionCollectionIndex',
    component: PanelExceptionCollectionIndex,
  },
  {
    path: '/SprayPowderPlateIndex',
    name: 'SprayPowderPlateIndex',
    component: SprayPowderPlateIndex,
  },
  {//报表查看
    path: '/ReportView',
    name: 'ReportViewIndex',
    component: ReportViewIndex,
  },
  {//生产进度报表
    path: '/ProductionProgress',
    name: 'ProductionProgressIndex',
    component: ProductionProgressIndex,
  },
  {//机台产能报表
    path: '/MachineCapacity',
    name: 'MachineCapacityIndex',
    component: MachineCapacityIndex
  },
  {//打孔欠件
    path: '/PunchOwe',
    name: 'PunchOweIndex',
    component: PunchOweIndex
  },
  {//生产WIP查询
    path: '/ProductWIPQuery',
    name: 'ProductWIPQueryIndex',
    component: ProductWIPQueryIndex
  },
  {//补料附件上传
    path: '/FeedingReworkAttach',
    name: 'FeedingReworkAttach',
    component: FeedingReworkAttach
  }

]