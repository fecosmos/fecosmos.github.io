# Webpack
## Webpack 中 loader 和 plugins 的区别

它们都是 webpack 功能的扩展点。

loader 是加载器，主要用于代码转换，比如 JS 代码降级，CSS 预编译、模块化等

plugins 是插件，webpack 打包流程中每个环节都提供了钩子函数，可以利用这些钩子函数参与到打包生命周期中，更改或增加 webpack 的某些功能，比如生成页面和 css 文件、压缩打包结果等
## 说一下 Webpack 中的几种 hash 的实现原理是什么？

* `hash`, 是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的 `hash` 值都会更改，并且全部文件都共用相同的 `hash` 值
* `chunkhash`, 每个打包过程单独的 `hash` 值，如果一个项目有多个 `entry`，则每个 `entry` 维护自己的 `chunkhash`。
* `contenthash`, 每个文件内容单独的 `hash` 值，它和打包结果文件内容有关，只要文件内容不变，`contenthash` 不变。

## webpack 中 tree shaking 的用途和原理是什么？

tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块系统中的静态结构特性，例如 import 和 export。这个术语和概念实际上是兴起于 ES2015 模块打包工具 rollup。

webpack 4 正式版本，扩展了这个检测能力，通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯的 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。

tree shaking的概念在1990年就提出了，但是直到ES6的ES6-style模块出现以后才真正被利用起来。这是因为tree shaking只能在静态modules下工作。ECMAScript 6 模块加载是静态的，因此整个依赖树可以被静态地推导出解析语法树。所以在ES6中使用tree shaking是非常容易的。而且，tree shaking不仅支持import/export级别，还支持statement(声明)级别。
## `package.json` 文件中的 `devDependencies` 和 `dependencies` 对象有什么区别？
前端项目的 `package.json` 文件中，`dependencies` 和 `devDependencies` 对象都用于指定项目所依赖的软件包，但它们在项目的开发和生产环境中的使用有所不同。
1. `dependencies`：是指定项目在生产环境中运行所需要的依赖项。
这些依赖项通常包括运行时需要的库、框架、工具等。
当你通过 `npm install` 或 `npm ci` 安装依赖时，默认会安装 `dependencies` 中的包。
这些依赖项会被打包和部署到生产环境中，因此它们对于项目的运行是必需的。
2. `devDependencies`： 是指定在开发过程中所需要的依赖项。
这些依赖项通常包括开发、测试、构建、部署等过程中所需的工具、库等。
例如，测试框架、构建工具、代码检查工具等通常属于 `devDependencies`。
当你在开发环境中使用 `npm install` 安装依赖时，只会安装 `dependencies` 中的包。要安装 `devDependencies` 中的包，你需要额外使用 `npm install --dev` 或 `npm install --only=dev` 等命令。
这些依赖项不会被打包到生产环境中，因为它们只在开发过程中需要，对于实际部署和运行项目并不需要。

总的来说，`dependencies` 中的依赖项是项目运行所必需的，而 `devDependencies` 中的依赖项则是在开发过程中需要的辅助工具和库。

