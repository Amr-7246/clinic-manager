"use client"
import { useDeleteEntity, useGetEntity } from '@/APIs'
import { useLogOut } from '@/APIs/Auth/logOut'
import { useUserInfoContext } from '@/context/userInfoContext'
import { assets } from '@/pub/assets/assets_frontend'
import { IAppointment, IPatient } from '@/types/patientTypes'
import Image from 'next/image'
import React from 'react'

const page = () => {
  const {UserInfo} = useUserInfoContext()
  const {data: patients, isLoading, error} = useGetEntity<IPatient[]>("clinic-manager/patient")
  const {mutate: cancelAppo} = useDeleteEntity("clinic-manager/appointment")

  const userData = {
    name : 'Amr',
    age : 'Amr',
    email : 'asdnnwre@gmail.com',
    phone : '0123456789',
    address : 'Cairo, Egypt',
    profilePic : assets.profile_pic,
    bio : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.',
    socialLinks : {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
  }
  };
  const cancelAppointment = (id:any) => {
    if (!id) console.log("There is no Id")
    cancelAppo(id)
  }

  return (
    <div>
      {isLoading? <p>Loading . . </p> : error ? <p>error</p> :
        patients?.map((patient, idx) => (
          <div className="flex-center gap-5" >
            <Image className="w-[25%] rounded-lg" src={patient?.pictuer ? patient?.pictuer.imageURL : assets.profile_pic} alt={"profile image"}/>
            <div className='flex flex-col gap-3' >
              {/* <h2 className="p-3 ">Patient Id : {patient?._id}</h2> */}
              <p><strong>Name:</strong> {patient?.name}</p>
              <p><strong>Email:</strong> {patient?.email}</p>
              <p><strong>Phone:</strong> {patient?.phoneNumber}</p>
              <div>
                {patient?.appointments.map((appo, idx) => (
                  <div key={idx} >
                    {appo._id}
                    <button className='btn_I' >cancel the Appointment</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        ))
      }
    </div>
    );
}
export default page
