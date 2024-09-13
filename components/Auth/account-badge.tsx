import type { FC } from "react";
import React from "react";
import { View } from "react-native";
import { CircleUser, Mail } from "lucide-react-native";

import { useAppSelector } from "~/hooks/redux";
import Icon from "~/lib/icons/Icon";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { P } from "../ui/typography";
import { SignOut } from "./sign-out";

export const AccountBadge: FC = () => {
  const sessionUser = useAppSelector((state) => state.sessionUser);

  if (!sessionUser.dbUserData || !sessionUser.fsUserData) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>
          <View className="flex-row items-center gap-1">
            <Icon LucideIcon={CircleUser} size={20} />
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
        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
