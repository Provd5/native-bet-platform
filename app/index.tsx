import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

import { Logo } from "~/components/logo";
import { ScrollArea } from "~/components/scroll-area";
import { Button } from "~/components/ui/button";
import { H1, H4, P } from "~/components/ui/typography";
import { APP_TITLE, CURRENT_EVENT } from "~/constants/app";
import { useAppSelector } from "~/hooks/redux";

const links = [
  {
    href: "/games",
    label: "Obstawiaj",
  },
  {
    href: "/sign-in",
    label: "Zaloguj się",
  },
  {
    href: "/auth-callback",
    label: "Obstawiaj",
  },
] as const;

export default function Index() {
  const sessionUser = useAppSelector((state) => state.sessionUser);

  const linkToRender = links.filter((link) => {
    if (!sessionUser.dbUserData) return link.href === "/sign-in";
    else if (!sessionUser.dbUserData.isActive)
      return link.href === "/auth-callback";
    else return link.href === "/games";
  })[0];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollArea
        center
        className="mx-auto mb-12 w-full max-w-4xl px-3 pb-8 pt-6"
      >
        <Logo size="lg" className="opacity-95" />
        <H1 className="mt-4 text-center text-5xl">{APP_TITLE}</H1>
        <H4 className="mb-2 text-center text-accent-foreground/90 dark:text-accent">
          {CURRENT_EVENT}
        </H4>
        <Link key={linkToRender.href} href={linkToRender.href} asChild>
          <Button size="lg" className="mt-8 w-10/12 max-w-sm">
            <P>{linkToRender.label} 💸</P>
          </Button>
        </Link>
      </ScrollArea>
    </SafeAreaView>
  );
}
