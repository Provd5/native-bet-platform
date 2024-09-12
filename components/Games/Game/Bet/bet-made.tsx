import type { FC } from "react";
import { View } from "react-native";
import { CircleCheckBig } from "lucide-react-native";

import { P } from "~/components/ui/typography";
import Icon from "~/lib/icons/Icon";

export const BetMade: FC = () => {
  return (
    <View className="flex-row items-center justify-center gap-1">
      <Icon LucideIcon={CircleCheckBig} size={16} className="text-success" />
      <P className="text-success">Obstawiono!</P>
    </View>
  );
};
