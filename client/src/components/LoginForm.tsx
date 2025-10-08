"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare } from "lucide-react";

export interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = { username: "", password: "" };
    let hasError = false;

    if (!username.trim()) {
      newErrors.username = "El nombre de usuario es requerido";
      hasError = true;
    }

    if (!password.trim()) {
      newErrors.password = "La contraseña es requerida";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      onLogin(username, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-xl shadow-2xl p-8 border border-card-border">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-center" data-testid="text-app-title">
              Chat Application
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Inicia sesión para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Nombre de usuario</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`rounded-lg bg-secondary border-transparent focus-visible:ring-2 focus-visible:ring-primary ${
                  errors.username ? "ring-2 ring-destructive" : ""
                }`}
                placeholder="Ingresa tu usuario"
                data-testid="input-username"
              />
              {errors.username && (
                <p className="text-xs text-destructive" data-testid="error-username">
                  {errors.username}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`rounded-lg bg-secondary border-transparent focus-visible:ring-2 focus-visible:ring-primary ${
                  errors.password ? "ring-2 ring-destructive" : ""
                }`}
                placeholder="Ingresa tu contraseña"
                data-testid="input-password"
              />
              {errors.password && (
                <p className="text-xs text-destructive" data-testid="error-password">
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full rounded-lg py-3 font-semibold"
              data-testid="button-login"
            >
              Iniciar sesión
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
