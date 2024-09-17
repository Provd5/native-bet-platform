import { FC } from "react";
import { useSegments } from "expo-router";
import Head from "expo-router/head";

import { APP_TITLE, CURRENT_EVENT } from "~/constants/app";

export const PageTitle: FC = () => {
  const segments = useSegments();

  const template = (title?: string, subTitle?: string): string =>
    (title ? title : CURRENT_EVENT) +
    (subTitle ? ` - ${subTitle}` : "") +
    ` | ${APP_TITLE}`;

  let title = template();
  let subTitle = "";

  if (segments[1] === "auth-callback") title = "Konto nieaktywowane";
  if (segments[1] === "sign-in") title = "Zaloguj się";
  if (segments[1] === "sign-up") title = "Stwórz konto";
  if (segments[1] === "results") title = "Wyniki";
  if (segments[1] === "games") {
    title = "Mecze";
    subTitle = "Otwarte";
    if (segments[2] === "closed") subTitle = "Zamknięte";
    if (segments[2] === "finals") subTitle = "Finaliści";
  }

  return (
    <Head>
      <title>{template(title, subTitle)}</title>
    </Head>
  );
};
