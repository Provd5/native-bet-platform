import * as React from "react";
import * as LabelPrimitive from "@rn-primitives/label";

import { cn } from "~/lib/utils";

import { TextClassContext } from "./text";

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Text>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Text>
>(
  (
    { className, onPress, onLongPress, onPressIn, onPressOut, ...props },
    ref,
  ) => {
    const textClass = React.useContext(TextClassContext);
    return (
      <LabelPrimitive.Root
        className="web:cursor-default"
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <LabelPrimitive.Text
          ref={ref}
          className={cn(
            "native:text-base native:-mb-0.5 font-customMedium text-sm leading-none text-foreground web:peer-disabled:cursor-not-allowed web:peer-disabled:opacity-70",
            textClass,
            className,
          )}
          {...props}
        />
      </LabelPrimitive.Root>
    );
  },
);

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
