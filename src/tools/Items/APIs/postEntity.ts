import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { BackEnd_URL } from ".";

const usePostEntity = <T = unknown , D = unknown >( entity: string, ) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: D) => {
      const response = await axios.post(`${BackEnd_URL}/${entity}`, data);
      return response.data as T;
    },
    onSuccess: () => {
      toast.success('Data created successfully');
      queryClient.invalidateQueries({ queryKey: ['entity', entity] });
    },
    onError: (error: AxiosError) => {
      toast.error(error.message || 'Failed to create data');
    },
  });
};

export default usePostEntity;
