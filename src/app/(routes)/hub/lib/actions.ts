"use server";

import { Me } from "@/app/lib/definitions";
import { postData } from "@/app/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createNewCart } from "../../cart/lib/actions";

interface Register {
  username: string;
  email: string;
  password: string;
}

interface Login {
  identifier: string;
  password: string;
}

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

export async function registerAction(formData: FormData) {
  const { insert } = postData();
  //TODO: validate
  const data: Register = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { jwt, user, error } = await insert(
    `${apiAuth.baseUrl}/register`,
    data
  );

  const me: Me = user;

  if (!error) {
    apiAuth.cookieAuth(jwt);

    //create cart user register
    await createNewCart(me.id, jwt);
    redirect("/hub/my-profile");
  }

  console.log(error);

  //TODO: indicar el error de autenticación al usuario
}

/////////////////////////////////////////

export async function loginAction(formData: FormData) {
  const { insert } = postData();

  //TODO: Validate
  const loginDat: Login = {
    identifier: formData.get("identifier") as string,
    password: formData.get("password") as string,
  };

  const { jwt, error } = await insert(apiAuth.baseUrl, loginDat);

  if (!error) {
    apiAuth.cookieAuth(jwt);
    redirect("/hub/my-profile");
  }
}

export async function logoutAction() {
  cookies().delete("currentUser");
  redirect("/signup");
}
