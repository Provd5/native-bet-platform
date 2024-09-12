import type { FC } from "react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { router } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "~/firebase.config";
import { useCreateUser } from "~/hooks/actions/user-actions";
import { errorHandler } from "~/lib/error-handler";
import {
  registerSchema,
  registerSchemaType,
} from "~/lib/validators/auth-schema";

import { FormField } from "../Form/form-field";
import { LoadingSpinner } from "../Loaders/spinners";
import { Button } from "../ui/button";
import { P, Small } from "../ui/typography";

const formFields = [
  {
    name: "username",
    type: "text",
    label: "Nazwa",
    placeholder: "Wpisz swoją nazwę",
    description: "Twoja nazwa widoczna dla innych użytkowników.",
    autoComplete: "username",
  },
  {
    name: "email",
    type: "email",
    label: "Adres e-mail",
    placeholder: "Wpisz adres e-mail",
    description: "Będziesz go potrzebował do zalogowania się.",
    autoComplete: "email",
  },
  {
    name: "password",
    type: "text",
    label: "Hasło",
    placeholder: "Podaj hasło",
    description: "Minimum 6 znaków.",
    autoComplete: "new-password",
  },
  {
    name: "repeat_password",
    type: "text",
    label: "Powtórz hasło",
    placeholder: "Powtórz hasło",
    description: null,
    autoComplete: "new-password",
  },
] as const;

export const SignUpForm: FC = () => {
  const { createUserAsync, error } = useCreateUser();

  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeat_password: "",
    },
  });

  async function onSubmit(values: registerSchemaType) {
    if (values.password !== values.repeat_password) {
      form.setError("repeat_password", {
        message: "Podane hasła nie pasują do siebie",
      });
      return;
    }

    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        if (error) throw new Error(error.message);

        await createUserAsync({
          userId: userCredential.user.uid,
          username: values.username,
        });
      })
      .then(() => router.replace("/auth-callback"))
      .catch((e) => {
        form.setError("root", {
          message: errorHandler(e),
        });
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
              description={formField.description as string}
              placeholder={formField.placeholder}
              autoCapitalize={formField.name === "username" ? "words" : "none"}
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
      {form.formState.errors.root && (
        <Small className="text-destructive">
          {form.formState.errors.root.message}
        </Small>
      )}
      <Button
        className="mx-auto w-full max-w-xs"
        onPress={form.handleSubmit(onSubmit)}
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? <LoadingSpinner /> : <P>Utwórz konto</P>}
      </Button>
    </View>
  );
};
