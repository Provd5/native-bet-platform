import type { FC } from "react";
import { View } from "react-native";
import { Link } from "expo-router";

import { APP_TITLE, CURRENT_EVENT } from "~/constants/app";

import { ScrollArea } from "../scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { P } from "../ui/typography";

interface AuthFormWrapperProps {
  isLogin?: boolean;
  children: React.ReactNode;
}

export const AuthFormWrapper: FC<AuthFormWrapperProps> = ({
  isLogin,
  children,
}) => {
  return (
    <ScrollArea center className="mx-auto w-full max-w-3xl px-2">
      <Card className="mx-auto w-full border-border/70 bg-card/95 web:max-w-lg">
        <CardHeader>
          <CardTitle className="text-center">
            {isLogin ? "Witaj ponownie" : "Dołącz do gry"}
          </CardTitle>
          <CardDescription className="text-center">{`${APP_TITLE} - ${CURRENT_EVENT}`}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="justify-center">
          {isLogin ? (
            <View className="items-center">
              <P className="text-card-foreground/90">Nie masz jeszcze konta?</P>
              <Link href="/sign-up" asChild>
                <P className="font-customSemiBold text-primary underline">
                  Stwórz je!
                </P>
              </Link>
            </View>
          ) : (
            <View className="items-center">
              <P className="text-card-foreground/90">Masz już konto?</P>
              <Link href="/sign-in" asChild>
                <P className="font-customSemiBold text-primary underline">
                  Zaloguj się!
                </P>
              </Link>
            </View>
          )}
        </CardFooter>
      </Card>
    </ScrollArea>
  );
};
