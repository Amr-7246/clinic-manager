import { doctor } from '@/types/doctorTypes'
import React from 'react'

export interface feild{
  feildsType: string
  name: string
  value: string|number
  lable: string
  placeholder: string
  required?: boolean
  options?: string[]
}
interface Props {
  feilds: feild[]
  setDoctorData: React.Dispatch<React.SetStateAction<doctor | any>>
  className: string
}

const FormGenerator = (InputFeilds: Props) => {
    const handleChange = (e:any) => {
      InputFeilds.setDoctorData( (prev:doctor) => { 
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      } )
    } 
  return (
    <form className={`flex-center flex-col lg:flex-row flex-wrap gap-5`} >
      {InputFeilds.feilds.map((field, idx) => (
        <div className="flex flex-col w-full lg:w-[40%] gap-2" key={idx}>
          <label htmlFor={field.name} >
            {field.lable}
          </label>

          <input 
            type={field.feildsType} 
            name={field.name} 
            value={field.value} 
            onChange={(e) => handleChange(e)} 
            className={`${InputFeilds.className} input`} 
            placeholder={field.placeholder}
            required={field.required}
            />
        </div>
      ))}
    </form>
  )
}

export default FormGenerator