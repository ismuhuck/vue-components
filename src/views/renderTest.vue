<template>
    <div>
        <anchored :level="1">这是默认内容</anchored>
    </div>
</template>
<script>
export default {
    data() {
        return { }
    },
    methods: { },
    components:{
        anchored:() => import('../components/anchored.vue')
    }
}
</script>
<style lang="scss" scoped>

</style>