"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  placeholder = "Buscar mensajes...",
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 rounded-full bg-secondary border-transparent focus-visible:ring-2 focus-visible:ring-primary"
        data-testid="input-search"
      />
    </div>
  );
}
