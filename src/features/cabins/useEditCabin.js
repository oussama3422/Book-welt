import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export default function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: EditCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("cabin has been Edited Successfully!");
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
      //   reset();
    },
    onError: () => {
      toast.error("cabin has  been not edited, error occurred");
    },
  });

  return { isEditing, EditCabin };
}
