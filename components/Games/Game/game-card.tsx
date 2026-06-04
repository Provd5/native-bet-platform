import React, { FC } from "react";
import { View } from "react-native";

import { BetInterface, GameInterface } from "~/types/games";

import { GameReactions } from "~/components/Reactions/game-reactions";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Muted, P } from "~/components/ui/typography";
import { cn, dateFormat, translateConstantsToPolish } from "~/lib/utils";

import { GameTeams } from "./game-teams";
import { CircleCheckBig } from "lucide-react-native";
import Icon from "~/lib/icons/Icon";

interface GameCardProps {
  game: GameInterface;
  sessionBet: BetInterface | undefined;
  isOdd: boolean;
}

export const GameCard: FC<GameCardProps> = ({ game, sessionBet, isOdd }) => {
  const isFinal = game.stage === "FINAL";
  const isSemiFinal = game.stage === "SEMI_FINALS";

  return (
    <Card
      className={cn(
        "mb-2.5 w-full border border-border/70 bg-card/95 shadow-sm shadow-foreground/10",
        isOdd && "bg-secondary/25",
        "web:cursor-pointer web:transition-transform web:duration-200 web:hover:translate-y-[-1px]",
      )}
    >
      <CardHeader className="pb-2 pt-3">
        <View className="grid grid-cols-3 items-center justify-items-center gap-2">
          <View className="justify-self-start rounded-full border border-border/80 bg-muted/40 px-2.5 py-1">
            <P
              className={cn(
                "font-customSemiBold text-xs",
                isFinal && "text-warning",
                isSemiFinal && "text-info",
              )}
            >
              {translateConstantsToPolish(game.stage)}
            </P>
          </View>

          <Muted
            className="text-center text-xs"
            style={{ textTransform: "capitalize" }}
          >
            {dateFormat(game.timestamp)}
          </Muted>

          {!!sessionBet && (
            <View className="flex-row items-center gap-1 justify-self-end rounded-full bg-success px-2.5 py-1">
              <Icon
                LucideIcon={CircleCheckBig}
                size={12}
                className="text-white"
              />
              <P className="text-xs text-white">Bet</P>
            </View>
          )}
        </View>
      </CardHeader>

      <CardContent className="px-3.5 pb-3.5 pt-0">
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
        <GameReactions gameId={game.id} />
      </CardContent>
    </Card>
  );
};
