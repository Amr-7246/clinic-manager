import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { usePathname, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useUserInfoContext } from "../context/userInfoContext"

const SignOut = async (userId : any ) => {
    const res = await axios.delete( `${process.env.NEXT_PUBLIC_BACK_END_URL}/auth/signout/${userId}`)
    return res.data
}
export const useSignOut = () => {
    const CurentPath = usePathname()
    const router = useRouter()
    const { ClientLogout } = useUserInfoContext()
    const clearCash = useQueryClient()

    return useMutation({
        mutationFn : (userId : any ) =>SignOut(userId),
        onSuccess : () => {
            ClientLogout()
            clearCash.invalidateQueries({queryKey : ['user']}) ;
            toast.success(` Ok , we deleted your account `)
            if(CurentPath == '/Auth/portfolio') {
                router.push('/');
            }
        },
        onError : () => toast.error('Sorry but we could not delete your account ' )
    })
}