import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import type { IDarkModeProps } from "../register";

export function DarkMode({ className = 'cursor-pointer absolute top-4 left-4 w-10 h-10 rounded-full bg-white transition-all duration-200 dark:bg-[#1c1c1e] dark:text-white hover:shadow-[0_0_5px_rgba(0,0,0,.2)] dark:hover:shadow-[0_0_5px_rgba(255,255,255,.2)] flex items-center justify-center' }: IDarkModeProps) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved !== null ? JSON.parse(saved) : false;
  });

  function handleDarkMode() {
    const dark = !isDark;
    setIsDark(dark);
    localStorage.setItem("darkMode", JSON.stringify(dark));
  }

  useEffect(() => {
    document.body.classList.toggle("dark", isDark);
  }, [isDark]);
  return (
    <button onClick={handleDarkMode} className={className}>
      {isDark ? <FiMoon size={20} className={`absolute ${isDark ? 'opacity-100 rotate-0' : 'opacity-50 rotate-45'} transition-all duration  -200`} /> : <FiSun size={20} className={`absolute ${isDark ? 'opacity-50 rotate-45' : 'opacity-100 rotate-0'} transition-all duration-200`} />}
    </button>
  );
}
