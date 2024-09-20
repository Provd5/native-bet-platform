import type { FC } from "react";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import { useAppSelector } from "~/hooks/redux";

import { PageLoader } from "./Loaders/page-loader";

interface RouteRedirectProps {
  children: React.ReactNode;
  layout: "auth" | "callback" | "tabs";
}

export const RouteRedirect: FC<RouteRedirectProps> = ({ children, layout }) => {
  const [loadChildren, setLoadChildren] = useState(false);
  const router = useRouter();
  const sessionUser = useAppSelector((state) => state.sessionUser);
  const isSession =
    sessionUser.dbUserData !== undefined &&
    sessionUser.fsUserData !== undefined;
  const isUserActive = sessionUser.dbUserData
    ? sessionUser.dbUserData.isActive
    : "not logged in";

  useEffect(() => {
    if (!isSession) return;

    if (layout !== "auth" && isUserActive === "not logged in") {
      router.replace("/sign-in");
    } else if (layout !== "callback" && isUserActive === false) {
      router.replace("/auth-callback");
    } else if (layout !== "tabs" && isUserActive === true) {
      router.replace("/games");
    }

    setLoadChildren(true);
  }, [isSession, isUserActive, layout, router]);

  if (!isSession) return <PageLoader />;

  return loadChildren ? children : <PageLoader />;
};
