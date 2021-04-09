<template>
    <div>
        <div id="page">
            <div id="icon" :style="'background-color:' + color">
                <i :class="icon"></i>
            </div>
            <div class="info">
                <div id="title" v-text="title"/>
                <div id="detail" v-text="detail"/>
            </div>
            <div id="btn">
                <slot name="btn"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "page",
        props: {icon: String, color: String, title: String, detail: String}
    }
</script>

<style scoped>

    #page {
        background-color: white;
        margin: 10px;
        height: 125px;
        display: flex;
    }

    #icon {
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }

    .info {
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        font-size: 10px;
        text-align: center;
        background-color: white;
    }

    #btn {
        width: 20%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
</style>