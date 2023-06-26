"use client";

import clsx from "clsx";
import Image from "next/image";
import Arrow from "public/icons/arrow-gray.svg";
import { cloneElement } from "react";
import useDropdown from "~/lib/hooks/useDropDown";

export const Root = ({
  label,
  placeholder,
  options,
  onDefault,
}: {
  label: string;
  placeholder: string;
  options: React.ReactElement<OptionProps>[];
  onDefault?: (event?: any) => void;
}) => {
  const { isOpen, selectedOption, ref, toggleDropdown, handleSelect } =
    useDropdown<HTMLLabelElement>();

  const clonedOptions = options.map((option) =>
    cloneElement(option, {
      onClick: (event?: any) => {
        option.props.onClick?.call(event);
        handleSelect(option.props.label);
      },
    })
  );

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
            {clonedOptions}
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
  return (
    <li className="flex p-3 " key={label} onClick={() => onClick()}>
      {label}
    </li>
  );
};

export const Select = { Root, Option };
