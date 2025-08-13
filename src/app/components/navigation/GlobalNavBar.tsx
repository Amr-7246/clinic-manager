"use client"
import React, { useEffect} from 'react'
import {NavOptions} from '../../Data/NavOptions'
import WideNavbar from './WideNavbar';
import MobileNavbar from './MobileNavbar';
import { useUserInfoContext } from '@/context/userInfoContext';

const GlobalNav = () => {
    const { UserInfo : user } = useUserInfoContext()

    useEffect(() => {
        if(user !== null){
            NavOptions.push({
                name: 'Portfolio',
                href: '/global/user/portfolio',
                fake_href: '/global/user/portfolio',
            })
            console.log(NavOptions)
        }
    }, [user])

return (
<div className="z-[50]">
    <WideNavbar/>
    <MobileNavbar/>
</div>
)
}

export default GlobalNav
