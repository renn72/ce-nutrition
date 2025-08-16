'use client'

import { useEffect, useState } from 'react'

import { env } from '@/env'
import { Share } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { sendNotification, subscribeUser, unsubscribeUser } from './action'

export const dynamic = 'force-dynamic'

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
			// Prevent the default browser install prompt from showing automatically
			// e.preventDefault()
			// Store the event so it can be triggered later by a user gesture
			setDeferredPrompt(e as BeforeInstallPromptEvent)
			// Show our custom install button
			setShowInstallButton(true)
			console.log('BeforeInstallPrompt event fired.')
		}

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
		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
		window.addEventListener('appinstalled', handleAppInstalled)

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
		<div className='w-full'>
			{showIosInstructions ? (
				// Instructions for iOS users
				<Dialog>
					<DialogTrigger asChild>
						<Button size='sm'>Install App</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>To install this app </DialogTitle>
							<DialogDescription>
								<span className='flex ga-2'>on your iOS device, tap the share button <Share size={16} className='ml-2' /></span>

								<span>and then "Add to Home Screen".</span>
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			) : (
				// Button for Android/Desktop browsers supporting beforeinstallprompt
				showInstallButton && (
					<Button
						onClick={onClickInstall}
            size='sm'
					>
						Install App
					</Button>
				)
			)}
		</div>
	)
}

export function Pwa() {
	return (
		<div>
			<PwaInstallButton />
		</div>
	)
}
