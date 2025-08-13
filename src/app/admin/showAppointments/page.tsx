'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDeleteEntity, useGetEntity } from '@/APIs'
import {
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaUserMd,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaStethoscope,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa'
import { IAppointment } from '@/types/patientTypes'

const AdminAppointments = () => {
  const { data: appointments, isLoading } = useGetEntity<IAppointment[]>('clinic-manager/appointment')
  const { mutate: deleteAppointment } = useDeleteEntity<any>('clinic-manager/appointment')

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const getPaymentIcon = (state: string) => {
    switch (state.toLowerCase()) {
      case 'online':
        return <FaCheckCircle className="text-green-500" />
      case 'offline':
        return <FaMoneyBillWave className="text-indigo-500" />
      default:
        return <FaTimesCircle className="text-red-500" />
    }
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : !appointments || appointments.length === 0 ? (
        <p className="flex-center w-full text-white bg-stone-800 text-[20px] font-black p-[60px] rounded-xl border border-white">
          No appointments yet
        </p>
      ) : (
        appointments.map((appointment, index) => (
          <div
            key={appointment._id}
            className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div
              className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer hover:bg-gray-200 transition"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-center gap-4">
                <FaCalendarAlt className="text-blue-500" />
                <span className="font-semibold">
                  {appointment.date?.day} - {appointment.date?.date}
                </span>
                <FaClock className="text-purple-500" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center gap-2">
                {getPaymentIcon(appointment.paymentState)}
                <span className="font-medium">{appointment.paymentState}</span>
              </div>
            </div>

            {/* Expanded Details */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="p-4 space-y-2"
                >
                  <p className="flex items-center gap-2">
                    <FaUser className="text-gray-600" /> {appointment.name}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-blue-400" /> {appointment.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaPhone className="text-green-500" /> {appointment.phoneNumber}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaUserMd className="text-purple-500" /> Doctor ID: {appointment.doctorId}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaStethoscope className="text-orange-500" /> Speciality:{' '}
                    {appointment.speciality || 'General'}
                  </p>

                  <button
                    onClick={() => deleteAppointment(appointment?._id)}
                    className="mt-3 px-4 py-2 cursor-pointer bg-rose-500 text-white rounded-md hover:bg-rose-600 transition w-full"
                  >
                    Cancel Appointment
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))
      )}
    </div>
  )
}

export default AdminAppointments
