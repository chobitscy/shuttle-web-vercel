import common from "@/utils/commont";

const state = () => ({
    orders: [],
    receive: [],
    completed: [],
    current: null
});

const getters = {
    getOrders: (state) => (serviceId) => {
        if (serviceId === 0) {
            return state.orders;
        } else {
            return state.orders.filter(order => order.serviceId === serviceId);
        }
    },
    getReceive: state => {
        return state.receive;
    },
    getCompleted: state => {
        return state.completed;
    },
    getCurrent: state => {
        return state.current;
    }
};

const mutations = {
    updateOrders(state, order) {
        state.orders.push(order);
    },
    setOrders(state, orders) {
        state.orders.push(...orders);
    },
    receive(state, order) {
        state.orders = common.arrayRemove(state.orders, order);
        order.status = 0;
        state.receive.push(order);
    },
    setReceive(state, receive) {
        state.receive = receive;
    },
    setCurrent(state, order) {
        state.current = order;
    },
    clearOrders(state) {
        state.orders = []
    },
    setCompleted(state, completed) {
        state.completed = completed;
    },
    loadCompleted(state, completed) {

        state.completed.push(...completed);
    },
    loadReceive(state, receive) {
        state.receive.push(...receive)
    },
    loadOrders(state, orders) {
        state.orders.push(...orders)
    }
};

export default {
    state,
    getters,
    mutations
}