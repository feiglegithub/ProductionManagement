<template>
    <div class="m-header">
        <div class="logo">
            <span class="logotitle">索菲亞</span>
            <span class="logodesc">柜类定制专家</span>
        </div>
        <div class="title">生产管理</div>
        <div class="back" @click="closeApp">退出</div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: '',
    data() {
        return {}
    },
    components: {},
    methods: {
        closeApp(){
            this.$emit('closeApp');
        }
    }
}
</script>

<style lang="less">
// @import '../../assets/css/px2rem.less';
.m-header{
    // position: fixed;
    overflow-y:auto;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 100%;
    background: #22292C;
    color: white;
    .logo{
        // display: flex;
        // // align-items: center;
        // flex-direction: column;
        position: absolute;
        left: 0;
        width: 25%;
        height: 50px;
        text-align: center;
        .logotitle{
            display: block;
            font-size: 20px;
            font-weight: 50
        }
        .logodesc{
            display: block;
            line-height: 10px;
            font-size: 10px;
        }
    }
    .title{
        font-size: 22px;
        font-weight: 500
    }
    .back{
        position: absolute;
        right: 0;
        top: 12px;
        padding-right: 10px;
        font-size: 18px;
        font-weight: 500;
    }
}
</style>
