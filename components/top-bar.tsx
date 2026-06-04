import type { FC } from "react";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { APP_TITLE, CURRENT_EVENT } from "~/constants/app";

import { AccountBadge } from "./Auth/account-badge";
import { ColorSchemeToggler } from "./color-scheme-toggler";
import { Muted, P } from "./ui/typography";

export const TopBar: FC = () => {
  return (
    <SafeAreaView edges={["top"]} className="z-50 bg-background px-3 pb-1">
      <View className="flex-row items-center gap-2 rounded-2xl border border-border/70 bg-card/95 p-2.5 shadow-sm shadow-foreground/10">
        <View className="flex-1 flex-row items-center gap-3">
          <ColorSchemeToggler />
          <View className="flex">
            <P className="font-customBold text-base text-foreground">
              {APP_TITLE}
            </P>
            <Muted className="text-[10px] uppercase tracking-wide">
              {CURRENT_EVENT}
            </Muted>
          </View>
        </View>
        <AccountBadge />
      </View>
    </SafeAreaView>
  );
};
