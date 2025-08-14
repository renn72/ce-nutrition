'use client'

import { useEffect, useState } from 'react'

import { sendNotification, subscribeUser, unsubscribeUser } from '@/actions/pwa'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function urlBase64ToUint8Array(base64String: string) {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
	const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

	const rawData = window.atob(base64)
	const outputArray = new Uint8Array(rawData.length)

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i)
	}
	return outputArray
}

function PushNotificationManager() {
	const [isSupported, setIsSupported] = useState(false)
	const [subscription, setSubscription] = useState<PushSubscription | null>(
		null,
	)
	const [message, setMessage] = useState('')

	useEffect(() => {
		if ('serviceWorker' in navigator && 'PushManager' in window) {
			setIsSupported(true)
			registerServiceWorker()
		}
	}, [])

	async function registerServiceWorker() {
		const registration = await navigator.serviceWorker.register('/sw.js', {
			scope: '/',
			updateViaCache: 'none',
		})
		const sub = await registration.pushManager.getSubscription()
		setSubscription(sub)
	}

	async function subscribeToPush() {
		// 1. Request permission
		const permission = await Notification.requestPermission()

		if (permission !== 'granted') {
			toast.error('Permission for push notifications was not granted.')
			return
		}

		// 2. If permission is granted, proceed with subscription
    try {
		const registration = await navigator.serviceWorker.ready
		const sub = await registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlBase64ToUint8Array(
				process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
			),
		})
		setSubscription(sub)
		const serializedSub = JSON.parse(JSON.stringify(sub))
		await subscribeUser(serializedSub)
    } catch (error) {
      console.log('Error subscribing to push notifications:', error)
    }

	}

	// async function subscribeToPush() {
	// 	const registration = await navigator.serviceWorker.ready
	// 	const sub = await registration.pushManager.subscribe({
	// 		userVisibleOnly: true,
	// 		applicationServerKey: urlBase64ToUint8Array(
	// 			process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
	// 		),
	// 	})
	// 	setSubscription(sub)
	// 	const serializedSub = JSON.parse(JSON.stringify(sub))
	// 	await subscribeUser(serializedSub)
	// }

	async function unsubscribeFromPush() {
		await subscription?.unsubscribe()
		setSubscription(null)
		await unsubscribeUser()
	}

	async function sendTestNotification() {
		if (subscription) {
			await sendNotification(message)
			setMessage('')
		}
	}

	if (!isSupported) {
		return <p>Push notifications are not supported in this browser.</p>
	}

  if (!subscription) {
    subscribeToPush()
  }

	return (
		<div>
			<h3>Push Notifications</h3>
			{subscription ? (
				<>
					<p>You are subscribed to push notifications.</p>
					<Button type='button' onClick={unsubscribeFromPush}>
						Unsubscribe
					</Button>
					<Input
						type='text'
						placeholder='Enter notification message'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<Button type='button' onClick={sendTestNotification}>
						Send Test
					</Button>
				</>
			) : (
				<>
				</>
			)}
		</div>
	)
}
function InstallPrompt() {
	const [isIOS, setIsIOS] = useState(false)
	const [isStandalone, setIsStandalone] = useState(false)
	// State to store the beforeinstallprompt event
	const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)

	useEffect(() => {
		// Detect iOS
		setIsIOS(
			/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream,
		)
    console.log('effect')
		// Detect if app is running in standalone mode (installed PWA)
		setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)

		// Event listener for beforeinstallprompt
		const handleBeforeInstallPrompt = (e: Event) => {
      console.log('handleBeforeInstallPrompt')
			e.preventDefault()
			setDeferredPrompt(e)
			toast.message('beforeinstallprompt event fired and stored.')
			console.log('beforeinstallprompt event fired and stored.')

		}

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    console.log('effect end')

		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener(
				'beforeinstallprompt',
				handleBeforeInstallPrompt,
			)
		}
	}, [])

	// Function to handle the "Add to Home Screen" button click
	const handleInstallClick = async () => {
    toast.success('click')
		if (deferredPrompt) {
			// Show the install prompt
			// Note: This 'prompt' method returns a Promise that resolves with a 'userChoice' object
			// indicating whether the user accepted or dismissed the prompt.
			;(deferredPrompt as any).prompt()

			// Wait for the user to respond to the prompt
			const { outcome } = await (deferredPrompt as any).userChoice
			toast.message(`User response to the install prompt: ${outcome}`)

			// We no longer need the prompt after it's been used or dismissed
			setDeferredPrompt(null)

			// You might want to update UI based on the outcome (e.g., hide the button if installed)
			if (outcome === 'accepted') {
				console.log('User accepted the A2HS prompt')
			} else {
				console.log('User dismissed the A2HS prompt')
			}
		}
	}

  console.log('deferredPrompt', deferredPrompt)

	// Don't show install button if already installed or if no prompt is available yet (not installable)
	if (isStandalone) {
		return null
	}

	return (
		<div className='p-4 bg-blue-100 rounded-lg shadow-md max-w-md mx-auto my-4'>
			<h3 className='text-xl font-semibold mb-4 text-blue-800'>Install App</h3>
			{/* Show the button only if deferredPrompt is available */}
				<Button
					type='button'
					onClick={handleInstallClick}
				>
					Add to Home Screen
				</Button>
			{isIOS && (
				<p className='mt-4 text-blue-700 text-sm'>
					To install this app on your iOS device, tap the share button
					<span role='img' aria-label='share icon' className='mx-1 text-lg'>
						{' '}
						⎋{' '}
					</span>
					and then "Add to Home Screen"
					<span role='img' aria-label='plus icon' className='mx-1 text-lg'>
						{' '}
						➕{' '}
					</span>
					.
				</p>
			)}
		</div>
	)
}
// function InstallPrompt() {
// 	const [isIOS, setIsIOS] = useState(false)
// 	const [isStandalone, setIsStandalone] = useState(false)
//
// 	useEffect(() => {
// 		setIsIOS(
// 			/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream,
// 		)
//
// 		setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
// 	}, [])
//
// 	if (isStandalone) {
// 		return null // Don't show install button if already installed
// 	}
//
// 	return (
// 		<div>
// 			<h3>Install App</h3>
// 			<Button type='button'>Add to Home Screen</Button>
// 			{isIOS && (
// 				<p>
// 					To install this app on your iOS device, tap the share button
// 					<span role='img' aria-label='share icon'>
// 						{' '}
// 						⎋{' '}
// 					</span>
// 					and then "Add to Home Screen"
// 					<span role='img' aria-label='plus icon'>
// 						{' '}
// 						➕{' '}
// 					</span>
// 					.
// 				</p>
// 			)}
// 		</div>
// 	)
// }

export function PwaNotifications() {
	return (
		<div>
			<InstallPrompt />
			<PushNotificationManager />
		</div>
	)
}
