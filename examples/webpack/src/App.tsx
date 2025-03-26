import { useState } from 'react'
import Logo from './assets/react.svg'
export default function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div>count:{count}</div>
      <img src={Logo} />
      <button onClick={() => setCount(count + 1)}>+1</button>
    </>
  )
}
