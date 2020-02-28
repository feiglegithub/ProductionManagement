<template>
    <div class="g-index">
        <s-header @closeApp='closeApp'></s-header>
        <div class="f-flexvscroll" style="background-color: #fff">
            <grid :show-lr-borders="false" :show-vertical-dividers="false" class="m-navgrid" :cols="3" >
                <!-- <grid-item class="f-flexjscen" @click.native="$router.push({name:'SparePart'})">
                    <div class="m-otheroperation">
                        <img slot="icon" src="../../assets/img/4.png">
                        <p class="operationtitle">备料点数</p>
                    </div>
                </grid-item> -->
                <grid-item class="f-flexjscen" @click.native="$router.push({name:'ExcretePanel'})" v-if="showExcretePanel">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-chuizi"></span>
                            <p class="operationtitle">封边返修合托</p>
                        </div>
                    </div>
                </grid-item>
                <!-- <grid-item class="f-flexjscen" @click.native="$router.push({name:'Untying'})" v-if="showUntying">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-dianjian"></span>
                            <p class="operationtitle">板件不良登记</p>
                        </div>
                    </div>
                </grid-item> -->
                <!-- <grid-item class="f-flexjscen" @click.native="$router.push({name:'ResourceSelection'})" v-if="showProcessHandover">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-dianjian"></span>
                            <p class="operationtitle">工序交接</p>
                        </div>
                    </div>
                </grid-item> -->
                <grid-item class="f-flexjscen" @click.native="$router.push({name:'OverResourceSelection'})" v-if="showOverStatiionCollection">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-dianjian"></span>
                            <p class="operationtitle">过站采集(异型与小板件)</p>
                        </div>
                    </div>
                </grid-item>
                <grid-item class="f-flexjscen" @click.native="goFeedingReworkIndex(0)" v-if="showFeedingReworkIndex">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-dianjian"></span>
                            <p class="operationtitle">补料创建</p>
                        </div>
                    </div>
                </grid-item>
                <grid-item class="f-flexjscen" @click.native="goFeedingReworkIndex(1)" v-if="showBatchFeeding">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-dianjian"></span>
                            <p class="operationtitle">批次补料创建</p>
                        </div>
                    </div>
                </grid-item>
                <grid-item class="f-flexjscen" @click.native="goFeedingReworkedList(0)" v-if="showFeedingReworkedList">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-dianjian"></span>
                            <p class="operationtitle">补料审核</p>
                        </div>
                    </div>
                </grid-item>
                <grid-item class="f-flexjscen" @click.native="goFeedingReworkedList(1)" v-if="showBatchFeedingReworkedList">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-dianjian"></span>
                            <p class="operationtitle">批次补料审核</p>
                        </div>
                    </div>
                </grid-item>
                <grid-item class="f-flexjscen" @click.native="$router.push({name:'PackResourceSelection'})" v-if="showPackResourceSelection">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-dianjian"></span>
                            <p class="operationtitle">包装采集</p>
                        </div>
                    </div>
                </grid-item>
                <!-- <grid-item class="f-flexjscen" @click.native="$router.push({name:'RepairResourceSelection'})" v-if="showRepairResourceSelection">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-dianjian"></span>
                            <p class="operationtitle">维修采集</p>
                        </div>
                    </div>
                </grid-item> -->
                <!-- <grid-item class="f-flexjscen" @click.native="$router.push({name:'SealingResourceSelection'})" v-if="showSealingCollection">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-dianjian"></span>
                            <p class="operationtitle">封边换托采集</p>
                        </div>
                    </div>
                </grid-item> -->
                <grid-item class="f-flexjscen" @click.native="$router.push({name:'TaskScheduling'})" v-if="showTaskScheduling">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-dianjian"></span>
                            <p class="operationtitle">任务分派</p>
                        </div>
                    </div>
                </grid-item>
                <grid-item class="f-flexjscen" @click.native="$router.push({name:'PanelIntegration'})" v-if="showPanelIntegration">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-dianjian"></span>
                            <p class="operationtitle">板件整托合托</p>
                        </div>
                    </div>
                </grid-item>
                <grid-item class="f-flexjscen" @click.native="$router.push({name:'AbnormalSealingResourceSelection'})" v-if="showAbnormalSealingCollection">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-dianjian"></span>
                            <p class="operationtitle">封边异常换托</p>
                        </div>
                    </div>
                </grid-item>
                <grid-item class="f-flexjscen" @click.native="$router.push({name:'ReleasePlate'})" v-if="showReleasePlate">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-dianjian"></span>
                            <p class="operationtitle">垫板释放</p>
                        </div>
                    </div>
                </grid-item>

                <grid-item class="f-flexjscen" @click.native="$router.push({name:'CheckWorkResourceSelection'})" v-if="showCheckWork">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-dianjian"></span>
                            <p class="operationtitle">考勤登录</p>
                        </div>
                    </div>
                </grid-item>
                  <grid-item class="f-flexjscen" @click.native="$router.push({name:'WipTrace'})" v-if="showWipTrace">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-dianjian"></span>
                            <p class="operationtitle">板件追溯</p>
                        </div>
                    </div>
                </grid-item>
                <grid-item class="f-flexjscen" @click.native="$router.push({name:'SecondaryProcess'})" v-if="showSecondaryProcess">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-dianjian"></span>
                            <p class="operationtitle">二次加工单</p>
                        </div>
                    </div>
                </grid-item>
            </grid>
        </div>
        <div class="m-footers">
            <!-- <div class="footerlogo">
                <div class="logo">
                    <img src="../../assets/img/home.png" alt="">
                </div>
                <div class="title">首页</div>
            </div> -->
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import devlogin from '../../assets/js/devLogin.js'
export default {
    name: '',
    data() {
        return {
            showExcretePanel:false,
            showUntying:false,
            showProcessHandover:false,
            showOverStatiionCollection:false,
            showFeedingReworkIndex:false,
            showBatchFeeding:false,
            showFeedingReworkedList:false,
            showBatchFeedingReworkedList:false,
            showPackResourceSelection:false,
            showRepairResourceSelection:false,
            showSealingCollection:false,
            showTaskScheduling:false,
            showPanelIntegration:false,
            showAbnormalSealingCollection:false,
            showReleasePlate:false,
            showCheckWork:false,
            showWipTrace:false,
            showSecondaryProcess:false
        }
    },
    components: {
    },
    methods: {
        closeApp(){
            console.log('关闭App');
            this.$hybridApi.closeApp()
        },
        //登陆
        login(){
            devlogin(this).then(res=>{
                // console.log('登陆的用户'+JSON.stringify(res));
                this.getAuthorizedAppMenus()
            })
        },
        //获取app权限
        getAuthorizedAppMenus(){
            this.$axiosApi.getAuthorizedAppMenus("生产管理",this.$store.getters.getUserId).then(res=>{
                // console.log(res);
                if(res!==null){
                    this.RoleController=res.Result
                    // console.log(this.RoleController.childs);
                    this.RoleController.childs.forEach(element => {
                        // console.log(element.code);
                        if(element.code=='封边返修合托'){
                            this.showExcretePanel=true
                        }
                        // if(element.code=='板件不良登记'){
                        //     this.showUntying=true
                        // }
                        // if(element.code=='工序交接'){
                        //     this.showProcessHandover=true
                        // }
                        if(element.code=='过站采集'){
                            this.showOverStatiionCollection=true
                        }
                        if(element.code=='补料创建'){
                            this.showFeedingReworkIndex=true
                        }
                        if(element.code=='批次补料创建'){
                            this.showBatchFeeding=true
                        }
                        if(element.code=='补料审核'){
                            this.showFeedingReworkedList=true
                        }
                        if(element.code=='批次补料审核'){
                            this.showBatchFeedingReworkedList=true
                        }
                        if(element.code=='包装采集'){
                            this.showPackResourceSelection=true
                        }
                        // if(element.code=='维修采集'){
                        //     this.showRepairResourceSelection=true
                        // }
                        // if(element.code=='封边换托采集'){
                        //     this.showSealingCollection=true
                        // }
                        if(element.code=='任务分派'){
                            this.showTaskScheduling=true
                        }
                        if(element.code=='板件整托合托'){
                            this.showPanelIntegration=true
                        }
                        if(element.code=='封边异常换托'){
                            this.showAbnormalSealingCollection=true
                        }
                        if(element.code=='垫板释放'){
                            this.showReleasePlate=true
                        }
                        if(element.code=='考勤登录'){
                            this.showCheckWork=true
                        }
                        if(element.code=='板件追溯'){
                            this.showWipTrace=true
                        }
                        if(element.code=='二次加工单'){
                            this.showSecondaryProcess=true;
                        }
                    });
                }
            })
        },
        //进入补料功能（批次和非批次）
        goFeedingReworkIndex(addtype){
            console.log(addtype);
            this.$store.dispatch('changeUserInfo',{attr:"addtype",val:addtype});
            this.$router.push({name:'FeedingReworkIndex'})
        },
        //进入补料审核功能（批次和非批次）
        goFeedingReworkedList(addtype){
            this.$store.dispatch('changeUserInfo',{attr:"addtype",val:addtype});
            this.$router.push({name:'FeedingReworkedList'})
        }
    },
    created(){
        // window.location.replace("/")
    },
    mounted () {
        this.login()
        // console.log('路由的id：'+this.$route.query.index);
        // localStorage.setItem("BillNo","123456")
        // window.location.replace("/")
    }
}
</script>

<style lang="less">


</style>
