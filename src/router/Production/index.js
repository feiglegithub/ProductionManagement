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

//补料返工单
import FeedingReworkIndex from '../../views/Production/FeedingRework/FeedingReworkIndex.vue'
import AddFeedingRework from '../../views/Production/FeedingRework/AddFeedingRework.vue'
import FeedingReworkDetial from '../../views/Production/FeedingRework/FeedingReworkDetial.vue'
import EditFeedingRework from '../../views/Production/FeedingRework/EditFeedingRework.vue'
import FeedingReworkDetialYes from '../../views/Production/FeedingRework/FeedingReworkDetialYes.vue'
import FeedingReworkedList from '../../views/Production/FeedingReworkExamine/FeedingReworkedList.vue'
import ResponsibilityRecognition from '../../views/Production/FeedingReworkExamine/ResponsibilityRecognition.vue'
import CriticismResponsibilityRecognition from '../../views/Production/FeedingReworkExamine/CriticismResponsibilityRecognition.vue'
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
]