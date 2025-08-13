import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { BackEnd_URL } from ".";

const usePatchEntity = <T, D>(entity: string, id: string | number) => {
  const queryClient = useQueryClient();

  return useMutation<T, AxiosError, D>({
    mutationFn: async (data: D) => {
      const response = await axios.patch(`${BackEnd_URL}/${entity}/${id}`, data);
      return response.data as T;
    },
    onSuccess: () => {
      toast.success(" Data updated successfully");
      queryClient.invalidateQueries({ queryKey: ["entity", entity] });
    },
    onError: (error: AxiosError) => {
      toast.error(error.message || " Failed to update data");
    },
  });
};

export default usePatchEntity;
