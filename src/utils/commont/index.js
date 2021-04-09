const common = {};

common.arrayRemove = function (arr, value) {
    return arr.filter(function (ele) {
        return ele !== value;
    });
};

common.changePrice = function (price) {
    return (price / 100).toFixed(1)
};

common.getCartCount = function () {
    let count = 0;
    new Map(JSON.parse(localStorage.getItem('cart'))).forEach(function (product) {
        count += product.count
    });
    return count
};

common.saveCart = function () {
    localStorage.setItem('cart', JSON.stringify(Array.from(this.$store.getters.getCartMap)))
};

common.getUserInfo = function () {
    return JSON.parse(localStorage.getItem('userInfo'))
};

common.getService = function () {
    return JSON.parse(sessionStorage.getItem('serviceList'))
};

common.getServiceById = function (serviceId) {
    const services = JSON.parse(sessionStorage.getItem('serviceList'));
    return services.find(service => service.id === serviceId);
}
export default common