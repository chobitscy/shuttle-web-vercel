const state = () => ({
    stores: [],
    products: []
});

const getters = {
    getPopularStores: (state) => {
        return state.stores;
    },
    getPopularProducts: (state) => {
        return state.products;
    }
};

const mutations = {
    setPopularStores(state, stores) {
        state.stores = stores;
    },
    setPopularProducts(state, products) {
        state.products = products;
    }
};

export default {
    state,
    getters,
    mutations
}