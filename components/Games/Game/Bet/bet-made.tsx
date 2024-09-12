import type { FC } from "react";
import { CircleCheckBig, View } from "lucide-react-native";

import { BetInterface, GameInterface } from "~/types/games";

import { P } from "~/components/ui/typography";
import Icon from "~/lib/icons/Icon";
import { getMatchWinnerName } from "~/lib/utils";

interface BetMadeProps {
  game: GameInterface;
  sessionBet: BetInterface;
}

export const BetMade: FC<BetMadeProps> = ({ game, sessionBet }) => {
  return (
    <View>
      <P className="items-center gap-1">
        Obstawiono! <Icon LucideIcon={CircleCheckBig} size={16} />
      </P>
      <P className="-mt-1.5 whitespace-nowrap">{`(${sessionBet.homeGoals} - ${
        sessionBet.awayGoals
      }, ${getMatchWinnerName(sessionBet.winner, game)})`}</P>
    </View>
  );
};
