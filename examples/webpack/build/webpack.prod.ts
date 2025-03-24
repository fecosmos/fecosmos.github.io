import { Configuration } from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.config'

export const prodConfig: Configuration = merge(baseConfig, {
  mode: 'production',
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },
})
export default prodConfig
