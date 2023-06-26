"use client";

import clsx from "clsx";
import Image from "next/image";
import Arrow from "public/icons/arrow-gray.svg";
import { useState } from "react";

interface AccordionProps {
  header: string;
  text: string;
}

export const Accordion = ({ header, text }: AccordionProps) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div
      className="flex flex-col p-4 bg-white rounded-lg"
      onClick={() => setShow((show) => !show)}
    >
      <div className="flex items-center justify-between">
        <h6 className="text-2xl font-semibold">{header}</h6>
        <Image
          src={Arrow}
          alt="arrow"
          className={clsx(show && "-scale-y-100", "duration-100")}
        />
      </div>
      <p
        className={clsx(
          "leading-6 transition-all duration-300 overflow-hidden pt-2",
          !show && "!h-0 opacity-0 !pt-0"
        )}
      >
        {text}
      </p>
    </div>
  );
};
