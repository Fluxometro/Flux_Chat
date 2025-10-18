"use client";

import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin(username: string, password: string){
    // TODO: Implement backend API call for authentication
    // For now, just navigate to chat
    const response = await fetch('http://127.0.0.1:8000/flux_wa/multichat/login', {
      method:'POST'
      ,headers: {
        "Content-Type": "application/json",
      }
      ,body:JSON.stringify({
        user:username
        ,pwd:password
      })
    })
    const response_json = await response.json()
    if(!response.ok){
      alert(response_json)
    }else{
      localStorage.setItem('access', response_json['access'])
      router.push("/chat");
    }
  };

  return <LoginForm onLogin={handleLogin} />;
}
