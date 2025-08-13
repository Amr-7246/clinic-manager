export interface speciality {
  speciality: string
  image: string
}

export interface doctor {
  _id?: string
  name: string
  email: string
  password: string
  image: string
  speciality: string
  phoneNumber?: number
  degree: string
  experience: string
  about: string
  fees: number | any
  address: {
    line1: string
    line2: string
  }
}
