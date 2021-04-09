<template>
    <Page>
        <template v-slot:headers>
            <Headers>
                <span><i class="el-icon-shopping-cart-1"></i> 购物车</span>
                <span :class="more?'el-icon-more-outline icon_n':'el-icon-more icon_n'" @click="more = !more"
                      slot="icon"></span>
            </Headers>
            <div class="address-wrap">
                <div class="wrap">
                    <div class="info">
                        <div class="name">
                            <span><i class="el-icon-user"></i> 昵称</span>
                            <span v-text="userInfo.name"></span>
                        </div>
                        <div class="address">
                            <span><i class="el-icon-school"></i> 地址</span>
                            <span v-text="userInfo.address"></span>
                        </div>
                    </div>
                </div>
                <div class="options">
                    <el-collapse-transition>
                        <el-form status-icon ref="ruleForm" v-if="more">
                            <el-form-item>
                                <el-input placeholder="备注" type="textarea" :rows="3"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-switch
                                        v-model="isExpired"
                                        active-text="自动取消（超过15分钟未有人接单）">
                                </el-switch>
                            </el-form-item>
                        </el-form>
                    </el-collapse-transition>
                </div>

            </div>
        </template>
        <template v-slot:center>
            <Item v-for="(item, index) in cartList" :key="index" :item="item[1]" :price="true"
                  :count="item[1].count">
                <el-input-number v-model="item[1].count" :min="0" size="mini" style="width: 90px;"
                                 @change="(currentValue, oldValue) => {change(currentValue, oldValue, item[1])}"
                                 slot="button"/>
                <div slot="tag">
                    <el-tag size="mini" v-text="item[1].storeName" effect="dark" class="tag" type="warning"/>
                    <el-tag size="mini" effect="dark" @click="dialogExtendVisible = true"
                            v-if="item[1].extend.type != null"><i class="el-icon-link"></i>
                    </el-tag>
                    <el-dialog :title="item[1].extend.type === 'note'?'取件号':'文件'" :visible.sync="dialogExtendVisible"
                               width="80%" center>
                        <div class="dialog">
                            <div class="dialog-control"
                                 v-if="item[1].extend.type != null && item[1].extend.type === 'note'">
                                <el-input v-model="item[1].extend.value" suffix-icon="el-icon-chat-line-square"
                                          placeholder="请输入订单号"/>
                            </div>
                            <div class="dialog-control"
                                 v-if="item[1].extend.type != null && item[1].extend.type === 'file'">
                                <el-upload class="upload dialog-control"
                                           action="/api/file/upload"
                                           multiple
                                           :limit="1"
                                           :on-success="handleResult"
                                           :headers="{Authorization:getToken()}"
                                           :file-list="[{name:item[1].extend.value.name,url:item[1].extend.value.url}]"
                                           :on-remove="removeFile">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传一个不超过10MB的文件</div>
                                </el-upload>
                            </div>
                        </div>
                    </el-dialog>
                </div>
                <div slot="price"><i class="el-icon-price-tag"></i> 价格：
                    <span class="price-text" v-text="getPrice(item[1].price)"/>
                </div>
                <div slot="sales"><i class="el-icon-medal"></i> 销量：
                    <span>{{ + item[1].sales}}</span>
                </div>
            </Item>
            <Empty description="购物车暂无商品" :svg="require('@/assets/undraw_empty_cart_co35.svg')" v-if="getCount === 0"/>
        </template>
        <template v-slot:footer>
            <div class="pay-wrap">
                <div class="total-price">
                    <span @click="tip"><i class="el-icon-price-tag"></i> 商品金额（运费 ¥1）</span>
                    <span>共计：<span class="count">¥{{ totalPrice }}</span></span>
                </div>
                <el-button class="pay-btn" type="primary" icon="el-icon-download" :disabled="getCount === 0"
                           @click="submit">下单
                </el-button>
            </div>
        </template>
    </Page>
</template>

<script>

    import Page from "@/layout/page";
    import Headers from "@/components/headers"
    import Item from "@/components/item"
    import common from "@/utils/commont";
    import Empty from "@/components/empty";
    import {insertOrder} from "@/utils/api/order";

    export default {
        name: "cart",
        components: {Empty, Page, Headers, Item},
        data() {
            return {
                more: false,
                cartList: Array.from(this.$store.getters.getCartMap),
                isExpired: false,
                userInfo: null,
                dialogExtendVisible: false,
                fileName: null
            }
        },
        created() {
            this.userInfo = common.getUserInfo();
        },
        computed: {
            getCount() {
                return this.$store.getters.getCount;
            },
            totalPrice() {
                if (this.getCount !== 0) {
                    let count = 0;
                    this.$store.getters.getCartMap.forEach(function (product) {
                        count += product.count * product.price + 100
                    });
                    return common.changePrice(count);
                } else return '0.00'
            }
        },
        methods: {
            change(currentValue, oldValue, order) {
                this.$store.commit('changeCart',
                    {'currentValue': currentValue, 'oldValue': oldValue, 'id': order.id});
            },
            getPrice(price) {
                return common.changePrice(price);
            },
            submit() {
                let userInfo = common.getUserInfo();
                let orders = [];
                let date = this.changeDate(new Date());
                this.$store.getters.getCartMap.forEach(function (value) {
                    for (let n = 0; n < value.count; n++) {
                        let type = value.extend.type;
                        let note, file;
                        if (type === 'note') note = value.extend.value;
                        else if (type === 'file') file = value.extend.value.url;
                        orders.push({
                            pid: value.id,
                            cid: userInfo.id,
                            sid: 1,
                            date: date,
                            address: userInfo.address,
                            note: note,
                            file: file,
                            status: -1,
                            client: {
                                phone: userInfo.phone,
                                address: userInfo.address,
                                name: userInfo.name
                            },
                            serviceId: value.serviceId,
                            product: {
                                name: value.name
                            },
                            storeName: value.storeName
                        })
                    }
                });
                insertOrder(orders, {
                    'headers': {
                        'Content-Type': 'application/json'
                    }
                }, this.isExpired).then(res => {
                    if (res.code === 1) {
                        this.$store.commit('clear');
                        this.$message({
                            message: '下单成功',
                            type: 'success'
                        });
                        this.$router.push('/order');
                    }
                });
            },
            getToken() {
                return localStorage.getItem('token');
            },
            handleResult(response, file) {
                this.$store.commit('changeFile', {
                    fileName: this.fileName,
                    curFileName: file.name,
                    url: response.data
                })
            },
            removeFile(file) {
                this.fileName = file.name
            },
            changeDate(date) {
                return date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0]
            },
            tip(){
                this.$confirm('同家商店收取1元，不同商店另收运费', '运费', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                }).catch(() => {
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/cart';

    .content {
        width: 100%;
        flex: 1;
        overflow-y: scroll;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */
    {
        transform: translateY(10px);
        opacity: 0;
    }

    .price {
        font-size: 3vh;
        color: #f56c6c;
    }

    .label {
        margin-left: 3px;
    }

    .dialog {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .dialog-control {
        margin: 10px 0;
    }

    .upload {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .info {
        width: 100%;
    }
</style>