// src/pages/Profile.tsx
import { useNavigate } from "react-router-dom";
import { HeaderProfile } from "./header";



export function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("savedUser") ?? "null");

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen">
      <HeaderProfile />
      <p>{user.nameUser}</p>
      <p>{user.emailUser}</p>
    </div>
  );
}