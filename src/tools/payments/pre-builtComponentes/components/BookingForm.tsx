import React, { useState } from 'react'
import { FaCalendarAlt, FaUsers, FaClock, FaMapMarkerAlt, FaPlane, FaHotel, FaCar, FaUtensils } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Loading from '../../components/Loading'
import { usePostEntity } from '@/APIs';
import { useBooking } from '@/context/BookingContext';

interface IBookingData {
  status: "success",
  data: string , // booking._id,
  clientSecret: string // paymentIntent.client_secret ,
}

interface BookingRequest {
  userId : string ;
  itemId : string ;                          
  itemType : string ;                        
  totalPrice : number ;
  paymentId : string ;
}

const BookingForm = ({ setIsPaynow }: { setIsPaynow: (isPaynow: boolean) => void }) => {
  const { booking , setpaymentInitData } = useBooking();
  const { mutate : Book , data : BookingData } = usePostEntity<BookingRequest >('/book')
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    duration: '',
    persons: '',
    destination: '',
    travelDate: '',
    preferences: {
      flights: false,
      accommodation: false,
      transportation: false,
      meals: false
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: checked
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    Book({
      userId : booking?.userId || '',
      itemId : booking?.itemId,
      itemType : booking?.itemType,
      totalPrice : booking?.totalPrice,
      paymentId : booking?.paymentId
    })

    if (BookingData && 'data' in BookingData && 'clientSecret' in BookingData) {
      setpaymentInitData({
        BookingId: (BookingData as any).data,
        Client_stripe_id: (BookingData as any).clientSecret
      });
    }
    
    setTimeout(() => {
      setIsLoading(false)
      setIsPaynow(true)
    }, 1500);
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Book Your Travel</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Duration */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaClock className="inline mr-2" /> Duration
            </label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Duration</option>
              <option value="1-3">1-3 Days</option>
              <option value="4-7">4-7 Days</option>
              <option value="8-14">8-14 Days</option>
              <option value="15+">15+ Days</option>
            </select>
          </div>

          {/* Number of Persons */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaUsers className="inline mr-2" /> Number of Persons
            </label>
            <input
              type="number"
              name="persons"
              value={formData.persons}
              onChange={handleInputChange}
              min="1"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Destination */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaMapMarkerAlt className="inline mr-2" /> Destination
            </label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter destination"
              required
            />
          </div>

          {/* Travel Date */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaCalendarAlt className="inline mr-2" /> Travel Date
            </label>
            <input
              type="date"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Travel Preferences</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="flights"
                checked={formData.preferences.flights}
                onChange={handleCheckboxChange}
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <FaPlane className="text-gray-600" />
              <span>Flights</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="accommodation"
                checked={formData.preferences.accommodation}
                onChange={handleCheckboxChange}
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <FaHotel className="text-gray-600" />
              <span>Accommodation</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="transportation"
                checked={formData.preferences.transportation}
                onChange={handleCheckboxChange}
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <FaCar className="text-gray-600" />
              <span>Transportation</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="meals"
                checked={formData.preferences.meals}
                onChange={handleCheckboxChange}
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <FaUtensils className="text-gray-600" />
              <span>Meals</span>
            </label>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Pay Now
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookingForm
