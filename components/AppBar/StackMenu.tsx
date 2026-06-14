"use client";

import { useState, useEffect, useRef } from "react";
import { Layers, Moon, Sun, LogIn, LogOut } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default function StackMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const current = stored || (document.documentElement.classList.contains("dark") ? "dark" : "light");
    setTheme(current);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-center h-9 w-9 rounded-md text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Menu"
      >
        <Layers className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-11 w-48 rounded-lg border border-border bg-background shadow-sm py-1 z-50">
          <button
            onClick={() => { toggleTheme(); setOpen(false); }}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            {mounted && theme === "dark" ? "Modo claro" : "Modo escuro"}
          </button>

          <div className="border-t border-border my-1" />

          {user ? (
            <Link
              href="/auth/logout"
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors no-underline"
              onClick={() => setOpen(false)}
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors no-underline"
              onClick={() => setOpen(false)}
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
