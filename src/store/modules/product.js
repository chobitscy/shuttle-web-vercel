const state = () => ({
    products: []
})

const getters = {
    getProducts: (state) => (storeId) => {
        return state.products.filter(product => product.storeId == storeId)
    },
    productsCache: (state) => (storeId) => {
        for (let product of state.products) {
            if (product.storeId == storeId) return true
        }
        return false
    }
}

const mutations = {
    setProducts(state, products) {
        state.products.push(...products)
    }
}

export default {
    state,
    getters,
    mutations
}