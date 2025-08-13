
export interface IAppointment {
  _id?: string
  patientId? : string
  name?: string
  email?: string
  phoneNumber?: number
  doctorId?: string
  speciality?: string
  paymentState: 'online' | 'offline'
  date: {day: string, date: string}
  time: string
}

export interface IPatient {
  _id?: string
  name : string
  pictuer: {imageURL:string, ImageId: string}
  email: string
  password: string
  phoneNumber: number
  appointments?: IAppointment[]
}
