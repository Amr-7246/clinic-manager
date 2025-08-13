'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const [vantaEffect, setVantaEffect] = useState<any>(null)

  useEffect(() => {
    const loadVanta = async () => {
      if (typeof window !== 'undefined' && !vantaEffect) {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js'
        script.async = true
        script.onload = () => {
          const VANTA = (window as any).VANTA
          if (vantaRef.current && VANTA?.WAVES) {
            setVantaEffect(
              VANTA.WAVES({
                el: vantaRef.current,
                THREE,
                color: 0x0077ff,
                shininess: 70,
                waveSpeed: 0.8,
                zoom: 0.9,
                backgroundColor: 0x111111
              })
            )
          }
        }
        document.body.appendChild(script)
      }
    }

    loadVanta()

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return <div ref={vantaRef} className="absolute inset-0 -z-10" />
}
