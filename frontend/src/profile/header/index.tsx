import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { BiUser } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { MenuProfile } from "../menu";
import { BackButton } from "../../components/backBtn";
export interface NavProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function HeaderProfile() {
  const [isOpen, setIsOpen] = useState(false);
    
  function handleOpen() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <div className={`w-full flex gap-2 p-3 shadow-[0_7px_10px_rgba(0,0,0,.2)] justify-between dark:bg-[#1c1c1e] dark:shadow-[0_7px_10px_rgba(255,255,255,.1)] absolute z-1 bg-white top-0 ${isOpen ? 'bg-transparent z-0' : 'bg-white z-10'}`}>
        <div className="flex gap-2">
          <button onClick={handleOpen} className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 relative z-50 dark:text-white dark:hover:bg-(--primary-color) hover:bg-gray-200">
            <FiMenu size={20} />
          </button>
          <div>
            <BackButton />
          </div>
        </div>
        <div className="flex gap-2">
          <h1 className="text-2xl font-bold dark:text-white uppercase">Perfil</h1>
          <span className="w-8 h-8 bg-gray-300 hover:shadow-[0_0_10px_rgba(0,0,0,.2)] rounded-full flex items-center justify-center dark:text-white dark:hover:bg-(--primary-color) dark:bg-(--primary-color) ">
            <BiUser size={20} />
          </span>
        </div>
      </div>
      <MenuProfile setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
}
