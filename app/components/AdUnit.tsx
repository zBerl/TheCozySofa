'use client'

import React, { useEffect } from 'react'

interface AdUnitProps {
  slot: string
  format?: string
  style?: React.CSSProperties
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

const AdUnit: React.FC<AdUnitProps> = ({ slot, format = 'auto', style, className }) => {
  useEffect(() => {
    // Skip AdSense initialization in development
    if (process.env.NODE_ENV === 'development') {
      console.log('AdSense disabled in development mode')
      return
    }

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  // Don't render ads in development
  if (process.env.NODE_ENV === 'development') {
    return (
      <div 
        className={`bg-gray-100 p-4 text-center ${className || ''}`}
        style={{ ...style, minHeight: '100px' }}
      >
        <p className="text-gray-500">Ad Unit: {slot}</p>
      </div>
    )
  }

  return (
    <div className={`ad-container ${className || ''}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}

export default AdUnit 