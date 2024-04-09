"use client";

import styles from "./checkForm.module.css";
import { useEffect, useState } from "react";
import { departamentos } from "../lib/globals";
import { useForm } from "react-hook-form";
import { ErrorForm } from "@/app/components";
import { AddresData, CheckData } from "../lib/interfaces";

interface FormAddresDat {
  actionForm: (dat: AddresData) => void;
  actionStep: (step: string) => void;
  defaultValues?: AddresData;
}

function FormAddres({ actionForm, actionStep, defaultValues }: FormAddresDat) {
  const [depSelect, setDepSelect] = useState("");
  const [locations, setLocations] = useState<string[]>([]);

  // useForm HOOK
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // action form
  const onSubmit = handleSubmit((data) => {
    actionForm(data as AddresData);
    actionStep("checkPayment");
  });

  // select dep logic
  useEffect(() => {
    setLocations(departamentos.filter((val) => val.dep === depSelect)[0]?.muni);
  }, [depSelect]);

  return (
    <div className="md:w-4/6">
      <h2 className=" my-6 text-xl">Agregar domicilio</h2>
      <form onSubmit={onSubmit} className={styles.form} autoComplete="off">
        <div className=" p-4 bg-white mb-4 rounded-md">
          <div className=" my-6">
            <label htmlFor="namecomplete">Nombre y apellido</label>
            <input
              className=" w-4/5"
              type="text"
              {...register("namecomplete", {
                required: { value: true, message: "Completa este campo" },
                minLength: { value: 5, message: "Escribe un nombre válido" },
                maxLength: {
                  value: 40,
                  message: "El nombre no debe tener más de 20 caracteres",
                },
              })}
            />
            {errors.namecomplete && (
              <ErrorForm error={String(errors.namecomplete?.message)} />
            )}
          </div>

          <div className=" my-6 md:flex flex-wrap md:justify-between">
            <div className="w-4/5 md:w-[45%]">
              <label htmlFor="dep">Departamento</label>
              <select
                className="w-full"
                {...register("dep", { required: true })}
                onChange={(e) => setDepSelect(e.target.value)}
              >
                {departamentos.map((val) => (
                  <option key={val.dep} value={val.dep}>
                    {val.dep}
                  </option>
                ))}
              </select>
              {errors.dep && (
                <span className="block text-red-500 text-xs">
                  Escribe el departamento
                </span>
              )}
            </div>

            <div className="w-4/5 md:w-[45%]">
              <label htmlFor="loc">Municipio ciudad o localidad</label>
              <select {...register("location")} className=" w-full">
                {locations?.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className=" my-6">
            <label htmlFor="barrio">Barrio</label>
            <input
              type="text"
              {...register("barrio", {
                required: { value: true, message: "Ingresa tu barrio" },
              })}
              id="barrio"
            />
            {errors.barrio && (
              <ErrorForm error={String(errors.barrio?.message)} />
            )}
          </div>

          <div className="flex flex-wrap my-6">
            <div>
              <label htmlFor="tipoCalle">Tipo de calle</label>
              <input
                type="text"
                {...register("tipoCalle", {
                  required: {
                    value: true,
                    message: "Ingresa el tipo de calle",
                  },
                })}
                id="tipoCalle"
                placeholder="ej: Avenida,etc"
              />
              {errors.tipoCalle && (
                <ErrorForm error={String(errors.tipoCalle?.message)} />
              )}
            </div>

            <div>
              <label htmlFor="calle">Calle</label>
              <input
                type="text"
                {...register("calle", {
                  required: {
                    value: true,
                    message: "Ingresa la calle",
                  },
                })}
                id="calle"
              />
              {errors.calle && (
                <ErrorForm error={String(errors.calle?.message)} />
              )}
            </div>

            <div>
              <label htmlFor="numero">Número</label>
              <input type="text" {...register("numero")} id="numero" />
            </div>
          </div>

          <div className=" my-6">
            <label htmlFor="tel">Telefono de Contacto</label>
            <input
              type="text"
              id="tel"
              {...register("tel", {
                required: { value: true, message: "El teléfono es requerido" },
              })}
            />
            {errors.tel && <ErrorForm error={String(errors.tel?.message)} />}
          </div>

          <div className="my-6">
            <label htmlFor="refDir">
              Referencias adicionales de esta dirección
            </label>
            <textarea
              className=" w-full h-[13vh]"
              id="refDir"
              {...register("refDir", {
                required: {
                  value: true,
                  message: "Por favor Ingresa una referencia",
                },
                minLength: {
                  value: 10,
                  message:
                    "Por faovr ingresa una referencia valida y coherente",
                },
              })}
              placeholder="Descripción de la fachada, puntos de referencia para encontrarla,indicaciones, etc."
            ></textarea>
            {errors.refDir && (
              <ErrorForm error={String(errors.refDir?.message)} />
            )}
          </div>
        </div>

        <div className=" flex justify-end">
          <button className=" p-2 bg-blue-500 rounded-md text-white">
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
}

/////////////////////////

function CheckPaymentInfo({
  actionStep,
}: {
  actionStep: (step: string) => void;
}) {
  return (
    <div>
      <h1>Check</h1>
      <button onClick={() => actionStep("checkAddres")}>Back</button>
      <button>Next</button>
    </div>
  );
}

//////////////////////////////////////

export function CheckInfoUser() {
  const [stepInfo, setStepInfo] = useState("addres");
  const [checkData, setCheckData] = useState<CheckData | null>();

  const setAddresData = (data: AddresData) =>
    setCheckData({ addresData: data });

  if (stepInfo === "checkPayment") {
    return <CheckPaymentInfo actionStep={setStepInfo} />;
  }

  return (
    <FormAddres
      actionForm={setAddresData}
      actionStep={setStepInfo}
      defaultValues={checkData?.addresData}
    />
  );
}