'use client'

import { useCallback, useEffect, useState } from 'react'

import { env } from '@/env'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

import { sendNotification, subscribeUser, unsubscribeUser } from './action'

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
		const registration = await navigator.serviceWorker.ready
		const sub = await registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlBase64ToUint8Array(
				env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
			),
		})
		setSubscription(sub)
		const serializedSub = JSON.parse(JSON.stringify(sub))
		await subscribeUser(serializedSub)
	}

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

	console.log(subscription)

	if (!isSupported) {
		return <p>Push notifications are not supported in this browser.</p>
	}

	return (
		<div>
			<h3>Push Notifications</h3>
			{subscription ? (
				<>
					<p>You are subscribed to push notifications.</p>
					<Button onClick={unsubscribeFromPush}>Unsubscribe</Button>
					<Input
						type='text'
						placeholder='Enter notification message'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<Button onClick={sendTestNotification}>Send Test</Button>
				</>
			) : (
				<>
					<p>You are not subscribed to push notifications.</p>
					<Button onClick={subscribeToPush}>Subscribe</Button>
				</>
			)}
		</div>
	)
}

interface BeforeInstallPromptEvent extends Event {
	readonly platforms: Array<string>
	readonly userChoice: Promise<{
		outcome: 'accepted' | 'dismissed'
		platform: string
	}>
	prompt(): Promise<void>
}

const PwaInstallButton: React.FC = () => {
	// State to hold the beforeinstallprompt event. This event is "deferred"
	// so we can call its prompt() method when the user clicks our custom button.
	const [deferredPrompt, setDeferredPrompt] =
		useState<BeforeInstallPromptEvent | null>(null)

	// State to control the visibility of the install button
	const [showInstallButton, setShowInstallButton] = useState(false)

	// State to show iOS specific installation instructions
	const [showIosInstructions, setShowIosInstructions] = useState(false)

	// Effect hook to handle the 'beforeinstallprompt' event and 'appinstalled' event.
	// This runs once when the component mounts.
	useEffect(() => {
		// Check if the user is on an iOS device
		console.log('effect')
		const isIOS = () => {
			// Use a more robust check for iOS devices including iPads
			return (
				/iPad|iPhone|iPod/.test(navigator.userAgent) &&
				!(window as any).MSStream
			)
		}

		// Check if the PWA is already running in standalone mode (installed)
		const isInStandaloneMode = () =>
			'standalone' in window.navigator && (window.navigator as any).standalone

		// Event listener for the 'beforeinstallprompt' event
		// This event fires when the browser determines the PWA is installable.
		const handleBeforeInstallPrompt = (e: Event) => {
			console.log('beforeinstallprompt event fired.')
			// Prevent the default browser install prompt from showing automatically
			e.preventDefault()
			// Store the event so it can be triggered later by a user gesture
			setDeferredPrompt(e as BeforeInstallPromptEvent)
			// Show our custom install button
			setShowInstallButton(true)
			console.log('BeforeInstallPrompt event fired.')
		}

		window.addEventListener('load', () => {
			console.log('load')
			window.addEventListener('beforeinstallprompt', (evt) => {
				console.log('new evt', evt)
			})
			// Register Server Worker
			navigator.serviceWorker
				.register('/install-btn/sw.js', { scope: '/install-btn/' })
				.then((res) => console.log('Service Worker Registered'))
				.catch((err) => console.log('Service Worker Not Registered', err))
		})

		// Event listener for the 'appinstalled' event
		// This event fires after the PWA has been successfully installed.
		const handleAppInstalled = () => {
			// Hide the install button as the app is now installed
			setShowInstallButton(false)
			// Clear the deferred prompt reference
			setDeferredPrompt(null)
			console.log('PWA was successfully installed!')
		}

		// Add event listeners when the component mounts
		setTimeout(() => {
      toast.success('PWA')
			window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
			window.addEventListener('appinstalled', handleAppInstalled)
			window.addEventListener('beforeinstallprompt', (event) => {
				event.preventDefault()
				console.log('beforeinstallprompt event fired.')
			})
		}, 500)

		// Initial check for iOS and standalone mode
		if (isIOS() && !isInStandaloneMode()) {
			setShowIosInstructions(true)
			setShowInstallButton(false) // Hide the generic install button for iOS
		} else if (isInStandaloneMode()) {
			setShowInstallButton(false) // Hide the install button if already installed
		}

		// Cleanup function: remove event listeners when the component unmounts
		return () => {
			window.removeEventListener(
				'beforeinstallprompt',
				handleBeforeInstallPrompt,
			)
			window.removeEventListener('appinstalled', handleAppInstalled)
		}
	}, []) // Empty dependency array means this effect runs once after the initial render

	// Function to handle the click event of the install button
	const onClickInstall = async () => {
		console.log('Install button clicked.', deferredPrompt)
		if (deferredPrompt) {
			// Hide the button immediately after click
			setShowInstallButton(false)
			// Show the browser's install prompt
			deferredPrompt.prompt()
			// Wait for the user to respond to the prompt
			const { outcome } = await deferredPrompt.userChoice
			console.log(`User response to PWA install prompt: ${outcome}`)
			// The prompt can only be used once, so clear the reference
			setDeferredPrompt(null)
			// If the user dismisses it, you might want to show the button again or log
			if (outcome === 'dismissed') {
				console.log('User dismissed the PWA installation.')
			}
		}
	}
	return (
		<div className='p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg z-50 md:hidden flex justify-center items-center'>
			{showIosInstructions ? (
				// Instructions for iOS users
				<div className='text-center'>
					<p className='text-sm font-semibold mb-2'>
						To install this app on your iOS device:
					</p>
					<div className='flex items-center justify-center space-x-2 text-sm'>
						<span>Tap the</span>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='2'
							stroke='currentColor'
							className='w-5 h-5'
						>
							<title>Share icon</title>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.769-.283 1.093m0-2.186l9.566-5.316m-9.566 5.316l9.566 5.316m0-10.632a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.769-.283 1.093m0-2.186l9.566-5.316m-9.566 5.316l9.566 5.316'
							/>
						</svg>
						<span>Share icon, then 'Add to Home Screen'.</span>
					</div>
				</div>
			) : (
				// Button for Android/Desktop browsers supporting beforeinstallprompt
				showInstallButton && (
					<Button
						onClick={onClickInstall}
						className='px-6 py-3 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300'
					>
						Install App
					</Button>
				)
			)}
		</div>
	)
}
function InstallPrompt() {
	const [isIOS, setIsIOS] = useState(false)
	const [isStandalone, setIsStandalone] = useState(false)

	useEffect(() => {
		setIsIOS(
			/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream,
		)

		setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
	}, [])

	if (isStandalone) {
		return null // Don't show install button if already installed
	}

	return (
		<div>
			<h3>Install App</h3>
			<Button>Add to Home Screen</Button>
			{isIOS && (
				<p>
					To install this app on your iOS device, tap the share button
					<span role='img' aria-label='share icon'>
						{' '}
						⎋{' '}
					</span>
					and then "Add to Home Screen"
					<span role='img' aria-label='plus icon'>
						{' '}
						➕{' '}
					</span>
					.
				</p>
			)}
		</div>
	)
}

export function Pwa() {
	return (
		<div>
			<PushNotificationManager />
			<PwaInstallButton />
		</div>
	)
}
