<template>
    <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit" :style="'top:'+ $store.getters.getHeight">
        <el-tabs v-model="activeName" type="card" :stretch="true" :tabPosition="position">
            <el-tab-pane :name="category.name" v-for="(category,index) in categories" :key="index"
                         :label="category.name">
                <order-item :type="'receive'" :serviceId="category.id"/>
            </el-tab-pane>
        </el-tabs>
    </mescroll-vue>
</template>

<script>
    import MescrollVue from 'mescroll.js/mescroll.vue'
    import OrderItem from "@/components/order-item";

    export default {
        name: "category",
        components: {OrderItem, MescrollVue},
        props: ['categories', 'position'],
        data() {
            return {
                activeName: this.categories[0].name,
                mescrollDown: {
                    callback: this.downCallBack
                }
            }
        },
        methods: {
            mescrollInit(mescroll) {
                this.mescroll = mescroll
            },
            downCallBack(mescroll) {
                this.$nextTick(() => {
                    mescroll.endSuccess()
                })
            }
        }
    }
</script>

<style scoped>

</style>