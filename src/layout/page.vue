<template>
    <div class="container">
        <slot name="headers"/>

        <div class="center scroll">
            <slot name="center"/>
        </div>

        <slot name="footer"/>
    </div>
</template>

<script>
    export default {
        name: "page"
    }
</script>

<style scoped>
    .container{
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .center{
        flex: 1;
        overflow-y: scroll;
    }
</style>