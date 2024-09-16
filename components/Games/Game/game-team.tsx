import type { FC } from "react";
import React from "react";
import { View } from "react-native";

import { BetInterface, type GameInterface } from "~/types/games";

import { TeamIcon } from "~/components/team-icon";
import { Muted, P } from "~/components/ui/typography";
import { cn, translateConstantsToPolish } from "~/lib/utils";

interface GameTeamProps {
  team: {
    name: string;
    icon: string;
  };
  side: Extract<BetInterface["winner"], "HOME_TEAM" | "AWAY_TEAM">;
  gameData?: {
    winner: BetInterface["winner"] | undefined;
    status: GameInterface["status"];
  };
  sessionBet?: BetInterface;
  size?: "lg" | "default";
}

export const GameTeam: FC<GameTeamProps> = ({
  team,
  side,
  gameData,
  sessionBet,
  size = "default",
}) => {
  const sizes = {
    lg: 88,
    default: 76,
  };

  const gameFinished = gameData?.status === "FINISHED";

  const showSessionBet =
    !!sessionBet &&
    gameData?.status === "TIMED" &&
    (sessionBet.winner === side || sessionBet?.winner === "DRAW");
  const showWinner =
    (gameFinished && gameData?.winner === side) || gameData?.winner === "DRAW";
  const showLoser =
    gameFinished && gameData?.winner !== side && gameData?.winner !== "DRAW";

  return (
    <View className="items-center gap-0.5">
      <Muted
        style={{ width: sizes[size] }}
        className="text-center"
        numberOfLines={1}
      >
        {translateConstantsToPolish(side)}
      </Muted>
      <TeamIcon
        icon={{ uri: team.icon, alt: `${team.name} icon` }}
        size={size}
      />
      <P
        style={{ width: sizes[size] }}
        className={cn(
          "text-center",
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
