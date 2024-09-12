import { useEffect } from "react";
import { router, useSegments } from "expo-router";

import { useAppSelector } from "./redux";

const routes = {
  auth: "/sign-in",
  authCallback: "/auth-callback",
  protected: "/games",
} as const;

export default function useRedirectUser() {
  const segments = useSegments();
  const sessionUser = useAppSelector((state) => state.sessionUser);
  const isUserActive = sessionUser.dbUserData
    ? sessionUser.dbUserData.isActive
    : null;

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    const inAuthCallback = segments[0] === "(callback)";
    const inProtectedGroup = segments[0] === "(tabs)";

    if (!inAuthGroup && !inAuthCallback && !inProtectedGroup) return;

    if (isUserActive === null) {
      !inAuthGroup && router.replace(routes.auth);
      return;
    }

    if (isUserActive === false) {
      !inAuthCallback && router.replace(routes.authCallback);
      return;
    }

    if (isUserActive === true) {
      !inProtectedGroup && router.replace(routes.protected);
      return;
    }
  }, [isUserActive, segments]);
}
