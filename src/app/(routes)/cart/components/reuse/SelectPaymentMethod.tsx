export default function SelectPaymentMethod({
  children,
  selectFn,
  val,
  method,
  checked,
}: {
  children: React.ReactNode;
  selectFn: (val: string) => void;
  val: string;
  method: string;
  checked?: boolean;
}) {
  return (
    <label
      style={{ borderLeft: method === val ? "4px solid #3483fa" : "" }}
      className={`bg-white flex w-full p-6 h-[15vh] cursor-pointer hover:bg-gray-50 border`}
      htmlFor={val}
    >
      <div className=" flex items-center ">
        <input
          onChange={(e) => selectFn(e.target.value)}
          type="radio"
          id={val}
          name="method"
          value={val}
          className="block"
          checked={checked}
        />
        <div className=" flex">{children}</div>
      </div>
    </label>
  );
}
