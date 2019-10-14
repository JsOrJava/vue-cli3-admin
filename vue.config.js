const path = require('path')
const resolve = dir => path.join(__dirname, dir)

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // webpack打包体积优化 - 性能分析

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin") // 它能够测量出在你的构建过程中，每一个 Loader 和 Plugin 的执行时长
const smp = new SpeedMeasurePlugin()

const ProgressBarPlugin = require('progress-bar-webpack-plugin') // 显示构建进度

const WebpackBuildNotifierPlugin = require('webpack-build-notifier') // 构建成功通知

module.exports = {
    //基本路径
    //baseUrl: './',//vue-cli3.3以下版本使用
    publicPath:'./',//vue-cli3.3+新版本使用
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,

    devServer: { // 代理
        host: '0.0.0.0',
        port: 8000, // 端口号
        https: false, // https:{type:Boolean}
        open: true, // 配置自动启动浏览器  http://172.16.1.12:7071/rest/mcdPhoneBar/
        hotOnly: true, // 热更新
        proxy: { // 配置服务器代理
            '/api/*': {
                target: 'http://luxury-dev.tianli.shop',
                changeOrigin: true,
                // ws: true,//websocket支持
                secure: false
            }
        }
    },

    //调整 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
    // configureWebpack: {
    //     resolve: {
    //         alias: {
    //             '@': resolve('src')
    //         }
    //     },
    //     plugins: [
    //         new BundleAnalyzerPlugin()
    //     ]
    // },
    configureWebpack: smp.wrap({
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        plugins: [
            new BundleAnalyzerPlugin(),
            new ProgressBarPlugin(),
            new WebpackBuildNotifierPlugin({
                title: "My Project Webpack Build",
                logo: path.resolve("@/assets/logo.png"),
                suppressSuccess: true
            })
        ],
        performance: { // 性能
            hints:'warning',
            // 入口起点的最大体积
            maxEntrypointSize: 50000000, // 字节
            // 生成文件的最大体积
            maxAssetSize: 30000000,
            // 只给出 js 文件的性能提示
            assetFilter: function(assetFilename) {
                return assetFilename.endsWith('.js') || assetFilename.endsWith('.css') || assetFilename.endsWith('.png')
            }
        }
    }),

    // 第三方插件配置 https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader
    pluginOptions: {
        webpackBundleAnalyzer: {
            openAnalyzer: false
        },
        i18n: {
            locale: 'ja',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: true
        }
    },

    //对内部的 webpack 配置进行更细粒度的修改 https://github.com/neutrinojs/webpack-chain see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: config => {
        config.plugins.delete('prefetch')
    },

    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `.scss` 这个文件
                // data: `@import "@/style/base.scss";`
            }

        }
    }
}
