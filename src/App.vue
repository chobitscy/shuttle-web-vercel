<template>
    <transition :name="$store.getters.getAnimation">
        <keep-alive include="home_layout">
            <router-view class="app"></router-view>
        </keep-alive>
    </transition>
</template>

<script>

    export default {
        name: "App",
        created() {
            window.addEventListener('beforeunload', e => this.update(e));
            const height = localStorage.getItem('height');
            const value = height === null ? 50 : parseInt(height);
            this.$store.commit('setHeight', value);
            const animation = localStorage.getItem('animation');
            this.$store.commit('setAnimation', animation === null ? 'slide-fade' : animation);
        },
        methods: {
            // 刷新或关闭调用
            update() {
                let cartMap = this.$store.getters.getCartMap;
                if (cartMap.size == 0) localStorage.removeItem('cart');
                else localStorage.setItem('cart', JSON.stringify(Array.from(cartMap)));

                const order = this.$store.getters.getCurrent;
                if (order !== null)
                    sessionStorage.setItem('current', JSON.stringify(order));
            }
        },
        destroyed() {
            window.removeEventListener('beforeunload', e => this.update(e))
        }
    };
</script>

<style scoped>
    @import 'style/cover.css';
    @import 'style/animation.css';
    @import url('https://unpkg.com/element-ui/lib/theme-chalk/index.css');
</style>
