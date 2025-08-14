"use client"

import { motion } from 'framer-motion';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import AuthBtn from './AuthBtn';
import { useUserInfoContext } from '@/context/userInfoContext';
import { assets } from '@/pub/assets/assets_frontend';
import Image from 'next/image';
import textContent from "@/AppContent.json"

const MobileNavbar = () => {
  const content = textContent
      const { UserInfo : user } = useUserInfoContext()
      const curentPath = usePathname()
      const navRef = useRef<HTMLDivElement>(null);
      const [IsOpend, setIsOpend] = useState(false)

      useEffect(() => {
          const handleResize = () => {
              const IsSmall = !!( window.innerWidth < 768 )
              if (IsOpend  && IsSmall ) {
                  document.body.style.overflow = "hidden"
              } else {
                  document.body.style.overflow = "auto"
              }
          }
          handleResize()
          window.addEventListener("resize", handleResize);
          return () => {
              window.removeEventListener("resize", handleResize);
              document.body.style.overflow = "auto"
          }
      }, [IsOpend])

  return (
    <div className=''>
      {/* mobile nav bar */}
        <nav ref={navRef}  className="bg-[#bfafff] shadow-lg fixed shadow-black/30 top-0 z-10 border-b border-black/50 flex-center md:!hidden !justify-between items-center h-fit w-[100%] py-6 px-5 ">

          <Link href={"/"} >
              <Image className='w-[100px] cursor-pointer' src={assets.logo} alt="logo" />
          </Link>
          <div className='flex flex-row gap-3'>
            {/* <ThemeToggle/> */}
            <div onClick={() => {setIsOpend(true); navRef.current?.scrollIntoView({ behavior: "smooth" });}}  className="flex-center  group items-end flex-col w-[60px] gap-2 cursor-pointer">
                <span className={` ${IsOpend ? 'w-full  group-hover:w-1/2 ' : ' w-1/2 group-hover:w-full' } block  h-[1px] bg-[var(--surface)] transition-all duration-800 ease-in-out `}></span>
                <span className="block w-full h-[1px] bg-[var(--surface)] transition-all duration-300 ease-in-out"></span>
            </div>
          </div>

        </nav>

      {/*//& Sid Bar */}
        <nav className={` z-20 fixed ${IsOpend ? "translate-x-[0%]" : "translate-x-[-100%]" } left-0 top-0 md:hidden z-20 flex min-h-screen duration-1000 transition-all w-full `}>

            <div className=' !text-stone-300 bg-black w-[70%] border-r border-stone-400/50 '>

              <div className='border-b flex flex-row justify-between border-black p-3 '>
                  <div onClick={() => setIsOpend(false)}  className={`flex-center group items-end flex-col w-[60px] h-[60px] gap-2 cursor-pointer`}>
                      <span className={`  text-[30px] hover:scale-125 hover:rotate-15 hover:text-whtie duration-700 `}><IoCloseOutline/></span>
                  </div>
                  {/* <LanguageSwitcher/> */}
                  <AuthBtn/>
              </div>

              <div  className='flex flex-wrap h-fit mb-3'>
                  {content.navBar.options.map((option, idx) => (
                      option.name == 'Portfolio' && user == null  ?
                          <Link onClick={() => setIsOpend(false)}  className={`${curentPath == option.href ? '!text-whtie' : 'text-white/50'} hidden hover:!text-stone-300 font-black font-mono duration-500 py-5 px-3 w-full border-b border-stone-600 cursor-pointer`} key={idx} href={option.href}>{option.name}</Link>
                      :   <Link onClick={() => setIsOpend(false)}  className={`${curentPath == option.href ? '!text-whtie' : 'text-white/50'} hover:!text-stone-300 font-black font-mono duration-500 py-5 px-3 w-full border-b border-stone-600 cursor-pointer`} key={idx} href={option.href}>{option.name}</Link>
                  ))}
              </div>
              {/*//& Auth Buttons */}
            </div>

            {
            IsOpend &&
            <motion.div
                initial={{ opacity: 0 }}
                animate={{opacity : 0.5 }}
                transition={{
                    duration: 0.3 ,
                    delay: 0.8 ,
                    ease: "easeInOut"
                }}
                onClick={() => setIsOpend(false)} className={` h-screen flex-1 bg-black `} />
            }
        </nav>
    {/* mobile nav bar */}
    </div>
  )
}

export default MobileNavbar
