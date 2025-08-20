'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import type { GetUserById } from '@/types'
import { useAtom, useAtomValue } from 'jotai'
import type { PushSubscription } from 'web-push'

import type { Item } from './notifications'
import { subscriptionAtom } from './notifications'

import { impersonatedUserAtom } from '@/atoms'

export const dynamic = 'force-dynamic'

const NotificationTrigger = ({
	currentUser,
	items: _messages,
}: {
	currentUser: GetUserById
	items: Item[]
}) => {
	const [_subscription, setSubscription] = useAtom(subscriptionAtom)

  const impersonatedUser = useAtomValue(impersonatedUserAtom)

	const ctx = api.useUtils()
	const { mutate: updateSubscription } =
		api.pushSubscription.create.useMutation({
			onSuccess: () => {
				ctx.pushSubscription.invalidate()
			},
		})

	useEffect(() => {
		if ('serviceWorker' in navigator && 'PushManager' in window && impersonatedUser.id === '') {
			navigator.serviceWorker.getRegistrations().then((registrations) => {
				for (let registration of registrations) {
          // console.log('Unregistering old service worker:', registration)
					// registration.unregister().then((unregistered) => {
					// 	console.log('Unregistered old service worker:', unregistered)
					// })
				}
			})
				registerServiceWorker()
		}
	}, [])

	async function registerServiceWorker() {
		const registration = await navigator.serviceWorker.register(
			'/sw.js',
			{
				scope: '/',
				updateViaCache: 'none',
			},
		)
		const sub = await registration.pushManager.getSubscription()

		console.log(sub)
		updateSubscription({
			userId: currentUser.id,
			subscription: JSON.stringify(sub),
		})

		setSubscription(sub as PushSubscription | null)
	}

	return null
}

export { NotificationTrigger }
