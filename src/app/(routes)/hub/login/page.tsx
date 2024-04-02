"use client";

import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { FormWraper, LabelForm } from "../components";
import { loginAction } from "../lib/actions";
import { useFormState } from "react-dom";
import { ErrorForm, SubmitButton } from "@/app/components";
export default function LoginPage({
  searchParams,
}: {
  searchParams: { atc: string };
}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(loginAction, initialState);

  return (
    <FormWraper>
      <h3 className="text-center text-xl font-medium">
        {searchParams.atc === "true" ? "Hola,para agregar al carrito " : ""}
        Ingresa tu e-mail o nombre de usuario
      </h3>
      <form action={dispatch} className="mt-6">
        <LabelForm
          type="text"
          name="identifier"
          title="E-mail o nombre de usuario"
          required
        >
          <FaUserCircle className="text-blue-500 text-xl" />
        </LabelForm>

        {state.errors?.identifier?.map((err) => (
          <ErrorForm error={err} />
        ))}

        <LabelForm
          type="password"
          name="password"
          title="Ingresa tu contraseña"
          required
        >
          <RiLockPasswordFill className="text-blue-500 text-xl" />
        </LabelForm>

        {state.errors?.password?.map((err) => (
          <ErrorForm error={err} />
        ))}

        <ErrorForm error={state.message} />

        <SubmitButton className="mt-6 text-center w-full bg-blue-500 py-2 text-white rounded-md">
          Ingresar
        </SubmitButton>
      </form>
    </FormWraper>
  );
}
