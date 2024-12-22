'use client'

import { useCallback, useEffect, useState } from 'react'

import Webcam from 'react-webcam'

import { Button } from '@/components/ui/button'

export default function Page() {
  const [deviceId, setDeviceId] = useState({})
  const [devices, setDevices] = useState([])

  // const handleDevices = useCallback(
  //   // @ts-ignore
  //   (mediaDevices) =>
  //     // @ts-ignore
  //     setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput')),
  //   [setDevices],
  // )
  //
  // useEffect(() => {
  //   navigator.mediaDevices.enumerateDevices().then(handleDevices)
  // }, [handleDevices])

  const videoConstraints = {
    facingMode: 'user',
  }

  const handleClick = () => {
    if (videoConstraints.facingMode === 'user') {
      videoConstraints.facingMode = 'environment'
    } else {
      videoConstraints.facingMode = 'user'
    }
  }

  return (
    <div className='p-4 flex flex-col  gap-4 mt-10'>
      <Webcam
        audio={false}
        videoConstraints={videoConstraints}
      />
      <Button onClick={handleClick}>Change</Button>
    </div>
  )
}
