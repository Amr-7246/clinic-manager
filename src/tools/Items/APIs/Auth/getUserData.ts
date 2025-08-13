import { useQuery } from "@tanstack/react-query";
import { useAxiosInterceptor } from "./refreshTokens";
import { useUserInfoContext } from "../context/userInfoContext";
import {  useRouter } from "next/navigation" ;
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const GetUserData = async (userId: string, axiosInstance: any) => {
  const res = await axiosInstance.get(`/auth/user/${userId}`);
  console.log( `Here is All data from google res . .  ${JSON.stringify(res)} `)
  console.log( `Here is the user data from google res . .  ${JSON.stringify(res.data.data.doc)} `)
  return res.data.data.doc;
};

export const useGetUserData = (userId: string) => {
  const CustomAxios = useAxiosInterceptor();
  const { login } = useUserInfoContext();
  const router = useRouter();

  const query = useQuery({
    queryKey: ["userData", userId],
    queryFn: () => GetUserData(userId, CustomAxios),
    enabled: !!userId,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  useEffect(() => {
    if (query.isSuccess) {

      console.log( `Here is All data from query . .  ${query.data} `)

      login(query.data, '' ); //  Put user into context
      toast.success(`Welcome back ${query.data.name}!`);
      // router.push(`/portfolio/${user._id}`);
      router.push(`/Auth/portfolio`);
    }

    if (query.isError) {
      console.log(query.isError)
      toast.error("Failed to fetch user data. Please log in again.");

      // router.push("/Auth/login");
    }
  }, [query.isSuccess, query.isError]);

  return query;
};
