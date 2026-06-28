import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { NavBarHome } from "../navbarhome";

export interface IDarkModeProps {
  className?: string;
}

export function Register() {
    const navegate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [erro, setErro] = useState("");

  const errors = {
    name: !name.trim() ? "O nome não pode ser vazio" : "",
    email: !email.trim()
      ? "O email não pode ser vazio"
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Email inválido"
        : "",
    password:
      password.length < 6 ? "A senha precisa ter pelo menos 6 caracteres" : "",
  };

  function handleBlur(field: keyof typeof touched) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  /* inputs do formulário */
  const inputs = [
    {
      value: name,
      label: "Nome do usuário",
      id: 1,
      change: (e: React.ChangeEvent<HTMLInputElement>) =>
        setName(e.target.value),
      type: "text",
      classButton: "hidden",
      blur: () => handleBlur("name"),
      error: errors.name,
      field: "name" as keyof typeof touched,
    },
    {
      value: email,
      label: "Email",
      id: 2,
      change: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
      type: "email",
      classButton: "hidden",
      blur: () => handleBlur("email"),
      error: errors.email,
      field: "email" as keyof typeof touched,
    },
    {
      value: password,
      label: "Senha",
      id: 3,
      change: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
      type: viewPassword ? "text" : "password",
      classButton: "inline-block",
      blur: () => handleBlur("password"),
      error: errors.password,
      field: "password" as keyof typeof touched,
    },
  ];

  /* botões de ações do formlário */

  function handleReset() {
    setEmail("");
    setName("");
    setPassword("");
    setViewPassword(false);
    setTouched({ name: false, password: false, email: false });
    setErro('');
  }

  const buttons = [
    {
      label: "Cadastro",
      id: 1,
      type: "submit",
      class:
        "bg-blue-500 dark:bg-blue-900 font-bold rounded text-white py-2 transition-all duration-300 hover:bg-blue-700 cursor-pointer",
    },
    {
      label: "Limpar",
      id: 2,
      type: "button",
      click: handleReset,
      class:
        "bg-red-500 dark:bg-red-900 text-white py-2 font-bold rounded transition-all duration-300 hover:bg-red-700 cursor-pointer",
    },
  ];

  /* fromHandle */
  const url = import.meta.env.VITE_API_URL;
  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });
    if (!errors.name && !errors.email && !errors.password) {
      try {
        const resp = await fetch(`${url}/user/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await resp.json();
        
        if(resp.status === 409) {
          Swal.fire({
            icon: 'error',
            title: 'Ops... algo deu errado :(',
            text: data.msg
          });
          return;
        }
        
        if (!resp.ok) throw new Error("Erro na requisição");
        localStorage.setItem('savedUser', JSON.stringify(data));
        
        Swal.fire({
            icon: 'success',
            title: 'Login realizado com sucesso',
            text: data.msg,
            timer: 2000,
        });
        navegate('/profiledata');
        handleReset();
      } catch (error) {
        setErro("Não foi possível conectar ao servidor");
        console.log(error);
      }
    }
  }

  return (
    <div className="bg-img-login-register text-white">
      <NavBarHome />
      <div className="flex items-center justify-center min-h-screen flex-col gap-2">
        <h1 className="font-bold text-3xl uppercase entry-from-element">Auth Hub - Cadastro</h1>
        <form
          onSubmit={handleFormSubmit}
          className="dark:bg-[rgb(0,0,0,.4)] bg-[rgb(255,255,255,.4)] entry-from-element backdrop-blur-sm rounded p-4 w-70 mt-2"
        >
          <div className="flex flex-col gap-2 w-full">
            {inputs.map((item) => (
              <div key={item.id}>
                <div className="relative flex flex-col w-full">
                  <div className="relative">
                    <input
                      type={item.type}
                      onChange={item.change}
                      value={item.value}
                      className="border-2 hover:border-blue-500 w-full transition-all duration-300 focus:border-blue-500 border-gray-300 rounded p-3 outline-0 dark:hover:border-[#2a2a2d] dark:border-[#3d3d45] dark:focus:border-[#2a2a2d]"
                      onBlur={item.blur}
                      placeholder=" "
                    />
                    <label className="absolute top-[50%] -translate-y-1/2 left-2 text-zinc-500 pointer-events-none font-mono ">
                      {item.label}
                    </label>
                    <button
                      onClick={() => setViewPassword(!viewPassword)}
                      type="button"
                      //   className=''
                      className={`${item.classButton} absolute top-[50%] cursor-pointer -translate-y-1/2 right-2`}
                    >
                      {viewPassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FiEye size={20} />
                      )}
                    </button>
                  </div>
                  {/* // remova a linha `{touched.}` e substitua por: */}
                </div>
                {touched[item.field] && item.error && (
                  <span className="text-red-500 text-sm text-center m-auto block w-40 mt-1">
                    {item.error}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1 mt-2">
            {buttons.map((item) => (
              <button
                key={item.id}
                className={item.class}
                type={item.type as "submit" | "reset" | "button" | undefined}
                onClick={item.click}
              >
                {item.label}
              </button>
            ))}
          </div>
          <span className="text-sm text-red-400 opacity-75">{erro}</span>
        </form>
      </div>
    </div>
  );
}
