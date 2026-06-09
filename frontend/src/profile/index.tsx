import { HeaderProfile } from "./header";

export function Profile() {
  const user = JSON.parse(localStorage.getItem("savedUser") ?? "null");

  return (
    <div className=" ">
      <HeaderProfile />
      <div className="min-h-screen dark:bg-[#1c1c1e] dark:text-white flex items-center justify-center">
       {user ? (
          <ul>
            <li>{user.nameUser}</li>
            <li>{user.emailUser}</li>
          </ul>
        ) : (
          <p>Nenhum usuário cadastrado</p>
        )}
      </div>
    </div>
  );
}