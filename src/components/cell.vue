<template>
    <div class="cell flex" :flex="flex" v-on="$listeners">
        <div class="header">
            <i v-if="icon" :class="icon" />
            <span v-if="title" class="title" v-text="title" />
            <slot name="header" />
        </div>
        <main flex="1">
            <div v-if="text" v-text="text" />
            <slot v-else />
        </main>
        <div class="flex footer" flex="align-items_center">
            <slot name="footer" />
            <i
                v-if="access"
                class="el-icon-arrow-right"
                :class="{ light: accessLight }"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "cell",
    props: {
        title: String,
        icon: String,
        text: String,
        flex: {
            type: String,
            default: "align-items_center",
        },
        access: Boolean,
        accessLight: Boolean,
    },
};
</script>

<style lang="scss" scoped>
.cell {
    padding: 15px;
    > .header {
        > .title {
            margin-right: 15px;
        }
        > i {
            margin-right: 0.3em;
        }
    }

    > .footer {
        > i.el-icon-arrow-right {
            color: rgba(0, 0, 0, 0.3);
            &.light {
                color: rgba(255, 255, 255, 0.7);
            }
        }
    }
}

.cells.tidy-header > .cell > .header {
    min-width: 3em;
}
</style>