import axios from 'axios'
import {Loading, Message} from 'element-ui'
import router from '@/router/index'

import qs from "qs"

let loadingInstance = null;     // 加载全局的loading

const instance = axios.create({
    timeout: 10000, // 设置超时时间10s
    baseURL: '/api' //根据配置的反向代理去设置不同环境的baeUrl
});

// instance.defaults.headers.post['Content-Type'] = 'application/json'
// 统一设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 统一设置delete请求头
instance.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded';

let httpCode = {
    400: '请求参数错误',
    401: 'token过期, 请重新登录',
    403: '服务器拒绝本次访问',
    404: '请求资源未找到',
    500: '内部服务器错误',
    501: '服务器不支持该请求中使用的方法',
    502: '网关错误',
    504: '网关超时'
};

/** 添加请求拦截器 **/
instance.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem('token') || '';
    loadingInstance = Loading.service({       // 发起请求时加载全局loading，请求失败或有响应时会关闭
        spinner: 'fa fa-spinner fa-spin fa-3x fa-fw',
        text: '拼命加载中...'
    });
    return config
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error)
});

/** 添加响应拦截器  **/
instance.interceptors.response.use(response => {
    loadingInstance.close();
    if (response.data.message === 'token过期') {
        Message({
                message: 'token过期，请重新登录',
                type: 'error'
            });
        localStorage.removeItem('token');
        router.replace('/login').then();
    } else if (response.data.code === 1) {
        return Promise.resolve(response.data)
    } else {
        Message({
            message: response.data.message,
            type: 'error'
        })
    }
}, error => {
    loadingInstance.close();
    if (error.response) {
        // 根据请求失败的http状态码去给用户相应的提示
        let tips = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.message;
        Message({
            message: tips,
            type: 'error'
        });
        return Promise.reject(error)
    } else {
        Message({
            message: '请求超时, 请刷新重试',
            type: 'error'
        });
        return Promise.reject(new Error('请求超时, 请刷新重试'))
    }
});

/* 统一封装get请求 */
export const get = (url, params, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: 'get',
            url,
            params,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
};

/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
    if (config.headers != null) {
        data = JSON.stringify(data)
    } else {
        // 注意：由于后端接受类型为 application/x-www-form-urlencoded axios默认请类型为application/json 所以post传参要使用this.$qs.stringify()
        data = qs.stringify(data)
    }
    return new Promise((resolve, reject) => {
        instance({
            method: 'post',
            url,
            data,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
};

export const del = (url, data, config = {}) => {
    if (config.headers != null) {
        data = JSON.stringify(data)
    } else {
        // 注意：由于后端接受类型为 application/x-www-form-urlencoded axios默认请类型为application/json 所以post传参要使用this.$qs.stringify()
        data = qs.stringify(data)
    }
    return new Promise((resolve, reject) => {
        instance({
            method: 'delete',
            url,
            data,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
};