'use client'
import AnimatedCard from "@/components/AnimatedCard";
import {assets, doctors} from "@/pub/assets/assets_frontend"
import Hero from "./components/Hero";
import Image from "next/image";
import textContent from "@/AppContent.json"
import Footer from "./components/Footer";
import Speciality from "./components/Speciality";
import TextAnimator from "@/components/TextAnimator";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const router = useRouter()
  const content = textContent
  return (
    <div className=''>
      <Hero/>
      <Speciality />

      {/*//& Doctors */}
      <div className="w-full flex-center flex-row gap-5 flex-wrap ">
        {doctors.map((card, idx) => (
          <AnimatedCard className='' key={idx} img={card.image} title={card.name} discription={card.speciality} state={'avalible'} id={card._id} />
        ))}
      </div>

      {/*//& appointment banner */}
      <div className="py-10 lg:py-0 lg:pt-5 px-5 bg-[var(--surface)] mx-auto w-[95%] rounded-lg flex-center flex-row !justify-between my-10" >
        <div className="flex flex-col gap-3 w-fit">
          <TextAnimator text={content.appointment.banner.headline} animation={'chuncks'} className={'text-[20px] lg:text-[30px] text-white '} />
          <Link href="/auth/signin" >
            <button className="btn_II w-fit " >{content.appointment.banner.createAccount}</button>
          </Link>
        </div>
        <Image className="w-[20%]" src={assets.appointment_img} alt={"appointment"} />
      </div>

      <Footer/>
    </div>
  );
}
