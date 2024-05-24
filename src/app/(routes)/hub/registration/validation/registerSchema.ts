import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor ingresa un email valido",
  }),
  username: z
    .string()
    .min(3, { message: "El username debe tener mas de 3 caracteres" })
    .max(30, { message: "No puedes tener mas de 30 caracteres" }),

  password: z
    .string()
    .min(6, { message: "El password debe tener mas de 6 caracteres" }),
});

export const RegisterUser = formSchema;
