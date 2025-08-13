"use client"
import { AuthButton } from '@/app/Data/NavOptions'
import DropList from '@/components/DropList'
import { useUserInfoContext } from '@/context/userInfoContext'
import { assets } from '@/pub/assets/assets_frontend'
import LanguageSwitcher from '@/tools/MultipleLangSupport/LanguageSwitcher'
import Image from 'next/image'
import Link from 'next/link'
import React, {useState} from 'react'

const AuthBtn = () => {
  const { UserInfo : user } = useUserInfoContext()
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState<any>(null);

    const sampleItems = [
      { id: '2', label: 'User Profile', value: user?._id ? `/auth/${user._id}` : '', icon: '👤' },
      { id: '1', label: 'Your Appointments', value: user?._id ? `/auth/${user._id}/appointments` : '' , icon: '📊' },
      { id: '5', label: 'Explor Our Doctors', value: '/doctors', icon: '📋'},
      // { id: '3', label: 'Settings', value: '/settings', icon: '⚙️' },
      // { id: '4', label: 'Analytics', value: '/analytics', icon: '📈' },
      { id: '6', label: 'Help Center', value: '/contact', icon: '❓' },
    ];

  return (
    <div>
      {/* Auth Buttons */}
        {
          user == null ?
            <div className='flex-center flex-row gap-2'>
            <Link href={AuthButton.logIn} className=' btn'>log In</Link>
            <Link href={AuthButton.signIn} className='btn  hover:!via-black  hover:from-amber-300/30 hover:to-amber-300/30  from-amber-200/30 via-black to-amber-200/30 '>Sign Up</Link>
            {/* <LanguageSwitcher/> */}
            </div>
          :
          <div className='flex-center !justify-between flex-row gap-2 px-4 py-1 bg-white rounded-xl'>
              <Image className=' w-[50px] h-[50px] rounded-full ' src={user.pictuer.imageURL == '' ? assets.profile_pic : user.pictuer.imageURL} alt={'personal pic'} />
              {/* Custom Styled DropList */}
                <div className="">
                  <DropList
                    title="Custom Style"
                    setIsOpened={setIsOpen}
                    IsOpened={isOpen}
                    items={sampleItems}
                    buttonClassName="border-left border-black h-full text-indigo-600 hover:text-indigo-300"
                    listClassName="border-blue-500"
                    onItemSelect={(item: any) => console.log('Custom styled selected:', item)}
                    route={''}
                  />
                </div>
              {/* <LanguageSwitcher/> */}
          </div>
        }
        {/* Auth Buttons */}
    </div>
  )
}

export default AuthBtn
