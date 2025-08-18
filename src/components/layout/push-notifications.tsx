'use client'

import { useEffect, useState } from 'react'

import { env } from '@/env'

import { Button } from '@/components/ui/button'

import { sendNotification, subscribeUser, unsubscribeUser } from './action'
import { urlBase64ToUint8Array } from './pwa'

import { api } from '@/trpc/react'

import { subscriptionAtom } from './notifications'
import { useAtom } from 'jotai'

const PushNotificationManager = () => {
	const [isSupported, setIsSupported] = useState(false)
	const [subscription, setSubscription] = useAtom(subscriptionAtom)
	const [message, setMessage] = useState('')

  const { mutate } = api.adminLog.create.useMutation()

	useEffect(() => {
		if ('serviceWorker' in navigator && 'PushManager' in window) {
			setIsSupported(true)
			registerServiceWorker()
		}
	}, [])

	async function registerServiceWorker() {
		const registration = await navigator.serviceWorker.register('/sw.js', {
			scope: '/',
			updateViaCache: 'all',
		})
		const sub = await registration.pushManager.getSubscription()
    // @ts-ignore
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
    // @ts-ignore
		setSubscription(sub)
		const serializedSub = JSON.parse(JSON.stringify(sub))
		await subscribeUser(serializedSub)
    mutate({
      task: 'Subscribe to Push Notifications',
      notes: '',
    })
	}

	async function unsubscribeFromPush() {
    // @ts-ignore
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

	if (!isSupported) null

	return (
		<>
			{subscription ? null : (
				<div className='w-full flex items-center justify-center'>
					<Button
            size='sm'
            variant='outline'
            onClick={subscribeToPush}>Enable push notifications</Button>
				</div>
			)}
		</>
	)
}

export { PushNotificationManager }
