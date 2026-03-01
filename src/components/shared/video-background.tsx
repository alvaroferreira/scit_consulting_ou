import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface VideoBackgroundProps {
  src: string
  overlayClassName?: string
  className?: string
}

export function VideoBackground({
  src,
  overlayClassName,
  className,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={cn('absolute inset-0', className)}>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className={cn('absolute inset-0', overlayClassName)} />
    </div>
  )
}
