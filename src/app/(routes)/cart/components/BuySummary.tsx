"use client";

interface Props {
  summaryProducts?: {
    cant?: number;
    total?: number;
  };
  children?: React.ReactNode;
}

export function BuySummary({ summaryProducts, children }: Props) {
  return (
    <div className=" bg-white mt-4 md:mt-0 md:ml-4 h-[30vh] md:w-[25%]">
      <p className=" border-b-[1px] border-gray-400 p-4 font-bold">
        Resumen de compra
      </p>
      <div className="p-4 text-sm">
        <div className=" flex justify-between">
          <span className=" text-gray-600">
            {summaryProducts?.cant && summaryProducts?.cant > 1
              ? "Productos"
              : "Producto"}
            ({summaryProducts?.cant})
          </span>
          <span>${summaryProducts?.total}</span>
        </div>

        <div className="my-2 flex justify-between">
          <span className=" text-gray-600">Envío</span>
          <span className=" text-green-500">Gratis</span>
        </div>

        <div className="mb-2 flex justify-between font-bold">
          <span>Total</span>
          <span>${summaryProducts?.total}</span>
        </div>

        {children}
      </div>
    </div>
  );
}
