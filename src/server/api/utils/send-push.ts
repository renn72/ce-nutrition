import webpush from 'web-push'

import { env } from '@/env'

webpush.setVapidDetails(
	'mailto:admin@warner.systems',
  env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  env.VAPID_PRIVATE_KEY,
)
export async function sendPushNotification(
	subscription: webpush.PushSubscription,
	title: string,
	body: string,
	url: string = '/', // URL to open when notification is clicked
  badge: string = '/ce.png',
) {
	const payload = JSON.stringify({
		title: title,
		body: body,
		// url: url, // Include URL in payload for service worker
    badge: badge,
	})


	try {
		await webpush.sendNotification(subscription, payload)
		console.log('Push notification sent successfully!')
		return { success: true, message: 'Notification sent' }
	} catch (error: any) {
		console.error('Error sending push notification:', error)
		// Handle specific error codes, e.g., 410 Gone for expired subscriptions
		if (error.statusCode === 410) {
			// In a real application, you would delete the expired subscription from your database here.
			console.warn(
				'Subscription expired. You should delete it from your database.',
			)
			// Example: await db.pushSubscription.delete({ where: { endpoint: subscription.endpoint } });
			return { success: false, message: 'Subscription expired' }
		}
		return {
			success: false,
			message: `Failed to send notification: ${error.message}`,
		}
	}
}
