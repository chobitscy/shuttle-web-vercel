const state = () => ({
    services: JSON.parse(sessionStorage.getItem('serviceList'))
});

const getters = {
    getService: (state) => {
        if(state.services === null) return [];
        return state.services
    },
    getServiceById: (state) => (serviceId) =>{
        return state.services.find(service => service.id === serviceId);
    }
};

const mutations = {
    setServices(state, services) {
        state.services = services;
    }
};

export default {
    state,
    getters,
    mutations
}