import common from "@/utils/commont";

const state = () => ({
    cartMap: new Map(JSON.parse(localStorage.getItem('cart'))),
    count: common.getCartCount()
});

const getters = {
    getCartMap: state => {
        return state.cartMap
    },
    getCount: state => {
        return state.count
    }
};

const mutations = {
    addCart(state, product) {
        state.count++;
        let cartMap = state.cartMap;
        let id = product.id;
        let data = product.data;
        if (cartMap.has(id)) {
            let product = cartMap.get(id);
            product.count = product.count + 1;
            cartMap.set(id, product)
        } else {
            cartMap.set(id, data)
        }
        state.cartMap = cartMap
    },
    changeCart(state, payload) {
        state.count += payload.currentValue - payload.oldValue;
        if (state.cartMap.get(payload.id).count === 0) state.cartMap.delete(payload.id)
    },
    clear(state) {
        state.count = 0;
        state.cartMap.clear()
    },
    changeFile(state,payload) {
        state.cartMap.forEach(function (value) {
            if (value.extend.value != null) {
                if (value.extend.value.name === payload.fileName) {
                    value.extend.value.name = payload.curFileName;
                    value.extend.value.url = payload.url;
                }
            }
        })
    }
};

export default {
    state,
    getters,
    mutations
}