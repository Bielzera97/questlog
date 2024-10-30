// components/LogoutButton.tsx
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Usuário deslogado");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return <button onClick={handleLogout}>Sair</button>;
}
