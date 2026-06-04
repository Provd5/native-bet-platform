import { FC } from "react";
import { View } from "react-native";

import { AINewsItem } from "~/types/ai-news";

import { AINewsReactions } from "~/components/Reactions/ai-news-reactions";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Muted, P, Small } from "~/components/ui/typography";
import { cn, dateFormat } from "~/lib/utils";
import { formatInTimeZone } from "date-fns-tz/formatInTimeZone";
import { pl } from "date-fns/locale";
import { formatDistanceToNowStrict } from "date-fns";

interface AINewsCardProps {
  item: AINewsItem;
  currentUserId: string;
  isOdd: boolean;
}

export const AINewsCard: FC<AINewsCardProps> = ({
  item,
  currentUserId,
  isOdd,
}) => {
  return (
    <Card
      className={cn(
        "mb-3 w-full overflow-hidden border border-border/70 bg-card/95 shadow-sm shadow-foreground/10",
        isOdd && "bg-secondary/15",
      )}
    >
      <CardHeader className="border-b border-border/60 bg-muted/20 px-3.5 pb-3 pt-3.5">
        <View className="flex-row items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
          <Small
            className={cn(
              "rounded-full border px-2 py-0.5 font-customSemiBold text-[10px] uppercase tracking-wide",
              item.kind === "hotTake"
                ? "border-warning/30 bg-warning/15 text-warning"
                : "border-info/30 bg-info/15 text-info",
            )}
          >
            {item.kind === "hotTake" ? "Hot Take" : "Weekly Brief"}
          </Small>
        </View>
        {item.createdAt && (
          <View className="flex-row items-center justify-between">
            <Muted className="text-[10px] uppercase tracking-wide">
              {formatDistanceToNowStrict(item.createdAt, {
                addSuffix: true,
                locale: pl,
                roundingMethod: "floor",
              })}
            </Muted>
          </View>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <P className="text-sm leading-6 text-foreground">{item.body}</P>
        {item.sources.length > 0 && (
          <Small className="mt-2.5 rounded-lg border border-border/60 bg-muted/30 px-2 py-1 text-xs text-muted-foreground">
            Źródła: {item.sources.join(", ")}
          </Small>
        )}
        <AINewsReactions
          newsId={item.id}
          reactionsByUserId={item.reactionsByUserId}
          currentUserId={currentUserId}
        />
      </CardContent>
    </Card>
  );
};
