import type { FC } from "react";
import React from "react";
import { View } from "react-native";
import { ChevronDown, Mail } from "lucide-react-native";

import { useAppSelector } from "~/hooks/redux";
import Icon from "~/lib/icons/Icon";

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

  const username = sessionUser.dbUserData.username;
  const initial = username.slice(0, 1).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex-row items-center rounded-2xl border border-border/70 bg-card px-2.5 py-2">
        <View className="flex-row items-center gap-2">
          <View className="h-6 w-6 items-center justify-center rounded-full bg-primary">
            <P className="font-customSemiBold text-xs text-primary-foreground">
              {initial}
            </P>
          </View>
          <P
            className="max-w-[96px] font-customSemiBold text-sm"
            numberOfLines={1}
          >
            {username}
          </P>
          <Icon
            LucideIcon={ChevronDown}
            size={14}
            className="text-muted-foreground"
          />
        </View>
      </DropdownMenuTrigger>
      <DropdownMenuContent insets={{ right: 8, left: 8 }} align="end">
        <DropdownMenuLabel className="flex py-2">
          <View className="flex-row items-center gap-1">
            <Icon
              LucideIcon={Mail}
              size={14}
              className="text-muted-foreground"
            />
            <P className="text-sm text-muted-foreground" numberOfLines={1}>
              {sessionUser.fsUserData.email}
            </P>
          </View>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
