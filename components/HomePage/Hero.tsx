import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="w-full max-w-xl mx-auto px-4 pt-10 pb-12 flex flex-col items-center text-center">
      <div className="relative w-[374px] h-[467px] mb-8 rounded-lg overflow-hidden flex-shrink-0 border-2 border-brand dark:border-white">
        <Image
          src="/images/leandro-petreca2.jpg"
          alt="Leandro Petreca"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      <h1 className="text-4xl font-medium tracking-tight text-foreground mb-2">
        Leandro Petreca
      </h1>

      <p className="font-mono text-xs tracking-widest mb-5 text-brand">
        // desenvolvedor de software
      </p>

      <p className="text-base text-muted-foreground leading-relaxed mb-7 max-w-md">
        Desenvolvedor full-stack com olho para interfaces e obsessão por detalhes que fazem a diferença.
        Gosto de construir ferramentas que resolvem problemas reais. Fora do computador, estou em cima de
        uma bike explorando estradas que o Google Maps não conhece.
      </p>

      <div className="flex gap-6 items-center mb-7">
        <Link
          href="/posts"
          className="text-sm font-medium"
          style={{ color: "var(--color-brand)", borderBottom: "1.5px solid var(--color-brand)", paddingBottom: "1px" }}
        >
          Ver blog →
        </Link>
        <Link href="/projetos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Ver projetos
        </Link>
      </div>

      <div className="flex gap-5">
        <Link
          href="https://github.com/petrecasoftvaro"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          GitHub
        </Link>
        <Link
          href="https://www.linkedin.com/in/leandropetreca"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          LinkedIn
        </Link>
        <Link
          href="https://www.instagram.com/leandropetreca"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Instagram
        </Link>
      </div>
    </div>
  );
}
