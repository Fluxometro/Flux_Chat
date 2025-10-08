"use client";

import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (username: string, password: string) => {
    console.log("Login:", { username, password });
    // TODO: Implement backend API call for authentication
    // For now, just navigate to chat
    router.push("/chat");
  };

  return <LoginForm onLogin={handleLogin} />;
}
