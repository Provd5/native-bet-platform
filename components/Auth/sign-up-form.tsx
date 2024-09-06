import type { FC } from "react";
import { View } from "react-native";

import { FormField } from "../Form/form-field";
import { Button } from "../ui/button";
import { P } from "../ui/typography";

const formFields = [
  {
    name: "username",
    type: "default",
    label: "Nazwa",
    placeholder: "Wpisz swoją nazwę",
    description: "Twoja nazwa widoczna dla innych użytkowników.",
    autoComplete: "username",
  },
  {
    name: "email",
    type: "email-address",
    label: "Adres e-mail",
    placeholder: "Wpisz adres e-mail",
    description: "Będziesz go potrzebował do zalogowania się.",
    autoComplete: "email",
  },
  {
    name: "password",
    type: "default",
    label: "Hasło",
    placeholder: "Podaj hasło",
    description: "Minimum 6 znaków.",
    autoComplete: "new-password",
  },
  {
    name: "repeat_password",
    type: "default",
    label: "Powtórz hasło",
    placeholder: "Powtórz hasło",
    description: null,
    autoComplete: "new-password",
  },
] as const;

export const SignUpForm: FC = () => {
  return (
    <View className="gap-6">
      {formFields.map((formField) => (
        <FormField
          key={`SignInForm-${formField.name}`}
          name={formField.name}
          label={formField.label}
          autoComplete={formField.autoComplete}
          placeholder={formField.placeholder}
          keyboardType={formField.type}
          secureTextEntry={formField.name.includes("password")}
          description={formField.description as string}
        />
      ))}
      <Button className="mx-auto w-full max-w-xs">
        <P>Utwórz konto</P>
      </Button>
    </View>
  );
};
