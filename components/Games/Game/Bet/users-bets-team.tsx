import type { FC } from "react";
import { View } from "react-native";
import { CheckCircle, CircleEqual } from "lucide-react-native";

import { BetInterface } from "~/types/games";

import { TeamIcon } from "~/components/team-icon";
import { P } from "~/components/ui/typography";
import Icon from "~/lib/icons/Icon";
import { cn } from "~/lib/utils";

interface UsersBetsTeamProps {
  conditions: {
    gameInPlay: boolean;
    accurateScoreHit: boolean;
    scoreInPlay: boolean;
    winnerHit: boolean;
  };
  game: {
    teamIcon: string;
    teamName: string;
    side: Extract<BetInterface["winner"], "HOME_TEAM" | "AWAY_TEAM">;
  };
  bet: {
    goals: number;
    winner: BetInterface["winner"];
  };
}

export const UsersBetsTeam: FC<UsersBetsTeamProps> = ({
  conditions,
  game,
  bet,
}) => {
  const { accurateScoreHit, gameInPlay, scoreInPlay, winnerHit } = conditions;

  return (
    <View className="flex-row items-center gap-1">
      <P
        className={cn(
          "w-8 text-center font-customBold text-xl",
          accurateScoreHit
            ? "text-success"
            : scoreInPlay
              ? "text-warning"
              : "text-destructive",
        )}
        numberOfLines={1}
      >
        {bet.goals}
      </P>
      <View className="relative">
        {(bet.winner === game.side || bet.winner === "DRAW") && (
          <View className="absolute bottom-0.5 right-0.5 z-50">
            <Icon
              className={
                winnerHit
                  ? "text-success"
                  : gameInPlay
                    ? "text-warning"
                    : "text-destructive"
              }
              LucideIcon={bet.winner === "DRAW" ? CircleEqual : CheckCircle}
              size={16}
            />
          </View>
        )}
        <TeamIcon
          icon={{
            uri: game.teamIcon,
            alt: `${game.teamName} icon`,
          }}
          size="xs"
        />
      </View>
      <P
        className={cn(
          bet.winner === game.side || bet.winner === "DRAW"
            ? winnerHit
              ? "text-success"
              : gameInPlay
                ? "text-warning"
                : "text-destructive"
            : "",
        )}
      >
        {game.teamName}
      </P>
    </View>
  );
};
