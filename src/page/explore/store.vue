<template>
    <Page>
        <template v-slot:headers>
            <Headers>
                <span><i class="el-icon-shopping-bag-2"></i> 商店详情</span>
                <span slot="icon" @click="$router.replace('/home')"><i class="el-icon-house"></i></span>
            </Headers>
            <div style="overflow: hidden;" v-if="store != null">
                <div class="info-background"
                     :style="'background:url(' + store.image + ');background-size: cover'"></div>
                <div class="info" :style="'top:' + $store.getters.getHeight">
                    <item :item="store" :color="false">
                        <el-tag size="mini" v-text="'外卖'" effect="dark" class="item-tag" type="warning"
                                style="font-size:2vh;height: unset"></el-tag>
                        <div slot="sales"><i class="el-icon-medal"></i> 总销量：
                            <span>{{ + store.sales}}</span>
                        </div>
                    </item>
                </div>
            </div>
        </template>
        <template v-slot:center>
            <div style="height: 100%;">
                <el-tabs v-model="activeName" type="card" :stretch="true" style="height: 100%;">
                    <el-tab-pane name="product" style="height: 100%;">
                        <span slot="label"><i class="el-icon-goods"></i> 商品</span>
                        <div class="content" v-if="products.length !== 0">
                            <div class="products">
                                <Item v-for="product in products" :key="product.id" :item="product" :price="true">
                                    <ProductDialog slot="button" :product="product"/>
                                    <div slot="price"><i class="el-icon-price-tag"></i> 价格：
                                        <span class="price-text" v-text="getPrice(product.price)"/>
                                    </div>
                                    <div slot="sales"><i class="el-icon-medal"></i> 销量：
                                        <span>{{ + product.sales}}</span>
                                    </div>
                                </Item>
                            </div>
                        </div>
                        <div class="empty" v-if="products.length === 0">
                            <Empty :description="'该商店暂时没有产品'" :svg="require('@/assets/undraw_empty_xct9.svg')"/>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane name="comment">
                        <span slot="label"><i class="el-icon-chat-line-square"></i> 评论</span>
                        <div v-if="comments.length !== 0">
                            <Comment v-for="(comment,index) in comments" :key="index" :comment="comment"
                                     @getComment="getComment"/>
                            <div v-if="comments.length % 9 === 0 && showLoad" class="load"
                                 @click="load(comments[comments.length - 1].id)">
                                <i class="el-icon-loading" v-if="loadTip"></i>
                                <span v-text="loadTip?' 加载中':'点击加载更多...'"></span>
                            </div>
                            <div v-if="!showLoad" class="load">
                                已加载全部
                            </div>
                        </div>
                        <div class="empty" v-if="comments.length === 0">
                            <Empty :description="'该商店当前没有评论'" :svg="require('@/assets/undraw_Short_bio_re_fmx0.svg')"/>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </template>
        <template v-slot:footer>
            <div class="cart" v-if="activeName === 'product'">
                <div class="car-button" @click="$router.push('/cart')">
                    <span><i class="el-icon-shopping-cart-1"></i> 购物车 {{getCount}}</span>
                </div>
            </div>
            <div class="comment" v-if="activeName !== 'product'">
                <el-input placeholder="请输入对商店的评论" v-model="content" @change="send">
                    <el-button slot="append" @click="send">发送</el-button>
                </el-input>
            </div>
        </template>
    </Page>
</template>

<script>
    import Headers from "@/components/headers";
    import Item from "@/components/item"
    import Page from "@/layout/page";
    import common from "@/utils/commont";
    import {findProductsByStoreId} from "@/utils/api/product";
    import {findStoreById} from "@/utils/api/store";
    import ProductDialog from "@/components/product-dialog";
    import Comment from "@/components/comment";
    import {findByStoreId, findByStoreIdAndId, insertComments} from "@/utils/api/comments";
    import Empty from "@/components/empty";

    export default {
        name: "store",
        components: {Empty, Comment, Page, Headers, Item, ProductDialog},
        props: ['sid'],
        data() {
            return {
                products: [],
                store: null,
                activeName: 'product',
                value: null,
                product: null,
                type: null,
                content: null,
                comments: [],
                loadTip: false,
                showLoad: true
            }
        },
        created() {
            this.getProducts();
            this.getStore();
            this.getComment();
        },
        methods: {
            getPrice(price) {
                return common.changePrice(price);
            },
            getProducts() {
                if (this.$store.getters.productsCache(parseInt(this.sid))) {
                    this.products = this.$store.getters.getProducts(this.sid);
                    console.log('缓存storeId为' + this.sid + '的products');
                } else {
                    console.log('获取storeId为' + this.sid + '的products');
                    findProductsByStoreId(this.sid).then(res => {
                        if (res.code === 1) {
                            this.products = res.data;
                            this.$store.commit('setProducts', this.products)
                        }
                    })
                }
            },
            getStore() {
                let storeList = this.$store.getters.getStoreById(this.sid);
                if (storeList.length === 0) {
                    findStoreById(this.sid).then(res => {
                        if (res.code === 1) {
                            this.store = res.data;
                        }
                    });
                } else this.store = storeList[0];
            },
            send() {
                const userInfo = this.$store.getters.getUserInfo;
                insertComments({
                    content: this.content,
                    name: userInfo.name,
                    date: this.changeDate(new Date()),
                    storeId: this.sid,
                    userId: userInfo.id
                }).then(res => {
                    if (res.code === 1) {
                        this.$message.success('发送成功！');

                        this.getComment();
                    }
                })
            },
            changeDate(date) {
                return date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0]
            },
            getComment() {
                findByStoreId(this.sid).then(res => {
                    if (res.code === 1) {
                        if(res.data.list.length === res.data.count) this.showLoad = false;
                        this.comments = res.data.list;
                    }
                })
            },
            load(_id) {
                this.loadTip = true;
                findByStoreIdAndId(this.sid, _id).then(res => {
                    if (res.code === 1) {
                        if(res.data.list.length === 0) this.showLoad = false;
                        else this.comments.push(...res.data.list);
                    }
                })
            }
        },
        computed: {
            getCount() {
                return this.$store.getters.getCount
            }
        }
    }
</script>

<style scoped>
    .products {
        margin: 5px;
    }

    .cart {
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .add {
        float: right;
    }

    .info {
        margin-left: 5px;
        color: white;
        position: absolute;
        top: 50px;
    }

    .car-button {
        color: white;
        margin: 5px;
        width: 100%;
        height: 80%;
        background: #409EFF;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .info-background {
        width: 100%;
        height: 135px;
        background-size: cover;
        transform: scale(1.02);
        filter: blur(3px);
    }

    .comment {
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px;
    }

    .empty {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #909399;
    }

    .load {
        text-align: center;
        color: #606266;
        font-size: 10px;
    }
</style>