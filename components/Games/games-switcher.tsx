import { FC, useEffect } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Coins, ListChecks } from "lucide-react-native";

import { useAppDispatch, useAppSelector } from "~/hooks/redux";
import { setShowGames } from "~/lib/features/games-slice";
import Icon from "~/lib/icons/Icon";

import { Button } from "../ui/button";
import { P } from "../ui/typography";

const STORAGE_SHOW = "show";

export const GamesSwitcher: FC = () => {
  const { show } = useAppSelector((state) => state.games);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const storageShow = await AsyncStorage.getItem(STORAGE_SHOW);

      if (storageShow === "open" || storageShow === "closed") {
        handleShowGames(storageShow);
      } else {
        handleShowGames(show);
      }
    })();
  }, []);

  const handleShowGames = (newShow: "open" | "closed") => {
    AsyncStorage.setItem(STORAGE_SHOW, newShow);
    dispatch(setShowGames(newShow));
  };

  return (
    <View className="mx-auto w-full flex-row items-center justify-end gap-2 p-2 pt-0">
      <Button
        variant={show === "open" ? "default" : "outline"}
        onPress={() => handleShowGames("open")}
      >
        <View className="flex-row items-center gap-1">
          <Icon
            LucideIcon={Coins}
            size={16}
            className={
              show === "open" ? "text-primary-foreground" : "text-primary"
            }
          />
          <P>Otwarte</P>
        </View>
      </Button>
      <Button
        variant={show === "closed" ? "default" : "outline"}
        onPress={() => handleShowGames("closed")}
      >
        <View className="flex-row items-center gap-1">
          <Icon
            LucideIcon={ListChecks}
            size={16}
            className={
              show === "closed" ? "text-primary-foreground" : "text-primary"
            }
          />
          <P>Zamknięte</P>
        </View>
      </Button>
    </View>
  );
};
