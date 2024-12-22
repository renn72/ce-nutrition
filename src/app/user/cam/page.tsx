'use client'

import { useCallback, useEffect, useState } from 'react'

import Webcam from 'react-webcam'

export default function Page() {
  const [deviceId, setDeviceId] = useState({})
  const [devices, setDevices] = useState([])

  const handleDevices = useCallback(
    // @ts-ignore
    (mediaDevices) =>
      // @ts-ignore
      setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput')),
    [setDevices],
  )

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices)
  }, [handleDevices])

  return (
    <div className='p-4'>
      {devices.map((device, key) => (
        <div>
          <Webcam
            audio={false}
            // @ts-ignore
            videoConstraints={{ deviceId: device.deviceId }}
          />
          {
            // @ts-ignore
            device.label || `Device ${key + 1}`
          }
        </div>
      ))}
    </div>
  )
}
