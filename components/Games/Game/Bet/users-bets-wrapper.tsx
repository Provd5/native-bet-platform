import React, { type FC } from "react";
import { View } from "react-native";

import { type GameInterface } from "~/types/games";

import { H3 } from "~/components/ui/typography";

import { GameTeams } from "../game-teams";

interface UsersBetsWrapperProps {
  children: React.ReactNode;
  game: GameInterface;
}

export const UsersBetsWrapper: FC<UsersBetsWrapperProps> = ({
  children,
  game,
}) => {
  return (
    <View className="max-h-full gap-3">
      <H3 className="text-center">Tak obstawili inni</H3>
      <GameTeams
        teams={{
          away: { icon: game.awayTeamIcon, name: game.awayTeamName },
          home: { icon: game.homeTeamIcon, name: game.homeTeamName },
        }}
        scores={{
          away: game.regularTimeScore?.away || 0,
          home: game.regularTimeScore?.home || 0,
        }}
        gameData={{
          status: game.status,
          winner: game.regularTimeScore?.winner,
        }}
      />
      {children}
    </View>
  );
};
