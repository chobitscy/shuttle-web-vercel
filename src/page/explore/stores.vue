<template>
    <Page>
        <template v-slot:headers>
            <Headers>
                <span><i :class="icon"></i> {{title}}</span>
                <span slot="icon" @click="$router.replace('/home')"><i class="el-icon-house"></i></span>
            </Headers>
        </template>
        <template v-slot:center>
            <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit"
                          :style="'top:'+ $store.getters.getHeight">
                <div class="filters">
                    <div class="filter">
                    <span @click="options['1'] = !options['1']">
                        排序 <i :class="options['1']?'el-icon-arrow-down':'el-icon-caret-bottom'"></i>
                    </span>
                    </div>
                    <div class="filter">
                    <span @click="options['2'] = !options['2']">
                        筛选 <i :class="options['2']?'el-icon-arrow-down':'el-icon-caret-bottom'"></i>
                    </span>
                    </div>
                    <div class="filter">
                    <span @click="options['3'] = !options['3']">
                        高级 <i :class="options['3']?'el-icon-arrow-down':'el-icon-caret-bottom'"></i>
                    </span>
                    </div>
                </div>
                <el-collapse-transition>
                    <div class="options" v-show="options['1']">
                        <el-radio-group v-model="sort" @change="sortStores()">
                            <el-radio-button label="name">
                                <i class="el-icon-price-tag"></i><span> 名称</span>
                            </el-radio-button>
                            <el-radio-button label="rate">
                                <i class="el-icon-star-off"></i><span> 评分</span>
                            </el-radio-button>
                            <el-radio-button label="sales">
                                <i class="el-icon-medal"></i><span> 销量</span>
                            </el-radio-button>
                        </el-radio-group>
                    </div>
                </el-collapse-transition>
                <el-collapse-transition>
                    <div class="options" v-show="options['2']">
                        <el-radio-group v-model="category" @change="filterStores()">
                            <el-radio-button label="all">
                                <i class="el-icon-collection-tag"></i><span>全部</span>
                            </el-radio-button>
                            <el-radio-button v-for="(category,index) in categories" :key="index" :label="category.name">
                                <i class="el-icon-collection-tag"></i><span v-text="category.name"></span>
                            </el-radio-button>
                        </el-radio-group>
                    </div>
                </el-collapse-transition>
                <el-collapse-transition>
                    <div class="options" v-show="options['3']">
                        <el-radio-group v-model="advanced" @change="advancedStores()">
                            <el-radio-button label="up">
                                <i class="el-icon-top"></i><span>正序</span>
                            </el-radio-button>
                            <el-radio-button label="down">
                                <i class="el-icon-bottom"></i><span>倒序</span>
                            </el-radio-button>
                        </el-radio-group>
                    </div>
                </el-collapse-transition>
                <div class="stores">
                    <Item v-for="store in stores" :key="store.id" :item="store"
                          @click.native="$router.push('/store/' + store.id)">
                        <el-tag v-text="store.category.name" slot="tag" effect="dark" :color="color" class="tag"
                                size="mini" :style="'border-color:' + color"/>
                        <div slot="sales"><i class="el-icon-medal"></i> 总销量：<span>{{ + store.sales}}</span></div>
                    </Item>
                </div>
            </mescroll-vue>
            <div class="empty" v-if="stores.length === 0">
                <Empty :description="'该服务暂无商店'" :svg="require('@/assets/undraw_mpty_street.svg')"></Empty>
            </div>
        </template>
    </Page>
</template>

<script>
    import Headers from "@/components/headers";
    import Item from "@/components/item";
    import Page from "@/layout/page";
    import MescrollVue from 'mescroll.js/mescroll.vue'
    import {findStoreByServiceId} from "@/utils/api/store";
    import {findCategoryByServiceId} from "@/utils/api/category";
    import Empty from "@/components/empty";

    export default {
        name: "stores",
        props: ['sid'],
        components: {Empty, Page, Item, Headers, MescrollVue},
        data() {
            return {
                title: null,
                icon: null,
                color: null,
                stores: [],
                options: {
                    '1': false,
                    '2': false,
                    '3': false
                },
                sort: 'name',
                category: 'all',
                advanced: 'up',
                categories: [],
                mescrollDown: {
                    callback: this.downCallBack,
                    auto: false,
                },
                serviceId: parseInt(this.sid),
                mescrollUp: {
                    callback: this.upCallBack,
                    auto: false
                },
                pageNo: 1
            }
        },
        created() {
            const serviceInfo = this.$store.getters.getServiceById(this.serviceId);
            this.title = serviceInfo.name;
            this.icon = serviceInfo.icon;
            this.color = serviceInfo.color;
            this.getStores();
            this.getCategories()
        },
        methods: {
            getStores() {
                if (this.$store.getters.storesCache(this.serviceId)) {
                    this.stores = this.$store.getters.getStoresBySid(this.serviceId);
                    console.log('缓存id为' + this.sid + '的stores')
                } else {
                    console.log('获取id为' + this.sid + '的stores');
                    findStoreByServiceId(this.sid).then(res => {
                        if (res.code === 1) {
                            let stores = res.data.list;
                            this.stores = stores;
                            this.$store.commit('setStores', stores)
                        }
                    })
                }
            },
            getCategories() {
                if (this.$store.getters.categoriesCache(this.serviceId)) {
                    this.categories = this.$store.getters.getCategories(this.serviceId);
                    console.log('缓存id为' + this.sid + '的categories')
                } else {
                    console.log('获取id为' + this.sid + '的categories');
                    findCategoryByServiceId(this.sid).then(res => {
                        if (res.code === 1) {
                            this.categories = res.data;
                            this.$store.commit('setCategories', this.categories)
                        }
                    })

                }
            },
            sortStores() {
                this.stores = this.$store.getters.sortStores(this.sort, this.advanced, this.serviceId);
            },
            filterStores() {
                this.stores = this.$store.getters.filterStores(this.category, this.serviceId);
            },
            advancedStores() {
                this.stores = this.$store.getters.sortStores(this.sort, this.advanced, this.serviceId);
            },
            mescrollInit(mescroll) {
                this.mescroll = mescroll
            },
            downCallBack(mescroll) {
                this.$store.commit('clearStores');
                this.$store.commit('clearCategories');
                this.getStores();
                this.getCategories();
                this.$nextTick(() => {
                    mescroll.endSuccess(this.stores.length);
                });
            },
            upCallBack(mescroll) {
                this.page += 1;
                findStoreByServiceId(this.serviceId).then(res => {
                    if (res.code === 1) {
                        const data = res.data.list;
                        this.stores.push(...data);
                        this.$nextTick(() => {
                            mescroll.endSuccess(data.length);
                        })
                    } else mescroll.endErr();
                })
            }
        }
    }
</script>

<style scoped>

    .filters {
        height: 30px;
        width: 100%;
        display: flex;
        justify-content: center;
        padding-top: 10px;
    }

    .filter {
        width: 30%;
        margin: 0 10px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        color: #606266;
    }

    .options {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 10px 0;
    }

    .stores {
        margin: 0 10px;
    }

    .empty {
        height: 100%;
        width: 100%;
    }
</style>