'use client'

import { useCallback, useRef, useState } from 'react'

import { formSchema } from '@/app/user/log/form'
import { useUploadThing } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'
import { CameraIcon, RefreshCw, SwitchCamera } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import Webcam from 'react-webcam'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface VideoConstraints {
  facingMode: string | { exact: string }
}

const Camera = ({ onUpload }: { onUpload: (url: string) => void }) => {
  const cameraRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)
  const [imgSrc, setImgSrc] = useState(null)
  const [videoConstraints, setVideoConstraints] = useState<VideoConstraints>({
    facingMode: 'user',
  })

  const { startUpload, routeConfig } = useUploadThing('imageUploader', {
    onClientUploadComplete: (e) => {
      console.log('onClientUploadComplete', e)
      const url = e?.[0]?.url
      // @ts-ignore
      onUpload(url)
      setIsOpen(false)
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

      // @ts-ignore

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
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant='accent'
          size='lg'
          className='flex items-center gap-2'
        >
          <CameraIcon size={20} />
          <span className=''>Use Camera</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='w-screen h-screen p-0 flex flex-col items-center justify-center'>
        <DialogTitle className='sr-only'>Use Camera</DialogTitle>
        <Webcam
          ref={cameraRef}
          screenshotFormat='image/jpeg'
          audio={false}
          videoConstraints={videoConstraints}
        />
        <div className='grid grid-cols-3 gap-4 w-full place-items-center'>
          <div />
          <div
            className='border-2 border-foreground rounded-full p-2'
          onClick={capture}>
            <div
            className='h-12 w-12 border-2 border-foreground bg-foreground rounded-full' />

          </div>
          <div
            className='border-2 border-foreground rounded-full p-2'
            onClick={handleClick}>
            <RefreshCw size={32} />
          </div>
        </div>
        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export { Camera }
