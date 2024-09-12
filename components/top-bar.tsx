import type { FC } from "react";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AccountBadge } from "./Auth/account-badge";
import { ColorSchemeToggler } from "./color-scheme-toggler";

export const TopBar: FC = () => {
  return (
    <SafeAreaView>
      <View className="m-3 flex-row items-center justify-end gap-1">
        <ColorSchemeToggler />
        <AccountBadge />
      </View>
    </SafeAreaView>
  );
};
