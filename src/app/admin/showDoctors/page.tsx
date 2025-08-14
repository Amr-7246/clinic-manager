'use client'
import { useDeleteEntity, useGetEntity } from '@/APIs'
import AnimatedCard from '@/components/AnimatedCard'
import { doctors } from '@/pub/assets/assets_frontend'
import { doctor } from '@/types/doctorTypes'
import React, {useState} from 'react'
import EditDoctor from './EditDoctor'

const page = () => {
  const {data: allDoctors} = useGetEntity<doctor[]>('clinic-manager/doctors')
  const {mutate: deleteDoctor} = useDeleteEntity<any>('clinic-manager/doctors')
  const [WhoEditied, setWhoEditied] = useState<doctor|null>(null)
  return (
    <>
      <div className="w-full flex-center flex-row gap-5 flex-wrap ">
        {doctors.map((card, idx) => (
          <AnimatedCard className='' id={card._id} key={idx} img={card.image} title={card.name} discription={card.speciality} state={'avalible'} />
        ))}
        {allDoctors ? allDoctors?.map((card : doctor, idx: any) => (
          <div className='flex flex-col gap-5' >
            <AnimatedCard alt={doctors[0].image}  className='' id={card._id} key={idx} img={card.image} title={card.name} discription={card.speciality} state={'avalible'} />
            <div className={'flex gap-3'}>
              <button onClick={() => {if(card._id) deleteDoctor(card?._id)}} className='btn_I w-full'>Delete</button>
              <button onClick={() => setWhoEditied(card)} className='btn_II'>Edit</button>
            </div>
          </div>
        ))
          : <p>There is no Doctors Yet</p>
        }
      </div>
      <div className={`${ WhoEditied ? "flex fixed" : "hidden" } bg-stone-800 text-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-5 border border-black rounded-xl `}>
        <EditDoctor setWhoEditied={setWhoEditied} WhoEditied={WhoEditied} />
      </div>
    </>
  )
}

export default page
