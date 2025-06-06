import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CE Nutrition',
    short_name: 'CEN',
    description: 'A Nutrition tracker',
    start_url: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/ce.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/ce.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
