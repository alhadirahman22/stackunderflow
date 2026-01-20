import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";

export default function useFormLoginCard() {
  const router = useRouter();
  const { isLoggedIn, username: storedUsername, login, logout } = useAuth();
  const [username, setUsername] = useState(storedUsername);
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(username.trim());
    router.push("/questions");
  };

  const handleSignOut = () => {
    logout();
    setUsername("");
    setPassword("");
  };

  return {
    username,
    password,
    isLoggedIn,
    setUsername,
    setPassword,
    handleSubmit,
    handleSignOut,
  };
}
