import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { FormWraper, LabelForm } from "../components";
import { loginAction } from "../lib/actions";

export default function LoginPage() {
  return (
    <FormWraper>
      <h3 className="text-center text-lg font-medium">
        Ingresa tu e-mail o nombre de usuario
      </h3>
      <form action={loginAction} className="mt-6">
        <LabelForm
          type="text"
          name="identifier"
          title="E-mail o nombre de usuario"
          required
        >
          <FaUserCircle className="text-blue-500 text-xl" />
        </LabelForm>

        <LabelForm
          type="password"
          name="password"
          title="Ingresa tu contraseña"
          required
        >
          <RiLockPasswordFill className="text-blue-500 text-xl" />
        </LabelForm>

        <button
          type="submit"
          className=" mt-6 text-center w-full bg-blue-500 py-2 text-white rounded-md"
        >
          Ingresar
        </button>
      </form>
    </FormWraper>
  );
}
