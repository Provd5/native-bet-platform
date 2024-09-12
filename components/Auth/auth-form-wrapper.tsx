import type { FC } from "react";
import { View } from "react-native";
import { Link } from "expo-router";

import { APP_TITLE } from "~/constants/app";
import { CURRENT_EVENT } from "~/constants/current-event";

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
    <ScrollArea center className="mx-2">
      <Card className="mx-auto w-full web:max-w-lg">
        <CardHeader>
          <CardTitle>{isLogin ? "Zaloguj się" : "Stwórz konto"}</CardTitle>
          <CardDescription>{`${APP_TITLE} - ${CURRENT_EVENT}`}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          {isLogin ? (
            <View>
              <P className="mr-1 text-card-foreground">
                Nie masz jeszcze konta?
              </P>
              <Link href="/sign-up" asChild>
                <P className="text-card-foreground underline">Stwórz je!</P>
              </Link>
            </View>
          ) : (
            <View>
              <P className="mr-1 text-card-foreground">Masz już konto?</P>
              <Link href="/sign-in">
                <P className="text-card-foreground underline">Zaloguj się!</P>
              </Link>
            </View>
          )}
        </CardFooter>
      </Card>
    </ScrollArea>
  );
};
