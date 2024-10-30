// components/Login.tsx
import { auth } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Usuário logado:", result.user);
    } catch (error) {
      console.error("Erro no login com Google:", error);
    }
  };

  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuário logado:", userCredential.user);
    } catch (error) {
      console.error("Erro no login com e-mail:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuário registrado:", userCredential.user);
    } catch (error) {
      console.error("Erro no registro:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegistering ? "Crie sua Conta" : "Login"}</h2>
      <button onClick={handleGoogleLogin}>Entrar com Google</button>
      <div>
        <input 
          type="email" 
          placeholder="E-mail" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        {isRegistering ? (
          <button onClick={handleRegister}>Registrar</button>
        ) : (
          <button onClick={handleEmailLogin}>Entrar com E-mail</button>
        )}
      </div>
      <p>
        {isRegistering ? "Já tem uma conta?" : "Não tem uma conta?"} 
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Login" : "Registrar"}
        </button>
      </p>
    </div>
  );
}
