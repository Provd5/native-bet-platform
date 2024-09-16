import type { FC } from "react";
import { Image, View } from "react-native";

import { cn } from "~/lib/utils";

export type TeamIconSizes = "lg" | "default" | "sm" | "xs";

interface TeamIconProps {
  icon: {
    uri: string;
    alt: string;
  } | null;
  size?: TeamIconSizes;
}

export const TeamIcon: FC<TeamIconProps> = ({ icon, size = "default" }) => {
  const sizes = {
    lg: { img: 64, bg: 88 },
    default: { img: 54, bg: 78 },
    sm: { img: 40, bg: 58 },
    xs: { img: 30, bg: 48 },
  };
  return (
    <View
      style={{ width: sizes[size].bg, height: sizes[size].bg }}
      className={cn(
        "items-center justify-center rounded-2xl bg-secondary",
        size === "xs" && "rounded-lg",
        size === "sm" && "rounded-xl",
      )}
    >
      {icon && (
        <Image
          source={{ uri: icon.uri }}
          style={{ width: sizes[size].img, height: sizes[size].img }}
          alt={icon.alt}
          resizeMode="contain"
          className="pointer-events-none"
        />
      )}
    </View>
  );
};
