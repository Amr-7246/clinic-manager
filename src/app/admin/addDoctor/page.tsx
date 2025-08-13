'use client'
import FormGenerator, { feild } from '@/components/FormGenerator'
import { doctor } from '@/types/doctorTypes'
import React, { useEffect, useState } from 'react'
import textContent from '@/AppContent.json'
import { usePostEntity } from '@/APIs'
import toast from 'react-hot-toast'
const content = textContent

const page = () => {
  const [DoctorData, setDoctorData] = useState<doctor|null>(null)
  const {mutate: createDoctor} = usePostEntity('clinic-manager/doctors')
  const formFields: feild[] = [
    {
      feildsType: 'text',
      name: 'name',
      value: DoctorData?.name || '',
      lable: 'Name',
      placeholder: 'Enter Doctor Name',
      required: true
    },
    {
      feildsType: 'email',
      name: 'email',
      value: DoctorData?.email || '',
      lable: 'Email',
      placeholder: 'Enter Doctor Email',
      required: true
    },
    {
      feildsType: 'password',
      name: 'password',
      value: DoctorData?.password || '',
      lable: 'Password',
      placeholder: 'Enter Doctor Password',
      required: true
    },
    {
      feildsType: 'text',
      name: 'speciality',
      value: DoctorData?.speciality || '',
      lable: 'Specialization',
      placeholder: 'Enter Specialization',
      required: true
    },
    {
      feildsType: 'text',
      name: 'phoneNumber',
      value: DoctorData?.phoneNumber || 0 ,
      lable: 'Phone Number',
      placeholder: 'Enter Phone Number',
      required: true
    },
    {
      feildsType: 'text',
      name: 'degree',
      value: DoctorData?.degree || '',
      lable: 'Degree',
      placeholder: 'Enter Doctor Degree',
      required: true
    },
    {
      feildsType: 'text',
      name: 'experience',
      value: DoctorData?.experience || '',
      lable: 'Experience',
      placeholder: 'Enter Doctor Experience',
      required: true
    },
    {
      feildsType: 'text',
      name: 'about',
      value: DoctorData?.about || '',
      lable: 'About',
      placeholder: 'Enter About Doctor',
      required: true
    },
    {
      feildsType: 'number',
      name: 'fees',
      value: DoctorData?.fees?.toString() || '',
      lable: 'Fees',
      placeholder: 'Enter Doctor Fees',
      required: true
    },
    // {
    //   feildsType: 'text',
    //   name: 'addressLine1',
    //   value: DoctorData?.address.line1 || '',
    //   lable: 'Address Line 1',
    //   placeholder: 'Enter Address Line 1',
    //   required: true
    // },
    // {
    //   feildsType: 'text',
    //   name: 'addressLine2',
    //   value: DoctorData?.address.line2|| '',
    //   lable: 'Address Line 2',
    //   placeholder: 'Enter Address Line 2',
    //   required: true
    // },
    {
      feildsType: 'file',
      name: 'image',
      value: DoctorData?.image || '',
      lable: 'Image',
      placeholder: 'Upload Doctor Image',
      required: true
    }
  ]
  const handelSubmit = () => {
    if (DoctorData) {
      if (!DoctorData.name || !DoctorData.email || !DoctorData.password) {
        toast.error("Please fill all required fields")
        return
      }
      createDoctor(DoctorData)
      console.log("Doctor Data Submitted: ", DoctorData)
    } else {
      toast.error("Doctor data is not set")
    }
  }
  return (
    <div className="w-full flex-center flex-col gap-5 flex-wrap ">
      <FormGenerator feilds={formFields} setDoctorData={setDoctorData} className="input-class" />
      <button onClick={handelSubmit} className='btn_I w-[30%] '>Create Doctor</button>
    </div>
  )
}

export default page
