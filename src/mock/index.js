const mock = {}

const products = [
    {
        'id': 1,
        'image': 'https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-noodles-vegetables-egg-819x1024.jpg',
        'name': '套餐一',
        'shop': '套餐',
        'rate': 5,
        'sales': 0,
        'price': 1000,
        'sid': 1
    },
    {
        'id': 2,
        'image': 'https://www.foodiesfeed.com/wp-content/uploads/2021/01/fried-egg-and-guacamole-sandwiches-819x1024.jpg',
        'name': '套餐二',
        'shop': '套餐',
        'rate': 5,
        'sales': 0,
        'price': 1000,
        'sid': 1
    },
    {
        'id': 3,
        'image': 'https://www.foodiesfeed.com/wp-content/uploads/2018/12/green-salad-with-hemp-seeds.jpg',
        'name': '套餐三',
        'shop': '套餐',
        'rate': 5,
        'sales': 0,
        'price': 1000,
        'sid': 1
    },
]

const stores = [
    {
        'id': 1,
        'image': 'https://www.foodiesfeed.com/wp-content/uploads/2021/01/korean-spicy-seafood-soup-with-king-prawns-from-top-view-768x512.jpg',
        'name': '套餐',
        'service': '外卖',
        'rate': 2,
        'sales': 6,
        'price': 10,
        'category': '一食堂',
        'sid': 1
    },
    {
        'id': 2,
        'image': 'https://www.foodiesfeed.com/wp-content/uploads/2021/01/hot-shakshuka-819x1024.jpg',
        'name': '面馆',
        'service': '外卖',
        'rate': 1,
        'sales': 5,
        'price': 10,
        'category': '二食堂',
        'sid': 1
    },
    {
        'id': 3,
        'image': 'https://www.foodiesfeed.com/wp-content/uploads/2020/08/omelette-with-freshly-baked-pastry-in-a-cafe-1-768x576.jpg',
        'name': '米线',
        'service': '外卖',
        'rate': 5,
        'sales': 1,
        'price': 10,
        'category': '三食堂',
        'sid': 1
    },
    {
        'id': 4,
        'image': 'https://www.foodiesfeed.com/wp-content/uploads/2021/01/korean-spicy-seafood-soup-with-king-prawns-from-top-view-768x512.jpg',
        'name': '套餐1',
        'service': '外卖',
        'rate': 2,
        'sales': 6,
        'price': 10,
        'category': '一食堂',
        'sid': 2
    },
    {
        'id': 5,
        'image': 'https://www.foodiesfeed.com/wp-content/uploads/2021/01/hot-shakshuka-819x1024.jpg',
        'name': '面馆1',
        'service': '外卖',
        'rate': 1,
        'sales': 5,
        'price': 10,
        'category': '二食堂',
        'sid': 2
    },
    {
        'id': 6,
        'image': 'https://www.foodiesfeed.com/wp-content/uploads/2020/08/omelette-with-freshly-baked-pastry-in-a-cafe-1-768x576.jpg',
        'name': '米线1',
        'service': '外卖',
        'rate': 5,
        'sales': 1,
        'price': 10,
        'category': '三食堂',
        'sid': 2
    },
    {
        'id': 7,
        'image': 'https://www.foodiesfeed.com/wp-content/uploads/2021/01/korean-spicy-seafood-soup-with-king-prawns-from-top-view-768x512.jpg',
        'name': '套餐3',
        'service': '外卖',
        'rate': 2,
        'sales': 6,
        'price': 10,
        'category': '一食堂',
        'sid': 3
    },
    {
        'id': 8,
        'image': 'https://www.foodiesfeed.com/wp-content/uploads/2021/01/hot-shakshuka-819x1024.jpg',
        'name': '面馆2',
        'service': '外卖',
        'rate': 1,
        'sales': 5,
        'price': 10,
        'category': '二食堂',
        'sid': 3
    },
    {
        'id': 9,
        'image': 'https://www.foodiesfeed.com/wp-content/uploads/2020/08/omelette-with-freshly-baked-pastry-in-a-cafe-1-768x576.jpg',
        'name': '米线2',
        'service': '外卖',
        'rate': 5,
        'sales': 1,
        'price': 10,
        'category': '三食堂',
        'sid': 3
    }
]

const orders = [{
    id: 1,
    product: '套餐一',
    service: '外卖',
    shop: '套餐',
    date: '2016-05-02',
    status: '-1',
    address: 'test'
}, {
    id: 2,
    product: '套餐一',
    service: '外卖',
    shop: '套餐',
    date: '2016-05-02',
    status: '0',
    address: 'test'
}, {
    id: 3,
    product: '套餐一',
    service: '外卖',
    shop: '套餐',
    date: '2016-05-02',
    status: '1',
    address: 'test'
}]

// 服务
mock.services = function () {
    return [
        {'id': 1, 'name': '外卖', 'color': '#51A8DD', 'icon': 'el-icon-shopping-bag-2'},
        {'id': 2, 'name': '打印', 'color': '#86C166', 'icon': 'el-icon-printer'},
        {'id': 3, 'name': '超市', 'color': '#8B81C3', 'icon': 'el-icon-shopping-cart-2'},
        {'id': 4, 'name': '快递', 'color': 'rgb(245 108 108 / 0.85)', 'icon': 'el-icon-box'},
        {'id': 5, 'name': '跑腿', 'color': '#F9BF45', 'icon': 'el-icon-position'},
        {'id': 6, 'name': '其他', 'color': '#DC9FB4', 'icon': 'el-icon-user'},
    ]
}

// 轮播图
mock.carouselImage = function () {
    return [
        'https://www.foodiesfeed.com/wp-content/uploads/2017/05/juicy-burger-in-a-vibrant-interior.jpg',
        'https://www.foodiesfeed.com/wp-content/uploads/2019/02/messy-pizza-on-a-black-table-768x512.jpg',
        'https://www.foodiesfeed.com/wp-content/uploads/2019/06/beautiful-vibrant-shot-of-traditional-korean-meals-768x512.jpg'
    ]
}

// 产品
mock.product = function (sid) {
    return products.filter(product => product.sid == sid)
}

// 搜索
mock.search = function (keywords) {
    if (keywords != '套餐一' & keywords != '套餐二' & keywords != '套餐三') return []
    return products.filter(product => product.name == keywords)
}

// 商店
mock.stores = function (sid) {
    return stores.filter(store => store.sid == sid)
}

mock.getStores = function(){
    return stores
}

mock.category = function (serviceId) {
    let categories = [{
        'id': 1,
        'categories': ['一食堂', '二食堂', '三食堂']
    }, {
        'id': 2,
        'categories': ['宿舍', '门市'],
    }, {
        'id': 3,
        'categories': ['校内', '校外']
    }, {
        'id': 4,
        'categories': []
    }, {
        'id': 5,
        'categories': []
    }, {
        'id': 6,
        'categories': []
    }
    ]
    return categories.filter(category => category.id == serviceId)
}

// 订单
mock.order = function () {
    return orders
}

// 接单（全部订单）
mock.receive = function () {
    return orders.filter(order => order.status = -1)
}

// 接单（用户已接单、已完成）
mock.received = function () {
    console.log(orders)
    return [{
        id: 1,
        product: '套餐一',
        service: '外卖',
        shop: '套餐',
        date: '2016-05-02',
        status: '0',
        address: 'test',
    }, {
        id: 2,
        product: '套餐一',
        service: '外卖',
        shop: '套餐',
        date: '2016-05-02',
        status: '0',
        address: 'test',
    }, {
        id: 3,
        product: '套餐一',
        service: '外卖',
        shop: '套餐',
        date: '2016-05-02',
        status: '1',
        address: 'test',
    }]
}

export default mock