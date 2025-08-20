'use client'

import { redirect } from 'next/navigation'

export default function NotFound() {
  console.log('not found')
  redirect('/')
}
