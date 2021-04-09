<template>
    <Page>
        <template v-slot:headers>
            <Headers>
                <span><i class="el-icon-sell"></i> 接单</span>
                <span slot="icon" @click="$router.replace('/home')"><i class="el-icon-house"></i></span>
            </Headers>
        </template>
        <template v-slot:center>
            <el-tabs v-model="activeName" type="card" :stretch="true" tabPosition="bottom"
                     style="position: fixed;bottom: 0;width: 100%;" class="receive">
                <el-tab-pane name="first" style="height: 100%">
                    <span slot="label"><i class="el-icon-tickets"></i> 订单</span>
                    <Category :categories="getCategory()" :position="'top'"/>
                </el-tab-pane>
                <el-tab-pane name="second">
                    <span slot="label"><i class="el-icon-sell"></i> 已接单</span>
                    <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit"
                                  :style="'top:'+ $store.getters.getHeight">
                        <order-item :type="'received'"/>
                        <div v-if="order.length % pageSize === 0 && !receive && order.length !== 0" v-text="'点击加载更多'" class="load"
                             @click="loadReceive"></div>
                        <div v-if="receive || order.length === 0" v-text="'已加载全部'" class="load"></div>
                    </mescroll-vue>
                </el-tab-pane>
                <el-tab-pane name="third">
                    <span slot="label"><i class="el-icon-circle-check"></i> 已完成</span>
                    <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit"
                                  :style="'top:'+ $store.getters.getHeight">
                        <order-item :type="'completed'"/>
                        <div v-if="order.length % pageSize === 0 && !completed" v-text="'点击加载更多'" class="load"
                             @click="loadCompleted"></div>
                        <div v-if="completed" v-text="'已加载全部'" class="load"></div>
                    </mescroll-vue>
                </el-tab-pane>
            </el-tabs>
        </template>
    </Page>
</template>

<script>
    import Page from "@/layout/page";
    import Headers from "@/components/headers";
    import Category from "@/components/category";
    import OrderItem from "@/components/order-item";
    import {findByReceive, findBySidOrCompleted, findBySidOrPresent} from "@/utils/api/order";
    import MescrollVue from 'mescroll.js/mescroll.vue'

    export default {
        name: "receive",
        components: {OrderItem, Category, Headers, Page, MescrollVue},
        data() {
            return {
                activeName: 'first',
                userInfo: this.$store.getters.getUserInfo,
                mescrollDown: {
                    callback: this.downCallBack,
                    auto: false
                },
                pageNo: 1,
                ws: null,
                pageSize: 0,
                completed: false,
                receive: false,
                orders: false
            }
        },
        created() {
            const height = document.body.clientHeight;
            this.pageSize = parseInt(((height - 40 - 50 - 47) / 57).toString());
            this.getOrder(this.pageNo);
            this.getReceived();
            this.getCompleted();
            const push = JSON.parse(localStorage.getItem('push'));
            if (("WebSocket" in window) && push === null ? true : push) {
                this.ws = new WebSocket(process.env.VUE_APP_WS);

                this.ws.onopen = function () {
                    console.log('已连接')
                };
                let self = this;
                this.ws.onmessage = function (evt) {
                    self.$store.commit('updateOrders', JSON.parse(evt.data));
                };

                this.ws.onclose = function () {
                    console.log('已关闭')
                };
            }
        },
        computed: {
            order() {
                if (this.activeName === 'first') return this.$store.getters.getOrders(this.serviceId);
                else if (this.activeName === 'second') return this.$store.getters.getReceive;
                else return this.$store.getters.getCompleted
            },
        },
        methods: {
            getOrder(pageNo) {
                findByReceive(pageNo).then(res => {
                    if (res.code === 1) {
                        this.$store.commit('setOrders', res.data.list)
                    }
                });
            },
            getReceived() {
                findBySidOrPresent(this.userInfo.id, 1).then(res => {
                    if (res.code === 1) {
                        this.$store.commit('setReceive', res.data.list);
                    }
                })
            },
            getCompleted() {
                findBySidOrCompleted(this.userInfo.id, 1, this.pageSize).then(res => {
                    if (res.code === 1) {
                        this.$store.commit('setCompleted', res.data.list);
                    }
                })
            },
            getCategory() {
                let services = [{'id': 0, 'name': '全部'}];
                services.push(...this.$store.getters.getService);
                return services
            },
            mescrollInit(mescroll) {
                this.mescroll = mescroll
            },
            downCallBack() {
                this.getReceived();
                this.$nextTick(() => {
                    this.mescroll.endSuccess()
                });
            },
            loadCompleted() {
                this.pageNo += 1;
                findBySidOrCompleted(this.userInfo.id, this.pageNo, this.pageSize).then(res => {
                    if (res.code === 1) {
                        this.$store.commit('loadCompleted', res.data.list);
                        if (this.order.length === res.data.total) this.completed = true;
                    }
                })
            },
            loadReceive(){
                this.pageNo += 1;
                findBySidOrPresent(this.userInfo.id, this.pageNo, this.pageSize).then(res => {
                    if (res.code === 1) {
                        this.$store.commit('loadReceive', res.data.list);
                        if (this.order.length === res.data.total) this.receive = true;
                    }
                })
            }
        },
        destroyed() {
            this.$store.commit('clearOrders');
        }
    }
</script>

<style scoped>
    .load {
        text-align: center;
        margin-bottom: 50px;
        color: #606266;
        font-size: 10px;
    }
</style>