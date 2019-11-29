<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            资源选择
            <!-- <a slot="right">取消</a> -->
            <a slot="right" @click="goCollection">下一步</a>
        </x-header>
        <div class="f-flexvw f-flexg1">
            <div class="g-scrollbox">

                <div class="m-inp f-mtb5">
                    <span class="laber">车间</span>
                    <!-- <span class="inp s-bgwhile" @click="ShowProcedure = true">{{choiceDepartments}}</span> -->
                    <div  @click="ShowWorkshop = true" class="m-selector">
                        <popup-picker 
                            :show.sync="ShowWorkshop" 
                            :data="WorkshopList" 
                            @on-change="changeWorkshop"
                            value-text-align='left'
                        ></popup-picker>
                        <div>{{ChoiceWorkshop}}</div>
                    </div>    
                </div>
                <div class="m-inp f-mtb5">
                    <span class="laber">工序</span>
                    <!-- <span class="inp s-bgwhile" @click="ShowProcedure = true">{{choiceDepartments}}</span> -->
                    <div  @click="ShowProcess = true" class="m-selector">
                        <popup-picker 
                            :show.sync="ShowProcess" 
                            :data="ProcessList" 
                            @on-change="changeProcess"
                            value-text-align='left'
                        ></popup-picker>
                        <div>{{ChoiceProcess}}</div>
                    </div>    
                </div>
                <div class="m-inp f-mtb5">
                    <span class="laber">资源</span>
                    <!-- <span class="inp s-bgwhile" @click="ShowProcedure = true">{{choiceDepartments}}</span> -->
                    <div  @click="ShowResource = true" class="m-selector">
                        <popup-picker 
                            :show.sync="ShowResource" 
                            :data="ResourceList" 
                            @on-change="changeResource"
                            value-text-align='left'
                        ></popup-picker>
                        <div>{{ChoiceResource}}</div>
                    </div>    
                </div>
            </div>
        </div>

        <s-confirm 
        v-model="ShowConfirm" 
        content="提交成功" 
        :showConfirmButton='false' 
        :showCancelButton='false' 
        :showSuccessButton='true'
        :showDangerButton='false'
        @on-cancel="onCancel" 
        @on-confirm="onConfirm">
        </s-confirm>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: '',
    data() {
        return {
            ShowProcedure:false,
            ShowConfirm:false,
            ShowWorkshop:false,
            ChoiceWorkshop:null,
            WorkshopList:[['部门一','部门二','部门三']],
            ShowProcess:false,
            ChoiceProcess:null,
            ProcessList:[['工序一','工序二','工序三']],
            ShowResource:false,
            ChoiceResource:null,
            ResourceList:[['资源一','资源二','资源三']],
        }
    },
    components: {

    },
    methods: {




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

        //获取焦点事件
        getBlur(){
            console.log('获取焦点事件');
        },

        //键盘回车事件
        getEnter(){
            console.log('键盘回车事件'+this.BarCode);
        },

        //点击提示弹窗的删除按钮
        onCancel(){

        },
        //点击提示弹窗的确认按钮
        onConfirm(){},
        //点击提交按钮
        goCollection(){
            this.$router.push({name:'Collection'})
        },
        changeWorkshop(value){
            this.ChoiceWorkshop=value[0]
            localStorage.setItem('WorkshopKey',this.ChoiceWorkshop)
        },
        changeProcess(value){
            this.ChoiceProcess=value[0]
            localStorage.setItem('ProcessKey',this.ChoiceProcess)
        },
        changeResource(value){
            this.ChoiceResource=value[0]
            localStorage.setItem('ResourceKey',this.ChoiceResource)
        }
    },
    mounted () {
        // console.log('WorkshopKey'+localStorage.getItem('WorkshopKey'));
        // console.log('ProcessKey'+localStorage.getItem('ProcessKey'));
        // console.log('ResourceKey'+localStorage.getItem('ResourceKey'));

        //获取存在本地的车间，并且判断之前存储的值是否在当前车间列表中存在，存在才赋值
        if (localStorage.getItem('WorkshopKey')) {
            console.log('WorkshopKey'+localStorage.getItem('WorkshopKey'));
            let newArr=this.WorkshopList[0].filter(item=>{
                return item==localStorage.getItem('WorkshopKey')
            })
            if(newArr.length>0){
                this.ChoiceWorkshop=localStorage.getItem('WorkshopKey')
            }
        }
        //获取存在本地的工序，并且判断之前存储的值是否在当前工序列表中存在，存在才赋值
        if (localStorage.getItem('ProcessKey')) {
            let newArr=this.ProcessList[0].filter(item=>{
                return item==localStorage.getItem('ProcessKey')
            })
            if(newArr.length>0){
                this.ChoiceProcess=localStorage.getItem('ProcessKey')
            }
        }
        //获取存在本地的资源，并且判断之前存储的值是否在当前资源列表中存在，存在才赋值
        if (localStorage.getItem('ResourceKey')) {
            let newArr=this.ResourceList[0].filter(item=>{
                return item==localStorage.getItem('ResourceKey')
            })
            if(newArr.length>0){
                this.ChoiceResource=localStorage.getItem('ResourceKey')
            }
        }
    }
}
</script>

<style lang="less">


</style>
