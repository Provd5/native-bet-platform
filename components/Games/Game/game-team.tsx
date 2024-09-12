import type { FC } from "react";
import React from "react";
import { Image, View } from "react-native";

import { type GameInterface } from "~/types/games";

import { H3, Muted } from "~/components/ui/typography";
import { cn, translateConstantsToPolish } from "~/lib/utils";

interface GameTeamProps {
  teamName: string;
  teamIcon: string;
  teamSide: "HOME_TEAM" | "AWAY_TEAM";
  gameData?: {
    winner: string | undefined;
    status: GameInterface["status"];
  };
  secondary?: boolean;
}

export const GameTeam: FC<GameTeamProps> = ({
  teamName,
  teamIcon,
  teamSide,
  gameData,
  secondary = false,
}) => {
  return (
    <View
      className={cn(
        "w-[50%]",
        "flex-row-reverse items-center gap-2 text-end",
        !secondary && teamSide === "AWAY_TEAM" && "flex-row text-start",
      )}
    >
      <Image
        source={{ uri: teamIcon }}
        style={{ width: 30, height: 30 }}
        alt={`${teamName} icon`}
        resizeMode="contain"
        className="pointer-events-none"
      />
      <View>
        <Muted
          className={cn(
            "-mb-1",
            !secondary && teamSide === "HOME_TEAM" && "self-end",
          )}
        >
          {translateConstantsToPolish(teamSide)}
        </Muted>
        <H3
          className={cn(
            "truncate",
            gameData?.status === "FINISHED" &&
              gameData?.winner === teamSide &&
              "text-green-600",
            !secondary && teamSide === "HOME_TEAM" && "self-end",
          )}
        >
          {teamName}
        </H3>
      </View>
    </View>
  );
};
