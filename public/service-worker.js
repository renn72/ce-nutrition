self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: data.icon || '/ce.png',
      badge: '/ce.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
        url: JSON.parse(data.message).url,
      },
    }
    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

self.addEventListener('notificationclick', (event) => {
	console.log('Service Worker: Notification clicked!')
	event.notification.close() // Close the notification after click

	const urlToOpen = event.notification.data.url // Get the URL from the notification's data

	// Open the PWA window or focus an existing one
	event.waitUntil(
		clients
			.matchAll({ type: 'window', includeUncontrolled: true }) // Find all open windows controlled by this service worker
			.then((clientList) => {
				for (const client of clientList) {
					// If a window with the target URL is already open, focus it
					if (client.url.includes(urlToOpen) && 'focus' in client) {
						return client.focus()
					}
				}
				// Otherwise, open a new window
				if (clients.openWindow) {
					return clients.openWindow(urlToOpen)
				}
			}),
	)
})
