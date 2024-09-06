import { type FC, useEffect, useState } from "react";
import { Stack } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";

import { auth } from "~/firebase.config";
import useUserActions from "~/hooks/actions/useUserActions";
import useRedirectUser from "~/hooks/useRedirectUser";

export const Stacks: FC = () => {
  const [isUserActive, setIsUserActive] = useState<boolean | null>(null);
  const { redirectUser } = useRedirectUser();

  const { getUser } = useUserActions();

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsUserActive(null);
        return;
      }

      const checkUser = async (user: User) => {
        await getUser(user.uid).then((dbUser) => {
          setIsUserActive(dbUser ? dbUser.isActive : null);
        });
      };

      void checkUser(user);
    });

    redirectUser(isUserActive);
    return subscriber;
  }, [getUser, isUserActive, redirectUser]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(callback)" options={{ headerShown: false }} />
    </Stack>
  );
};
