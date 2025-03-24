# 使用 webpack 搭建项目
## 起步
首先安装 webpack 依赖
```bach
npm init -y
pnpm install webpack webpack-cli -D
```
我们要使用 ts 开发项目
```bash
tsc --init
```
配置打包命令，同时需要创建一个 `webpack.config.ts` 文件
```json
{
  "scripts": {
    "build": "webpack --config webpack.config.ts"
  }
}
```
```js

```
```ts
import type { Configuration } from 'webpack'
import path from 'path'

const config: Configuration = {
  entry: './src/main.ts',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:  path.resolve(__dirname, '../public/index.html')
    })
  ]
}

export default config
```
webpack 默认不支持直接使用 ts 格式的配置文件，需要安装 ts-node
```bash
pnpm i ts-node -D
```