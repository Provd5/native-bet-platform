import { type FC } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MoonStar, Sun } from "lucide-react-native";

import Icon from "~/lib/icons/Icon";
import { useColorScheme } from "~/lib/useColorScheme";

import { Button } from "./ui/button";

export const ColorSchemeToggler: FC = () => {
  const { setColorScheme, isDarkColorScheme } = useColorScheme();

  const toggleColorScheme = () => {
    setColorScheme(isDarkColorScheme ? "light" : "dark");
    AsyncStorage.setItem("theme", isDarkColorScheme ? "light" : "dark");
  };

  return (
    <Button
      size="icon"
      variant="outline"
      onPress={toggleColorScheme}
      className="mr-auto self-start"
    >
      {isDarkColorScheme ? (
        <Icon LucideIcon={MoonStar} />
      ) : (
        <Icon LucideIcon={Sun} />
      )}
    </Button>
  );
};
