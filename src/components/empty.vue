<template>
    <div class="el-empty">
        <img :src="svg" style="width: 200px;"/>
        <div class="el-empty__description"><p v-text="description"></p></div>
    </div>
</template>

<script>
    export default {
        name: "empty",
        props: ['description','svg']
    }
</script>

<style scoped>
    .el-empty {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        box-sizing: border-box;
        padding: 40px 0;
        height: 100%;
    }
    .el-empty__image {
        width: 160px;
    }
    .el-empty__description {
        margin-top: 5px;
        color: #909399;
    }
</style>