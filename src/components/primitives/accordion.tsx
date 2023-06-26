"use client";

import { useContext, useState } from "react";

import clsx from "clsx";
import Image from "next/image";
import Arrow from "public/icons/arrow-gray.svg";
import React from "react";

interface AccordionProps {
  header: string;
  children: React.ReactNode;
}

const AccordionShowContext = React.createContext<boolean>(false);

export const Root = ({ header, children }: AccordionProps) => {
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
      <AccordionShowContext.Provider value={show}>
        {children}
      </AccordionShowContext.Provider>
    </div>
  );
};

const Paragraph = ({ text }: { text: string }) => {
  const show = useContext(AccordionShowContext);

  return (
    <p
      className={clsx(
        "leading-6 transition-all duration-300 overflow-hidden pt-2",
        !show && "!h-0 opacity-0 !pt-0"
      )}
    >
      {text}
    </p>
  );
};

export const Accordion = { Root, Paragraph };
