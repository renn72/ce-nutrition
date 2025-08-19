'use client'

import { api } from '@/trpc/react'

import { useEffect } from 'react'

import type { GetUserById } from '@/types'
import { useAtom } from 'jotai'
import type { PushSubscription } from 'web-push'

import type { Item } from './notifications'
import { subscriptionAtom } from './notifications'

export const dynamic = 'force-dynamic'

const NotificationTrigger = ({
	currentUser,
	items: _messages,
}: {
	currentUser: GetUserById
	items: Item[]
}) => {
	const [_subscription, setSubscription] = useAtom(subscriptionAtom)

  const ctx = api.useUtils()
  const { mutate: updateSubscription } = api.pushSubscription.create.useMutation({
    onSuccess: () => {
      ctx.pushSubscription.invalidate()
    },
  })

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
    updateSubscription({
      userId: currentUser.id,
      subscription: JSON.stringify(sub),
    })
		setSubscription(sub as PushSubscription | null)
	}


	return null
}

export { NotificationTrigger }
