"use client"
import { useGetEntity } from "@/APIs";
import AnimatedCard from "@/components/AnimatedCard";
import { useDoctorsContext } from "@/context/doctorsContext";
import { assets, doctors, specialityData } from "@/pub/assets/assets_frontend";
import { doctor } from "@/types/doctorTypes";
import { useEffect, useState } from "react";

export default function Page() {
  const {setDoctors} = useDoctorsContext()
  const {data: allDoctors} = useGetEntity<doctor[]>('clinic-manager/doctors')
  const [filterValue, setFilterValue] = useState<string|null>(null)
  //& Data Cashing
    useEffect(() => {
      setDoctors(allDoctors)
    }, [allDoctors])
  
  return (
    <div>
      <h2></h2>
      <div className="flex items-start flex-col lg:flex-row justify-between gap-10">

        <div className="lg:w-[20%] w-[90%] mx-auto lg:flex-col flex-row flex-wrap flex gap-3">
          {specialityData.map((item, idx) => (
            <button onClick={()=> setFilterValue(item.speciality)} className={` ${filterValue == item.speciality? 'btn_II' : "btn_I " } w-full`}>{item.speciality}</button>
          ))}
          <button onClick={()=> setFilterValue(null)} className={` ${filterValue == null ? 'btn_II' : "btn_I " } w-full`}>All specialities</button>
        </div>

        <div className=" flex-center flex-row gap-5 flex-wrap " >
          {filterValue == null ?
            doctors.map((doc, idx) => (
              <AnimatedCard key={idx} img={doc.image} title={doc.name} discription={doc.speciality} id={doc._id} alt={doctors[0].image} />
            ))
            :doctors.filter((doc) => doc.speciality == filterValue ).map((doc, idx) => (
              <AnimatedCard key={idx} img={doc.image} title={doc.name} discription={doc.speciality} id={doc._id} alt={doctors[0].image} />
            ))
          }
          {allDoctors ? allDoctors?.map((card : doctor, idx: any) => (
              <AnimatedCard className='' id={card._id} key={idx} img={card.image} title={card.name} discription={card.speciality} state={'avalible'} alt={doctors[0].image} />
          )) : '' }
        </div>

      </div>
    </div>
  );
}
