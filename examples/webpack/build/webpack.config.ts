import type { Configuration } from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import { DefinePlugin, ProgressPlugin } from 'webpack'
import 'webpack-dev-server'
import dotenv from 'dotenv'
import fs from 'fs'
import ESLintPlugin from 'eslint-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
const isDev = process.env.NODE_ENV === 'development'

const envFiles = [
  path.resolve(__dirname, '../.env'), // 基础配置
  path.resolve(__dirname, isDev ? '../.env.development' : '../.env.production'), // 环境特定配置
  path.resolve(__dirname, '../.env.local'), // 本地覆盖配置
]
// 合并环境变量
const env = envFiles.reduce((acc, envFile) => {
  if (fs.existsSync(envFile)) {
    // 检查文件是否存在
    const result = dotenv.config({ path: envFile })
    if (result.error) {
      //
    } else {
      Object.assign(acc, result.parsed) // 合并变量
    }
  } else {
    console.warn(`File not found: ${envFile}`) // 文件不存在时提示
  }
  return acc
}, {})

const config: Configuration = {
  entry: {
    import: path.resolve(__dirname, '../src/main.tsx'),
  },
  output: {
    filename: 'js/[name][contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  mode: isDev ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[hash][ext]', // 指定输出路径
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new VueLoaderPlugin(),
    new ProgressPlugin(),
    new DefinePlugin({
      'process.env': JSON.stringify(env), // 注入环境变量
    }),
    new ESLintPlugin({}),
  ],
}

export default config
