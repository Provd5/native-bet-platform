import type { FC } from "react";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { ColorSchemeToggler } from "./color-scheme-toggler";

export const TopBar: FC = () => {
  return (
    <SafeAreaView>
      <ColorSchemeToggler />
    </SafeAreaView>
  );
};
