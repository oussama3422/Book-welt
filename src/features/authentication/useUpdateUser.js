import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);
      toast.success("User account successfully updated");
    },
    onError: () => {
      toast.error("User account not updated.");
    },
  });

  return { updateUser, isUpdating };
}
