<template>
    <div class="flex" flex="full-screen column">
        <keep-alive>
            <component v-bind:is="sectionList[activeIndex].routerViewName" flex="@1 @scroll"/>
        </keep-alive>
        <div class="tabs-menu-area flex">
            <div v-for="(item, i) in sectionList"
                 :key="item.name"
                 class="menu-item flex"
                 :class="{ active: activeIndex === i }"
                 flex="1 column"
                 @click="activeIndex = i">
                <i :class="'el-icon-' + item.icon"></i>
                <div class="menu-title" v-text="item.name"/>
            </div>
        </div>
    </div>
</template>

<script>
    import explore from "@/views/explore.vue";
    import service from "@/views/service.vue";
    import search from "@/views/search.vue";
    import center from "@/views/center.vue";

    export default {
        name: "home_layout",
        components: {
            explore,
            service,
            search,
            center,
        },
        data() {
            return {
                activeIndex: 0,
                sectionList: [
                    {
                        name: "发现",
                        routerViewName: "explore",
                        icon: "goods",
                    },
                    {
                        name: "服务",
                        routerViewName: "service",
                        icon: "folder",
                    },
                    {
                        name: "搜索",
                        routerViewName: "search",
                        icon: "search",
                    },
                    {
                        name: "我的",
                        routerViewName: "center",
                        icon: "user",
                    },
                ],

                scrollTop: 0
            };
        },
        mounted () {
            window.addEventListener('scroll', this.handleScroll, true)
            console.log(this.scrollTop);
        },
        methods: {
            menuSelect(current) {
                console.log(current);
                this.activeIndex = current;
            },
            handleScroll () {
                this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            },
        },
        destroyed () {
            // 离开该页面需要移除这个监听的事件，不然会报错
            window.removeEventListener('scroll', this.handleScroll)
        },
        watch:{
            scrollTop(){
                console.log(this.scrollTop);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .tabs-menu-area {
        height: 50px;
        box-shadow: 0 7px 8px 4px #888888;
        z-index: 10000;
        position: relative;

        > .menu-item {
            justify-content: center;
            align-items: center;

            &.active {
                border-bottom: 2px solid #409eff;
                color: #409eff;
            }

            > i {
                font-size: 22px;
                margin-bottom: 3px;
            }

            > .menu-title {
                font-size: 10px;
            }
        }
    }
</style>