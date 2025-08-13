'use client'
import { assets } from '@/pub/assets/assets_frontend'
import Image from 'next/image'
import React from 'react'
import textContent from '@/AppContent.json'
import TextAnimator from '@/components/TextAnimator'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
const Hero = () => {
  const router = useRouter()
  const heroContent= textContent.hero
  return (
    <div className='bg-[var(--surface)] w-[95%] rounded-lg mx-auto px-[30px] pt-[30px] flex-center flex-col lg:flex-row' >
      <div className='flex gap-3 flex-col'>
        <TextAnimator text={heroContent.headline} animation={'chuncks'} className={'text-[20px] lg:text-[40px] '} />
        <div className='flex flex-row gap-5'>
          <Link href={"/doctors"}>
            <button className='btn_II' >{heroContent.bookNow}</button>
          </Link>
          <Link href={"/about"}>
            <button className='btn_II' >{heroContent.learnMore}</button>
          </Link>
        </div>
      </div>
      <Image className='w-[60%]' src={assets.header_img} alt={'hero'}  />
    </div>
  )
}

export default Hero
