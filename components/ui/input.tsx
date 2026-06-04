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
        "native:h-12 native:text-lg native:leading-[1.25] h-11 rounded-2xl border border-input bg-card px-4 text-base text-foreground file:border-0 file:bg-transparent file:font-customMedium web:flex web:w-full web:py-2 web:ring-offset-background web:transition-all web:duration-200 web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 lg:text-sm",
        props.readOnly === true && "opacity-50 web:cursor-not-allowed",
        className,
      )}
      placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
