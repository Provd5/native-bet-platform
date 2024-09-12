import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { UserService } from "~/services/user-service";

const QUERY_KEY = "user";

export function useGetUser(userId: string) {
  const userService = new UserService();

  const { data, status } = useQuery({
    queryKey: [QUERY_KEY, userId],
    queryFn: () => userService.getUser(userId),
  });

  return {
    status: status,
    data: data,
  };
}

export function useCreateUser() {
  const userService = new UserService();

  const { mutateAsync, error } = useMutation({
    mutationFn: (payload: { userId: string; username: string }) =>
      userService.createUser(payload.userId, payload.username),
  });

  return {
    createUserAsync: mutateAsync,
    error,
  };
}

export function useAuthChangesSubscriber() {
  const userService = new UserService();

  useEffect(() => {
    const unsubscribe = userService.subscribeToAuthChanges();
    return () => unsubscribe();
  }, []);
}
