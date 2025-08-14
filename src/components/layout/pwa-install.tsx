'use client'

import { useCallback, useEffect, useState } from 'react'

// Define the type for the BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
	readonly platforms: Array<string>
	readonly userChoice: Promise<{
		outcome: 'accepted' | 'dismissed'
		platform: string
	}>
	prompt(): Promise<void>
}

const PwaInstallButton: React.FC = () => {
	// State to hold the deferred install prompt event
	const [deferredPrompt, setDeferredPrompt] =
		useState<BeforeInstallPromptEvent | null>(null)
	// State to track if the PWA is currently installable
	const [isInstallable, setIsInstallable] = useState(false)
	// State to track if the app is already installed (standalone mode)
	const [isStandalone, setIsStandalone] = useState(false)
	// State to detect iOS for specific instructions
	const [isIOS, setIsIOS] = useState(false)

	useEffect(() => {
		// Check if running in a browser environment (client-side)
		if (typeof window !== 'undefined') {
			// Detect if the app is running in standalone mode (already installed)
			const mediaQuery = window.matchMedia('(display-mode: standalone)')
			setIsStandalone(mediaQuery.matches)

			// Listener for changes in display mode (e.g., if user installs the app)
			const handleMediaQueryChange = (e: MediaQueryListEvent) => {
				setIsStandalone(e.matches)
			}
			mediaQuery.addEventListener('change', handleMediaQueryChange)

			// Detect iOS for manual install instructions
			const userAgent = window.navigator.userAgent.toLowerCase()
			setIsIOS(/iphone|ipad|ipod/.test(userAgent))

			// Event listener for the 'beforeinstallprompt' event
			// This event is fired by the browser when the PWA is installable.
			const handleBeforeInstallPrompt = (e: Event) => {
				e.preventDefault() // Prevent the default browser install prompt
				setDeferredPrompt(e as BeforeInstallPromptEvent) // Store the event
				setIsInstallable(true) // Mark as installable
				console.log('beforeinstallprompt event fired.')
			}

			// Event listener for when the app is successfully installed
			const handleAppInstalled = () => {
				setIsInstallable(false) // Hide the install button
				setDeferredPrompt(null) // Clear the deferred prompt
				setIsStandalone(true) // Mark as standalone
				console.log('PWA was installed successfully!')
			}

			window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
			window.addEventListener('appinstalled', handleAppInstalled)

			// Cleanup function for event listeners
			return () => {
				window.removeEventListener(
					'beforeinstallprompt',
					handleBeforeInstallPrompt,
				)
				window.removeEventListener('appinstalled', handleAppInstalled)
				mediaQuery.removeEventListener('change', handleMediaQueryChange)
			}
		}
	}, []) // Empty dependency array means this effect runs once on mount

	// Function to handle the install button click
	const handleInstallClick = useCallback(async () => {
		if (deferredPrompt) {
			// Show the browser's install prompt
			deferredPrompt.prompt()
			// Wait for the user to respond to the prompt
			const { outcome } = await deferredPrompt.userChoice

			// Log the outcome
			console.log(`User response to the install prompt: ${outcome}`)

			// Reset states regardless of the outcome, as the prompt can only be used once
			setDeferredPrompt(null)
			setIsInstallable(false)

			if (outcome === 'accepted') {
				// User accepted the installation
				console.log('PWA installation accepted by the user.')
			} else {
				// User dismissed the installation
				console.log('PWA installation dismissed by the user.')
			}
		}
	}, [deferredPrompt])

	// If already in standalone mode, don't show the button/instructions
	if (isStandalone) {
		return null
	}

  console.log('isInstallable', isInstallable)

	return (
		<div className=''>
      hi
			{isIOS ? (
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
				isInstallable && (
					<button
						type='button'
						onClick={handleInstallClick}
						className='px-6 py-3 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300'
					>
						Install App
					</button>
				)
			)}
		</div>
	)
}

export { PwaInstallButton }
