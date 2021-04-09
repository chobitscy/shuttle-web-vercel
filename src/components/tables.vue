<template>
    <el-table
            :data="orders"
            style="width: 100%"
            :stretch="true"
            @row-click="handleCurrentChange">
        <el-table-column
                prop="product"
                label="商品"
                align="center">
            <template slot-scope="scope">
                <span @click="detail(scope.row)">{{scope.row.product.name}}</span>
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
</template>

<script>
    import common from "@/utils/commont";
    import {deleteOrder} from "@/utils/api/order";

    export default {
        name: "tables",
        props: ['tableData', 'type'],
        data() {
            return {
                orders: this.tableData,
            }
        },
        methods: {
            getStatus(status) {
                if (status == -1) {
                    return '待接单'
                } else if (status == 0) {
                    return '配送中'
                } else if (status == 1) {
                    return '已完成'
                }
            },
            getStatusIcon(status) {
                if (status == -1) {
                    return 'el-icon-loading'
                } else if (status == 0) {
                    return 'el-icon-shopping-cart-full'
                } else if (status == 1) {
                    return 'el-icon-circle-check'
                }
            },
            getStatusType(status) {
                if (status == -1) {
                    return 'primary'
                } else if (status == 0) {
                    return 'warning'
                } else if (status == 1) {
                    return 'success'
                }
            },
            handleCurrentChange(row) {
                const serviceList = common.getService();
                const serviceName = serviceList.filter(service => service.id === row.serviceId)[0].name;
                let confirmButton = '确定';
                if (this.type !== '配送中') {
                    confirmButton = '删除'
                }
                let html =
                    "<div><i class='el-icon-user'></i><span> 用户：" + row.client.name + "</span></div>" +
                    "<div><i class='el-icon-school'></i><span> 地址：" + row.client.address + "</span></div>" +
                    "<div><i class='el-icon-collection-tag'></i><span> 商品：" + row.product.name + "</span></div>" +
                    "<div><i class='el-icon-folder'></i><span> 服务：" + serviceName + "</span></div>" +
                    "<div><i class='el-icon-goods'></i><span> 商店：" + row.storeName + "</span></div>" +
                    "<div><i class='el-icon-time'></i><span> 时间：" + row.date + "</span></div>"
                this.$confirm(html, '详情', {
                    confirmButtonText: confirmButton,
                    cancelButtonText: '返回',
                    dangerouslyUseHTMLString: true,
                }).then(() => {
                    this.deleteOrder(row)
                }).catch(() => {

                });
            },
            changeDate(date) {
                return new Date(date).toLocaleDateString()
            },
            deleteOrder(row) {
                deleteOrder({
                    id: row.id,
                    cid: row.cid,
                    status: row.status
                }).then(res => {
                    if (res.code === 1) {
                        this.$message.success('删除成功！');
                        this.$router.go(0);
                    }
                })
            }
        }
    }
</script>

<style scoped>
</style>