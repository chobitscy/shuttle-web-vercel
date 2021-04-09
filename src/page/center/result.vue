<template>
    <Page>
        <Headers slot="headers">

            <span><i class="el-icon-wallet"></i> 支付结果</span>
            <span slot="icon" @click="$router.replace('/home')"><i class="el-icon-house"></i></span>
        </Headers>
        <div slot="center" class="container">
            <Empty :description="status > 0 ?'成功':'失败'"
                   :svg="status > 0 ?require('@/assets/undraw_successful_purchase_uyin.svg'):require('@/assets/undraw_access_denied_6w73.svg')"/>
        </div>
    </Page>

</template>

<script>
    import Headers from "@/components/headers";
    import Page from "@/layout/page";
    import Empty from "../../components/empty";

    export default {
        name: "result",
        components: {Empty, Page, Headers},
        props: ['status']
    }
</script>

<style scoped>
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>