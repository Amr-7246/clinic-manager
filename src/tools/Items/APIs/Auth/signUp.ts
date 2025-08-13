import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
// import { Iuse } from "../signin/page"
import {  useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useUserInfoContext } from "../context/userInfoContext"

const SignUp = async (payload : any ) => {
    const res = await axios.post( `${process.env.NEXT_PUBLIC_BACK_END_URL}/auth/signup`, payload ,  { withCredentials: true } )
    return res.data
}
export const useSignUp = () => {
    const router = useRouter()
    const cashQurey = useQueryClient()
    const { login } = useUserInfoContext()

    return useMutation ({
        mutationFn : (payload : any ) => SignUp(payload),

        onSuccess : (data) => { 
            const { token , data : { user } } = data
            // ~ Save User Data To customize the UI
                login({
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                }, token );
            // ~ Save User Data To customize the UI
            router.push('/Auth/portfolio'); // ~ Route user to him portfolio ( Fixed Route for privacy )
            // router.push(`/portfolio/${user._id}`); // ~ Route user to him portfolio ( Dynamic Route for puplicity )

            cashQurey.invalidateQueries({queryKey : ['user']}) ;
            toast.success(` Ok ${user.name} , we created your account Now `)
        },

        onError : () => toast.error('Sorry but we could not create your account ')
    })
}