<template>
    <div style="height: 100%">
        <el-table
                :data="getOrder"
                style="width: 100%;height: 100%;margin-bottom: 15px"
                :stretch="true"
                @row-click="handleCurrentChange">
            <el-table-column
                    prop="id"
                    label="商品"
                    align="center">
                <template slot="header"><span><i class="el-icon-shopping-bag-1"></i> 商品</span></template>
                <template slot-scope="scope" v-if="getService(scope.row.serviceId) != null">
                    <el-tag effect="dark" :color="getService(scope.row.serviceId).color"
                            :style="'border-color:' + getService(scope.row.serviceId).color"
                            v-text="scope.row.product.name">
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址"
                    align="center">
                <template slot="header"><span><i class="el-icon-school"></i> 地址</span></template>
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    align="center">
                <template slot="header"><span><i class="el-icon-time"></i> 状态</span></template>
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status === 1?'success':'warning'">
                        <i :class="scope.row.status === 1?'el-icon-circle-check':'el-icon-loading'"></i>
                        {{getStatus}}
                    </el-tag>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "order-item",
        props: ['type', 'serviceId'],
        data() {
            return {
                userInfo: this.$store.getters.getUserInfo
            }
        },
        computed: {
            getOrder() {
                if (this.type === 'receive') return this.$store.getters.getOrders(this.serviceId);
                else if (this.type === 'received') return this.$store.getters.getReceive;
                else return this.$store.getters.getCompleted
            },
            getStatus() {
                if (this.type === 'receive') return '待接单';
                else if (this.type === 'received') return '待确认';
                else return '已完成';
            },
            getService() {
                return (serviceId) => {
                    const serviceList = this.$store.getters.getService;
                    return serviceList.filter(service => service.id === serviceId)[0];
                }
            }
        },
        methods: {
            handleCurrentChange(order) {
                order.path = '/receive';
                this.$store.commit('setCurrent', order);
                this.$router.push('/detail');
            }
        }
    }

</script>

<style scoped>
</style>