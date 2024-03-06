import { FormWraper } from "../components";
import { MdEmail } from "react-icons/md";
import { FaClipboardUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { LabelForm } from "../components";

export default function RegistrationPage() {
  return (
    <FormWraper>
      <h3 className=" text-center text-lg font-medium">
        Completa los datos para crear tu cuenta
      </h3>

      <form className=" mt-6">
        <LabelForm type="email" name="email" title="Agrega tu e-mail" required>
          <MdEmail className="text-blue-500 text-xl" />
        </LabelForm>

        <LabelForm type="text" name="username" title="Elige tu nombre" required>
          <FaClipboardUser className="text-blue-500 text-xl" />
        </LabelForm>

        <LabelForm
          type="password"
          name="password"
          title="Crea tu contraseña"
          required
        >
          <RiLockPasswordFill className=" text-blue-500 text-xl" />
        </LabelForm>

        <button
          type="submit"
          className=" mt-6 text-center w-full bg-blue-500 py-2 text-white rounded-md"
        >
          Registrar
        </button>
      </form>
    </FormWraper>
  );
}
