import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: CreateCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("cabin has been added Successfully!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: () => {
      toast.error("cabin has  been not added, error occurred");
    },
  });

  return { isCreating, CreateCabin };
}
