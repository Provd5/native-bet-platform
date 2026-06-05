import * as React from "react";
import { TextInput } from "react-native";

import { cn } from "~/lib/utils";

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, placeholderClassName, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={cn(
        "native:h-12 native:text-lg native:leading-[1.25] flex h-11 w-full rounded-2xl border border-input bg-card px-4 py-2 text-base text-foreground ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:font-customMedium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:text-sm",
        props.readOnly === true && "cursor-not-allowed opacity-50",
        className,
      )}
      placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
