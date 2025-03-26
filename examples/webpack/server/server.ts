// import express from 'express'
// import path from 'path'
// import { render } from '../src/main.server' // 注意保持路径正确

// const app = express()

// // 发送静态文件
// app.use('/dist', express.static(path.join(__dirname, 'dist')))

// app.get('*', async (req, res) => {
//   try {
//     const { html } = await render()

//     // 注入状态到 HTML
//     // const state = store.state
//     // const htmlWithState = html.replace(
//     //   '</head>',
//     // //   `<script>window.__INITIAL_STATE__=${JSON.stringify(state)}</script></head>`,
//     // )
//     const htmlWithState = html
//     res.send(`
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>SSR App</title>
//         </head>
//         <body>
//           <div id="app">${htmlWithState}</div>
//           <script src="/dist/client.js"></script>
//         </body>
//       </html>
//     `)
//   } catch (error) {
//     console.error('SSR Error:', error)
//     res.status(500).send('Server Error')
//   }
// })

// app.listen(3000, () => {
//   console.log('Server running on port 3000')
// })
