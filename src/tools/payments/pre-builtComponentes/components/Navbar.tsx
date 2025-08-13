import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-gradient-to-r from-rose-900 to-black p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/Booking" className="text-white text-xl font-bold hover:text-sky-400 transition-colors">
          Booking System
        </Link>
        
        <div className="space-x-6">
          <Link 
            href="/Booking" 
            className={`text-white hover:text-sky-400 transition-colors ${
              pathname === '/Booking' ? 'text-sky-400' : ''
            }`}
          >
            Items
          </Link>
          <Link 
            href="/Booking/dashboard" 
            className={`text-white hover:text-sky-400 transition-colors ${
              pathname === '/Booking/dashboard' ? 'text-sky-400' : ''
            }`}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
