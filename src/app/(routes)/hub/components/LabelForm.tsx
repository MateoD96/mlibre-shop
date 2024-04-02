interface PropsLabel {
  children: React.ReactNode;
  title: string;
  type: string;
  name: string;
  required?: boolean;
}

export function LabelForm({
  children,
  title,
  type,
  required,
  name,
}: PropsLabel) {
  return (
    <div className="flex flex-col my-2">
      <label className="  my-2" htmlFor={name}>
        <div className="flex items-center">
          {children}
          <span className=" ml-2">{title}</span>
        </div>
      </label>

      <input
        className="outline-none border-2 border-yellow-100 px-2 py-1 rounded-md"
        type={type}
        name={name}
        id={name}
        required={required}
      />
    </div>
  );
}
