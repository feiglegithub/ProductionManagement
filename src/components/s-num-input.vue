<template>
    <div style="display:inline-block">
    <input siekeyboard="true" type="text"  v-model="testNum">
    <s-keyboard @newval="(val)=>{testNum=val}" :val="testNum" @enter="$emit('enter')"></s-keyboard>
    </div>
</template>
<script>
export default {
    
    methods:{
        
    },
    mounted(){

    }
}
</script>
