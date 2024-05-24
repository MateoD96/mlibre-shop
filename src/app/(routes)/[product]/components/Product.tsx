"use client";

import { FaArrowAltCircleDown, FaArrowAltCircleRight } from "react-icons/fa";
import Image from "next/image";
//FIXME: this
import { DatumProduct } from "../../shop/[...filtersProducts]/lib/definitions";
import { useState } from "react";
import { useToggle } from "@/app/hooks";
import { insertNewItemCart } from "../../cart/lib/actions";
import { useRouter } from "next/navigation";

interface PropsProd {
  product: DatumProduct;
}

interface SelectCantInt {
  stock: number;
  buyCant: number;
  setBuyCant: (cant: number) => void;
}

export function Product({ product }: PropsProd) {
  const img = product.attributes.image.data.attributes;
  const urlImage = img.url;
  const prodInfo = product.attributes;

  return (
    <div className="w-full my-3 p-2 rounded-md bg-white flex flex-col lg:flex-row">
      {/* info product */}
      <div className=" sm:flex lg:w-[75%]">
        <div className=" relative w-full h-[30vh] sm:w-[55%] lg:w-[40%] sm:h-[30vh] lg:h-[40vh]">
          <Image
            className=" object-cover object-center"
            src={urlImage}
            alt={img.name}
            fill={true}
            priority={true}
          />
        </div>

        <div className="ml-4 sm:w-[40%]">
          <h2 className=" text-2xl font-bold mb-2">{prodInfo.title}</h2>
          <div className=" flex items-center">
            <p className=" text-xl my-2">${prodInfo.price}</p>
            <span className=" ml-2 text-green-600">{prodInfo.descuento}</span>
          </div>
          <p className="my-2">{prodInfo.description}</p>
        </div>
      </div>

      {/* info compra */}
      <div className=" border-2 w-full lg:w-[30%] rounded-md p-2">
        <p className="mb-2">
          <span className=" text-green-600">Envío gratis</span> a todo el país
        </p>
        <div className=" mb-2">
          {prodInfo.stock > 0 ? (
            <BuyProduct prodInfo={prodInfo} prodId={product.id} />
          ) : (
            <span className=" text-red-500">Producto Agotado</span>
          )}
        </div>
      </div>
    </div>
  );
}

function BuyProduct({
  prodInfo,
  prodId,
}: {
  prodInfo: { stock: number; price: number; slug: string };
  prodId: number;
}) {
  const [buyCant, setBuyCant] = useState(1);
  const { push } = useRouter();
  const newItemAction = insertNewItemCart.bind(
    null,
    { prodId, stock: prodInfo.stock, price: prodInfo.price },
    buyCant
  );

  return (
    <>
      <div>
        <p>Stock disponible</p>
        {prodInfo.stock > 1 ? (
          <SelectCant
            stock={prodInfo.stock}
            buyCant={buyCant}
            setBuyCant={setBuyCant}
          />
        ) : null}
      </div>

      {/* Buttons actions*/}

      {/* Action buy product */}
      <div className=" mt-6">
        <button
          type="submit"
          className="p-2 bg-blue-500 block mb-3 w-full text-center rounded-md text-white"
          onClick={() => push(`/${prodInfo.slug}/checkout?qty=${buyCant}`)}
        >
          Comprar
        </button>

        {/* Action add Cart */}
        <form action={newItemAction}>
          <button
            type="submit"
            className=" rounded-md p-2 bg-blue-500 block w-full text-center text-white"
          >
            Añadir al carrito
          </button>
        </form>
      </div>
    </>
  );
}

function SelectCant({ stock, buyCant, setBuyCant }: SelectCantInt) {
  let cant = stock;
  const c = cant > 6 ? (cant = 6) : stock;
  const cantProds = Array.from(Array(c).keys(), (n) => n + 1);
  const { toggle, active } = useToggle();

  return (
    <div className="my-2 relative">
      <button onClick={toggle} className=" cursor-pointer">
        <span className="text-xs flex items-center">
          <span className=" text-sm mr-2">Cantidad: {buyCant}</span>
          {!active ? <FaArrowAltCircleRight /> : <FaArrowAltCircleDown />}
        </span>
      </button>

      <ul
        className={`bg-white shadow-md z-10 top-7 absolute ${
          active ? "block" : "hidden"
        }`}
      >
        {cantProds.map((cant) => (
          <li
            onClick={() => setBuyCant(cant)}
            className={`${
              buyCant === cant ? " border-l-2 border-l-blue-400" : ""
            } p-3 text-sm font-light cursor-pointer`}
            key={cant}
            value={cant}
          >
            <span className=" mr-1">{cant}</span>
            {cant > 1 ? "unidades" : "unidad"}
          </li>
        ))}
        {stock > 6 ? (
          <MoreSixUnits stock={stock} setBuyCant={setBuyCant} />
        ) : null}
      </ul>

      <span className=" text-gray-500 text-sm ml-2">{stock} disponibles</span>
    </div>
  );
}

function MoreSixUnits({
  stock,
  setBuyCant,
}: {
  stock: number;
  setBuyCant: (cant: number) => void;
}) {
  const [moreUnits, setMoreUnits] = useState(false);
  const [errorCant, setErrorCant] = useState("");
  const [cant, setCant] = useState(0);

  const validateCant = () => {
    if (cant <= 0 || !cant) {
      setBuyCant(1);
    } else if (cant > stock) {
      setErrorCant("No hay suficiente stock");
    } else {
      setBuyCant(cant);
      setErrorCant("");
    }
  };

  return (
    <>
      {!moreUnits ? (
        <button
          onClick={() => setMoreUnits(true)}
          className=" font-light p-3 text-sm"
        >
          Más de 6 unidades
        </button>
      ) : (
        <div className="mt-3 ml-3">
          <p className=" text-sm ml-2 font-light">Cantidad:</p>
          <div className="mb-3 mt-1 py-2 w-[60%] rounded-lg relative border-2 border-blue-500">
            <div className="flex">
              <input
                onChange={(e) => setCant(Number(e.target.value))}
                className="w-[60%] outline-none px-2 py-1"
                type="number"
              />
              <button
                onClick={validateCant}
                className=" text-[.7rem] text-gray-400 bottom-1 bg-slate-200 rounded-sm px-2"
              >
                Aplicar
              </button>
            </div>
            {errorCant ? (
              <p className="p-3 text-red-500 text-xs">{errorCant}</p>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
