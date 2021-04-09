const externals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios',
    'element-ui':'ELEMENT',
    'mescroll':'mescroll',
    'qs.js':'qs',
    'moment':'moment'
};
const cdn = {
    css: [
        'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
    ],
    js: [
        'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
        'https://cdn.jsdelivr.net/npm/vue-router@3.5.1/dist/vue-router.min.js',
        'https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
        'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
        'https://unpkg.com/element-ui/lib/index.js',
        'https://unpkg.com/mescroll.js@1.4.1/mescroll.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/qs/6.9.6/qs.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment-with-locales.min.js'
    ]
};

const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {

    chainWebpack: config => {
        // config
        //     .plugin('webpack-bundle-analyzer')
        //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
        config.plugin('html').tap(args => {
            args[0].cdn = cdn;
            return args
        });
        // 移除 prefetch 插件
        config.plugins.delete('prefetch');
        // 移除 preload 插件
        config.plugins.delete('preload');
    },

    configureWebpack: () => {
        return {
            externals: externals,
            plugins: [
                //gzip压缩
                new CompressionPlugin({
                    test: /\.js∣¨E92E.html|\.html∣¨E92E.html|.\css/, //匹配文件名
                    threshold: 10240, //对超过10k的数据压缩
                    deleteOriginalAssets: false //不删除源文件
                })
            ],
            performance: {
                hints: false
            }
        };
    },

    devServer: {
        host: '0.0.0.0',
        proxy: {
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            "/api": {
                target: process.env.target,
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ''
                }
            }
        },
    }

};