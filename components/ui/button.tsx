import * as React from "react";
import { FormState } from "react-hook-form";
import { Pressable } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";

import { TextClassContext } from "~/components/ui/text";
import { cn } from "~/lib/utils";

import { LoadingSpinner } from "../Loaders/spinners";
import { P } from "./typography";

const buttonVariants = cva(
  "group flex items-center justify-center rounded-2xl border border-transparent ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary shadow-sm shadow-primary/30 hover:translate-y-[-1px] hover:opacity-95 active:opacity-90",
        destructive:
          "bg-destructive shadow-sm shadow-destructive/30 hover:opacity-95 active:opacity-90",
        outline:
          "border border-border bg-card hover:bg-secondary active:bg-secondary",
        secondary:
          "bg-secondary shadow-sm shadow-secondary/40 hover:opacity-90 active:opacity-85",
        ghost:
          "border border-transparent bg-transparent hover:bg-secondary/60 active:bg-secondary/70",
        link: "underline-offset-4 hover:underline focus:underline",
      },
      size: {
        default: "h-11 px-5 py-2 native:h-12 native:px-6 native:py-3",
        sm: "h-9 rounded-xl px-3",
        lg: "h-12 rounded-2xl px-10 native:h-14",
        icon: "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const buttonTextVariants = cva(
  "whitespace-nowrap text-sm native:text-base font-customSemiBold text-foreground transition-colors",
  {
    variants: {
      variant: {
        default: "text-primary-foreground",
        destructive: "text-destructive-foreground",
        outline: "text-foreground group-active:text-foreground",
        secondary: "text-secondary-foreground",
        ghost: "text-foreground group-active:text-foreground",
        link: "text-primary group-active:underline",
      },
      size: {
        default: "",
        sm: "",
        lg: "native:text-lg",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <TextClassContext.Provider
      value={cn(
        props.disabled && "pointer-events-none",
        buttonTextVariants({ variant, size }),
      )}
    >
      <Pressable
        className={cn(
          props.disabled && "pointer-events-none opacity-50",
          buttonVariants({ variant, size, className }),
        )}
        ref={ref}
        role="button"
        {...props}
      />
    </TextClassContext.Provider>
  );
});
Button.displayName = "Button";

const FormButton = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps & { formState: FormState<any>; text: string }
>(({ className, variant, size, formState, text, ...props }, ref) => {
  return (
    <Button
      disabled={formState.isSubmitting || !formState.isDirty}
      className={cn(
        formState.isDirty &&
          formState.isSubmitted &&
          !formState.isSubmitSuccessful &&
          !formState.isValid &&
          "bg-destructive",
        formState.isSubmitSuccessful && "bg-success",
        className,
      )}
      ref={ref}
      {...props}
    >
      {formState.isValidating || formState.isSubmitting ? (
        <LoadingSpinner />
      ) : (
        <P
          className={cn(
            buttonTextVariants({ variant, size }),
            ((formState.isDirty &&
              formState.isSubmitted &&
              !formState.isSubmitSuccessful &&
              !formState.isValid) ||
              formState.isSubmitSuccessful) &&
              "text-white",
          )}
        >
          {text}
        </P>
      )}
    </Button>
  );
});
FormButton.displayName = "FormButton";

export { Button, FormButton, buttonTextVariants, buttonVariants };
export type { ButtonProps };
