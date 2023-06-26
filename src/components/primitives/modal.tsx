"use client";

import clsx from "clsx";
import Image from "next/image";
import Cross from "public/icons/close.svg";
import { createPortal } from "react-dom";
import { Button } from "./button";

interface IModalProps {
  children: React.ReactNode;
  visible: boolean;
  setVisible: (event?: any) => void;
}

const Root = ({ children, visible, setVisible }: IModalProps) => {
  return createPortal(
    <div
      className={clsx(
        "fixed inset-0 z-20 h-screen duration-150",
        "bg-black/50",
        !visible && "invisible opacity-0",
        visible && "visible flex items-center justify-center opacity-100"
      )}
      onClick={() => setVisible(false)}
    >
      <div
        className="relative p-6 bg-white rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          className="absolute top-6 right-6"
          onClick={() => setVisible(false)}
        >
          <Image src={Cross} alt="cross" width={16} height={16} />
        </button>
      </div>
    </div>,
    document.body
  );
};

interface DialogProps {
  onConfirm: (event?: any) => void;
  onCancel: (event?: any) => void;
  description: string;
  label: string;
}

const Dialog = ({ label, description, onConfirm, onCancel }: DialogProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h6 className="text-xl font-semibold">{label}</h6>
        <p>{description}</p>
      </div>
      <div className="flex gap-2">
        <Button onClick={onConfirm}>Да</Button>
        <Button variant="secondary" onClick={onCancel}>
          Нет
        </Button>
      </div>
    </div>
  );
};

const Confirm = ({ onConfirm }: { onConfirm: (event?: any) => void }) => {
  <Button onClick={onConfirm}>Да</Button>;
};

const Cancel = ({ onCancel }: { onCancel: (event?: any) => void }) => {
  <Button onClick={onCancel}>Нет</Button>;
};

export const Modal = { Root, Dialog, Action: { Confirm, Cancel } };
