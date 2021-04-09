const state = () => ({
    animation: null,
    height: null,
});

const getters = {
    getAnimation: (state) => {
        return state.animation;
    },
    getHeight: (state) => {
        return state.height.toString() + 'px';
    }
};

const mutations = {
    setAnimation(state, animation) {
        state.animation = animation
    },
    setHeight(state, height) {
        state.height = height;
    },
};

export default {
    state,
    getters,
    mutations
}