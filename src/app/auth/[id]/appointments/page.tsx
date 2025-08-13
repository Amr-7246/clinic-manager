'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDeleteEntity, useGetEntity } from "@/APIs";
import { useUserInfoContext } from "@/context/userInfoContext";
import { IAppointment } from "@/types/patientTypes";
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
  FaTimesCircle,
} from "react-icons/fa";

export default function Page() {
  const { data: Appointments, isLoading, error } = useGetEntity<IAppointment[]>("clinic-manager/appointment");
  const { mutate: cancelAppo } = useDeleteEntity("clinic-manager/appointment");
  const { setUserInfo, UserInfo } = useUserInfoContext();

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const cancelAppointment = (id: any) => {
    if (!id) return console.log("There is no Id");
    cancelAppo(id);
    //@ts-ignore
    setUserInfo({
      ...UserInfo,
      //@ts-ignore
      appointments: UserInfo?.appointments.filter((appo: IAppointment) => appo._id != id),
    });
  };

  const getPaymentIcon = (state: string) => {
    switch (state.toLowerCase()) {
      case "paid":
        return <FaCheckCircle className="text-green-500" />;
      case "offline":
        return <FaMoneyBillWave className="text-indigo-500" />;
      default:
        return <FaTimesCircle className="text-rose-500" />;
    }
  };

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-5 text-blue-600">📅 Your Appointments</h2>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error loading appointments</p>}
      {Appointments?.length === 0 && <p>No appointments found</p>}

      {Appointments &&
        Appointments.length > 0 &&
        Appointments.map((appointment, index) => (
          <div
            key={appointment._id}
            className="bg-white shadow-md rounded-xl mb-4 overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div
              className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer hover:bg-gray-200 transition"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-center gap-4">
                <FaCalendarAlt className="text-blue-500" />
                <span className="font-semibold">
                  {appointment.date.day} - {appointment.date.date}
                </span>
                <FaClock className="text-purple-500" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center gap-2">
                {getPaymentIcon(appointment.paymentState)}
                <span className="font-medium">{appointment.paymentState}</span>
              </div>
            </div>

            {/* Expanded Details with Smooth Motion */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="p-4 space-y-2 bg-white"
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
                    <FaStethoscope className="text-orange-500" /> Speciality: {appointment.speciality}
                  </p>

                  <button
                    onClick={() => cancelAppointment(appointment._id)}
                    className="mt-3 cursor-pointer px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition"
                  >
                    Cancel Appointment
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
    </div>
  );
}
