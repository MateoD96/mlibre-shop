"use server";

import { Me } from "@/app/lib/definitions";
import { postData } from "@/app/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createNewCart } from "../../cart/lib/actions";
import { RegisterUser } from "../registration/validation/registerSchema";
import { LoginUser } from "../login/validation/loginSchema";

const apiAuth = {
  baseUrl: `${process.env.URL_LOCAL}/auth/local`,

  cookieAuth(jwt: string) {
    if (jwt) {
      cookies().set("currentUser", jwt, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60,
        path: "/",
      });
    }
  },
};

export type State = {
  errors?: {
    email?: string[];
    username?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function registerAction(prevState: State, formData: FormData) {
  const { insert } = postData();

  const validateFields = RegisterUser.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "",
    };
  }

  const { jwt, user, error } = await insert(
    `${apiAuth.baseUrl}/register`,
    validateFields.data
  );

  const me: Me = user;

  if (!error) {
    apiAuth.cookieAuth(jwt);

    //create cart user register
    await createNewCart(me.id, jwt);
    redirect("/hub/my-profile");
  }

  return {
    message: error.message,
  };
}

/////////////////////////////////////////

export async function loginAction(prevState: State, formData: FormData) {
  const { insert } = postData();

  //TODO: Validate
  const validateFields = LoginUser.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "",
    };
  }

  const { jwt, error } = await insert(apiAuth.baseUrl, validateFields.data);

  if (!error) {
    apiAuth.cookieAuth(jwt);
    redirect("/hub/my-profile");
  }
  return {
    message: error.message,
  };
}

export async function logoutAction() {
  cookies().delete("currentUser");
  redirect("/signup");
}
