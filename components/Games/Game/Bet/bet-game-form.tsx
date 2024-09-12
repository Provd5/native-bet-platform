import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import Toast from "react-native-root-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react-native";

import { BetInterface, GameInterface } from "~/types/games";

import { LoadingSpinner } from "~/components/Loaders/spinners";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { H3, P } from "~/components/ui/typography";
import { useBetGame } from "~/hooks/actions/game-bets-action";
import { errorHandler } from "~/lib/error-handler";
import Icon from "~/lib/icons/Icon";
import { cn } from "~/lib/utils";
import { betSchema, betSchemaType } from "~/lib/validators/bet-schema";

import { BetGoals } from "./bet-goals";
import { BetTeam } from "./bet-team";

interface BetGameFormProps {
  game: GameInterface;
  sessionBet: BetInterface | undefined;
}

export const BetGameForm: FC<BetGameFormProps> = ({ game, sessionBet }) => {
  const { betGameAsync, error } = useBetGame();

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

      if (error) {
        throw new Error(error.message);
      }

      Toast.show("Pomyślnie obstawiono mecz ✅");
    } catch (e) {
      form.setError("root", { message: errorHandler(e) });
    }
  }

  return (
    <>
      <H3>Obstaw ten mecz</H3>
      <View className="!mb-3 flex flex-col">
        <View className="flex flex-col justify-between gap-x-2 gap-y-4 sm:flex-row">
          <BetGoals
            register={form.register}
            setValue={form.setValue}
            homeTeamName={game.homeTeamName}
            homeTeamIcon={game.homeTeamIcon}
            awayTeamName={game.awayTeamName}
            awayTeamIcon={game.awayTeamIcon}
            userData={{
              awayGoals: sessionBet?.awayGoals || 0,
              homeGoals: sessionBet?.homeGoals || 0,
            }}
          />
          <Separator className="sm:hidden" />
          <BetTeam
            register={form.register}
            setValue={form.setValue}
            homeTeamName={game.homeTeamName}
            homeTeamIcon={game.homeTeamIcon}
            awayTeamName={game.awayTeamName}
            awayTeamIcon={game.awayTeamIcon}
            userData={{
              winner: sessionBet?.winner || "",
            }}
          />
        </View>
        {form.formState.errors.root && (
          <View>
            <Icon LucideIcon={CircleAlert} size={20} />
            <P className="mt-2 flex items-center justify-center gap-1 text-center text-destructive">
              {form.formState.errors.root.message}
            </P>
          </View>
        )}
      </View>
      <View>
        <Button
          className={cn(
            form.formState.isSubmitSuccessful &&
              "bg-green-600 text-white hover:bg-green-300",
          )}
          onPress={form.handleSubmit(onSubmit)}
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
        >
          {form.formState.isSubmitting ? <LoadingSpinner /> : <P>Postaw</P>}
        </Button>
      </View>
    </>
  );
};
