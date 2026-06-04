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

  if (!positionAdvanceDirection) return;

  const showAdvance =
    positionAdvance !== -2 &&
    positionAdvance !== -1 &&
    positionAdvance !== 1 &&
    positionAdvance !== 2;

  const isIncreased =
    positionAdvanceDirection === "up" ||
    positionAdvanceDirection === "double-up";

  const colorClass = isIncreased ? "text-success" : "text-destructive";

  return (
    <View className="flex-row items-center justify-center rounded-full border border-border/70 bg-muted/25 p-1">
      {positionAdvanceDirection === "up" && (
        <Icon className={colorClass} LucideIcon={ChevronUp} size={18} />
      )}
      {positionAdvanceDirection === "double-up" && (
        <Icon className={colorClass} LucideIcon={ChevronsUp} size={18} />
      )}
      {positionAdvanceDirection === "down" && (
        <Icon className={colorClass} LucideIcon={ChevronDown} size={18} />
      )}
      {positionAdvanceDirection === "double-down" && (
        <Icon className={colorClass} LucideIcon={ChevronsDown} size={18} />
      )}

      {showAdvance && (
        <P className={cn("font-customSemiBold text-xs", colorClass)}>
          {isIncreased ? "+" : ""}
          {positionAdvance}
        </P>
      )}
    </View>
  );
};
