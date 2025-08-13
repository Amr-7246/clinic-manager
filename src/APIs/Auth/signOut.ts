import { useUserInfoContext } from "@/context/userInfoContext"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const SignOut = async (route : string, userId: string) => {
  const res = await axios.delete( `${process.env.NEXT_PUBLIC_BACK_END_URL}/${route}/${userId}`)
  return res.data
}
export const useSignOut = (route : string) => {
    const router = useRouter()
    const { ClientLogout } = useUserInfoContext()
    const clearCash = useQueryClient()

    return useMutation({
        mutationFn : (userId : any) =>SignOut(userId, route),
        onSuccess : () => {
            ClientLogout()
            clearCash.invalidateQueries({queryKey : ['user']}) ;
            toast.success(` Ok , we deleted your account `)
            router.push('/');
        },
        onError : () => toast.error('Sorry but we could not delete your account ' )
    })
}