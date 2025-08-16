import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CE Nutrition T',
    short_name: 'CENT',
    description: 'Your Nutrition',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/ce.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  }
}
