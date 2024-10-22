import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  console.log("error in use useUser", error);
  return {
    isLoading,
    user,
    isAuthenticated: user?.role?.trim() === "authenticated",
  };
}
