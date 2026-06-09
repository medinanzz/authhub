import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export function BackButton() {
    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => {
                navigate('/');
            }} className="w-8 h-8 relative z-100 flex items-center justify-center rounded-full dark:hover:shadow-[0_0_5px_rgba(255,255,255,.1)] dark:text-white text-black bg-white dark:bg-[#1c1c1e] hover:shadow-[0_0_5px_rgba(0,0,0,.2)] cursor-pointer ">
                <FiArrowLeft size={20} />
            </button>
        </>
    );
}