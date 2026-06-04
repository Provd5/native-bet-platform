import type { FC } from "react";
import { View } from "react-native";
import { Crosshair, Sparkles } from "lucide-react-native";

import { type ResultInterface } from "~/types/results";

import { Card, CardContent } from "~/components/ui/card";
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

  return (
    <Card
      className={cn(
        "mb-2 w-full border border-border/70 bg-card/95 shadow-sm shadow-foreground/10",
        isOdd && "bg-secondary/20",
      )}
    >
      <CardContent className="relative mx-auto w-full max-w-4xl px-3.5 pb-3.5 pt-3.5">
        <View className="flex-row items-center gap-3">
          <View className="h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-muted/35">
            <H4 className="text-center text-lg">
              {medal ? medal : `${result.currentPosition}.`}
            </H4>
          </View>

          <View className="h-full min-w-0 flex-1 flex-row gap-2">
            <H3
              className={cn(
                "self-center text-lg",
                sessionResult && "text-info",
              )}
              numberOfLines={1}
            >
              {result.username}
            </H3>
            <View className="ml-auto self-start">
              <ResultPositionAdvance
                positionAdvance={result.livePositionAdvance}
              />
            </View>
          </View>

          <View className="flex items-center gap-1">
            <View className="flex-row items-center gap-1 rounded-full border border-border/70 bg-muted/30 px-2 py-1">
              <Icon LucideIcon={Sparkles} size={14} />
              <P className="text-xs">Pkt.:</P>
              <P className="font-customSemiBold text-xs">
                {result.points.currentLivePoints}
              </P>
            </View>
            <View className="flex-row items-center gap-1 rounded-full border border-border/70 bg-muted/30 px-2 py-1">
              <Icon LucideIcon={Crosshair} size={14} />
              <P className="text-xs">Dok.:</P>
              <P
                className={cn(
                  "font-customSemiBold text-xs",
                  accurateScoreAdvance > 0 && "text-success",
                )}
              >
                {result.points.currentLiveAccurateScores}
              </P>
            </View>
          </View>
        </View>
      </CardContent>
    </Card>
  );
};
