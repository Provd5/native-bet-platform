import { FC } from "react";
import { FlatList, View } from "react-native";

import {
  useAINewsSubscriber,
  useGetAINews,
} from "~/hooks/actions/ai-news-actions";
import { useAppSelector } from "~/hooks/redux";

import { DataLoadError } from "../data-load-error";
import { ContentLoader } from "../Loaders/content-loader";
import { Muted, Small } from "../ui/typography";
import { AINewsCard } from "./ai-news-card";

export const AINewsFeed: FC = () => {
  const { data, status } = useGetAINews();
  const sessionUserId = useAppSelector(
    (state) => state.sessionUser.fsUserData?.uid || "",
  );

  useAINewsSubscriber();

  if (status === "pending") return <ContentLoader />;
  if (status === "error" || data === undefined) return <DataLoadError />;

  return data.length > 0 ? (
    <FlatList
      className="w-full"
      data={data}
      contentContainerClassName="mx-auto w-full max-w-4xl px-3 py-8"
      ListHeaderComponent={
        <View className="mb-3 rounded-2xl border border-border/70 bg-card/90 p-3.5">
          <View className="flex-row flex-wrap items-center justify-between gap-2">
            <Small className="font-customSemiBold uppercase tracking-wide text-muted-foreground">
              Studio AI
            </Small>
            <View className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1">
              <Small className="font-customSemiBold text-accent">
                Newsy: {data.length}
              </Small>
            </View>
          </View>
        </View>
      }
      ListFooterComponent={<View className="h-3" />}
      keyExtractor={(item) => `AINewsFeed-${item.id}`}
      renderItem={({ item, index }) => (
        <AINewsCard
          item={item}
          isOdd={index % 2 === 0}
          currentUserId={sessionUserId}
        />
      )}
    />
  ) : (
    <DataLoadError
      isEmpty
      description="Jeszcze nic tu nie ma. AI odpali pierwszą gorącą opinię po zakończonym meczu."
    />
  );
};
