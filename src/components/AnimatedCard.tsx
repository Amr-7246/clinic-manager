import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
id: string | any
img: any
alt?: any
title: string
discription: string
state?: string
className?: string
}

const AnimatedCard = ({id,alt, img, title, discription, state, className}: Props) => {
  return (
    <Link href={`/${id}`} >
      <div className={` ${className} flex flex-col gap-5 border border-black rounded-md bg-white/50 `}>
        <Image className='hover:bg-white/50 duration-700 border-b border-black bg-[var(--hovered)]' src={img? img:alt } alt='card image' width={200} height={100} />
        <div className='flex flex-col gap-1  p-2 ' >
          <span className='text-green-400'>{state}</span>
          <p>{title}</p>
          <p>{discription}</p>
        </div>
      </div>
    </Link>
  )
}

export default AnimatedCard
