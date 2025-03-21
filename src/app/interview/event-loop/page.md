# Event Loop

下面代码运行结果是什么

<details>
  <summary>题目1</summary>
  
```js
const first = () =>
  new Promise((resolve, reject) => {
    console.log(3)
    let p = new Promise((resolve, reject) => {
      console.log(7)
      setTimeout(() => {
        console.log(1)
      }, 0)
      setTimeout(() => {
        console.log(2)
        resolve(3)
      }, 0)
      resolve(4)
    })
    resolve(2)
    p.then((arg) => {
      console.log(arg, 5)
    })
    setTimeout(() => {
      console.log(6)
    }, 0)
  })
first().then((arg) => {
  console.log(arg, 7)
  setTimeout(() => {
    console.log(8)
  }, 0)
})
setTimeout(() => {
  console.log(9)
}, 0)
console.log(10)
```

<details>
  <summary>答案</summary>

```
3
7
10
4 5
2 7
1
2
6
9
8
```

  </details>

</details>

<details>
  <summary>题目2</summary>

```js
const async1 = async () => {
  console.log('async1')
  setTimeout(() => {
    console.log('timer1')
  }, 2000)
  await new Promise((resolve) => {
    console.log('promise1')
  })
  console.log('async1 end')
  return 'async1 success'
}
console.log('script start')
async1().then((res) => console.log(res))
console.log('script end')
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then((res) => console.log(res))
setTimeout(() => {
  console.log('timer2')
}, 1000)
```

<details>
  <summary>答案</summary>

```
script start
async1
promise1
script end
1
timer2
timer1
```

</details>

</details>

<details>
  <summary>题目3</summary>

```js
async function testSometing() {
  console.log('执行testSometing')
  return 'testSometing'
}

async function testAsync() {
  console.log('执行testAsync')
  return Promise.resolve('hello async')
}

async function test() {
  console.log('test start...')
  const v1 = await testSometing()
  console.log(v1)
  const v2 = await testAsync()
  console.log(v2)
  console.log(v1, v2)
}

test()

var promise = new Promise((resolve) => {
  console.log('promise start...')
  resolve('promise')
})
promise.then((val) => console.log(val))

console.log('test end...')
```

<details>
  <summary>答案</summary>

```
test start...
执行testSometing
promise start...
test end...
testSometing
执行testAsync
promise
hello async
testSometing hello async
```

</details>
</details>

<details>
<summary>题目4</summary>

```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(function () {
  console.log('setTimeout')
}, 0)

async1()

new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})
console.log('script end')
```

<details>
<summary>题目</summary>

```
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
```

</details>
</details>
<details>
<summary>题目5</summary>

```js
Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log)
```

<details>
  <summary>答案</summary>

```
1
```

在 JavaScript 的 Promise 链式调用中，.then() 方法的参数需要是函数。如果传入非函数值（如数字、对象等），会被静默忽略，直接传递前一步的值

```js
Promise.resolve(1)
  .then(2) // 忽略非函数参数，直接传递值 1
  .then(Promise.resolve(3)) // 忽略非函数参数，继续传递值 1
  .then(console.log) // 输出 1
```

</details>
</details>
