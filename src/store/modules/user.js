const state = () => ({
    userInfo: JSON.parse(localStorage.getItem('userInfo'))
});

const getters = {
    getUserInfo: (state) => {
        return state.userInfo;
    }
};

const mutations = {
    changeScore(state, score) {
        state.userInfo.score = score;
    }
}

export default {
    state,
    getters,
    mutations
}