"use client"
import { specialityData } from '@/pub/assets/assets_frontend'
import Image from 'next/image'
import React from 'react'
import textContent from "@/AppContent.json"
import TextAnimator from "@/components/TextAnimator"

const Speciality = () => {
  const content = textContent.speciality
  return (
    <div className='flex-center flex-col gap-5 p-5'>
      <div className='flex-center flex-col '>
        <TextAnimator text={content.headline} animation={'chuncks'} className={'text-[40px] !text-white mx-auto'} />
        <TextAnimator text={content.discription} animation={'chuncks'} className={''} />
      </div>
      <div className='flex-center flex-row flex-wrap gap-4' >
        {specialityData.map((item, idx)=>(
          <div key={idx} className='flex-center flex-col gap-3'>
            <Image className='rounded-full' src={item.image} width={100} height={100} alt={'speciality'} />
            <p>{item.speciality}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Speciality
