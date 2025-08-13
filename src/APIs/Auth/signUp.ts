import { useUserInfoContext } from "@/context/userInfoContext"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import {  useRouter } from "next/navigation"
import toast from "react-hot-toast"

const SignUp = async (payload : any, route:string) => {
    const res = await axios.post( `${process.env.NEXT_PUBLIC_BACK_END_URL}/${route}`, payload ,  { withCredentials: true } )
    return res.data
}
export const useSignUp = (route:string) => {
    const router = useRouter()
    const { login } = useUserInfoContext()
    const cashQurey = useQueryClient()
    return useMutation ({
        mutationFn : (payload : any ) => SignUp(payload, route),
        onSuccess : (data) => {
            const { token , data : { user } } = data
            console.log("Here is the user data after signing/in Amr . . " + user) //! Remove me
            //TODO: change the logIn data injection depending on Your the Data coming from backend
            login({
              _id: user._id,
              name: user.name,
              email: user.email,
              password: "",
              pictuer: {
                imageURL: "",
                ImageId: ""
              },
              phoneNumber: 0,
              appointments: []
            }, token );
            cashQurey.invalidateQueries({queryKey : ['user']}) ;
            toast.success(` Ok ${user.name} , we created your account Now `)
            router.push(`/auth/${user._id}`); //TODO: change that depending on Your project structuer
        },
        onError : () => toast.error('Sorry but we could not create your account ')
    })
}
