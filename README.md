# shuttle前端

## 依赖

| Description | Version|
|  :----: | :----: |
| Vue.js | 2.6.11|
| Element UI | 2.15.0 |
| Vue Router | 3.5.1 |
| Vuex | 3.6.2 |
| axios | 0.21.1 |
| mescroll.js | 1.4.2 |
| moment.js | 2.29.1 |

## 效果

[![explore.th.png](https://img.loli.bj/images/2021/02/23/explore.th.png)](https://img.loli.bj/image/V5qP)
[![center.th.png](https://img.loli.bj/images/2021/02/23/center.th.png)](https://img.loli.bj/image/VopW)
[![store.th.png](https://img.loli.bj/images/2021/02/23/store.th.png)](https://img.loli.bj/image/VFJA)
[![cart.th.png](https://img.loli.bj/images/2021/02/23/cart.th.png)](https://img.loli.bj/image/V4zU)
[![order.th.png](https://img.loli.bj/images/2021/02/23/order.th.png)](https://img.loli.bj/image/VjdD)
[![detail.th.png](https://img.loli.bj/images/2021/02/23/detail.th.png)](https://img.loli.bj/image/VSOk)


## 必要文件
请在根目录下创建 `.env.local` 配置环境变量
```sh
# 反向代理目标ip
target=

# websocket 
VUE_APP_WS=

# 后台管理系统
VUE_APP_ADMIN=
```

## 部署

```sh
git clone https://github.com/TouwaErioer/shuttle-web.git

cd shuttle-web

# 构建docker镜像
docker build . -t shuttle-web

# 后台运行
docker run -d -p 80:80 shuttle-web
```

