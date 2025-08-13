import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast" ;
import { BackEnd_URL } from ".";

const useDeleteEntity = <T = unknown>( entity: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ( id: string | number ) => {
      const response = await axios.delete(`${BackEnd_URL}/${entity}/${id}`);
      return response.data as T;
    },
    onSuccess: () => {
      toast.success('Data deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['entity', entity] });
    },
    onError: (error: AxiosError) => {
      toast.error(error.message || 'Failed to delete data');
    },
  });
};

export default useDeleteEntity;
