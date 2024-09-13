import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import Toast from "react-native-root-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { BetInterface, GameInterface } from "~/types/games";

import { LoadingSpinner } from "~/components/Loaders/spinners";
import { Button } from "~/components/ui/button";
import { H2, P } from "~/components/ui/typography";
import { useBetGame } from "~/hooks/actions/game-bets-action";
import { errorHandler } from "~/lib/error-handler";
import { cn } from "~/lib/utils";
import { betSchema, betSchemaType } from "~/lib/validators/bet-schema";

import { BetGoals } from "./bet-goals";
import { BetTeam } from "./bet-team";

interface BetGameFormProps {
  game: GameInterface;
  sessionBet: BetInterface | undefined;
}

export const BetGameForm: FC<BetGameFormProps> = ({ game, sessionBet }) => {
  const { betGameAsync } = useBetGame();

  const form = useForm<betSchemaType>({
    resolver: zodResolver(betSchema),
    defaultValues: {
      home: sessionBet?.homeGoals || 0,
      away: sessionBet?.awayGoals || 0,
      winner: sessionBet?.winner || "",
    },
  });

  async function onSubmit(values: betSchemaType) {
    try {
      await betGameAsync({
        values,
        gameValues: {
          gameId: game.id,
          stage: game.stage,
          timestamp: game.timestamp,
        },
      });

      form.reset();
      Toast.show("Pomyślnie obstawiono mecz ✅");
    } catch (e) {
      form.setError("root", { message: errorHandler(e) });
    }
  }

  return (
    <View className="gap-3">
      <H2 className="text-center">Obstaw mecz</H2>
      <BetGoals
        register={form.register}
        setValue={form.setValue}
        teams={{
          home: { icon: game.homeTeamIcon, name: game.homeTeamName },
          away: { icon: game.awayTeamIcon, name: game.awayTeamName },
        }}
        initScores={{
          home: sessionBet?.homeGoals || 0,
          away: sessionBet?.awayGoals || 0,
        }}
      />
      <BetTeam
        register={form.register}
        setValue={form.setValue}
        initWinner={sessionBet?.winner || ""}
      />
      {form.formState.errors.root && (
        <P className="mt-2 flex-row items-center justify-center gap-1 text-center text-destructive">
          {form.formState.errors.root.message}
        </P>
      )}
      <Button
        className={cn(
          "mx-auto mt-6 w-full max-w-sm",
          form.formState.isSubmitSuccessful &&
            "bg-success web:hover:bg-success-foreground text-white",
        )}
        onPress={form.handleSubmit(onSubmit)}
        disabled={form.formState.isSubmitting || !form.formState.isDirty}
      >
        {form.formState.isSubmitting ? (
          <LoadingSpinner />
        ) : (
          <P className={cn(form.formState.isSubmitSuccessful && "text-white")}>
            {form.formState.isSubmitSuccessful ? "✅ Obstawiono!" : "Obstaw"}
          </P>
        )}
      </Button>
    </View>
  );
};
