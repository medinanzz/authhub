import { Outlet } from "react-router-dom";
import { DarkMode } from "./components/darkMode";

export function Layout() {
    return (
        <>
            <DarkMode className='cursor-pointer absolute top-3 z-100 right-2 w-10 h-10 rounded-full bg-white transition-all duration-200 dark:bg-[#1c1c1e] dark:text-white hover:shadow-[0_0_5px_rgba(0,0,0,.2)] dark:hover:shadow-[0_0_5px_rgba(255,255,255,.2)] flex items-center justify-center' />
            <Outlet />
        </>
);  
}