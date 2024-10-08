import React, { useEffect, useState } from "react";
import { Appearance, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
  useFonts,
} from "@expo-google-fonts/rubik";
import { PortalHost } from "@rn-primitives/portal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PageTitle } from "~/components/MetaTags/page-title";
import { Notifications } from "~/components/notifications";
import { Stacks } from "~/components/stacks";
import { NAV_THEME } from "~/lib/constants";
import { store } from "~/lib/store";
import { useColorScheme } from "~/lib/useColorScheme";

import "../global.css";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryClient = new QueryClient();

  const [fontsLoaded] = useFonts({
    "Rubik-Regular": Rubik_400Regular,
    "Rubik-Medium": Rubik_500Medium,
    "Rubik-SemiBold": Rubik_600SemiBold,
    "Rubik-Bold": Rubik_700Bold,
  });
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }

      if (!theme) {
        const appearance = Appearance.getColorScheme();
        AsyncStorage.setItem("theme", appearance === "dark" ? "dark" : "light");
        setIsColorSchemeLoaded(true);
        return;
      }

      const appearance = theme === "dark" ? "dark" : "light";
      if (appearance !== colorScheme) {
        setColorScheme(appearance);

        setIsColorSchemeLoaded(true);
        return;
      }

      setIsColorSchemeLoaded(true);
    })().finally(() => {
      if (fontsLoaded) SplashScreen.hideAsync();
    });
  }, [colorScheme, fontsLoaded, setColorScheme]);

  if (!isColorSchemeLoaded || !fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SafeAreaProvider>
          <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <>
              <PageTitle />
              <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
              <Stacks />
              <Notifications />
              <PortalHost />
            </>
          </ThemeProvider>
        </SafeAreaProvider>
      </Provider>
    </QueryClientProvider>
  );
}
