import { Configuration } from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.config'
import reactConfig from './webpack.react'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

const config = merge(baseConfig, reactConfig)

export const prodConfig: Configuration = merge(config, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true,
          },
          format: {
            comments: false,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css', // 输出文件名
    }),
    new CssMinimizerPlugin(),
  ],
})
export default prodConfig
