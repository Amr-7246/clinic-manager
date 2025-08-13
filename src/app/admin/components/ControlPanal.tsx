'use client'
import React, { useState } from 'react'
import textContent from '@/AppContent.json'
import Link from 'next/link'
const content = textContent.adminPanal

const ControlPanal = () => {
  const [CurrentRoute, setCurrentRoute] = useState('Dashboard')
  return (
    <div className='flex flex-col gap-3 '>
      {content.ControlPanal.map((item, idx) => (
        <Link key={idx} href={item.href}>
          <button className={`${CurrentRoute == item.name ? "btn_II" : "btn_I" } w-full `} onClick={() => setCurrentRoute(item.name)} >{item.name}</button>
        </Link>
      ))}
    </div>
  )
}

export default ControlPanal
