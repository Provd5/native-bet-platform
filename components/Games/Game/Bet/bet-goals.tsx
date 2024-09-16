import React, { FC, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { View } from "react-native";

import { betSchemaType } from "~/lib/validators/bet-schema";

import { GameTeams } from "../game-teams";
import { BetWrapper } from "./bet-wrapper";
import { GoalsInput } from "./goals-input";

interface BetGoalsProps {
  register: UseFormRegister<betSchemaType>;
  setValue: UseFormSetValue<betSchemaType>;
  teams: {
    home: {
      name: string;
      icon: string;
    };
    away: {
      name: string;
      icon: string;
    };
  };
  initScores: { away: number; home: number };
}

export const BetGoals: FC<BetGoalsProps> = ({
  register,
  setValue,
  teams,
  initScores,
}) => {
  const [awayScoreState, setAwayScoreState] = useState(initScores.away);
  const [homeScoreState, setHomeScoreState] = useState(initScores.home);

  return (
    <BetWrapper title="Dokładny wynik:">
      <View className="mx-auto w-fit gap-2">
        <GameTeams
          teams={teams}
          scores={{ away: awayScoreState, home: homeScoreState }}
        />
        <View className="flex-row justify-between px-1.5">
          <GoalsInput
            register={register}
            setValue={setValue}
            team={{
              name: teams.home.name,
              icon: teams.home.icon,
            }}
            side={"HOME_TEAM"}
            scoreState={homeScoreState}
            setScoreState={setHomeScoreState}
          />
          <GoalsInput
            register={register}
            setValue={setValue}
            team={{
              name: teams.away.name,
              icon: teams.away.icon,
            }}
            side={"AWAY_TEAM"}
            scoreState={awayScoreState}
            setScoreState={setAwayScoreState}
          />
        </View>
      </View>
    </BetWrapper>
  );
};
