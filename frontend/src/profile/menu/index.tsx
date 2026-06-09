import { useNavigate } from "react-router-dom"
import type { NavProps } from "../header";
import { FiMenu } from "react-icons/fi";
import { BackButton } from "../../components/backBtn";

export function MenuProfile({ isOpen, setIsOpen }: NavProps) {
    const navegate = useNavigate();
    const lis = [
        { label: 'Dados', id: 1, click: () => {setIsOpen(false); navegate('/profiledata');}, },
        { label: 'Quando criada', id: 2, click: () => {setIsOpen(false); navegate('/profilewhencreated');}, },
    ]

    function handleLogout() {
        localStorage.removeItem('savedUser');
        setIsOpen(false);
        navegate('/');
        return;
    }

    return (
        <>
            <nav className={`z-100 absolute left-0 bg-white min-h-screen top-0 w-60 pt-12 pb-2 dark:shadow-[0_0_10px_rgba(255,255,255,.2)] dark:bg-[#1c1c1e] ${isOpen ? 'translate-x-0 shadow-[0_0_10px_rgba(0,0,0,.2)] dark:shadow-[0_0_10px_rgba(255,255,255,.2)]' : '-translate-x-full shadow-[0_0_0_rgba(0,0,0,0)] dark:shadow-[0_0_10px_rgba(255,255,255,0)] '} transition-all duration-300 flex flex-col justify-between`}>
                <div className="absolute left-4 top-3 flex gap-2">
                    <button className="dark:text-white text-black hover:bg-[#252528] w-8 h-8 flex items-center justify-center rounded-full cursor-pointer" onClick={() => setIsOpen(false)}>
                        <FiMenu size={20} />
                    </button>
                    <BackButton />
                </div>
                <ul>
                    {lis.map(item => (
                        <li key={item.id}>
                            <button onClick={item.click} className="w-full p-3 cursor-pointer text-left hover:bg-gray-50 hover:inset-shadow-[0_0_5px_rgba(0,0,0,.2)] dark:text-white dark:hover:bg-(--primary-color) ">
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
                <ul>
                    <li>
                        <button onClick={handleLogout} className="w-full p-3 cursor-pointer text-left hover:bg-gray-50 hover:inset-shadow-[0_0_5px_rgba(0,0,0,.2)] dark:text-white dark:hover:bg-(--primary-color)">
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}