import type { FC } from "react";
import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { CircleUser, LogOut, Mail } from "lucide-react-native";

import { auth } from "~/firebase.config";
import { useAppDispatch, useAppSelector } from "~/hooks/redux";
import { setUserData } from "~/lib/features/session-user-slice";
import Icon from "~/lib/icons/Icon";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { P } from "../ui/typography";

export const AccountBadge: FC = () => {
  const sessionUser = useAppSelector((state) => state.sessionUser);
  const dispatch = useAppDispatch();

  if (!sessionUser.dbUserData || !sessionUser.fsUserData) return null;

  const signOutUser = (): void => {
    try {
      signOut(auth).then(() => {
        dispatch(setUserData({ dbUserData: null, fsUserData: null }));
        router.replace("/sign-in");
      });
    } catch (e) {
      alert(`Coś poszło nie tak podczas próby wylogowania: ${e}`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <View className="flex-row items-center gap-1">
            <Icon
              LucideIcon={CircleUser}
              size={20}
              className="text-primary-foreground"
            />
            <P>{sessionUser.dbUserData.username}</P>
          </View>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" insets={{ right: 8, left: 8 }}>
        <DropdownMenuLabel className="flex py-3">
          <View className="flex-row items-center gap-1">
            <Icon LucideIcon={Mail} size={18} />
            <P>{sessionUser.fsUserData.email}</P>
          </View>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onPress={() => signOutUser()}>
          <View className="flex-row items-center gap-1">
            <Icon LucideIcon={LogOut} size={18} />
            <P className="flex-row gap-1">Wyloguj</P>
          </View>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
