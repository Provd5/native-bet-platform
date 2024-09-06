import { type FC, useEffect } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MoonStar } from "~/lib/icons/MoonStar";
import { Sun } from "~/lib/icons/Sun";
import { useColorScheme } from "~/lib/useColorScheme";

import { Button } from "./ui/button";

export const ColorSchemeToggler: FC = () => {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();

  const toggleColorScheme = () => {
    setColorScheme(isDarkColorScheme ? "light" : "dark");
  };

  useEffect(() => {
    AsyncStorage.setItem("theme", colorScheme);
  }, [colorScheme]);

  return (
    <View className="m-3 ml-auto">
      <Button size="icon" variant="outline" onPress={toggleColorScheme}>
        {isDarkColorScheme ? (
          <MoonStar className="text-foreground" />
        ) : (
          <Sun className="text-foreground" />
        )}
      </Button>
    </View>
  );
};
