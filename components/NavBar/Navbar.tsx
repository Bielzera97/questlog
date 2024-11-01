import UserStatus from "../UserStatus";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useState, useEffect } from "react";
import Image from "next/image";

const NavBar = () => {
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
            setUser(null);
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Image
                    src="/qllogo.png"
                    alt="Logo"
                    width={100}
                    height={250}
                    className="btn btn-ghost text-xl rounded-full"
                />
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Avatar do usuário"
                                src={user?.photoURL || "/default-avatar.png"}
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            {user ? (
                                <UserStatus  />
                            ) : (
                                <a href="/login">Faça Login</a>
                            )}
                        </li>
                        {user && (
                            <>
                                <li>
                                    <a>Settings</a>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
