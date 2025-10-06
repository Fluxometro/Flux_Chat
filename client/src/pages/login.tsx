import { useLocation } from "wouter";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  const [, setLocation] = useLocation();

  const handleLogin = (username: string, password: string) => {
    console.log("Login:", { username, password });
    // TODO: Implement backend API call for authentication
    // For now, just navigate to chat
    setLocation("/chat");
  };

  return <LoginForm onLogin={handleLogin} />;
}
