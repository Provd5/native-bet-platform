import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast/headless";
import { FlatList, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";

import { BetFinalsInterface, TeamInterface } from "~/types/teams";

import { Input } from "~/components/ui/input";
import { useBetFinals } from "~/hooks/actions/finals-bet-actions";
import { errorHandler } from "~/lib/error-handler";
import {
  betFinalsSchema,
  betFinalsSchemaType,
} from "~/lib/validators/bet-schema";

import { SelectFinalist } from "./select-finalist";
import { SelectFinalistSave } from "./select-finalist-save";

interface BetFinalsFormProps {
  teams: TeamInterface[];
  sessionFinalsBet: BetFinalsInterface | null;
}

export const BetFinalsForm: FC<BetFinalsFormProps> = ({
  teams,
  sessionFinalsBet,
}) => {
  const { betFinalsAsync } = useBetFinals();
  const initBet = sessionFinalsBet?.teamBet || [];
  const [selectedFinalists, setSelectedFinalists] = useState(initBet);

  const form = useForm<betFinalsSchemaType>({
    resolver: zodResolver(betFinalsSchema),
    defaultValues: { teams: [{ id: "", name: "", icon: "", nameCode: "" }] },
  });

  const onSubmit = form.handleSubmit(async (values: betFinalsSchemaType) => {
    try {
      await betFinalsAsync({ values });

      form.reset();
      toast("Pomyślnie obstawiono finalistów", { icon: "✅" });
    } catch (e) {
      form.setError("root", { message: errorHandler(e) });
      toast(errorHandler(e), { icon: "❌", duration: 4000 });
    }
  });

  const setValueFunc = (team: TeamInterface) => {
    let newBet: TeamInterface[];
    const isInBet = selectedFinalists.some((bet) => bet.id === team.id);

    if (isInBet) {
      newBet = selectedFinalists.filter((bet) => bet.id !== team.id);
    } else {
      if (selectedFinalists.length >= 2) {
        newBet = [selectedFinalists.toReversed()[0], team];
      } else {
        newBet = [...selectedFinalists, team];
      }
    }

    setSelectedFinalists(newBet);
    form.setValue("teams", newBet, { shouldDirty: true });
  };

  return (
    <>
      <View className="hidden">
        <Input readOnly {...form.register("teams")} />
      </View>

      <FlatList
        className="w-full"
        keyExtractor={(item) => `BetFinalsForm-${item.id}`}
        data={teams}
        renderItem={({ item, index }) => (
          <SelectFinalist
            isOdd={index % 2 === 0}
            initBet={initBet}
            selectedFinalists={selectedFinalists}
            team={item}
            setValueFunc={setValueFunc}
          />
        )}
      />

      <SelectFinalistSave
        initBet={initBet}
        selectedFinalists={selectedFinalists}
        formState={form.formState}
        onSubmit={onSubmit}
      />
    </>
  );
};
