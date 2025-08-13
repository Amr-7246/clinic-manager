/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { motion } from 'framer-motion'

const Loading = ({ size = 'md', className = '' }) => {
  //~ Size configurations
  const sizeConfig = {
    sm: { container: 'w-8 h-8', dot: 'w-1.5 h-1.5' },
    md: { container: 'w-12 h-12', dot: 'w-2 h-2' },
    lg: { container: 'w-16 h-16', dot: 'w-3 h-3' },
    xl: { container: 'w-20 h-20', dot: 'w-4 h-4' }
  } as const

  const { container, dot } = sizeConfig[size as keyof typeof sizeConfig]

  //~ Animation variants for the container rotation
  const containerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  }

  //~ Animation variants for individual dots
  const dotVariants = {
    animate: (i : any) => ({
      scale: [1, 1.2, 1],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        delay: i * 0.15,
        ease: 'easeInOut'
      }
    })
  }

  //~ Generate 8 dots positioned in a circle
  const dots = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 360) / 8
    const radius = size === 'sm' ? 12 : size === 'md' ? 16 : size === 'lg' ? 24 : 32
    
    return {
      id: i,
      style: {
        position: 'absolute' as const ,
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`
      }
    }
  })

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div className={`relative ${container}`} variants={containerVariants} animate="animate" >
        {dots.map((dotConfig) => (
          <motion.div key={dotConfig.id} className={`${dot} bg-sky-400 rounded-full absolute`} style={dotConfig.style} variants={dotVariants} animate="animate" custom={dotConfig.id} />
        ))}
      </motion.div>
    </div>
  )
}

export default Loading