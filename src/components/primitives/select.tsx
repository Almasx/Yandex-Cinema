"use client";

import { createContext, useContext } from "react";

import clsx from "clsx";
import Image from "next/image";
import Arrow from "public/icons/arrow-gray.svg";
import useDropdown from "~/lib/hooks/useDropDown";

const SelectContext = createContext<((option: string | null) => void) | null>(
  null
);

export const Root = ({
  label,
  placeholder,
  children,
  onDefault,
}: {
  label: string;
  placeholder: string;
  children: React.ReactNode;
  onDefault?: (event?: any) => void;
}) => {
  const { isOpen, selectedOption, ref, toggleDropdown, handleSelect } =
    useDropdown<HTMLLabelElement>();

  return (
    <label
      className="relative flex flex-col gap-1 text-sm text-content-primary"
      ref={ref}
    >
      {label}
      <div
        className={clsx(
          "flex items-center h-10 px-4 duration-300 border rounded-lg outline-none appearance-none text-content-tertiary justify-between",
          isOpen && "!text-content-primary border-orange"
        )}
        onClick={toggleDropdown}
      >
        {selectedOption ?? placeholder}
        <Image
          src={Arrow}
          alt="arrow"
          className={clsx(isOpen && "-scale-y-100", "duration-100")}
        />
      </div>
      <ul
        className={clsx(
          "absolute top-full right-0 left-0 z-10 translate-y-1 overflow-clip ",
          "rounded-lg duration-150 bg-white p-2",
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        {isOpen && (
          <div className="flex flex-col">
            <li
              className="flex p-3"
              onClick={() => {
                onDefault && onDefault();
                handleSelect(null);
              }}
            >
              Не выбран
            </li>
            <SelectContext.Provider value={handleSelect}>
              {children}
            </SelectContext.Provider>
          </div>
        )}
      </ul>
    </label>
  );
};

interface OptionProps {
  label: string;
  onClick: (event?: any) => void;
}

const Option = ({ label, onClick }: OptionProps) => {
  const handleSelect = useContext(SelectContext);
  return (
    <li
      className="flex p-3 "
      key={label}
      onClick={() => {
        onClick();
        handleSelect?.(label);
      }}
    >
      {label}
    </li>
  );
};

export const Select = { Root, Option };
