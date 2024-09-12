import type { FC } from "react";
import { View } from "react-native";

import { GameInterface } from "~/types/games";

import { H3 } from "~/components/ui/typography";
import { cn } from "~/lib/utils";

import { GameTeam } from "./game-team";

interface GameCardTeamsProps {
  game: GameInterface;
}

export const GameCardTeams: FC<GameCardTeamsProps> = ({ game }) => {
  return (
    <View className="w-full flex-row justify-center gap-3">
      <GameTeam
        teamName={game.homeTeamName}
        teamIcon={game.homeTeamIcon}
        teamSide={"HOME_TEAM"}
        gameData={{
          winner: game.regularTimeScore?.winner,
          status: game.status,
        }}
      />
      <View className="min-w-fit self-center">
        <H3
          className={cn(
            "mx-auto w-fit whitespace-nowrap",
            (game.status === "IN_PLAY" || game.status === "PAUSED") &&
              "text-destructive",
          )}
        >{`${game.regularTimeScore?.home || 0} - ${game.regularTimeScore?.away || 0}`}</H3>
      </View>

      <GameTeam
        teamName={game.awayTeamName}
        teamIcon={game.awayTeamIcon}
        teamSide={"AWAY_TEAM"}
        gameData={{
          winner: game.regularTimeScore?.winner,
          status: game.status,
        }}
      />
    </View>
  );
};
