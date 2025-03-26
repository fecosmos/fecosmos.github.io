import { Configuration } from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.config'
import reactConfig from './webpack.react'

const config = merge(baseConfig, reactConfig)
const devConfig: Configuration = merge(config, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: process.env.PORT ? process.env.PORT : 8080,
    static: './dist',
  },
})
export default devConfig
