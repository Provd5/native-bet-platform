import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast/headless";
import { FlatList, Modal, Pressable, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";

import { BetFinalsInterface, TeamInterface } from "~/types/teams";

import { TeamIcon } from "~/components/team-icon";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { H4, P, Small } from "~/components/ui/typography";
import { useBetFinals } from "~/hooks/actions/finals-bet-actions";
import { errorHandler } from "~/lib/error-handler";
import { cn } from "~/lib/utils";
import {
  betFinalsSchema,
  betFinalsSchemaType,
} from "~/lib/validators/bet-schema";

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
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerSlot, setPickerSlot] = useState<0 | 1 | null>(null);

  const form = useForm<betFinalsSchemaType>({
    resolver: zodResolver(betFinalsSchema),
    defaultValues: { teams: [{ id: "", name: "", icon: "", nameCode: "" }] },
  });

  const onSubmit = form.handleSubmit(async (values: betFinalsSchemaType) => {
    try {
      await betFinalsAsync({ values });

      form.reset();
      setSelectedFinalists(values.teams);
      toast("Pomyślnie obstawiono finalistów", { icon: "✅" });
    } catch (e) {
      form.setError("root", { message: errorHandler(e) });
      toast(errorHandler(e), { icon: "❌", duration: 4000 });
    }
  });

  const openPicker = (slot: 0 | 1) => {
    setPickerSlot(slot);
    setPickerOpen(true);
  };

  const setBetTeams = (nextTeams: TeamInterface[]) => {
    setSelectedFinalists(nextTeams);
    form.setValue("teams", nextTeams, { shouldDirty: true });
  };

  const selectTeamForSlot = (team: TeamInterface) => {
    if (pickerSlot === null) return;

    const first = selectedFinalists[0] ?? null;
    const second = selectedFinalists[1] ?? null;
    const next: Array<TeamInterface | null> = [first, second];
    const otherSlot = pickerSlot === 0 ? 1 : 0;

    if (next[otherSlot]?.id === team.id) {
      next[otherSlot] = null;
    }

    next[pickerSlot] = team;
    setBetTeams(next.filter((t): t is TeamInterface => !!t));
    setPickerOpen(false);
    setPickerSlot(null);
  };

  const selectedForSlot = (slot: 0 | 1) => selectedFinalists[slot] ?? null;

  return (
    <>
      <View className="hidden">
        <Input readOnly {...form.register("teams")} />
      </View>

      <SelectFinalistSave
        initBet={initBet}
        selectedFinalists={selectedFinalists}
        formState={form.formState}
        onSubmit={onSubmit}
      />

      <H4 className={cn("text-center text-lg")}>Wybierz drużyny</H4>

      <View className="mx-auto w-full max-w-4xl gap-2">
        <View className="flex-row items-center gap-2">
          {[0, 1].map((slot) => {
            const team = selectedForSlot(slot as 0 | 1);

            return (
              <Pressable
                key={`FinalsSlot-${slot}`}
                className={cn(
                  "flex-1 flex-row items-center gap-2 rounded-lg border border-border/70 px-2.5 py-2",
                  !team && "bg-muted/20",
                )}
                onPress={() => openPicker(slot as 0 | 1)}
              >
                <TeamIcon
                  icon={
                    team ? { uri: team.icon, alt: `${team.name} icon` } : null
                  }
                  size="xs"
                />
                <View className="flex-1">
                  <Small className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    Finalista {slot + 1}
                  </Small>
                  <P className="text-sm" numberOfLines={1}>
                    {team ? team.name : "Wybierz druzyne"}
                  </P>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      <Modal
        transparent
        animationType="fade"
        visible={pickerOpen}
        onRequestClose={() => {
          setPickerOpen(false);
          setPickerSlot(null);
        }}
      >
        <Pressable
          className="flex-1 cursor-default items-center justify-center bg-black/80 p-2"
          onPress={() => {}}
        >
          <View className="w-full max-w-md rounded-2xl border border-border bg-background p-3.5 shadow-lg shadow-foreground/20">
            <View className="mb-2.5 flex-row items-center justify-between">
              <Small className="font-customSemiBold uppercase tracking-wide text-muted-foreground">
                Wybierz drużynę
              </Small>
              <Button
                size="sm"
                variant="secondary"
                className="h-7 rounded-full px-2.5"
                onPress={() => {
                  setPickerOpen(false);
                  setPickerSlot(null);
                }}
              >
                <Small className="text-xs">Zamknij</Small>
              </Button>
            </View>

            <FlatList
              className="max-h-72"
              data={teams}
              keyExtractor={(item) => `FinalsPicker-${item.id}`}
              contentContainerClassName="gap-0.5 pb-1 px-2"
              renderItem={({ item }) => {
                const isPicked = selectedFinalists.some(
                  (t) => t.id === item.id,
                );

                return (
                  <Pressable
                    className={cn(
                      "flex-row items-center gap-2 rounded-lg border border-border/70 bg-card px-2.5 py-2 hover:bg-secondary/10",
                      isPicked && "border-primary/40 bg-primary/10",
                    )}
                    onPress={() => selectTeamForSlot(item)}
                  >
                    <TeamIcon
                      icon={{ uri: item.icon, alt: `${item.name} icon` }}
                      size="xs"
                    />
                    <P className="text-sm" numberOfLines={1}>
                      {item.name}
                    </P>
                  </Pressable>
                );
              }}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};
