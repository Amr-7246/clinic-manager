'use client'
import FormGenerator, { feild } from '@/components/FormGenerator'
import { doctor } from '@/types/doctorTypes'
import React, { useEffect, useState } from 'react'
import textContent from '@/AppContent.json'
import { usePatchEntity} from '@/APIs'
import toast from 'react-hot-toast'
const content = textContent

const EditDoctor = ({setWhoEditied, WhoEditied} : {setWhoEditied:any , WhoEditied:doctor|null} ) => {
  // const [WhoEditied, setWhoEditied] = useState<doctor|null>(null)
  const {mutate: editDoctor} = usePatchEntity('clinic-manager/doctors', WhoEditied?._id)
  
  const formFields: feild[] = [
    {
      feildsType: 'text',
      name: 'name',
      value: WhoEditied?.name || '',
      lable: 'Name',
      placeholder: 'Enter Doctor Name',
      required: true
    },
    {
      feildsType: 'email',
      name: 'email',
      value: WhoEditied?.email || '',
      lable: 'Email',
      placeholder: 'Enter Doctor Email',
      required: true
    },
    {
      feildsType: 'password',
      name: 'password',
      value: WhoEditied?.password || '',
      lable: 'Password',
      placeholder: 'Enter Doctor Password',
      required: true
    },
    {
      feildsType: 'text',
      name: 'speciality',
      value: WhoEditied?.speciality || '',
      lable: 'Specialization',
      placeholder: 'Enter Specialization',
      required: true
    },
    {
      feildsType: 'text',
      name: 'phoneNumber',
      value: WhoEditied?.phoneNumber || 0 ,
      lable: 'Phone Number',
      placeholder: 'Enter Phone Number',
      required: true
    },
    {
      feildsType: 'text',
      name: 'degree',
      value: WhoEditied?.degree || '',
      lable: 'Degree',
      placeholder: 'Enter Doctor Degree',
      required: true
    },
    {
      feildsType: 'text',
      name: 'experience',
      value: WhoEditied?.experience || '',
      lable: 'Experience',
      placeholder: 'Enter Doctor Experience',
      required: true
    },
    {
      feildsType: 'text',
      name: 'about',
      value: WhoEditied?.about || '',
      lable: 'About',
      placeholder: 'Enter About Doctor',
      required: true
    },
    {
      feildsType: 'number',
      name: 'fees',
      value: WhoEditied?.fees?.toString() || '',
      lable: 'Fees',
      placeholder: 'Enter Doctor Fees',
      required: true
    },
    // {
    //   feildsType: 'text',
    //   name: 'addressLine1',
    //   value: WhoEditied?.address.line1 || '',
    //   lable: 'Address Line 1',
    //   placeholder: 'Enter Address Line 1',
    //   required: true
    // },
    // {
    //   feildsType: 'text',
    //   name: 'addressLine2',
    //   value: WhoEditied?.address.line2|| '',
    //   lable: 'Address Line 2',
    //   placeholder: 'Enter Address Line 2',
    //   required: true
    // },
    {
      feildsType: 'file',
      name: 'image',
      value: WhoEditied?.image || '',
      lable: 'Image',
      placeholder: 'Upload Doctor Image',
      required: true
    }
  ]
  const handelSubmit = () => {
    if (WhoEditied) {
      if (!WhoEditied.name || !WhoEditied.email || !WhoEditied.password || WhoEditied?._id == undefined ) {
        toast.error("Please fill all required fields")
        return
      }
      editDoctor(WhoEditied)
      console.log('Here is the id Amr . . ' + WhoEditied._id)
      setWhoEditied(null)
    } else {
      toast.error("Doctor data is not set")
    }
  }
  return (
    <div className="w-full flex-center flex-col gap-5 flex-wrap ">
      <FormGenerator feilds={formFields} className="" setDoctorData={setWhoEditied} />
      <div className='flex gap-5'>
        <button onClick={() => setWhoEditied(null)} className='btn_II' >close</button>
        <button onClick={handelSubmit} className='btn_I w-full '>Edit Doctor Data</button>
      </div>
    </div>
  )
}

export default EditDoctor
