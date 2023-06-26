"use client";

export const TextField = ({
  label,
  placeholder,
  onChange,
}: {
  label: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label className="flex flex-col gap-1 text-sm text-content-primary">
      {label}
      <input
        type="text"
        className="outline-none px-4 py-[10px] border rounded-lg placeholder:text-content-tertiary
                         active:placeholder:text-content-primary focus:border-orange duration-300"
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
};
