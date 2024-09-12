import type { FC } from "react";
import { View } from "react-native";

import { BetInterface, GameInterface } from "~/types/games";

import { H3, P } from "~/components/ui/typography";
import { cn, translateConstantsToPolish } from "~/lib/utils";

import { GameTeam } from "./game-team";

interface GameTeamsProps {
  teams: {
    home: {
      name: string;
      icon: string;
    };
    away: {
      name: string;
      icon: string;
    };
  };
  scores: {
    home: number;
    away: number;
  };
  gameData?: {
    winner: string | undefined;
    status: GameInterface["status"];
  };
  sessionBet?: BetInterface;
  size?: "default" | "sm";
}

export const GameTeams: FC<GameTeamsProps> = ({
  teams,
  scores,
  gameData,
  sessionBet,
  size,
}) => {
  const showSessionBet = !!sessionBet && gameData?.status === "TIMED";

  return (
    <View className="flex-row justify-center gap-3">
      <GameTeam
        team={teams.home}
        side={"HOME_TEAM"}
        gameData={gameData}
        sessionBet={sessionBet}
        size={size}
      />
      <View className="w-20 self-center">
        {gameData && (
          <P
            className={cn(
              "truncate text-center text-sm",
              (gameData.status === "IN_PLAY" || gameData.status === "PAUSED") &&
                "text-info",
              gameData.status === "FINISHED" && "text-muted-foreground",
            )}
            numberOfLines={1}
          >
            {translateConstantsToPolish(gameData.status)}
          </P>
        )}
        <View
          className={cn(
            "mx-auto flex-row",
            (gameData?.status === "IN_PLAY" || gameData?.status === "PAUSED") &&
              "text-info",
          )}
        >
          <H3 className={cn(showSessionBet && "text-warning")}>
            {showSessionBet ? sessionBet.homeGoals : scores.home}
          </H3>
          <H3 className={cn(showSessionBet && "text-warning")}> - </H3>
          <H3 className={cn(showSessionBet && "text-warning")}>
            {showSessionBet ? sessionBet.awayGoals : scores.away}
          </H3>
        </View>
      </View>
      <GameTeam
        team={teams.away}
        side={"AWAY_TEAM"}
        gameData={gameData}
        sessionBet={sessionBet}
        size={size}
      />
    </View>
  );
};
