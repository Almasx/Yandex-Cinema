import { useCallback, useEffect, useRef, useState } from "react";

type DropdownHook<T> = {
  isOpen: boolean;
  selectedOption: string | null;
  ref: React.RefObject<T>;
  toggleDropdown: () => void;
  handleSelect: (option: string | null) => void;
};

const useDropdown = <T extends HTMLElement>(): DropdownHook<T> => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const ref = useRef<T>(null);

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = useCallback(
    () => setIsOpen((isOpen) => !isOpen),
    [setIsOpen]
  );

  const handleSelect = useCallback((option: string | null) => {
    setSelectedOption(option);
    setIsOpen(false);
  }, []);

  return { isOpen, selectedOption, ref, toggleDropdown, handleSelect };
};

export default useDropdown;
