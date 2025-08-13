"use client"

import { NavOptions } from '@/app/Data/NavOptions'
import { ThemeToggle } from '@/tools/Themes/themeToggle'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import AuthBtn from './AuthBtn'
import { useUserInfoContext } from '@/context/userInfoContext'
import Image from 'next/image'
import { assets } from '@/pub/assets/assets_frontend'
import textContent from "@/AppContent.json"

const WideNavbar = () => {
  const content = textContent
  const { UserInfo : user } = useUserInfoContext()
  const curentPath = usePathname()
  return (
    <div>
        <nav  className=' bg-[#bfafff] shadow-lg fixed top-0 shadow-black/30 px-[20px] py-3 hidden border-b border-[var(--border)] lg:px-[50px] md:!flex !justify-between gap-3 h-fit w-[100%] !mx-auto z-30'>
            {/*//& Logo & Theme button */}
              <div className=' flex-center flex-row gap-3 '>
                  <Link href={"/"} >
                      <Image className='w-[100px] cursor-pointer' src={assets.logo} alt="logo" />
                  </Link>
                  {/* <ThemeToggle/> */}
              </div>
            {/*//& Nav Links */}
              <div className='flex-center lg:gap-8 gap-4 text-[var(--text)] '>
                  {content.navBar.options.map((option, idx) => (
                    option.name == 'Portfolio' && user == null  ?
                    <Link  className={` hidden ${curentPath == (option.fake_href) ? '!text-[var(--surface)]' : ''} hover:!text-[var(--surface)] duration-500 cursor-pointer`} key={idx}  href={option.href}> {option.name} </Link>
                    :
                    <Link  className={`${curentPath == (option.fake_href) ? '!text-[var(--surface)]' : ''} hover:!text-[var(--surface)] duration-500 cursor-pointer`} key={idx}  href={option.href}> {option.name} </Link>
                  ))}
              </div>
            {/*//& Auth Buttons */}
              <AuthBtn/>
        </nav >
    </div>
  )
}

export default WideNavbar
