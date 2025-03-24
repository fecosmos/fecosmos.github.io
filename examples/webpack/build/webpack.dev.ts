import { Configuration } from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.config'

const devConfig: Configuration = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: process.env.PORT ? process.env.PORT : 8080,
    static: './dist',
  },
})
export default devConfig
