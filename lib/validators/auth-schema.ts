import { z } from "zod";

export type loginSchemaType = z.infer<typeof loginSchema>;
export const loginSchema = z.object({
  email: z
    .string({ message: "Podaj adres e-mail" })
    .email({ message: "Podany adres jest niepoprawny" }),
  password: z
    .string({ message: "Podaj hasło" })
    .min(1, { message: "Podaj hasło" }),
});

export type registerSchemaType = z.infer<typeof registerSchema>;
export const registerSchema = z.object({
  username: z
    .string({ message: "Podaj nazwę użytkownika" })
    .min(3, { message: "Nazwa musi mieć co najmniej 3 znaki" }),
  email: z
    .string({ message: "Podaj adres e-mail" })
    .email({ message: "Podany adres jest niepoprawny" }),
  password: z
    .string({ message: "Podaj swoje hasło" })
    .min(6, { message: "Hasło powinno mieć przynajmniej 6 znaków" }),
  repeat_password: z
    .string({ message: "Powtórz hasło" })
    .min(1, { message: "Powtórz hasło" }),
});
