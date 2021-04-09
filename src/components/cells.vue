<template>
    <div class="cells" :class="{ 'tidy-header': tidyHeader }">
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        tidyHeader: Boolean,
    },
};
</script>
<style lang="scss" scoped>
.cells {
    margin: 20px 0;
    background-color: #fff;

    > * {
        position: relative;
    }
    > *:before {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        color: rgba(0, 0, 0, 0.1);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        left: 16px;
        z-index: 2;
    }

    > *:first-child:before {
        content: none;
    }
}
</style>