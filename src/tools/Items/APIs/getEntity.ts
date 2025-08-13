import axios, {  } from "axios";
import { useQuery } from "@tanstack/react-query";
import { BackEnd_URL } from ".";

const useGetEntity = <T>( entity: string , enabled = true ) => {
  return useQuery({
    queryKey: ['entity', entity],
    queryFn: async () => {
      const response = await axios.get(`${BackEnd_URL}/${entity}`);
      return response.data.data.docs as T ;
    },
    enabled ,
  });
};

export default useGetEntity;