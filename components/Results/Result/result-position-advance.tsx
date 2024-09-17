import type { FC } from "react";
import { View } from "react-native";
import {
  ChevronDown,
  ChevronsDown,
  ChevronsUp,
  ChevronUp,
} from "lucide-react-native";

import { P } from "~/components/ui/typography";
import Icon from "~/lib/icons/Icon";
import { cn } from "~/lib/utils";

interface ResultPositionAdvanceProps {
  positionAdvance: number;
}

export const ResultPositionAdvance: FC<ResultPositionAdvanceProps> = ({
  positionAdvance,
}) => {
  const positionAdvanceDirection =
    positionAdvance === 1
      ? "up"
      : positionAdvance > 1
        ? "double-up"
        : positionAdvance === -1
          ? "down"
          : positionAdvance < -1
            ? "double-down"
            : null;

  const showAdvance =
    !!positionAdvanceDirection &&
    positionAdvance !== -2 &&
    positionAdvance !== -1 &&
    positionAdvance !== 1 &&
    positionAdvance !== 2;

  const isIncreased =
    positionAdvanceDirection === "up" ||
    positionAdvanceDirection === "double-up";

  const colorClass = isIncreased ? "text-success" : "text-destructive";

  return (
    <View className="flex-row items-center">
      {positionAdvanceDirection === "up" && (
        <Icon className={colorClass} LucideIcon={ChevronUp} size={24} />
      )}
      {positionAdvanceDirection === "double-up" && (
        <Icon className={colorClass} LucideIcon={ChevronsUp} size={24} />
      )}
      {positionAdvanceDirection === "down" && (
        <Icon className={colorClass} LucideIcon={ChevronDown} size={24} />
      )}
      {positionAdvanceDirection === "double-down" && (
        <Icon className={colorClass} LucideIcon={ChevronsDown} size={24} />
      )}

      {showAdvance && (
        <P className={cn("-ml-1 font-customSemiBold", colorClass)}>
          {isIncreased ? "+" : ""}
          {positionAdvance}
        </P>
      )}
    </View>
  );
};
