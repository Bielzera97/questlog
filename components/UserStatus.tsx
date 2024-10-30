import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { signOut, onAuthStateChanged, User } from "firebase/auth";

export default function UserStatus() {
  const [user, setUser] = useState<User | null>(null);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Usuário deslogado");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  if (!user) return null; 

  return (
    <div className="user-status">
      <p>Bem-vindo, {user.displayName || "Usuário"}!</p>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
