"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const apiAuth = {
  baseUrl: "http://localhost:1337/api/auth/local",
  // TODO: recibir los datos previamente validados

  async post(data: FormData, url?: string) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    const rawFormData = Object.fromEntries(data.entries());

    try {
      const resp = await fetch(`${this.baseUrl}/${url || ""}`, {
        ...options,
        body: JSON.stringify(rawFormData),
      });
      return await resp.json();
    } catch (error) {
      console.error(error);
      return;
    }
  },

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
  //TODO: validate
  const { jwt, error } = await apiAuth.post(formData, "register");

  if (!error) {
    apiAuth.cookieAuth(jwt);
    redirect("/hub/my-profile");
  }

  //TODO: indicar el error de autenticación al usuario
}

/////////////////////////////////////////

export async function loginAction(formData: FormData) {
  //TODO: Validate
  const { jwt, error } = await apiAuth.post(formData);

  if (!error) {
    apiAuth.cookieAuth(jwt);
    redirect("/hub/my-profile");
  }
}

export async function logoutAction() {}
