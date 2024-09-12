import React, { FC } from "react";
import { View } from "react-native";

import { BetInterface, GameInterface } from "~/types/games";

import { Muted, P } from "~/components/ui/typography";
import { cn, dateFormat, translateConstantsToPolish } from "~/lib/utils";

import { BetMade } from "./Bet/bet-made";
import { GameCardTeams } from "./game-card-teams";

interface GameCardProps {
  game: GameInterface;
  sessionBet: BetInterface | undefined;
}

export const GameCard: FC<GameCardProps> = ({ game, sessionBet }) => {
  return (
    <View className="w-full justify-center gap-1 border-y border-border pb-4 pt-3 web:cursor-pointer web:transition-transform web:hover:scale-105 web:hover:bg-gray-500/10">
      <View className="mx-auto w-full max-w-5xl">
        <View className="items-center">
          <P
            className={cn(
              "text-sm",
              (game.status === "IN_PLAY" || game.status === "PAUSED") &&
                "text-destructive",
              game.status === "FINISHED" && "text-gray-500",
            )}
          >
            {translateConstantsToPolish(game.status)}
          </P>
          <GameCardTeams game={game} />
        </View>
        <View className="w-full flex-row justify-between">
          {!!sessionBet && <BetMade game={game} sessionBet={sessionBet} />}
          <View>
            <P
              className={cn(
                game.stage === "FINAL" &&
                  "text-orange-600 dark:text-orange-500",
                game.stage === "SEMI_FINALS" &&
                  "text-cyan-600 dark:text-cyan-400",
              )}
            >
              {translateConstantsToPolish(game.stage)}
            </P>
            <Muted className="whitespace-nowrap first-letter:uppercase">
              {dateFormat(game.timestamp)}
            </Muted>
          </View>
        </View>
      </View>
    </View>
  );
};
