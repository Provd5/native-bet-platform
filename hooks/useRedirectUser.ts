import { useRouter, useSegments } from "expo-router";

const routes = {
  auth: "/sign-in",
  authCallback: "/auth-callback",
  protected: "/games",
} as const;

export default function useRedirectUser() {
  const segments = useSegments();
  const router = useRouter();

  const redirectUser = (isUserActive: boolean | null) => {
    const inAuthGroup = segments[0] === "(auth)";
    const inAuthCallback = segments[0] === "(callback)";
    const inProtectedGroup = segments[0] === "(tabs)";

    if (!inAuthGroup && !inAuthCallback && !inProtectedGroup) return;

    if (!inAuthGroup && isUserActive === null) router.replace(routes.auth);

    if (!inAuthCallback && isUserActive === false)
      router.replace(routes.authCallback);

    if (!inProtectedGroup && isUserActive === true)
      router.replace(routes.protected);
  };

  return { redirectUser };
}
