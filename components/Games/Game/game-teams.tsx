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
    <View className="flex-row items-center justify-center gap-2">
      <GameTeam
        team={teams.home}
        side={"HOME_TEAM"}
        gameData={gameData}
        sessionBet={sessionBet}
        size={size}
      />
      <View className="w-[104px] rounded-2xl border border-border/70 bg-muted/35 px-2 py-2.5">
        <View className="mx-auto flex-row items-center justify-center">
          <H3
            className={cn(
              "text-xl",
              gameInPlay && "text-info",
              showSessionBet && "text-warning",
            )}
          >
            {showSessionBet ? sessionBet.homeGoals : scores.home}
          </H3>
          <H3
            className={cn(
              "text-xl",
              gameInPlay && "text-info",
              showSessionBet && "text-warning",
            )}
          >
            {" "}
            -{" "}
          </H3>
          <H3
            className={cn(
              "text-xl",
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
              "mt-0.5 text-center text-xs",
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
