"use client";

import clsx from "clsx";

interface Button {
  children: React.ReactNode;
  onClick: (event?: React.MouseEvent<HTMLElement>) => void;
}

export const Button = ({
  children,
  onClick,
  variant = "primary",
}: Button & { variant?: "primary" | "secondary" }) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 text-sm rounded-lg font-medium",
        variant === "primary" &&
          "bg-orange hover:bg-orange-secondary text-white",
        variant === "secondary" && "border border-orange  text-orange"
      )}
      onClick={(event) => onClick(event)}
    >
      {children}
    </button>
  );
};

export const MiniButton = ({
  children,
  onClick,
  disabled,
}: Button & { disabled?: boolean }) => {
  return (
    <button
      className=" p-1 text-sm text-white rounded-[4px] bg-orange hover:bg-orange-secondary disabled:bg-orange-tertiary"
      onClick={(event) => onClick(event)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
