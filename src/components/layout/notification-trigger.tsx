'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import type { GetUserById } from '@/types'
import { useAtom } from 'jotai'
import type { PushSubscription } from 'web-push'

import { sendNotification } from './action'
import type { Item } from './notifications'
import { subscriptionAtom } from './notifications'

export const dynamic = 'force-dynamic'

const NotificationTrigger = ({
	currentUser: _currentUser,
	items: messages,
}: {
	currentUser: GetUserById
	items: Item[]
}) => {
	const [subscription, setSubscription] = useAtom(subscriptionAtom)
	const [isMutating, setIsMutating] = useState(false)

	useEffect(() => {
		if ('serviceWorker' in navigator && 'PushManager' in window) {
			registerServiceWorker()
		}
	}, [])

	async function registerServiceWorker() {
		const registration = await navigator.serviceWorker.register('/sw.js', {
			scope: '/',
			updateViaCache: 'none',
		})
		const sub = await registration.pushManager.getSubscription()
		setSubscription(sub as PushSubscription | null)
	}

	useEffect(() => {
		if (subscription) {
			for (const message of messages) {
				if (!message.isNotified && !message.isRead) {
					console.log('subscription', message)
					const serializedSub = JSON.parse(JSON.stringify(subscription))
					if (message.state === 'message') {
						// sendNotification(message.content, serializedSub, 'New Message')
					}
					if (message.state === 'notification') {
						// sendNotification(message.content, serializedSub, 'New Notification')
					}
					if (message.state === 'message' && !isMutating) {
						setIsMutating(true)
						// markMessageAsNotified(message.id)
					}
					if (message.state === 'notification' && !isMutating) {
						setIsMutating(true)
						// markNotificationAsNotified(message.id)
					}
				}
			}
			// console.log('subscription', message.content, subscription)
			// const serializedSub = JSON.parse(JSON.stringify(subscription))
			// sendNotification(message.content, serializedSub)
		}
	}, [subscription, messages])

	const ctx = api.useUtils()
	const { mutate: markNotificationAsNotified } =
		api.notifications.markAsNotified.useMutation({
			onSuccess: () => {
				ctx.notifications.invalidate()
				setIsMutating(false)
			},
		})
	const { mutate: markMessageAsNotified } =
		api.message.markAsNotified.useMutation({
			onSuccess: () => {
				ctx.message.invalidate()
				setIsMutating(false)
			},
		})

	return null
}

export { NotificationTrigger }
