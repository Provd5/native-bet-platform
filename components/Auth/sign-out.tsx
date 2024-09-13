import type { FC } from "react";
import { View } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react-native";

import { auth } from "~/firebase.config";
import { useAppDispatch } from "~/hooks/redux";
import { setUserData } from "~/lib/features/session-user-slice";
import Icon from "~/lib/icons/Icon";

import { DropdownMenuItem } from "../ui/dropdown-menu";
import { P } from "../ui/typography";

export const SignOut: FC = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const signOutUser = (): void => {
    try {
      signOut(auth).then(() => {
        dispatch(setUserData({ dbUserData: null, fsUserData: null }));
        queryClient.clear();
      });
    } catch (e) {
      alert(`Coś poszło nie tak podczas próby wylogowania: ${e}`);
    }
  };

  return (
    <DropdownMenuItem onPress={() => signOutUser()}>
      <View className="flex-row items-center gap-1">
        <Icon LucideIcon={LogOut} size={18} />
        <P className="flex-row gap-1">Wyloguj</P>
      </View>
    </DropdownMenuItem>
  );
};
