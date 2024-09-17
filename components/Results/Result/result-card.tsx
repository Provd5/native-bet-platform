import type { FC } from "react";
import { View } from "react-native";
import { Crosshair, Sparkles } from "lucide-react-native";

import { type ResultInterface } from "~/types/results";

import { H3, H4, P } from "~/components/ui/typography";
import Icon from "~/lib/icons/Icon";
import { cn } from "~/lib/utils";

import { ResultPositionAdvance } from "./result-position-advance";

interface ResultCardProps {
  isOdd: boolean;
  sessionUserId: string;
  result: ResultInterface;
}

export const ResultCard: FC<ResultCardProps> = ({
  isOdd,
  sessionUserId,
  result,
}) => {
  const medal =
    (result.currentPosition === 1 && "🥇") ||
    (result.currentPosition === 2 && "🥈") ||
    (result.currentPosition === 3 && "🥉") ||
    null;

  const sessionResult = sessionUserId === result.userId;

  const accurateScoreAdvance =
    result.points.currentLiveAccurateScores -
    result.points.currentAccurateScores;

  // const pointsAdvance =
  //   result.points.currentLivePoints - result.points.currentPoints;

  return (
    <View
      className={cn(
        "w-full justify-center border-t border-border py-2 web:hover:bg-muted-foreground/20",
        isOdd && "bg-muted/30",
      )}
    >
      <View className="relative mx-auto w-full max-w-4xl flex-row items-center gap-1 px-2">
        <H4 className="w-12 text-center">
          {medal ? medal : `${result.currentPosition}.`}
        </H4>
        <View className="gap-1">
          <H3
            className={cn("max-w-[70vw]", sessionResult && "text-info")}
            numberOfLines={1}
          >
            {result.username}
          </H3>
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
              <Icon LucideIcon={Crosshair} size={16} />
              <P>Traf. wyniki:</P>
              <P
                className={cn(
                  "font-customSemiBold text-lg",
                  accurateScoreAdvance > 0 && "text-success",
                )}
              >
                {result.points.currentLiveAccurateScores}
              </P>
            </View>
            <View className="flex-row items-center gap-1">
              <Icon LucideIcon={Sparkles} size={16} />
              <P>Punkty:</P>
              <P className={cn("font-customSemiBold text-lg")}>
                {result.points.currentLivePoints}
              </P>
            </View>
          </View>
        </View>
        <View className="ml-auto self-start">
          <ResultPositionAdvance positionAdvance={result.livePositionAdvance} />
        </View>
      </View>
    </View>
  );
};
