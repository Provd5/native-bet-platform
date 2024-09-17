import React from "react";
import { SafeAreaView } from "react-native";
import { Link } from "expo-router";

import { Logo } from "~/components/logo";
import { ScrollArea } from "~/components/scroll-area";
import { Button } from "~/components/ui/button";
import { H1, H4, P } from "~/components/ui/typography";
import { APP_TITLE, CURRENT_EVENT } from "~/constants/app";

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollArea center className="mb-12 mt-6">
        <Logo size="lg" />
        <H1 className="mt-6">{APP_TITLE}</H1>
        <H4>{CURRENT_EVENT}</H4>
        <Link href="/games" asChild>
          <Button size="lg" className="mt-6 w-9/12 max-w-sm">
            <P>Obstawiaj 👉</P>
          </Button>
        </Link>
        <Link href="/sign-in" asChild>
          <Button size="lg" className="mt-3 w-9/12 max-w-sm">
            <P>Logowanie 👉</P>
          </Button>
        </Link>
        <Link href="/auth-callback" asChild>
          <Button size="lg" className="mt-3 w-9/12 max-w-sm">
            <P>Callback 👉</P>
          </Button>
        </Link>
        {Array.from({ length: 10 }, (_, i) => (
          <Button key={i} size="lg" className="mt-2 w-9/12 max-w-sm">
            <P>{i}</P>
          </Button>
        ))}
      </ScrollArea>
    </SafeAreaView>
  );
}
