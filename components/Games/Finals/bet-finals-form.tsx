import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import Toast from "react-native-root-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { BetFinalsInterface, TeamInterface } from "~/types/teams";

import { TeamIcon } from "~/components/team-icon";
import { FormButton } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { H4 } from "~/components/ui/typography";
import { useBetFinals } from "~/hooks/actions/finals-bet-actions";
import { errorHandler } from "~/lib/error-handler";
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
  const initSelectedTeams = sessionFinalsBet ? sessionFinalsBet.teamBet : [];
  const [selectedTeams, setSelectedTeams] =
    useState<TeamInterface[]>(initSelectedTeams);

  const isInitBet = () => {
    const initTeamIds = initSelectedTeams.map((team) => team?.id).sort();
    const selectedTeamIds = selectedTeams.map((team) => team?.id).sort();

    return initTeamIds.every((id, index) => id === selectedTeamIds[index]);
  };

  const callbackSelect = (data: TeamInterface[]) => {
    setSelectedTeams(data);
  };

  const form = useForm<betFinalsSchemaType>({
    resolver: zodResolver(betFinalsSchema),
    defaultValues: { teams: [{ id: "", name: "", icon: "", nameCode: "" }] },
  });

  const onSubmit = form.handleSubmit(async (values: betFinalsSchemaType) => {
    try {
      await betFinalsAsync({ values });

      form.reset();
      Toast.show("✅ Pomyślnie obstawiono finalistów");
    } catch (e) {
      form.setError("root", { message: errorHandler(e) });
      Toast.show(`❌ ${errorHandler(e)}`, {
        duration: Toast.durations.LONG,
        hideOnPress: true,
      });
    }
  });

  return (
    <>
      <View className="hidden">
        <Input readOnly {...form.register("teams")} />
      </View>

      <SelectFinalist
        setValue={form.setValue}
        teams={teams}
        sessionFinalsBet={sessionFinalsBet}
        callbackSelect={callbackSelect}
      />

      <View className="absolute inset-x-0 bottom-0 flex-row items-center border-t border-border bg-background px-2 py-1">
        <View className="mx-auto flex-row items-center gap-2">
          <TeamIcon
            icon={
              selectedTeams[0]
                ? {
                    uri: selectedTeams[0].icon,
                    alt: `${selectedTeams[0].name} icon`,
                  }
                : null
            }
            size="xs"
          />
          <H4>VS</H4>
          <TeamIcon
            icon={
              selectedTeams[1]
                ? {
                    uri: selectedTeams[1].icon,
                    alt: `${selectedTeams[1].name} icon`,
                  }
                : null
            }
            size="xs"
          />
          <FormButton
            disabled={isInitBet()}
            className="ml-3 px-12"
            formState={form.formState}
            onPress={onSubmit}
            text="Zapisz"
          />
        </View>
      </View>
    </>
  );
};
