'use client'

import fs from 'fs'

import { useCallback, useEffect, useRef, useState } from 'react'

import { useUploadThing } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'
import Webcam from 'react-webcam'

import { Button } from '@/components/ui/button'

interface VideoConstraints {
  facingMode: string | { exact: string }
}

export default function Page() {
  const cameraRef = useRef(null)

  const [imgSrc, setImgSrc] = useState(null)
  const [videoConstraints, setVideoConstraints] = useState<VideoConstraints>({
    facingMode: 'user',
  })

  const { startUpload, routeConfig } = useUploadThing('imageUploader', {
    onClientUploadComplete: () => {
      alert('uploaded successfully!')
    },
    onUploadError: () => {
      alert('error occurred while uploading')
    },
    onUploadBegin: () => {
      console.log('upload has begun for')
    },
  })

  const handleClick = () => {
    if (videoConstraints.facingMode === 'user') {
      setVideoConstraints({
        facingMode: { exact: 'environment' },
      })
    } else {
      setVideoConstraints({
        facingMode: 'user',
      })
    }
  }

  const capture = useCallback(async () => {
    // @ts-ignore
    setImgSrc(cameraRef.current.getScreenshot())
    // @ts-ignore
    const screenshot = cameraRef.current.getScreenshot()

    if (screenshot) {
      // Convert base64 to a Blob
      const base64Data = screenshot.split(',')[1]
      const blob = base64ToBlob(base64Data, 'image/png')

      // Create a file from the Blob
      const file = new File([blob], 'screenshot.png', { type: 'image/png' })

      startUpload([file])

      console.log('File created:', file)

      // Optionally upload or save the file
      // uploadFile(file);
    }
  }, [cameraRef])

  // Helper function to convert base64 to Blob
  // @ts-ignore
  const base64ToBlob = (base64, mimeType) => {
    const byteString = atob(base64)
    const arrayBuffer = new ArrayBuffer(byteString.length)
    const uint8Array = new Uint8Array(arrayBuffer)

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i)
    }

    return new Blob([uint8Array], { type: mimeType })
  }
  return (
    <div className='p-4 flex flex-col gap-4 mt-10'>
      {imgSrc && (
        <img
          src={imgSrc}
          alt='img'
          className='w-full h-full'
        />
      )}

      <Webcam
        className={cn(imgSrc ? 'hidden' : '')}
        ref={cameraRef}
        screenshotFormat='image/jpeg'
        audio={false}
        videoConstraints={videoConstraints}
      />
      <Button onClick={capture}>Capture</Button>
      <Button onClick={handleClick}>Change</Button>
      <Button onClick={() => setImgSrc(null)}>Clear</Button>
    </div>
  )
}
