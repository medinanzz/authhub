import { useNavigate } from "react-router-dom";
import { HeaderProfile } from "./header";

export function Profile() {
  const navigate = useNavigate();
  let user: { name?: string, email?: string, createdAt?: string } | null = null;

  const url = import.meta.env.VITE_API_URL;
  async function handleDeleteAccount() {
    const user = JSON.parse(localStorage.getItem('savedUser') ?? 'null');
    const resp = await fetch(`${url}/user/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email }),
    });

    if(resp.ok) {
      localStorage.removeItem('savedUser');
      navigate('/');
    }
  }

  try {
    user = JSON.parse(localStorage.getItem('savedUser') ?? 'null');
  } catch {
    user = null;
  }

  function handleLogout() {
    localStorage.removeItem('savedUser');
    navigate('/');
  }

  const createdAt = user?.createdAt ? new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo',
    }).format(new Date(user.createdAt)) : null;

  // const user = JSON.parse(localStorage.getItem("savedUser") ?? "null");
  console.log(JSON.parse(localStorage.getItem('savedUser') ?? 'null'));
  

  return (
    <div className=" ">
      <HeaderProfile />
      <div className="min-h-screen dark:bg-[#1c1c1e] dark:text-white flex items-center justify-center">
       {user ? (
          <div className="p-4 text-[1.05em] flex flex-col gap-4 bg-[#ebebeb] dark:bg-[#252528] rounded-md">
            <ul className="flex flex-col gap-1">
              <li><b>Nome: </b>{user.name}</li>
              <li><b>Email: </b>{user.email}</li>
              {createdAt && (
                <li>Conta criada {createdAt} </li>
              )}
            </ul>
            <div className="w-full flex gap-2">
              <button className="bg-red-500 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 cursor-pointer" onClick={handleLogout}>Sair</button>
              <button className="bg-gray-50 w-full hover:bg-gray-300 text-black font-bold py-2 px-4 rounded transition-all duration-300 cursor-pointer" onClick={handleDeleteAccount}>Excluir conta</button>
            </div>
          </div>
        ) : (
          <p>Nenhum usuário cadastrado</p>
        )}
      </div>
    </div>
  );
}