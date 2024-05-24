"use client";

import styles from "../styles.module.css";
import { Datum } from "../../lib/definitions";
import { IoMdMenu } from "react-icons/io";
import { FaArrowAltCircleDown, FaArrowAltCircleRight } from "react-icons/fa";
import { SiMercadopago } from "react-icons/si";
import { FaCartShopping } from "react-icons/fa6";
import { useToggle } from "../../hooks";
import { memo, useContext } from "react";
import Link from "next/link";
import { SearchBar, Wrapper } from "..";
import CartContext from "@/app/context/cartCtx";
import { logoutAction } from "@/app/(routes)/hub/lib/actions";

interface Props {
  userVerify: void | "" | { jti: string; iat: number } | undefined;
  categories: Datum[];
}

interface Item {
  title: string;
  styles: string;
  href: string;
}

interface InfoItems {
  items: Item[];
}

export function LayoutMenu({ children }: { children: React.ReactNode }) {
  return (
    <div className=" w-full bg-yellow-400 h-18 sticky top-0 z-50">
      <Wrapper>
        <div className="flex justify-between items-center relative">
          <div className=" ml-10  sm:ml-0">
            <h1 className=" text-5xl">
              <Link href={"/"}>
                <SiMercadopago />
              </Link>
            </h1>
          </div>
          {children}
        </div>
      </Wrapper>
    </div>
  );
}

export const MobileBar = memo(({ categories, userVerify }: Props) => {
  const { active, toggle } = useToggle();

  return (
    <div className="md:hidden">
      {/* Btn active menu */}
      <div
        onClick={toggle}
        className=" z-50 cursor-pointer absolute top-5  left-0 text-2xl"
      >
        <IoMdMenu />
      </div>

      <SearchBar />

      <div
        className={` ${
          active ? "block" : "hidden"
        }  z-20 fixed top-0 left-0 right-0 bottom-0 w-full sm:hidden max-h-screen bg-black bg-opacity-25`}
      >
        <div className="absolute top-0 bottom-0 w-7/12 bg-yellow-50">
          <nav className=" h-screen ml-2 flex flex-col justify-between">
            <ul className="mt-16">
              {categories &&
                categories.map((c) => (
                  <li className="list-none mb-2 border-b-2" key={c.id}>
                    <ListItemsMobile cat={c} />
                  </li>
                ))}
            </ul>

            <ul className=" list-none h-[40vh]">
              {!userVerify ? (
                <InfoNav
                  items={[
                    {
                      title: "Crear cuenta",
                      styles: "mb-2",
                      href: "/hub/registration",
                    },
                    { title: "Acceder", styles: "mb-2", href: "/hub/login" },
                  ]}
                />
              ) : (
                <>
                  <InfoNav
                    items={[
                      {
                        title: "Tus Compras",
                        styles: "mb-2",
                        href: "/cart",
                      },
                      {
                        title: "Mi Perfil",
                        styles: "mb-2",
                        href: "/hub/my-profile",
                      },
                    ]}
                  />

                  <li className="my-3 text-xl">
                    <Link href={"/cart"}>
                      <FaCartShopping />
                    </Link>
                  </li>

                  <form action={logoutAction} className="mx-2">
                    <button>Cerrar Sesión</button>
                  </form>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
});

export const DesktopBar = memo(({ categories, userVerify }: Props) => {
  const { cartItemsN } = useContext(CartContext);
  return (
    <>
      <div className=" hidden md:flex flex-col">
        <SearchBar />
        <nav>
          <ul className=" flex">
            {categories &&
              categories.map((category) => (
                <li
                  key={category.id}
                  className={`${styles.categorie} mr-3 mt-1 text-sm cursor-pointer`}
                >
                  <span>{category.attributes.title}</span>

                  <ul className=" hidden">
                    {category.attributes.sub_categorias?.data.map((subcat) => (
                      <li key={subcat.id} className=" text-white my-2">
                        <Link
                          href={`/cat/${subcat.attributes.title.toLowerCase()}`}
                        >
                          {subcat.attributes.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        </nav>
      </div>

      <ul className=" hidden  md:flex list-none items-center text-gray-800">
        {!userVerify ? (
          <InfoNav
            items={[
              {
                title: "Crear cuenta",
                styles: "mb-2",
                href: "/hub/registration",
              },
              { title: "Acceder", styles: "mb-2", href: "/hub/login" },
            ]}
          />
        ) : (
          <>
            <InfoNav
              items={[
                {
                  title: "Tus Compras",
                  styles: "mb-2",
                  href: "/cart",
                },
                {
                  title: "Mi Perfil",
                  styles: "mb-2",
                  href: "/hub/my-profile",
                },
              ]}
            />

            <li className="my-3 mx-2 text-xl relative">
              <span className=" text-xs absolute -top-3 left-2">
                {cartItemsN && cartItemsN > 0 ? cartItemsN : ""}
              </span>
              <Link href={"/cart"}>
                <FaCartShopping />
              </Link>
            </li>

            <form action={logoutAction}>
              <button type="submit">Cerrar Sesión</button>
            </form>
          </>
        )}
      </ul>
    </>
  );
});

function ListItemsMobile({ cat }: { cat: Datum }) {
  const { active, toggle } = useToggle();

  return (
    <>
      <div onClick={toggle} className=" flex items-center cursor-pointer">
        <span className="w-3/5">{cat.attributes.title}</span>
        <span className=" ml-2 text-xs">
          {!active ? <FaArrowAltCircleRight /> : <FaArrowAltCircleDown />}
        </span>
      </div>

      {/* subcategorias */}

      <ul
        className={`${
          active ? "h-auto transition-all" : "h-0"
        }  h-0 overflow-hidden transition-all ml-2 my-2`}
      >
        {cat.attributes?.sub_categorias?.data.map((subCat) => (
          <li key={subCat.id}>
            <Link href={`/cat/${subCat.attributes.title.toLowerCase()}`}>
              {subCat.attributes.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function InfoNav({ items }: InfoItems) {
  return (
    <>
      {items.map((item) => (
        <li key={item.title} className=" ml-3">
          <Link href={item.href}>{item.title}</Link>
        </li>
      ))}
    </>
  );
}
