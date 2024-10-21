import { useQuery } from "@tanstack/react-query";
import { getAuthenticatedUser } from "../../services/apiAuth";

export async function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getAuthenticatedUser,
  });

  return { isLoading, user };
}
