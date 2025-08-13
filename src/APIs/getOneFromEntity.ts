import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
// import { toast } from "react-toastify";
import { BackEnd_URL } from ".";

const useGetOneFromEntity = <T, D>(entity: string, id: string | number) => {

  return useMutation<T, AxiosError, D>({
    mutationFn: async () => {
      const response = await axios.get(`${BackEnd_URL}/${entity}/${id}` );
      return response.data.data.doc as T ;
    },
    onSuccess: () => {
      // toast.success(" Data Got successfully");
    },
    onError: (error: AxiosError) => {
      // toast.error(error.message || " Failed to Get data");
    },
  });
};

export default useGetOneFromEntity ;
