"use client"
import { usePostEntity } from '@/APIs'
import TextAnimator from '@/components/TextAnimator'
import { useDoctorsContext } from '@/context/doctorsContext'
import { useUserInfoContext } from '@/context/userInfoContext'
import { doctors } from '@/pub/assets/assets_frontend'
import { IAppointment, IPatient } from '@/types/patientTypes'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const page = () => {
  const {Doctors} = useDoctorsContext()
  const {setUserInfo} = useUserInfoContext()
  const [AppointmentData, setAppointmentData] = useState<IAppointment|null>(null)
  const {UserInfo} = useUserInfoContext()
  const route = useRouter()
  const {mutate: bookAppointment} = usePostEntity('clinic-manager/appointment')
  const {id} = useParams()
  //TODO: When You Remove the client sice data handle that logic
  const thisDoctor =  id && id.length < 8 ? doctors.find((doc) => doc._id == id) :
                      id && Doctors && id.length > 8 ? Doctors.find((doc) => doc._id == id) : doctors[0]

//TODO: these data must coming from Doctor data model (and handle current date logic)
  const currentDate = new Date().getDay()
  const avalibalDays = [
    { day: 'Monday', date: currentDate },
    { day: 'Tuesday', date: currentDate + 1 },
    { day: 'Wednesday', date: currentDate + 2 },
    { day: 'Thursday', date: currentDate + 3 },
    { day: 'Friday', date: currentDate + 4  },
    { day: 'Saturday', date: currentDate + 5 },
    { day: 'Sunday',  date: currentDate + 6 },
  ]
  const avalibalTimes = [ '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM' ]
//TODO: these data must coming from Doctor data model (and handle current date logic)
//& Populate Doctor Data automaticly and user data too if user loged in
  useEffect(() => {
    if (UserInfo != null){
      setAppointmentData({
        name: UserInfo.name,
        email: UserInfo.email,
        phoneNumber: UserInfo.phoneNumber,
        paymentState: 'offline',
        date: {day: '', date: ''},
        time: ''
      })

    } else {
      setAppointmentData({
        name: '',
        email: '',
        phoneNumber: 0,
        paymentState: 'offline',
        date: {day: '', date: ''},
        time: ''
      })
    }
  }, [UserInfo])

  useEffect(() => {
    // console.log("Here is the Appo.. Amr . . . " + JSON.stringify(AppointmentData) )
  }, [AppointmentData])


  const handelSubmit = () => {
  if (
    !AppointmentData?.name ||
    !AppointmentData?.email ||
    AppointmentData?.date.day === '' ||
    AppointmentData?.time === ''
  ) {
    toast.error("Please fill all fields before submitting.");
    return;
  }

  try {
    const lastAppointment = bookAppointment(AppointmentData);

    if (UserInfo) {
      setUserInfo({
        ...UserInfo,
        //@ts-ignore
        appointments: UserInfo.appointments
          ? [...UserInfo.appointments, lastAppointment]
          : [lastAppointment],
      });
    }

    // Only navigate after state is updated and user exists
    if (UserInfo?._id) {
      route.push(`/auth/${UserInfo._id}/appointments`);
    }

  } catch (error: any) {
    toast.error(error.message || 'Failed to book appointment');
  }
};

  // const handelSubmit = () => {
  //   if(!AppointmentData?.name || !AppointmentData?.email || AppointmentData?.date.day == '' || AppointmentData?.time == '') {
  //     toast.error("Please fill all fields before submitting.")
  //     return;
  //   }else {
  //     const lastAppointment = bookAppointment(AppointmentData)
  //     setUserInfo((prev: IPatient) => ({
  //       ...prev,
  //       appointments: prev.appointments ? [...prev.appointments, lastAppointment] : [lastAppointment]
  //     }))
  //     if (UserInfo != null) {
  //       route.push(`/auth/${UserInfo._id}/appointments`)
  //     }
  // }
  // }

  return (
    <div className='flex flex-col lg:flex-row gap-5'>
      {thisDoctor &&
      <>
        <div className='w-[100%] max-w-[400px] mx-auto lg:w-[30%] h-fit flex flex-col gap-5' >
          <Image className='w-full bg-[var(--surface)] rounded-full' src={thisDoctor.image ? thisDoctor.image : doctors[5].image } alt={'doctor'} />
          {/*//& unLogin User form */}
          { !UserInfo &&
            <form className={'flex gap-5 flex-col'} action="">
              <input className={'input'} onChange={(e) => setAppointmentData(prev => (prev ? { ...prev, name: e.target.value } : null))} type="text" placeholder="Name" />
              <input className={'input'} onChange={(e) => setAppointmentData(prev => (prev ? { ...prev, email: e.target.value } : null))} type="email" placeholder="Email" />
              <input className={'input'} onChange={(e) => setAppointmentData(prev => (prev ? { ...prev, phoneNumber: Number(e.target.value) } : null))} type="tel" placeholder="Phone Number" />
            </form>
          }
        </div>
        <div className='flex-center flex-col gap-5 lg:w-[70%] w-full'>
          {/*//& Doctor Data previw */}
            <div className='p-3 border border-black bg-white rounded-lg shadow-lg shadow-black/50' >
              <h3 className='text-indigo-800 font-bold border-b border-black py-2 mb-2 flex-center' >{thisDoctor.name}</h3>
              <div className='flex gap-3 ' >
                <p>{thisDoctor.degree} |</p>
                <p>{thisDoctor.speciality} |</p>
                <p>{thisDoctor.fees}$</p>
              </div>
              <TextAnimator text={thisDoctor.about} animation={'chuncks'} className={'text-indigo-900  mt-3'} />
            </div>
          {/*//& Booking Data collection  */}
            <div className='flex-center flex-col gap-5'>
              <div className='flex-center flex-col gap-5'>
                <div className='flex-center flex-row gap-3 flex-wrap'>
                  <h2 className='p-5 mb-5 border-b text-white font-bold text-[20px] w-full' >select the Appointment date . . </h2>
                  {avalibalDays.map((day, idx) => (
                    <div
                      className={` ${AppointmentData?.date.day == day.day ? "btn_II" : "btn_I" } `}
                      key={idx}
                      onClick={() => setAppointmentData((prev) => prev ? { ...prev, date: {day :  String(day.day) , date: String(day.date)} } : null ) }
                    >
                      {day.day} - {day.date}
                    </div>
                  ))}
                </div>
                <div className='flex-center flex-row gap-3 flex-wrap'>
                  <h2 className='p-5 mb-5 border-b text-[var(--surface)] font-bold text-[20px] w-full' >Now select the Appointment time . . </h2>
                  {avalibalTimes.map(time => (
                    <div
                      className={` ${AppointmentData?.time == time ? "btn_I" : "btn_II" } `}
                      onClick={() => setAppointmentData(prev => ( prev ? { ...prev, time } : null ))}
                      key={time}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t-[2px] p-5 mt-3 w-full">
                <button onClick={handelSubmit} className='btn_I '>Book the appointment</button>
              </div>
            </div>
        </div>
      </>
      }
    </div>
  )
}

export default page
