<template>
    <transition name="slide-fade">
        <div class="list-item" :style="color != null?'background-color:unset;border-bottom:unset':null"
             v-if="count == null?true:count > 0">
            <el-image class="item-image" :src="item.image" fit="cover"/>
            <div type="flex" class="goods-info">
                <div class="item-info">
                    <span v-text="item.name" class="item-name"></span>
                    <slot name="tag"/>
                </div>
                <div class="item-desc">
                    <el-rate v-model="item.rate" disabled text-color="#ff9900" show-score>
                    </el-rate>
                    <slot name="button"/>
                </div>
                <div class="item-tag" :style="price != null?'unset':'height:unset'">
                    <slot name="price"/>
                    <slot name="sales"/>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "item",
        props: ['item', 'color', 'price', 'count']
    }
</script>

<style scoped lang="scss">
    .list-item {
        display: flex;
        background-color: #ffffff;
        border-bottom: 1px solid #dddddd;
        font-size: smaller;
        padding: 10px 0;

        & > * {
            margin: 5px;
        }

        .goods-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;

            .item-desc {
                margin: 3px 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .create {
                align-self: flex-end;
            }
        }
    }

    .el-tag--mini {
        height: 18px;
        line-height: 17px;
    }

    .item-tag{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
    }

    .item-image {
        width: 100px;
        height: 100px;
        margin-top: 10px
    }

    .item-info {
        display: flex;
        align-items: center;
    }

    .item-name {
        margin: 3px;
        font-size: 18px
    }

    .item-button {
        float: right;
    }

</style>