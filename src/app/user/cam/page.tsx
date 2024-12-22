'use client'

import { useState } from 'react'

import Webcam from "react-webcam";

export default function Page() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Webcam
      />
      <p>You've clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
