<template>
    <div class="body scroll" index>
        <!--轮播图-->
        <el-carousel height="150px" class="carousel" indicator-position="none">
            <el-carousel-item v-for="(ad,index) in ads" :key="index">
                <el-image :src="ad.image" @click="$router.push('/store/' + ad.storeId)"></el-image>
            </el-carousel-item>
        </el-carousel>
        <!--服务区-->
        <div class="flex flex-wrap justify-sb">
            <div v-for="service in services" :key="service.id" class="cover-item theme-bg" hoverclass="hoverclass"
                 :style="'background-color:' + service.color" @click="$router.push('/service/' + service.id)">
                <span :class="service.icon" class="icon"></span>
                <p v-text="service.name"></p>
            </div>
        </div>
        <div class="popular scroll">
            <el-divider>
                <li class="el-icon-sort" @click="clickSwitch" v-text="switchButton?' 热门产品':' 热门商店'"> 热门服务
                </li>
            </el-divider>
            <!--热门商店-->
            <transition name="el-fade-in-linear">
                <div class="top-store" v-if="!switchButton">
                    <Item :item="item" v-for="item in popularStore" :key="item.id"
                          @click.native="$router.push('/store/' + item.id)">
                        <el-tag size="mini" v-text="item.services.name" effect="dark" class="item-tag"
                                :style="'border-color:' + item.services.color"
                                slot="tag" :color="item.services.color"/>
                        <div slot="sales"><i class="el-icon-medal"></i> 总销量：
                            <span>{{ + item.sales}}</span></div>
                    </Item>
                </div>
            </transition>
            <!--热门产品-->
            <transition name="el-fade-in-linear">
                <div class="top-product" v-if="switchButton">
                    <Item :item="item" v-for="item in popularProduct" :key="item.id" :price="true">
                        <el-tag size="mini" v-text="item.store.name" effect="dark" class="tag" type="warning"
                                slot="tag" @click="$router.push('/store/' + item.storeId)"/>
                        <ProductDialog slot="button" :product="item"/>
                        <div slot="price"><i class="el-icon-price-tag"></i> 价格：
                            <span class="price-text" v-text="getPrice(item.price)"/>
                        </div>
                        <div slot="sales"><i class="el-icon-medal"></i> 销量：
                            <span>{{ + item.sales}}</span>
                        </div>
                    </Item>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import Item from "@/components/item";
    import common from "@/utils/commont";
    import {findAllService} from "@/utils/api/service";
    import {findPopularStore} from "@/utils/api/store";
    import {findPopularProduct} from "@/utils/api/product";
    import ProductDialog from "@/components/product-dialog";
    import {findAllAds} from "@/utils/api/ads";

    export default {
        name: "Explore",
        components: {Item, ProductDialog},
        data() {
            return {
                services: [],
                switchButton: false,
                popularStore: [],
                popularProduct: [],
                ads: []
            }
        },
        activated() {
            this.getService();
            this.getRankStores();
            this.getAds()
        },
        computed: {
            getPrice() {
                return (price) => {
                    return common.changePrice(price);
                }
            }
        },
        methods: {
            getService() {
                const services = sessionStorage.getItem('serviceList');
                if (services === null) {
                    findAllService().then(res => {
                        if (res.code === 1) {
                            let services = res.data.list;
                            this.services = services;
                            this.$store.commit('setServices', services);
                            sessionStorage.setItem('serviceList', JSON.stringify(services));
                        }
                    });
                } else this.services = JSON.parse(services);
            },
            getRankStores() {
                const poplarStore = this.$store.getters.getPopularStores;
                if (poplarStore.length === 0) {
                    findPopularStore().then(res => {
                        if (res.code === 1) {
                            const data = res.data;
                            this.popularStore = data;
                            this.$store.commit('setPopularStores', data);
                        }
                    })
                } else this.popularStore = poplarStore;
            },
            getRankProduct() {
                const popularProduct = this.$store.getters.getPopularProducts;
                if (popularProduct.length === 0) {
                    findPopularProduct().then(res => {
                        if (res.code === 1) {
                            const data = res.data;
                            this.popularProduct = data;
                            this.$store.commit('setPopularProducts', data)
                        }
                    })
                } else this.popularProduct = popularProduct;
            },
            clickSwitch() {
                this.switchButton = !this.switchButton;
                let text = this.switchButton ? '热门商品' : '热门服务';
                this.$message({
                    message: '切换为' + text,
                    type: 'info',
                    duration: 800
                });
                if (this.switchButton)
                    this.getRankProduct();
            },
            getAds() {
                let ads = sessionStorage.getItem('ads');
                if (ads !== null) this.ads = JSON.parse(ads);
                else {
                    findAllAds().then(res => {
                        if (res.code === 1) {
                            this.ads = res.data;
                            sessionStorage.setItem('ads', JSON.stringify(res.data));
                        }
                    })
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../style/service";

    .carousel {
        margin-bottom: 20px
    }

    .el-carousel__item {
        border-radius: 15px !important;
    }

    .el-carousel {
        border-radius: 15px !important;
    }
</style>