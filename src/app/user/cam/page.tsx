'use client'

import '@tensorflow/tfjs-backend-webgl'
import '@tensorflow/tfjs-backend-webgpu'

import { useCallback, useEffect, useRef, useState } from 'react'

import { drawKeypoints, drawSkeleton } from '@/lib/move-net-utils'
import { useUploadThing } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'
import * as poseDetection from '@tensorflow-models/pose-detection'
import * as tf from '@tensorflow/tfjs-core'
import Webcam from 'react-webcam'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface VideoConstraints {
  facingMode: string | { exact: string }
}
type CustomVideoRef = {
  video: HTMLVideoElement | null;
};
const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};
export default function Page() {
  const { width, height } = useWindowDimensions();
  const cameraRef = useRef<Webcam | null>(null)
  const canvasRef = useRef(null)

  const [caputured, setCaptured] = useState(false)
  const [updateInterval, setUpdateInterval] = useState(100)

  const [imgSrc, setImgSrc] = useState(null)
  const [videoConstraints, setVideoConstraints] = useState<VideoConstraints>({
    facingMode: 'user',
  })

  const loadModel = async () => {
    const model = poseDetection.SupportedModels.MoveNet
    const detector = await poseDetection.createDetector(model)
  }

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

  const runMovenet = async () => {
    await tf.ready()
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        // @ts-ignore
        // inputResolution: { width: 640, height: 480 },
        scale: 0.8,
      },
    )
    setInterval(() => {
      detect(detector)
    }, updateInterval)
  }

  // @ts-ignore
  const detect = async (detector) => {
    if (
      typeof cameraRef.current !== 'undefined' &&
      cameraRef.current !== null &&
      cameraRef.current.video?.readyState === 4
    ) {
      // Get Video Properties
      const video = cameraRef.current.video
      const videoWidth = cameraRef.current.video.videoWidth
      const videoHeight = cameraRef.current.video.videoHeight

      console.log('videoWidth', videoWidth)
      console.log('videoHeight', videoHeight)

      // Set video width
      // cameraRef.current.video.width = videoWidth
      // cameraRef.current.video.height = videoHeight

      // Make Detections

      // const image = tf.image.cropAndResize(tf.expandDims(video, 0), 256, 256)

      const pose = await detector.estimatePoses(video)
      // console.log(pose);

      if (pose && pose[0] && pose[0].keypoints) {
        drawCanvas(pose[0], video, videoWidth, videoHeight, canvasRef)
        // console.log(processinput(pose[0]['keypoints']));
        // if (true || isTorsoVisible(pose[0].keypoints))
        //   predictPose(processinput(pose[0].keypoints))
        // else {
        //   console.log('Full Body Not Visible')
        // }
      }
    }
  }

  // @ts-ignore
  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext('2d')
    canvas.current.width = videoWidth
    canvas.current.height = videoHeight
    ctx.translate(videoWidth, 0)
    ctx.scale(-1, 1)
    if (pose) {
      drawKeypoints(pose['keypoints'], ctx)
      drawSkeleton(pose['keypoints'], ctx)
    }
  }

  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  console.log('screenWidth', screenWidth)
  console.log('screenHeight', screenHeight)
  const canvasHeight = cameraRef.current?.video?.videoHeight
  console.log('screenWidth', canvasHeight)

  if (!screenWidth || !screenHeight) return null
  // runMovenet()

  return (
    <div className='p-4 flex flex-col gap-4 mt-16 w-screen h-full relative'>
      <Webcam
        ref={cameraRef}
        screenshotFormat='image/jpeg'
        audio={false}
        mirrored
        videoConstraints={videoConstraints}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          top: 36,
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 9,
          width: width,
          // height: 'auto',
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          top: 28,
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 9,
          width: screenWidth,
          // height: 500,
        }}
      />
      <div
        className='flex gap-2 items-center
        absolute top-0
        '
      >
        <Button
          className='py-1 h-6'
          size='sm'
          onClick={() => runMovenet()}
        >
          Run
        </Button>
        <Input
          placeholder='Update Interval'
          className='h-6'
          type='number'
          value={updateInterval}
          onChange={(e) => {
            setUpdateInterval(Number(e.target.value))
          }}
        />
      </div>
    </div>
  )
}
