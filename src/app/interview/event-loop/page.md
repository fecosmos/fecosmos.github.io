# Event Loop

下面代码运行结果是什么

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
