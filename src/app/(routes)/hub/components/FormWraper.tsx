export function FormWraper({ children }: { children: React.ReactNode }) {
  return (
    <div className=" w-full h-[70vh] flex justify-center items-center">
      <div className=" bg-white rounded-md p-8 w-[80%] sm:w-[50%] md:w-[40%] lg:w-[35%]">
        {children}
      </div>
    </div>
  );
}
