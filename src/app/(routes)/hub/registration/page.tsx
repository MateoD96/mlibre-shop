"use client";

import { FormWraper, LabelForm } from "../components";
import { MdEmail } from "react-icons/md";
import { FaClipboardUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { registerAction } from "../lib/actions";
import { useFormState } from "react-dom";
import { ErrorForm, SubmitButton } from "@/app/components";

export default function RegistrationPage() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(registerAction, initialState);

  return (
    <FormWraper>
      <h3 className=" text-center text-lg font-medium">
        Completa los datos para crear tu cuenta
      </h3>

      <form action={dispatch} className=" mt-6">
        <LabelForm type="email" title="Agrega tu e-mail" name="email" required>
          <MdEmail className="text-blue-500 text-xl" />
        </LabelForm>
        {state?.errors?.email?.map((err) => (
          <ErrorForm error={err} />
        ))}
        <LabelForm type="text" name="username" title="Elige tu nombre" required>
          <FaClipboardUser className="text-blue-500 text-xl" />
        </LabelForm>
        {state?.errors?.username?.map((err) => (
          <ErrorForm error={err} />
        ))}
        <LabelForm
          type="password"
          name="password"
          title="Crea tu contraseña"
          required
        >
          <RiLockPasswordFill className=" text-blue-500 text-xl" />
        </LabelForm>
        {state?.errors?.password?.map((err) => (
          <ErrorForm error={err} />
        ))}
        <ErrorForm error={state.message} />

        <SubmitButton className="mt-6 text-center w-full bg-blue-500 py-2 text-white rounded-md">
          Registrar
        </SubmitButton>
      </form>
    </FormWraper>
  );
}
