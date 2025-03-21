# ES6

## 说下 `let`、`var` 和 `const` 区别

<details>
<summary>
答案
</summary>

`var`、 `let` 和 `const` 是声明变量的关键字

### 作用域

- var：
  - 函数作用域（function-scoped），在函数内声明，整个函数内有效。
  - 没有块级作用域（block scope），在 `if`、`for` 等块中声明的变量会泄漏到外部
  ```js
  if (true) {
    var x = 10
  }
  console.log(x) // 10（泄漏到全局作用域）
  ```
- `let` 和 `const`, 只在声明所在的块（如 {}）内有效。
  - 块级作用域
  ```js
  if (true) {
    let y = 20
    const z = 30
  }
  console.log(y) // 报错：y is not defined
  console.log(z) // 报错：z is not defined
  ```

### 变量提升

- `var`：
  - 变量声明会被提升到作用域顶部，但初始值为 `undefined`。
  - 在声明前访问会得到 `undefined`
  ```js
  console.log(a) // undefined
  var a = 5
  ```
- `let` 和 `const`
  - 声明会被提升，但不会初始化，进入“暂时性死区”（TDZ）。
  - 在声明前访问会报错。

```js
console.log(b) // 报错：Cannot access 'b' before initialization
let b = 10
```

### 重复声明

`var` 允许在同一作用域内重复声明

`let` 和 `const` 禁止重复声明，同一作用域内不可重复声明同名变量。

### 值的可变性

`var` 和 `let`：

- 声明的变量可以重新赋值
  `const`：
- 声明的是常量，不可重新赋值。
- 如果值是对象或数组，其内部属性或元素可以修改（不可变的是变量绑定，而非值本身）。

### 全局作用域下的行为

`var` 在全局作用域下声明的变量会成为全局对象（如 `window`）的属性。

```js
var h = 1
console.log(window.h) // 1
```

`let` 和 `const`：在全局作用域下声明的变量不会成为全局对象的属性。

```js
let i = 1
console.log(window.i) // undefined
```

### 最佳实践

- 默认使用 `const`：

  - 除非变量需要重新赋值，否则优先用 `const`，避免意外修改。
  - 需要重新赋值时用 `let`：如循环计数器、状态变量等。

- 避免使用 `var`：
  - 除非需要兼容旧代码或理解其特性。

`let` `const` 参考 https://es6.ruanyifeng.com/#docs/let

</details>
