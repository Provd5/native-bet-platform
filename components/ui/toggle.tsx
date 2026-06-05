import * as React from "react";
import * as TogglePrimitive from "@rn-primitives/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react-native";

import { TextClassContext } from "~/components/ui/text";
import { cn } from "~/lib/utils";

const toggleVariants = cva(
  "group inline-flex items-center justify-center rounded-xl border border-border/80 bg-card ring-offset-background transition-all duration-200 hover:bg-secondary/70 active:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "",
        outline:
          "border border-input bg-card hover:bg-secondary active:bg-secondary",
      },
      size: {
        default: "h-10 px-3 native:h-12 native:px-[12]",
        sm: "h-9 px-2.5 native:h-10 native:px-[9]",
        lg: "h-11 px-5 native:h-14 native:px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const toggleTextVariants = cva(
  "text-sm native:text-base text-foreground font-customSemiBold",
  {
    variants: {
      variant: {
        default: "",
        outline:
          "group-hover:text-accent-foreground group-active:text-accent-foreground",
      },
      size: {
        default: "",
        sm: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TextClassContext.Provider
    value={cn(
      toggleTextVariants({ variant, size }),
      props.pressed ? "text-primary-foreground" : "group-hover:text-foreground",
      className,
    )}
  >
    <TogglePrimitive.Root
      ref={ref}
      className={cn(
        toggleVariants({ variant, size }),
        props.disabled && "pointer-events-none opacity-50",
        props.pressed && "border-primary bg-primary",
        className,
      )}
      {...props}
    />
  </TextClassContext.Provider>
));

Toggle.displayName = TogglePrimitive.Root.displayName;

function ToggleIcon({
  className,
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<LucideIcon> & {
  icon: LucideIcon;
}) {
  const textClass = React.useContext(TextClassContext);
  return <Icon className={cn(textClass, className)} {...props} />;
}

export { Toggle, ToggleIcon, toggleTextVariants, toggleVariants };
