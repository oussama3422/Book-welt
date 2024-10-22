import { useMutation } from "@tanstack/react-query";
import { signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      console.log("user", user);
      toast.success(
        "User has been created successfully,please verify the email in your email inbox"
      );
    },
    onError: (error) => {
      console.log("error in useSignUp", error);
      toast.error("User has been not created,Error occurred!");
    },
  });

  return { signUp, isLoading };
}
