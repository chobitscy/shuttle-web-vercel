<template>
    <page>
        <headers slot="headers">

            <span><i class="el-icon-info"></i> 详情</span>
            <span :class="show?'el-icon-more-outline icon_n':'el-icon-more icon_n'" @click="show = !show"
                  slot="icon"></span>
        </headers>
        <div slot="center" class="container">
            <div class="status">
                <div class="info">
                    <div class="alone">
                        <div><i class="el-icon-refresh"></i> 状态</div>
                        <div>
                            <el-tag :type="getStatusType">
                                <i :class="getStatusIcon"></i>
                                {{getStatusText}}
                            </el-tag>
                        </div>
                    </div>
                    <div class="alone">
                        <div><i class="el-icon-date"></i> 时间</div>
                        <div v-text="order.date"></div>
                    </div>
                    <el-collapse-transition>
                        <div class="center" v-if="show">
                            <div class="item">
                                <div><i class="el-icon-link"></i> 订单：</div>
                                <div v-text="order.id"></div>
                            </div>
                            <div class="item">
                                <div><i class="el-icon-school"></i> 地址：</div>
                                <div v-text="order.address"></div>
                            </div>

                            <div class="item">
                                <div><i class="el-icon-tickets"></i> 备注：</div>
                                <div v-text="order.note === null?'无':order.note" class="null"></div>
                            </div>
                            <div class="item">
                                <div><i class="el-icon-files"></i> 文件：</div>
                                <div v-if="order.file === null" class="null">无</div>
                                <el-link :href="'/api/file/download/' + order.file" v-if="order.file !== null">下载文件
                                </el-link>
                            </div>
                        </div>
                    </el-collapse-transition>
                </div>
            </div>
            <div class="product">
                <Item :item="order.product" :price="true">
                    <el-tag size="mini" v-text="order.storeName" effect="dark" class="tag" type="warning" slot="tag"/>
                    <div slot="price"><i class="el-icon-price-tag"></i> 价格：
                        <span class="price-text" v-text="changePrice"/>
                    </div>
                    <div slot="sales"><i class="el-icon-medal"></i> 销量：
                        <span>{{ + order.product.sales}}</span>
                    </div>
                </Item>
            </div>
            <div class="client">
                <el-divider>
                    <li class="el-icon-user"> 客户</li>
                </el-divider>
                <div class="user">
                    <div class="alone">
                        <div><i class="el-icon-user"></i> 昵称：</div>
                        <el-tag v-text="order.client.name"></el-tag>
                    </div>
                    <div class="alone">
                        <div><i class="el-icon-phone"></i> 电话：</div>
                        <el-tag type="success">
                            <el-link :href="'tel://' + order.client.phone" v-text="order.client.phone"
                                     :underline="false" class="phone"></el-link>
                        </el-tag>
                    </div>
                    <div class="alone">
                        <div><i class="el-icon-school"></i> 地址：</div>
                        <el-tag type="warning" v-text="order.client.address"/>
                    </div>
                </div>
            </div>
            <div class="waiter">
                <el-divider>
                    <li class="el-icon-user-solid"> 服务者</li>
                </el-divider>
                <div class="user" v-if="order.status !== -1">
                    <div class="alone">
                        <div><i class="el-icon-user-solid"></i> 昵称：</div>
                        <el-tag v-text="order.service.name"></el-tag>
                    </div>
                    <div class="alone">
                        <div><i class="el-icon-phone"></i> 电话：</div>
                        <el-tag type="success">
                            <el-link :href="'tel://' + order.service.phone" v-text="order.service.phone"
                                     :underline="false" class="phone"></el-link>
                        </el-tag>
                    </div>
                    <div class="alone">
                        <div><i class="el-icon-school"></i> 地址：</div>
                        <el-tag type="warning" v-text="order.service.address"/>
                    </div>
                </div>

                <div class="tip" v-if="order.status === -1">暂无服务者</div>
            </div>
            <el-dialog title="请评价该产品" :visible.sync="dialogEvaluateVisible" width="80%" center>
                <div class="rate">
                    <el-rate v-model="rate" show-text/>
                    <div class="rate-button">
                        <el-button type="primary" size="mini" :disabled="rate === 0" @click="changeRate">确认</el-button>
                        <el-button type="info" size="mini" @click="completeOrder">跳过</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div slot="footer" class="operate">
            <el-button :type="operateType" v-text="operateName" @click="operate" :disabled="disabled"/>
        </div>
    </page>
</template>

<script>
    import Page from "@/layout/page";
    import Headers from "@/components/headers";
    import Item from "@/components/item"
    import common from "@/utils/commont";
    import {complete, deleteOrder, Receive} from "@/utils/api/order";
    import {review} from "@/utils/api/product";

    export default {
        name: "detail",
        components: {Headers, Page, Item},
        data() {
            return {
                order: null,
                show: false,
                path: null,
                operateName: null,
                operateType: null,
                disabled: false,
                dialogEvaluateVisible: false,
                rate: 0
            }
        },
        created() {
            const order = this.$store.getters.getCurrent;
            if (order === null) this.order = JSON.parse(sessionStorage.getItem('current'));
            else this.order = order;
        },
        mounted() {
            if (this.path === '/') this.path = this.order.path;
            if (this.path === '/order') {
                if (this.order.status === 0) {
                    this.operateName = '签收';
                    this.operateType = 'success';
                } else {
                    this.operateName = '删除';
                    this.operateType = 'danger';
                }
            } else if (this.path === '/receive') {
                if (this.order.status === -1) {
                    this.operateName = '接单';
                    this.operateType = 'success';
                } else if (this.order.status === 0) {
                    this.operateName = '待确认';
                    this.operateType = 'warning';
                    this.disabled = true;
                } else if (this.order.status === 1) {
                    this.operateName = '删除';
                    this.operateType = 'danger';
                }
            }
        },
        computed: {
            changePrice() {
                return common.changePrice(this.order.product.price)
            },
            getStatusIcon() {
                if (this.order.status === -1) return 'el-icon-loading';
                else if (this.order.status === 0) return 'el-icon-shopping-cart-full';
                else return 'el-icon-circle-check';
            },
            getStatusText() {
                if (this.order.status === -1) return '待接单';
                else if (this.order.status === 0) return '配送中';
                else return '已完成';
            },
            getStatusType() {
                if (this.order.status === -1) return 'primary';
                else if (this.order.status === 0) return 'warning';
                else return 'success';
            }
        },
        methods: {
            operate() {
                if (this.path === '/') this.path = this.order.path;
                const status = this.order.status;
                if (this.path === '/order') {
                    if (status === -1 || status === 1) this.deleteOrder();
                    else this.dialogEvaluateVisible = true;
                } else if (this.path === '/receive') {
                    if (status === -1) this.receive();
                    else if (status === 1) this.deleteOrder();
                }
            },
            deleteOrder() {
                this.$confirm('确定删除该订单？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteOrder([{
                            id: this.order.id,
                            cid: this.order.cid,
                            status: this.order.status
                        }],
                        {
                            'headers': {
                                'Content-Type': 'application/json'
                            }
                        }).then(res => {
                        if (res.code === 1) {
                            this.$message.success('删除成功！');
                            this.$router.replace('/order');
                        }
                    })
                }).catch(() => {
                });
            },
            completeOrder() {
                const order = {
                    id: this.order.id,
                    cid: this.order.cid,
                    sid: this.order.sid,
                    pid: this.order.pid,
                    file: this.order.file
                };
                complete(order).then(res => {
                    if (res.code === 1) {
                        this.$message.success('签收成功！');
                        this.$router.replace('/order');
                    } else {
                        this.$message.error('订单已取消');
                        this.$router.replace('/receive')
                    }
                })
            },
            receive() {
                this.$confirm('接单会消耗1积分，确定接受该订单？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Receive({
                        orderId: this.order.id,
                        userId: common.getUserInfo().id
                    }).then(res => {
                        if (res.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '接单成功',
                                duration: 500
                            });
                            this.$router.replace('/receive');
                        }
                    })
                }).catch(() => {
                });
            },
            changeRate() {
                review({
                    id: this.order.pid,
                    storeId: this.order.storeId,
                    rate: this.rate
                }).then(res => {
                    if (res.code === 1) {
                        this.$message.success('评分成功！');
                        this.completeOrder();
                        this.dialogEvaluateVisible = false;
                    }
                })
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.path = from.path;
            })

        },
    }
</script>

<style scoped>
    .operate {
        width: 100%;
    }

    .operate .el-button {
        width: 100%;
        border-radius: 0px;
    }

    .container {
        display: flex;
    }

    .status {
        display: flex;
        flex-direction: column;
        color: #606266;
    }

    .status::after {
        height: 2px;
        background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
        background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
        background-size: 80px;
        content: '';
    }

    .info {
        height: 100%;
        padding: 10px;
    }

    .item {
        width: 50%;
        display: flex;
        align-items: center;
        margin: 10px 0 0 0;
    }

    .alone {
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .center {
        display: flex;
        flex-wrap: wrap;
    }

    .product {
        flex: 1;
    }

    .product .list-item {
        border-bottom: unset;
    }

    .client {
        flex: 1;
    }

    .client .el-divider--horizontal {
        margin: unset;
    }

    .user {
        height: 100%;
        padding: 10px;
    }

    .waiter {
        flex: 1;
    }

    .waiter .el-divider--horizontal {
        margin: unset;
    }

    .phone {
        color: #67c23a;
        font-size: 12px;
    }

    .tip {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #909399;
    }

    .null {
        color: #909399;
    }

    .rate {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .rate-button {
        margin-top: 30px;
    }
</style>