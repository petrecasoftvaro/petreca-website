import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/social-icons";

export default function Hero() {
  return (
    <div className="container mx-auto max-w-6xl px-4 flex flex-col items-center pt-8 sm:pt-10 pb-8 sm:pb-12">
      <Image
        src="/images/leandro.jpeg"
        alt="Imagem de Leandro Petreca"
        width={300}
        height={300}
        loading="lazy"
        className="rounded-full mb-4 shadow-md"
      />

      <h1 className="text-4xl font-bold mb-4 text-foreground">
        Seja bem vindo
      </h1>

      <p className="text-base text-center text-foreground mb-4">
        Olá, eu sou Leandro Petreca, um desenvolvedor apaixonado por criar
        experiências digitais incríveis. Neste blog, compartilho minhas
        descobertas, aprendizados e insights sobre desenvolvimento web,
        tecnologia e muito mais.
      </p>
      
      <div className="mt-2 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          aria-label="GitHub"
          asChild
        >
          <Link
            href="https://github.com/petrecasoftvaro"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          aria-label="Instagram"
          asChild
        >
          <Link
            href="https://www.instagram.com/kurt_jonnes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          aria-label="LinkedIn"
          asChild
        >
          <Link
            href="https://www.linkedin.com/in/leandropetreca"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon />
          </Link>
        </Button>
      </div>
    </div>
  );
}
