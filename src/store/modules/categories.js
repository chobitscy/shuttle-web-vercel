const state = () => ({
    categories: []
})

const getters = {
    getCategories: (state) => (id) => {
        return state.categories.filter(category => category.serviceId === id)
    },
    categoriesCache: (state) => (id) => {
        for (let category of state.categories) {
            if (category.serviceId === id) return true
        }
        return false
    }
};

const mutations = {
    setCategories(state, categories) {
        state.categories.push(...categories)
    },
    clearCategories(state){
        state.categories = [];
    }
};

export default {
    state,
    getters,
    mutations
}