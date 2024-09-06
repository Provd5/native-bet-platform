import { ZodError } from "zod";

import { ERROR_ENUM } from "~/types/errors";

export const errorHandler = (error: unknown): string => {
  let errorMsg: string;

  if (error instanceof ZodError) {
    errorMsg = error.errors[0].message;
  } else if (error instanceof Error) {
    errorMsg = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    errorMsg = String(error.message);
  } else if (typeof error === "string") {
    errorMsg = error;
  } else {
    errorMsg = ERROR_ENUM.TRY_AGAIN_LATER;
  }

  return translateError(errorMsg);
};

const translateError = (msg: string): string => {
  const errorTranslations: Record<string, string> = {
    "auth/invalid-credential": "Nieprawidłowe dane logowania",
    // Add more error translations here
  };

  for (const [key, translation] of Object.entries(errorTranslations)) {
    if (msg.includes(key)) {
      return translation;
    }
  }

  return msg; // Return the original message if no translation is found
};
