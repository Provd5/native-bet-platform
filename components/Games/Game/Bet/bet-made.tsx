import type { FC } from "react";
import { View } from "react-native";
import { CircleCheckBig } from "lucide-react-native";

import { P } from "~/components/ui/typography";
import Icon from "~/lib/icons/Icon";

export const BetMade: FC = () => {
  return (
    <View className="pointer-events-none absolute inset-x-0 z-10 -mt-2 max-sm:items-center">
      <View className="mx-2 w-fit flex-row items-center gap-1 rounded-b-lg border-t border-secondary bg-success px-3 py-0.5">
        <Icon LucideIcon={CircleCheckBig} size={16} className="text-white" />
        <P className="text-sm text-white">Obstawiono!</P>
      </View>
    </View>
  );
};
