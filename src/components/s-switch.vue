<template>
    <input class="m-switch" type="checkbox" @change="changeValue" :checked='inputValue'>
</template>
<script>
export default {
    props: {
      inputValue: {
        type: Boolean,
        default: false,
      },
    },
    data(){
        return{
            // inputValue:false
        }
    },
    methods:{
        changeValue(){
            let postValue=!this.inputValue
            // console.log(this.inputValue);
            this.$emit('changeSwitch',postValue)
        }
    },
    mounted(){
        
    }
}
</script>
<style lang="less">
.m-switch{
    -webkit-appearance: none;
    border: none;
    outline: none;
    position: relative;
    width: 100px;
    height: 30px;
    background: white;
    border-radius: 30px;
    box-shadow: 0px 0px 2px #666666;
    transition: all .4s ease;
    box-sizing: content-box;
}
.m-switch::after{
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    top: 0;
    left: 0;
    border-radius: 50%;
    background: white;
    transition: all .2s ease;
    /* border: 1px solid #666666; */
    box-shadow: 0px 0px 5px #666666;
}
.m-switch:checked{
    background: #04BE02;
}
.m-switch:checked::after{
    left: 70%;
}
</style>
