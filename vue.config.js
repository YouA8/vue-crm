/*
 * @Description:
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2022-07-13 17:41:20
 * @LastEditors: hxl
 * @LastEditTime: 2022-07-14 17:17:34
 */

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  // 静态文件目录
  publicPath: './',
  // 去除生产环境sourceMap map用于对错误进行定位，方便开发（生产环境不需要）
  productionSourceMap: !isProduction,
  // 打包后生成文件路径
  outputDir: 'dist',
  // 设置放置打包生成的静态资源的目录
  assetsDir: 'static',
  // 是否包含运行时编译器的Vue构建版本
  runtimeCompiler: false,
  // 去除console.log()和注释
  configureWebpack: config => {
    const plugins = []
    if (isProduction) {
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false // 去除注释
            },
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] // 去除控制台日志
            }
          }
        })
      )
    }
  }
  // nodejs版本过低，npm安装版本错误，无法使用cnpm安装image-webpack-loader
  /*
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true })
  }
  */
}
