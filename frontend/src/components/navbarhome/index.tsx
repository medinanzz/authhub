import { useLocation, useNavigate } from "react-router-dom";
// import type { INavBarProps } from "../../home";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

type NavLink = {
  label: string;
  id: number;
  path: string;
  click: () => void;
};

export function NavBarHome() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const links: NavLink[] = [
    {
      label: "Home",
      id: 1,
      path: "/",
      click: () => {
        setIsOpen(false);
        navigate("/");
      },
    },
    {
      label: "Cadastro",
      id: 2,
      path: "/register",
      click: () => {
        setIsOpen(false);
        navigate("/register");
      },
    },
    {
      label: "Login",
      id: 3,
      path: "/login",
      click: () => {
        setIsOpen(false);
        navigate("/login");
      },
    },
    {
      label: "Perfil",
      id: 4,
      path: "/profiledata",
      click: () => {
        setIsOpen(false);
        navigate("/profiledata");
      },
    },
  ];

  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="absolute pt-3 pl-3">
        <button
          onClick={handleOpen}
          className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 hover:bg-gray-200 relative z-50 dark:text-white dark:hover:bg-(--primary-color) "
        >
          <FiMenu size={20} />
        </button>
      </div>
      <nav
        className={`overflow-hidden z-10 absolute left-0 bg-white min-h-screen top-0 w-60 pt-12 pb-2 dark:bg-[#1c1c1e] ${isOpen ? "translate-x-0 shadow-[0_0_10px_rgba(0,0,0,.2)] dark:shadow-[0_0_10px_rgba(255,255,255,.2)]" : "-translate-x-full shadow-[0_0_0_rgba(0,0,0,0)] dark:shadow-[0_0_0_rgba(255,255,255,0)]"} transition-all duration-300 flex flex-col justify-between`}
      >
        <ul className="flex flex-col gap-1">
          {links.map((item) => (
            <li key={item.id} className={`${isOpen ? 'entry-menu-elements' : ''}`}>
              <button
                onClick={item.click}
                aria-current={isActive(item.path) ? "page" : undefined}
                disabled={isActive(item.path)}
                className={`w-full p-3 text-left transition-colors
                hover:bg-gray-50 hover:inset-shadow-[0_0_5px_rgba(0,0,0,.2)] dark:text-white dark:hover:bg-(--primary-color)
                cursor-pointer
                disabled:pointer-events-none disabled:cursor-default
                ${
                isActive(item.path)
                    ? "bg-gray-50 inset-shadow-[0_0_5px_rgba(0,0,0,.2)] dark:bg-(--primary-color)"
                    : ""
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
