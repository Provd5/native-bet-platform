import { FC, useMemo, useState } from "react";
import toast from "react-hot-toast/headless";
import { Modal, Pressable, ScrollView, View } from "react-native";
import Icon from "~/lib/icons/Icon";

import { AINewsReaction } from "~/types/ai-news";

import { ALL_EMOJIS } from "~/constants/emojis";
import { errorHandler } from "~/lib/error-handler";
import { cn } from "~/lib/utils";

import { Button } from "../ui/button";
import { P, Small } from "../ui/typography";
import { SmilePlus } from "lucide-react-native";

interface ReactionsPickerProps {
  reactionsByUserId: Record<string, string>;
  currentUserId: string;
  reactionUsersMap: Record<string, string>;
  onToggleReaction: (payload: {
    emoji: string;
    currentReaction: string | undefined;
  }) => Promise<void>;
}

export const ReactionsPicker: FC<ReactionsPickerProps> = ({
  reactionsByUserId,
  currentUserId,
  reactionUsersMap,
  onToggleReaction,
}) => {
  const [pendingEmoji, setPendingEmoji] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [emojiDetailsOpen, setEmojiDetailsOpen] = useState(false);
  const [detailsEmoji, setDetailsEmoji] = useState<string | null>(null);

  const currentReaction = reactionsByUserId[currentUserId];

  const aggregatedReactions = useMemo<AINewsReaction[]>(() => {
    const grouped = Object.entries(reactionsByUserId).reduce(
      (acc, [userId, emoji]) => {
        if (!acc[emoji]) acc[emoji] = [];
        acc[emoji].push(userId);
        return acc;
      },
      {} as Record<string, string[]>,
    );

    return Object.entries(grouped)
      .map(([emoji, users]) => ({
        emoji,
        count: users.length,
        isSelected: users.includes(currentUserId),
      }))
      .sort((a, b) => {
        if (a.isSelected !== b.isSelected) return a.isSelected ? -1 : 1;
        if (b.count !== a.count) return b.count - a.count;
        return a.emoji.localeCompare(b.emoji);
      });
  }, [currentUserId, reactionsByUserId]);

  const reactionUsersByEmoji = useMemo(
    () =>
      Object.entries(reactionsByUserId).reduce(
        (acc, [userId, emoji]) => {
          if (!acc[emoji]) acc[emoji] = [];

          const username = reactionUsersMap[userId] ?? userId;
          acc[emoji].push(username);

          return acc;
        },
        {} as Record<string, string[]>,
      ),
    [reactionUsersMap, reactionsByUserId],
  );

  const onReact = async (emoji: string) => {
    try {
      setPendingEmoji(emoji);
      await onToggleReaction({ emoji, currentReaction });
    } catch (e) {
      toast(errorHandler(e), { icon: "❌", duration: 3500 });
    } finally {
      setPendingEmoji(null);
    }
  };

  const onPickEmoji = async (emoji: string) => {
    setPickerOpen(false);
    await onReact(emoji);
  };

  const openEmojiDetails = (emoji: string) => {
    setDetailsEmoji(emoji);
    setEmojiDetailsOpen(true);
  };

  const closeEmojiDetails = () => {
    setEmojiDetailsOpen(false);
  };

  const usersForDetails = detailsEmoji
    ? (reactionUsersByEmoji[detailsEmoji] ?? [])
    : [];

  return (
    <View className="mt-2 flex-row items-center justify-between gap-2">
      {aggregatedReactions.length > 0 && (
        <View className="flex-row flex-wrap gap-1">
          {aggregatedReactions.map((reaction) => {
            return (
              <View key={`Reaction-${reaction.emoji}`}>
                <Pressable
                  className={cn(
                    "min-w-[48px] flex-row items-center justify-center gap-0.5 rounded-full border px-2 py-1",
                    reaction.isSelected
                      ? "border-primary bg-primary/20"
                      : "border-border bg-muted/60",
                  )}
                  disabled={pendingEmoji !== null}
                  onPress={() => openEmojiDetails(reaction.emoji)}
                >
                  <P className={cn("text-sm")}>{reaction.emoji}</P>
                  <Small
                    className={cn(
                      "text-xs",
                      !reaction.isSelected && "text-muted-foreground",
                    )}
                  >
                    {reaction.count}
                  </Small>
                </Pressable>
              </View>
            );
          })}
        </View>
      )}

      <Button
        size="icon"
        variant="ghost"
        className="ml-auto size-6 rounded-full"
        onPress={() => setPickerOpen(true)}
        disabled={pendingEmoji !== null}
      >
        <Icon LucideIcon={SmilePlus} />
      </Button>

      <Modal
        transparent
        animationType="fade"
        visible={pickerOpen}
        onRequestClose={() => setPickerOpen(false)}
      >
        <Pressable
          className="flex-1 items-center justify-center bg-black/80 p-2"
          onPress={() => {}}
        >
          <Pressable
            className="w-full max-w-md rounded-2xl border border-border bg-background p-3.5 shadow-lg shadow-foreground/20"
            onPress={(e) => e.stopPropagation?.()}
          >
            <View className="mb-2.5 flex-row items-center justify-between">
              <Small className="font-customSemiBold uppercase tracking-wide text-muted-foreground">
                Emoji Picker
              </Small>
              <Button
                size="sm"
                variant="secondary"
                className="h-7 rounded-full px-2.5"
                onPress={() => setPickerOpen(false)}
              >
                <Small className="text-xs">Zamknij</Small>
              </Button>
            </View>

            <ScrollView
              className="max-h-72"
              contentContainerClassName="flex-row flex-wrap gap-1 pb-1"
            >
              {ALL_EMOJIS.map((emoji) => (
                <Pressable
                  key={`Picker-${emoji}`}
                  className="h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted/40"
                  onPress={() => onPickEmoji(emoji)}
                  disabled={pendingEmoji !== null}
                >
                  <P className="text-xl leading-6">{emoji}</P>
                </Pressable>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        transparent
        animationType="fade"
        visible={emojiDetailsOpen}
        onRequestClose={closeEmojiDetails}
      >
        <Pressable
          className="flex-1 items-center justify-center bg-black/80 p-2"
          onPress={() => {}}
        >
          <Pressable
            className="w-full max-w-sm rounded-2xl border border-border bg-background p-3.5 shadow-lg shadow-foreground/20"
            onPress={(e) => e.stopPropagation?.()}
          >
            <View className="mb-2.5 flex-row items-center justify-between">
              <Small className="font-customSemiBold uppercase tracking-wide text-muted-foreground">
                {detailsEmoji ? `Reakcja ${detailsEmoji}` : "Reakcje"}
              </Small>
              <Button
                size="sm"
                variant="secondary"
                className="h-7 rounded-full px-2.5"
                onPress={closeEmojiDetails}
              >
                <Small className="text-xs">Zamknij</Small>
              </Button>
            </View>

            <ScrollView
              className="max-h-72"
              contentContainerClassName="gap-1.5 pb-1"
            >
              {usersForDetails.length > 0 ? (
                usersForDetails.map((username) => (
                  <View
                    key={`EmojiDetail-${detailsEmoji ?? "unknown"}-${username}`}
                    className="rounded-lg border border-border/70 bg-card px-2.5 py-2"
                  >
                    <P className="text-sm" numberOfLines={1}>
                      {username}
                    </P>
                  </View>
                ))
              ) : (
                <Small className="rounded-lg bg-muted/50 px-2.5 py-2 text-xs text-muted-foreground">
                  Brak reakcji dla tej emoji.
                </Small>
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};
