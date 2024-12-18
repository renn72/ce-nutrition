'use client'

import { useEffect, useState } from 'react'

// @ts-ignore
export function useClientMediaQuery(query) {
  const [matches, setMatches] = useState<boolean | null>(null)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)

    // @ts-ignore
    const handleMatchChange = (e) => {
      setMatches(e.matches)
    }

    mediaQueryList.addEventListener('change', handleMatchChange)
    setMatches(mediaQueryList.matches)

    return () => {
      mediaQueryList.removeEventListener('change', handleMatchChange)
    }
  }, [query])

  return matches
}
