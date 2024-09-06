import { Link } from "expo-router";

import { Logo } from "~/components/logo";
import { SafeScrollArea } from "~/components/safe-scroll-area";
import { Button } from "~/components/ui/button";
import { H1, H4, P } from "~/components/ui/typography";
import { APP_TITLE } from "~/constants/app";
import { CURRENT_EVENT } from "~/constants/current-event";

export default function Index() {
  return (
    <SafeScrollArea center className="my-10 -mt-5">
      <Logo size="lg" />
      <H1 className="mt-6">{APP_TITLE}</H1>
      <H4>{CURRENT_EVENT}</H4>
      <Link href="/games" asChild>
        <Button size="lg" className="mt-6 w-9/12 max-w-sm">
          <P>Rozpocznij obstawianie 👉</P>
        </Button>
      </Link>
      <Link href="/sign-in" asChild>
        <Button size="lg" className="mt-3 w-9/12 max-w-sm">
          <P>Logowanie 👉</P>
        </Button>
      </Link>
      {/* {Array.from({ length: 10 }, (_, i) => (
        <Button key={i} size="lg" className="w-9/12 max-w-sm">
          <P>{i}</P>
        </Button>
      ))} */}
    </SafeScrollArea>
  );
}
