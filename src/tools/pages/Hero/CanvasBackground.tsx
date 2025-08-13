'use client'

import { useRef, useEffect } from 'react'

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    //~ Generate Waves Data
      const waves = Array.from({ length: 3 }).map((_, i) => (
        {
          amplitude: 40 + i * 15,
          frequency: 0.015 + i * 0.005,
          speed: 0.5 + i * 0.2,
          color: `rgba(0, 123, 255, ${0.2 + i * 0.3})`,
          phase: i * 100,
        }
      ))
    //~ Generate Waves Data
    //~ Drow and Animate Waves
      let frame = 0

      const draw = () => {
        ctx.clearRect(0, 0, width, height)

        waves.forEach((wave: any) => {
          ctx.beginPath()
          ctx.moveTo(0, height / 2)

          for (let x = 0; x < width; x++) {
            const y =
              height / 2 + wave.amplitude *
              Math.sin(x * wave.frequency + (frame * wave.speed + wave.phase) * 0.02)

            ctx.lineTo(x, y)
          }

          ctx.strokeStyle = wave.color
          ctx.lineWidth = 2
          ctx.stroke()
        })

        frame++
        requestAnimationFrame(draw)
      }

      draw()
    //~ Drow and Animate Waves

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 block w-full h-full"
    />
  )
}
