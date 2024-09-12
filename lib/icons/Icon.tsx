import React from "react";
import { LucideProps } from "lucide-react-native";

import { cn } from "../utils";
import { iconWithClassName } from "./iconWithClassName";

type LucideIconType = React.ForwardRefExoticComponent<
  LucideProps & React.RefAttributes<SVGSVGElement>
>;

type IconProps = {
  className?: string;
  LucideIcon: LucideIconType;
} & Omit<LucideProps, "ref">;

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, LucideIcon, ...props }, ref) => {
    iconWithClassName(LucideIcon);
    return (
      <LucideIcon
        className={cn("text-primary", className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Icon.displayName = "Icon";

export default Icon;
