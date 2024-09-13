import { FC } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import Toast from "react-native-root-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { BetFinalsInterface, TeamInterface } from "~/types/teams";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { H3, P } from "~/components/ui/typography";
import { FINALS_BETTING_CLOSING_DATE } from "~/constants/current-event";
import { useBetFinals } from "~/hooks/actions/finals-bet-actions";
import { errorHandler } from "~/lib/error-handler";
import { dateFormat } from "~/lib/utils";
import {
  betFinalsSchema,
  betFinalsSchemaType,
} from "~/lib/validators/bet-schema";

import { SelectFinalist } from "./select-finalist";

interface BetFinalsFormProps {
  teams: TeamInterface[];
  sessionFinalsBet: BetFinalsInterface | null;
}

export const BetFinalsForm: FC<BetFinalsFormProps> = ({
  teams,
  sessionFinalsBet,
}) => {
  const { betFinalsAsync } = useBetFinals();

  const form = useForm<betFinalsSchemaType>({
    resolver: zodResolver(betFinalsSchema),
    defaultValues: { teams: [{ teamId: "", teamName: "" }] },
  });

  const onSubmit = form.handleSubmit(async (values: betFinalsSchemaType) => {
    try {
      await betFinalsAsync({ values });

      form.reset();
      Toast.show("Pomyślnie obstawiono finalistów ✅");
    } catch (e) {
      form.setError("root", { message: errorHandler(e) });
    }
  });

  return (
    <View className="h-full items-center pb-[56px]">
      <H3 className="px-2 pb-1 pt-6 text-center">Wytypuj finalistów!</H3>
      <P className="px-2 text-center font-customSemiBold text-info">
        Zamknięcie zakładów:{" "}
        <P style={{ textTransform: "capitalize" }}>
          {dateFormat(FINALS_BETTING_CLOSING_DATE)}
        </P>
      </P>

      <View className="hidden">
        <Input readOnly {...form.register("teams")} />
      </View>
      <SelectFinalist
        setValue={form.setValue}
        teams={teams}
        sessionFinalsBet={sessionFinalsBet}
      />
      <View className="absolute inset-x-0 bottom-0 bg-background p-2">
        <Button className="mx-auto w-full max-w-xs">
          <P>Zapisz</P>
        </Button>
      </View>
    </View>
  );
};
