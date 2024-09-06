import type { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "~/firebase.config";
import { errorHandler } from "~/lib/error-handler";
import { loginSchema, loginSchemaType } from "~/lib/validators/auth-schema";

import { FormField } from "../Form/form-field";
import { LoadingSpinner } from "../Loaders/spinners";
import { Button } from "../ui/button";
import { P } from "../ui/typography";

const formFields = [
  {
    name: "email",
    type: "email",
    label: "Adres e-mail",
    placeholder: "Wpisz adres e-mail",
    autoComplete: "email",
  },
  {
    name: "password",
    type: "text",
    label: "Hasło",
    placeholder: "Podaj hasło",
    autoComplete: "current-password",
  },
] as const;

export const SignInForm: FC = () => {
  const router = useRouter();

  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: loginSchemaType) {
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        !!userCredential && router.replace("/games");
      })
      .catch((error: unknown) => {
        alert(errorHandler(error));
        console.log(errorHandler(error));
      });
  }

  return (
    <View className="gap-6">
      {formFields.map((formField) => (
        <Controller
          key={`SignInForm-${formField.name}`}
          control={form.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              nativeID={formField.name}
              label={formField.label}
              placeholder={formField.placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoComplete={formField.autoComplete}
              inputMode={formField.type}
              secureTextEntry={formField.name.includes("password")}
              errorMsg={form.formState.errors[formField.name]?.message}
            />
          )}
          name={formField.name}
        />
      ))}
      <Button
        className="mx-auto w-full max-w-xs"
        onPress={form.handleSubmit(onSubmit)}
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? <LoadingSpinner /> : <P>Zaloguj</P>}
      </Button>
    </View>
  );
};
