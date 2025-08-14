'use server'

import webpush from 'web-push'

webpush.setVapidDetails(
  'mailto:admin@warner.systems',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

let subscription: PushSubscription | null = null

export async function subscribeUser(sub: PushSubscription) {
  subscription = sub
  // In a production environment, you would want to store the subscription in a database
  // For example: await db.subscriptions.create({ data: sub })
  return { success: true }
}

export async function unsubscribeUser() {
  subscription = null
  // In a production environment, you would want to remove the subscription from the database
  // For example: await db.subscriptions.delete({ where: { ... } })
  return { success: true }
}

export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error('No subscription available')
  }
try {
    // The payload for the notification. This will be displayed to the user.
    const payload = JSON.stringify({
      title: 'Test Notification',
      body: message,
      icon: '/icon.png', // Path to an icon to display with the notification
      // Other options like 'badge', 'image', 'data', 'actions' can be added here.
    })

    // Send the notification using the web-push library.
    await webpush.sendNotification(
      subscription,
      payload
    )
    console.log('Push notification sent successfully!')
    return { success: true }
  } catch (error) {
    console.error('Error sending push notification:', error)

    // Handle specific web-push errors, e.g., subscription expired or not found.
    if (error instanceof Error && (error as any).statusCode === 410) {
      // 410 Gone indicates the subscription is no longer valid, so remove it.
      console.log('Subscription is no longer valid; removing it.')
      // In a real app, you'd remove it from your database here too.
      subscription = null;
      return { success: false, error: 'Subscription no longer valid.' };
    }

    return { success: false, error: 'Failed to send notification' }
  }
  // try {
  //   await webpush.sendNotification(
  //     subscription,
  //     JSON.stringify({
  //       title: 'Test Notification',
  //       body: message,
  //       icon: '/icon.png',
  //     })
  //   )
  //   return { success: true }
  // } catch (error) {
  //   console.error('Error sending push notification:', error)
  //   return { success: false, error: 'Failed to send notification' }
  // }
}
