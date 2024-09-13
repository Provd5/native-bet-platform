import type { FC } from "react";
import React from "react";
import { Image, View } from "react-native";

import { BetInterface, type GameInterface } from "~/types/games";

import { Muted, P } from "~/components/ui/typography";
import { cn, translateConstantsToPolish } from "~/lib/utils";
import { betSchemaType } from "~/lib/validators/bet-schema";

interface GameTeamProps {
  team: {
    name: string;
    icon: string;
  };
  side: Extract<betSchemaType["winner"], "HOME_TEAM" | "AWAY_TEAM">;
  gameData?: {
    winner: BetInterface["winner"] | undefined;
    status: GameInterface["status"];
  };
  sessionBet?: BetInterface;
  size?: "default" | "sm";
}

export const GameTeam: FC<GameTeamProps> = ({
  team,
  side,
  gameData,
  sessionBet,
  size = "default",
}) => {
  const sizes = {
    default: { image: 78, text: 90 },
    sm: { image: 68, text: 80 },
  };

  const gameFinished = gameData?.status === "FINISHED";

  const showSessionBet =
    !!sessionBet &&
    gameData?.status === "TIMED" &&
    (sessionBet.winner === side || sessionBet?.winner === "DRAW");
  const showWinner = gameFinished && gameData?.winner === side;
  const showLoser =
    gameFinished && gameData?.winner !== side && gameData?.winner !== "DRAW";

  return (
    <View className="items-center gap-0.5">
      <Muted
        style={{ width: sizes[size].text }}
        className="truncate text-center"
        numberOfLines={1}
      >
        {translateConstantsToPolish(side)}
      </Muted>
      <View className="rounded-2xl bg-secondary p-3">
        <Image
          source={{ uri: team.icon }}
          style={{ width: sizes[size].image, height: sizes[size].image }}
          alt={`${team.name} icon`}
          resizeMode="contain"
          className="pointer-events-none"
        />
      </View>
      <P
        style={{ width: sizes[size].text }}
        className={cn(
          "truncate text-center",
          showSessionBet && "text-warning",
          showWinner && "font-customSemiBold text-success",
          showLoser && "text-destructive",
        )}
        numberOfLines={1}
      >
        {team.name}
      </P>
    </View>
  );
};
