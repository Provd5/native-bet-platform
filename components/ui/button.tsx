import * as React from "react";
import { FormState } from "react-hook-form";
import { Pressable } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";

import { TextClassContext } from "~/components/ui/text";
import { cn } from "~/lib/utils";

import { LoadingSpinner } from "../Loaders/spinners";
import { P } from "./typography";

const buttonVariants = cva(
  "group flex items-center justify-center rounded-2xl border border-transparent web:ring-offset-background web:transition-all web:duration-200 web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary shadow-sm shadow-primary/30 web:hover:translate-y-[-1px] web:hover:opacity-95 active:opacity-90",
        destructive:
          "bg-destructive shadow-sm shadow-destructive/30 web:hover:opacity-95 active:opacity-90",
        outline:
          "border border-border bg-card web:hover:bg-secondary active:bg-secondary",
        secondary:
          "bg-secondary shadow-sm shadow-secondary/40 web:hover:opacity-90 active:opacity-85",
        ghost:
          "border border-transparent bg-transparent web:hover:bg-secondary/60 active:bg-secondary/70",
        link: "web:underline-offset-4 web:hover:underline web:focus:underline",
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
  "web:whitespace-nowrap text-sm native:text-base font-customSemiBold text-foreground web:transition-colors",
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
        props.disabled && "web:pointer-events-none",
        buttonTextVariants({ variant, size }),
      )}
    >
      <Pressable
        className={cn(
          props.disabled && "opacity-50 web:pointer-events-none",
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
          "bg-destructive web:hover:bg-destructive-foreground",
        formState.isSubmitSuccessful &&
          "bg-success web:hover:bg-success-foreground",
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
