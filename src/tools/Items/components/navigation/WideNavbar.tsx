"use client"

import { NavOptions } from '@/app/Data/NavOptions'
import { ThemeToggle } from '@/tools/Themes/themeToggle'
import Link from 'next/link'
import React from 'react'
import { useUserInfoContext } from '@/app/Auth/context/userInfoContext'
import { usePathname } from 'next/navigation'
import AuthBtn from './AuthBtn'

const WideNavbar = () => {
  const { UserInfo : user } = useUserInfoContext()
  const curentPath = usePathname()
  return (
    <div>
      {/* Wide nav bar */}
        <nav  className=' !mt-10 hidden bg-[var(--main)] !p-3 lg:px-[50px] rounded-md  md:!flex !justify-between gap-3 h-fit sticky w-[85%] !mx-auto '>
            {/* Logo & Theme button */}
              <div className=' flex-center flex-row gap-3 '>
                  <Link href={"/global/home"} >
                      <img className='w-[60px] cursor-pointer h-[60px] rounded-lg border-[1px] border-amber-200 ' src="/assets/photo_2_2025-04-28_02-57-24.jpg" alt="logo" />
                  </Link>
                  <ThemeToggle/>
              </div>
            {/* Logo & Theme button */}
            {/* Nav Links */}
              <div className='flex-center lg:gap-8 gap-4 text-[var(--text)] '>
                  {NavOptions.map((option, idx) => (
                      option.name == 'Portfolio' && user == null  ?
                      <Link  className={` hidden ${curentPath.includes(option.fake_href) ? '!text-[var(--second-text)]' : ''} hover:!text-[var(--second-text)] duration-500 cursor-pointer`} key={idx}  href={option.href}> {option.name} </Link> 
                      :
                      <Link  className={`${curentPath.includes(option.fake_href) ? '!text-[var(--second-text)]' : ''} hover:!text-[var(--second-text)] duration-500 cursor-pointer`} key={idx}  href={option.href}> {option.name} </Link> 
                  ))}
              </div>
            {/* Nav Links */}
            {/* Auth Buttons */}
              <AuthBtn/>
            {/* Auth Buttons */}
        </nav >
    {/* Wide nav bar */}
    </div>
  )
}

export default WideNavbar