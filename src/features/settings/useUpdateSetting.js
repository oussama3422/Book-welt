import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export default function useEditSetting() {
  const queryClient = useQueryClient();

  const { mutate: EditSetting, isLoading: isSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting has been Edited Successfully!");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: () => {
      toast.error("Setting has  been not edited, error occurred");
    },
  });

  return { isSetting, EditSetting };
}
