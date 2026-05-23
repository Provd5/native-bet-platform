import { Appearance } from "react-native";
import { useColorScheme as useNativewindColorScheme } from "nativewind";

export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useNativewindColorScheme();

  const resolvedColorScheme =
    colorScheme ?? Appearance.getColorScheme() ?? "light";

  return {
    colorScheme: resolvedColorScheme,
    isDarkColorScheme: resolvedColorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
  };
}
