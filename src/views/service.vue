<template>
    <div style="background-color: #ebeef5">
        <card v-for="(page,index) in pages" :key="index" :title="page.title" :detail="page.detail" :color="page.color"
              :icon="page.icon">
            <div id="btn" :style="'background-color: ' + page.color" slot="btn" @click="page.router === 'admin' ? openAdminWeb() :$router.push(page.router)">进入
            </div>
        </card>
    </div>
</template>

<script>

    import card from "@/components/card";

    export default {
        name: "service",
        components: {card},
        data() {
            return {
                pages: [
                    {
                        title: '订单',
                        detail: '查看已下单的商品',
                        color: 'rgba(99, 149, 237, 0.79)',
                        icon: 'el-icon-tickets',
                        router: '/order'
                    },
                    {
                        title: '接单',
                        detail: '查看已接收的订单',
                        color: '#ff7f50a8',
                        icon: 'el-icon-sell',
                        router: '/receive'
                    },
                    {
                        title: '购物车',
                        detail: '查看购物车',
                        color: 'pink',
                        icon: 'el-icon-shopping-cart-1',
                        router: '/cart'
                    },
                ]
            }
        },
        created() {
            let admin = this.$store.getters.getUserInfo.admin;
            if (admin) {
                this.pages.push({
                    title: '后台管理',
                    detail: '进入后台管理界面',
                    color: 'thistle',
                    icon: 'el-icon-data-analysis',
                    router: 'admin'
                })
            }
        },
        methods: {
            openAdminWeb() {
                window.open(process.env.VUE_APP_ADMIN);
            }
        }
    }
</script>

<style scoped>
    .service {
        margin: 10px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        border-radius: 10px;
    }

    #btn{
        width: 50px;
        height: 30px;
        font-size: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }
</style>