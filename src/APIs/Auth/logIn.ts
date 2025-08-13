import { useUserInfoContext } from "@/context/userInfoContext"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const LogIn = async ({ email, password, route }: { email: string, password: string, route:string }) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_END_URL}/${route}`, {
        email,
        password,
    } , { withCredentials: true })
    return res.data
}
export const useLogIn = (route:string) => {
        const router = useRouter()
        const { login } = useUserInfoContext()
        const cashQurey = useQueryClient()
    return useMutation ({
        mutationFn: ({ email, password }: { email: string; password: string }) => LogIn({email, password, route}),
        onSuccess: (data : any ) => {
          const { token , data : { user } } = data
          console.log("Here is the user data after logging/in Amr . . " + user) //! Remove me
            //TODO: change the logIn data injection depending on Your the Data coming from backend
            login({
              password: "",
              name: user.name,
              email: user.email,
              _id: user._id,
              pictuer: {
                imageURL: "",
                ImageId: ""
              },
              phoneNumber: 0,
              appointments: []
            }, token );
            cashQurey.invalidateQueries({queryKey : ['user']}) ;
            toast.success(` Welcom back ${user.name} . . Here is your portfolio `)
            router.push(`/auth/${user._id}`); //TODO: change that depending on Your project structuer
        },
        onError: () => {
            toast.error('sorry beasty . . But there is somthing wrong ')
        },
    })
}
