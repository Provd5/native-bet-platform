import type { FC } from "react";
import { Image } from "react-native";

import { APP_TITLE } from "~/constants/app";
import { cn } from "~/lib/utils";

interface LogoProps {
  size?: "default" | "lg";
  className?: string;
}

export const Logo: FC<LogoProps> = ({ size = "default", className }) => {
  const sizes = {
    default: { w: 48, h: 60 },
    lg: { w: 192, h: 240 },
  };

  return (
    <Image
      source={require("~/assets/images/logo.png")}
      alt={`${APP_TITLE} Logo`}
      className={cn("pointer-events-none", className)}
      resizeMode="contain"
      style={{ height: sizes[size].h, width: sizes[size].w }}
    />
  );
};
