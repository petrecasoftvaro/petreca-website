"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import ColorModeIconDropdown from "./ColorModeIconDropdown";
import PetrecaIcon from "./PetrecaIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MenuItens from "./MenuItens";
import { cn } from "@/lib/utils";
import LoginBtn from "./LoginBtn";

export default function AppAppBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <header
      className="fixed top-[calc(var(--template-frame-height,0px)+28px)] left-0 right-0 z-50"
      style={{
        boxShadow: "none",
        backgroundColor: "transparent",
        backgroundImage: "none",
      }}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div
          className={cn(
            "flex items-center justify-between flex-shrink-0 rounded-lg",
            "backdrop-blur-[24px] border border-border",
            "bg-background/40 p-2"
          )}
        >
          <div className="flex flex-grow items-center px-0">
            <Link
              href="/"
              className="text-decoration-none flex items-center"
            >
              <PetrecaIcon />
            </Link>

            <div className="hidden md:flex">
              <MenuItens />
            </div>
          </div>

          <div className="hidden md:flex gap-2 items-center">
            <LoginBtn />
            <ColorModeIconDropdown />
          </div>

          <div className="flex md:hidden gap-2 items-center">
            <ColorModeIconDropdown size="medium" />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  aria-label="Menu button"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="top"
                className="top-[var(--template-frame-height,0px)] [&>button]:hidden"
              >
                <SheetHeader>
                  <div className="flex justify-end mb-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setOpen(false)}
                      className="h-9 w-9"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </SheetHeader>
                <div className="flex flex-col gap-2 py-4">
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => handleNavigation("/posts")}
                  >
                    Blog
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => handleNavigation("/jogos")}
                  >
                    Jogos
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => handleNavigation("/compra-consciente")}
                  >
                    Compra consciente
                  </Button>

                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => handleNavigation("/pedal")}
                  >
                    Gerador Pedal
                  </Button>
                  <div className="border-t border-border my-3" />

                  <div className="w-full">
                    <LoginBtn />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
