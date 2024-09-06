import type { FC } from "react";
import { View } from "react-native";

import { FormField } from "../Form/form-field";
import { Button } from "../ui/button";
import { P } from "../ui/typography";

const formFields = [
  {
    name: "email",
    type: "email-address",
    label: "Adres e-mail",
    placeholder: "Wpisz adres e-mail",
    autoComplete: "email",
  },
  {
    name: "password",
    type: "default",
    label: "Hasło",
    placeholder: "Podaj hasło",
    autoComplete: "current-password",
  },
] as const;

export const SignInForm: FC = () => {
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
        />
      ))}
      <Button className="mx-auto w-full max-w-xs">
        <P>Zaloguj</P>
      </Button>
    </View>
  );
};
