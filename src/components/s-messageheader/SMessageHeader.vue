<template>
    <div class="m-messageheader">
        <div class="messagetitle">{{messagetitle}}</div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
     props: {
            messagetitle: String  //定义传值的类型<br>    
        },
    name: '',
    data() {
        return {}
    },
    components: {}
}
</script>

<style lang="less">
.m-messageheader{
    height: 36px;
    width: 100%;
    background-color: #8A6C4B;
    border-radius: 10px 10px 0 0;
    line-height: 36px;
    color: white;
    font-size: 16px;
    font-weight: 500;
    flex-shrink: 0;
    .messagetitle{
        text-align: center;
    }
}
</style>
