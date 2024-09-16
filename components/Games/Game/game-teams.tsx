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
    winner: BetInterface["winner"] | undefined;
    status: GameInterface["status"];
  };
  sessionBet?: BetInterface;
  size?: "lg" | "default";
}

export const GameTeams: FC<GameTeamsProps> = ({
  teams,
  scores,
  gameData,
  sessionBet,
  size,
}) => {
  const gameTimed = gameData?.status === "TIMED";
  const gameInPlay =
    gameData?.status === "IN_PLAY" || gameData?.status === "PAUSED";
  const gameFinished = gameData?.status === "FINISHED";

  const showSessionBet = gameTimed && !!sessionBet;

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
        <View className="mx-auto flex-row">
          <H3
            className={cn(
              gameInPlay && "text-info",
              showSessionBet && "text-warning",
            )}
          >
            {showSessionBet ? sessionBet.homeGoals : scores.home}
          </H3>
          <H3
            className={cn(
              gameInPlay && "text-info",
              showSessionBet && "text-warning",
            )}
          >
            {" "}
            -{" "}
          </H3>
          <H3
            className={cn(
              gameInPlay && "text-info",
              showSessionBet && "text-warning",
            )}
          >
            {showSessionBet ? sessionBet.awayGoals : scores.away}
          </H3>
        </View>
        {gameData && (
          <P
            className={cn(
              "text-center text-sm",
              gameInPlay && "text-info",
              gameFinished && "text-muted-foreground",
            )}
            numberOfLines={1}
          >
            {translateConstantsToPolish(gameData.status)}
          </P>
        )}
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
