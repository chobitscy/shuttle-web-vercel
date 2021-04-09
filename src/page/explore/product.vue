<template>
    <div class="content">
        <Headers>
            <span><i class="el-icon-price-tag"></i> 商品详情</span>
        </Headers>
        <div class="product">
            <div class="image">
                <el-image :src="product.image" fit="cover" style="height: 100%;" :preview-src-list="[product.image]"/>
            </div>
            <div class="product-detail">
                <div class="product-info">
                    <div class="label"><span><i class="el-icon-folder"></i> 名称：</span>{{product.name}}</div>
                    <div class="label"><span><i class="el-icon-star-off"></i> 评分：</span>
                        <el-rate v-model="product.rate" disabled text-color="#ff9900" show-score>
                        </el-rate>
                    </div>
                    <div class="label"><span><i class="el-icon-medal"></i> 销量：</span>{{product.sales}}</div>
                    <div class="label"><span><i class="el-icon-collection-tag"></i> 价格：</span>{{product.price + '￥'}}</div>
                    <div class="label"><span><i class="el-icon-shopping-cart-1"></i> 商店：</span>{{product.shop}}</div>
                </div>
            </div>
        </div>
        <div class="add">
            <div class="add-button">
                <el-button style="width: 100%" type="primary" icon="el-icon-plus">添加到购物车</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import Headers from "@/components/headers";
    import mock from "@/mock";

    export default {
        name: "product",
        components: {Headers},
        props: ['pid'],
        data() {
            return {
                product: null
            }
        },
        created() {
            this.product = mock.product()[0]
        }
    }
</script>

<style scoped>
    .content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .image {
        width: 100%;
        height: 65%;
    }

    .product-detail {
        height: 35%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .product {
        flex: 1;
        overflow-y: scroll;
    }

    .add-button {
        margin: 5px 10px;
    }

    .label {
        display: flex;
    }

    .product-info{
        width: 90%;
    }
</style>