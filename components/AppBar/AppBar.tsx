"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import PetrecaIcon from "./PetrecaIcon";
import StackMenu from "./StackMenu";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Blog", href: "/posts" },
  { label: "Projetos", href: "/projetos" },
  { label: "Contato", href: "/contato" },
];

export default function AppAppBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-[20px] border-b border-transparent">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center no-underline">
            <PetrecaIcon />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary no-underline"
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-2">
              <StackMenu />
            </div>
          </nav>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-1">
            <StackMenu />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="[&>button]:hidden">
                <SheetHeader>
                  <div className="flex justify-end mb-4">
                    <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="h-9 w-9">
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </SheetHeader>
                <div className="flex flex-col gap-1 py-4">
                  {navLinks.map((link) => (
                    <Button
                      key={link.href}
                      variant="ghost"
                      className="justify-start"
                      onClick={() => handleNavigation(link.href)}
                    >
                      {link.label}
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
