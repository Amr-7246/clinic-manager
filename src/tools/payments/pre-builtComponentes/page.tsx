"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useGetEntity } from '@/APIs';
import { Iitem } from '../types/itemsTypes';
import { toast } from 'react-hot-toast';
import { useBooking } from '@/context/BookingContext';
import Link from 'next/link';

export default function Home() {
  const { data: items, isLoading, error } = useGetEntity<Iitem[]>('items');
  const { setBooking } = useBooking();

  if (error) {
    toast.error('Failed to load items');
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-rose-900 to-black p-8" 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-white mb-8">Available Items</h1>
      
      {isLoading ? (
        <div className="text-white">Loading...</div>
      ) : (
        //* ############ Item card
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items?.map((item) => (
              <motion.div key={item.name} className="bg-white rounded-md flex flex-col gap-3 items-center justify-center p-3 shadow-lg overflow-hidden" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} >
                {item.images[0] && (
                  <img  src={item.images[0]}  alt={item.name} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-black mb-2">{item.name}</h2>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sky-400 font-bold">${item.price}</span>
                    <span className={`px-2 py-1 rounded ${item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
                <Link 
                  href={`/Booking/payment`}
                  className="bg-sky-400 cursor-pointer border border-transparent w-full duration-700 hover:bg-transparent hover:text-sky-400 border-sky-400 text-white px-4 py-2 rounded-md"
                  onClick={() => setBooking({
                    userId : '',
                    itemId : item._id,
                    itemType : item.type,
                    totalPrice : item.price ,
                    paymentId : ''
                  })}>
                  Book Now
                </Link>
              </motion.div>
            ))}
          </div>
        //* ############ Item card
      )}
    </motion.div>
  );
}
