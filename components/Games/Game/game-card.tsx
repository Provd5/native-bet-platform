import React, { FC } from "react";
import { View } from "react-native";

import { BetInterface, GameInterface } from "~/types/games";

import { Muted, P } from "~/components/ui/typography";
import { cn, dateFormat, translateConstantsToPolish } from "~/lib/utils";

import { BetMade } from "./Bet/bet-made";
import { GameTeams } from "./game-teams";

interface GameCardProps {
  game: GameInterface;
  sessionBet: BetInterface | undefined;
  isOdd: boolean;
}

export const GameCard: FC<GameCardProps> = ({ game, sessionBet, isOdd }) => {
  return (
    <View
      className={cn(
        "w-full justify-center gap-1 border-t border-border py-2 web:cursor-pointer web:hover:bg-muted-foreground/20",
        isOdd && "bg-muted/30",
      )}
    >
      <View className="relative mx-auto w-full max-w-4xl px-2">
        {!!sessionBet && <BetMade />}
        <GameTeams
          teams={{
            home: { icon: game.homeTeamIcon, name: game.homeTeamName },
            away: { icon: game.awayTeamIcon, name: game.awayTeamName },
          }}
          scores={{
            home: game.regularTimeScore?.home || 0,
            away: game.regularTimeScore?.away || 0,
          }}
          gameData={{
            status: game.status,
            winner: game.regularTimeScore?.winner,
          }}
          sessionBet={sessionBet}
          size="lg"
        />
        <View className="mt-1 w-full flex-row items-center justify-between">
          <P
            className={cn(
              game.stage === "FINAL" && "text-orange-600 dark:text-orange-500",
              game.stage === "SEMI_FINALS" &&
                "text-cyan-600 dark:text-cyan-400",
            )}
          >
            {translateConstantsToPolish(game.stage)}
          </P>
          <Muted
            className="whitespace-nowrap"
            style={{ textTransform: "capitalize" }}
          >
            {dateFormat(game.timestamp)}
          </Muted>
        </View>
      </View>
    </View>
  );
};
