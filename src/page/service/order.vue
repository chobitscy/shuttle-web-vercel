<template>
    <Page>
        <template v-slot:headers>
            <Headers>
                <span><i class="el-icon-tickets"></i> 订单</span>
                <span :class="showSelect?'el-icon-more-outline icon_n':'el-icon-more icon_n'" slot="icon"
                      @click="showSelect = !showSelect"></span>
            </Headers>
        </template>
        <template v-slot:center>
            <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit"
                          :style="'top:'+ $store.getters.getHeight">
                <el-tabs v-model="activeName" type="card" :stretch="true" v-if="tableData != null">
                    <el-tab-pane label="已下单" name="first">
                        <span slot="label"><i class="el-icon-sold-out"></i> 已下单</span>
                        <el-table
                                :data="getTableData('已下单')"
                                style="width: 100%"
                                :stretch="true"
                                @row-click="handleCurrentChange"
                                @select="handleSelected"
                                @select-all="handleSelectedAll">
                            <el-table-column
                                    type="selection"
                                    width="50"
                                    v-if="showSelect">
                            </el-table-column>
                            <el-table-column
                                    prop="product"
                                    label="商品"
                                    align="center">
                                <template slot-scope="scope">
                                    <el-tag effect="dark" :color="getService(scope.row.serviceId).color"
                                            :style="'border-color:' + getService(scope.row.serviceId).color"
                                            v-text="scope.row.product.name">
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="date"
                                    label="时间"
                                    align="center">
                                <template slot-scope="scope">
                                    <div v-text="changeDate(scope.row.date)"></div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="status"
                                    label="状态"
                                    align="center">
                                <template slot-scope="scope">
                                    <el-tag :type="getStatusType(scope.row.status)">
                                        <i :class="getStatusIcon(scope.row.status)"></i>
                                        {{getStatus(scope.row.status)}}
                                    </el-tag>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="配送中" name="second">
                        <span slot="label"><i class="el-icon-shopping-cart-full"></i> 配送中</span>
                        <el-table
                                :data="getTableData('配送中')"
                                style="width: 100%"
                                :stretch="true"
                                @row-click="handleCurrentChange"
                                @select="handleSelected"
                                @select-all="handleSelectedAll">
                            <el-table-column
                                    type="selection"
                                    width="50"
                                    v-if="showSelect">
                            </el-table-column>
                            <el-table-column
                                    prop="product"
                                    label="商品"
                                    align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.product.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="date"
                                    label="时间"
                                    align="center">
                                <template slot-scope="scope">
                                    <div v-text="changeDate(scope.row.date)"></div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="status"
                                    label="状态"
                                    align="center">
                                <template slot-scope="scope">
                                    <el-tag :type="getStatusType(scope.row.status)">
                                        <i :class="getStatusIcon(scope.row.status)"></i>
                                        {{getStatus(scope.row.status)}}
                                    </el-tag>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="已完成" name="third">
                        <span slot="label"><i class="el-icon-circle-check"></i> 已完成</span>
                        <el-table
                                :data="getTableData('已完成')"
                                style="width: 100%"
                                :stretch="true"
                                @row-click="handleCurrentChange"
                                @select="handleSelected"
                                @select-all="handleSelectedAll">
                            <el-table-column
                                    type="selection"
                                    width="50"
                                    v-if="showSelect">
                            </el-table-column>
                            <el-table-column
                                    prop="product"
                                    label="商品"
                                    align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.product.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="date"
                                    label="时间"
                                    align="center">
                                <template slot-scope="scope">
                                    <div v-text="changeDate(scope.row.date)"></div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="status"
                                    label="状态"
                                    align="center">
                                <template slot-scope="scope">
                                    <el-tag :type="getStatusType(scope.row.status)">
                                        <i :class="getStatusIcon(scope.row.status)"></i>
                                        {{getStatus(scope.row.status)}}
                                    </el-tag>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </mescroll-vue>
        </template>
        <div slot="footer" class="delete" v-if="showSelect">
            <el-button class="delete-button" type="danger" :disabled="disabled" @click="deleteSelectedOrder">
                删除
            </el-button>
        </div>
    </Page>
</template>

<script>

    import Page from "@/layout/page";
    import Headers from "@/components/headers";
    import MescrollVue from 'mescroll.js/mescroll.vue'
    import {deleteOrder, findByUserId} from "@/utils/api/order";

    export default {
        name: "order",
        components: {Headers, Page, MescrollVue},
        data() {
            return {
                tableData: [{
                    serviceId: null
                }],
                activeName: 'first',
                mescrollDown: {
                    callback: this.downCallBack,
                    auto: false
                },
                pageNo: 1,
                userInfo: this.$store.getters.getUserInfo,
                mescrollUp: {
                    callback: this.upCallBack,
                    auto: false
                },
                showSelect: false,
                timeOutEvent: 0,
                selected: [],
                disabled: true
            }
        },
        computed: {
            getTableData() {
                return (type) => {
                    if (type === '已下单') {
                        return this.tableData.filter(order => order.status === -1)
                    } else if (type === '配送中') {
                        return this.tableData.filter(order => order.status === 0)
                    } else if (type === '已完成') {
                        return this.tableData.filter(order => order.status === 1)
                    }
                }
            },
            getService() {
                return (serviceId) => {
                    const serviceList = this.$store.getters.getService;
                    return serviceList.filter(service => service.id === serviceId)[0];
                }
            }
        },
        created() {
            this.getOrder()
        },
        methods: {
            getOrder() {
                findByUserId(this.userInfo.id, this.pageNo).then(res => {
                    if (res.code === 1) {
                        this.tableData = res.data.list;
                    }
                })
            },
            mescrollInit(mescroll) {
                this.mescroll = mescroll
            },
            downCallBack(mescroll) {
                this.pageNo = 1;
                this.getOrder();
                this.$nextTick(() => {
                    mescroll.endSuccess(this.tableData.length)
                })
            },
            upCallBack() {
                this.pageNo += 1;
                findByUserId(this.userInfo.id, this.pageNo).then(res => {
                    if (res.code === 1) {
                        this.tableData.push(...res.data.list);
                        this.$nextTick(() => {
                            this.mescroll.endSuccess(res.data.list.length)
                        })
                    } else this.mescroll.endErr()
                });
            },
            getStatus(status) {
                if (status === -1) {
                    return '待接单'
                } else if (status === 0) {
                    return '配送中'
                } else if (status === 1) {
                    return '已完成'
                }
            },
            getStatusIcon(status) {
                if (status === -1) {
                    return 'el-icon-loading'
                } else if (status === 0) {
                    return 'el-icon-shopping-cart-full'
                } else if (status === 1) {
                    return 'el-icon-circle-check'
                }
            },
            getStatusType(status) {
                if (status === -1) {
                    return 'primary'
                } else if (status === 0) {
                    return 'warning'
                } else if (status === 1) {
                    return 'success'
                }
            },
            handleCurrentChange(row) {


                row.path = '/order';
                this.$store.commit('setCurrent', row);
                this.$router.push('/detail');
            },
            changeDate(date) {
                return new Date(date).toLocaleDateString()
            },
            deleteOrder(row) {
                deleteOrder([{
                        id: row.id,
                        cid: row.cid,
                        status: row.status
                    }],
                    {
                        'headers': {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => {
                    if (res.code === 1) {
                        this.$message.success('删除成功！');
                        this.$router.go(0);
                    }
                })
            },
            handleSelected(selection) {
                this.selected = selection;

                this.disabled = false;
            },
            handleSelectedAll(selection) {
                this.selected = selection;
                this.disabled = false;
            },
            deleteSelectedOrder() {
                let orders = [];
                this.selected.forEach(order => {
                    orders.push(
                        {
                            id: order.id,
                            cid: order.cid,
                            status: order.status
                        }
                    );
                });
                deleteOrder(orders, {
                    'headers': {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    if (res.code === 1) {
                        this.$message.success('删除成功!');
                        this.getOrder();
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .delete {
        width: 100%;
        display: flex;
        justify-content: center;
        z-index: 10;
        background-color: white;
    }

    .delete-button {
        width: 99%;
        margin: 5px;
    }
</style>