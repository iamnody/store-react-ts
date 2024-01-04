import { useEffect, useState } from 'react'

type DeviceType = 'tablet' | 'laptop' | 'desktop'

const deviceWidths: Record<DeviceType, number> = {
  tablet: 425,
  laptop: 768,
  desktop: 1024,
}

export default function useWindowWidth(deviceType: DeviceType) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const trigger = windowWidth >= deviceWidths[deviceType]

  return trigger
}
