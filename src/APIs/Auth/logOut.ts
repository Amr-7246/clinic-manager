import { useUserInfoContext } from "@/context/userInfoContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LogOut = async (route:string) => {
  const res = await axios.post( `${process.env.NEXT_PUBLIC_BACK_END_URL}/${route}`, {}, { withCredentials: true }
  );
  return res.data;
};

export const useLogOut = (route:string) => {
    const CurentPath = usePathname()
    const router = useRouter()
    const { ClientLogout } = useUserInfoContext()
  return useMutation({
    mutationFn: () => LogOut(route),
    onSuccess: () => {
      ClientLogout();
      toast.success("Logged out successfully");
        router.push('/');
    },
    onError: (err) => {
      toast.error("Error logging out");
    },
  });
};
