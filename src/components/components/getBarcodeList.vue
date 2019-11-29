<template>
    <div>
        <s-messageheader class="f-mt10" :messagetitle="listInfo.title" v-show="notdefindDevic"></s-messageheader>
        <div class="g-basebox" v-if="data.length">
            <div v-for="(row, index) in data" :key="index" :class="{'f-mt10':index}" class="m-apply row-min-h" @click="go(row.Id || row)">
                <div class="showapply" v-for="(item,index) in listInfo.itemInfo" :key="index">
                    <span class="label">{{item.name}}</span>
                    <span class="showlabel">{{row[item.code]}}</span>
                </div>
                <span class="state">{{listInfo.prompt || row.State}}</span>
            </div>
        </div>
        <div v-else-if="notdefindDevic" class="u-badtips g-basebox">{{listInfo.message.text}}</div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'getBarcodeList',
    props:{
        notdefindDevic:Boolean,
        data:Array,
        listInfo:Object
    },
    data() {
        return {

        }
    },
    components: {},
    methods: {
        go(id){
            this.$emit('goDetails',id)
        }
    }
}
</script>

<style lang="less">

</style>
