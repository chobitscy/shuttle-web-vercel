const state = () => ({
    orders: [],
    ws: null
})

const getters = {
    getNewOrders: (state) => {
        // var orders = [...state.orders];
        // // 清空数组
        // state.orders.splice(0); 
        // return orders;
        return state.orders;
    },
}

const mutations = {
    open(state, page) {
        if (!state.ws) {
            let ws = new WebSocket("ws://localhost:8081/ws");
            state.ws = ws;

            ws.onopen = () => {
                console.info("websocket open")
                page && page.$message({
                    type: 'success',
                    message: '订阅新订单',
                    duration: 2500
                });
            };

            ws.onmessage = (evt) => {
                var order = JSON.parse(evt.data);
                // 添加order到数组起始位置
                state.orders.unshift(order);
                console.log(order)
            };

            ws.onclose = () => {
                // 关闭 websocket
                console.error("websocket closed!")
            };
        }
    }
}

export default {
    state,
    getters,
    mutations
}