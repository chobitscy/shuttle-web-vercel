import Vue from 'vue'

import Vuex from 'vuex'

import cart from '@/store/modules/cart'
import service from '@/store/modules/sevice'
import orders from '@/store/modules/orders'
import stores from '@/store/modules/stores'
import categories from '@/store/modules/categories'
import products from '@/store/modules/product'
import setting from '@/store/modules/setting'
import user from "@/store/modules/user";
import popular from "@/store/modules/popular";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        cart,
        service,
        orders,
        stores,
        categories,
        products,
        setting,
        user,
        popular
    },
})