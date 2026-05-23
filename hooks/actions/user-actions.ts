import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useAppDispatch } from "~/hooks/redux";
import { UserService } from "~/services/user-service";

const QUERY_KEY = "user";

export function useGetUser(userId: string) {
  const userService = new UserService();

  const { data, status, refetch } = useQuery({
    queryKey: [QUERY_KEY, userId],
    queryFn: () => userService.getUser(userId),
    staleTime: Infinity,
  });

  return {
    status: status,
    data: data,
    refetch,
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userService = new UserService(dispatch);
    const unsubscribe = userService.subscribeToAuthChanges();
    return () => unsubscribe();
  }, [dispatch]);
}
