import Link from "next/link";

const projects = [
  {
    tag: "ferramenta",
    name: "Compra Consciente",
    desc: "Calculadora para decisões de compra mais inteligentes.",
    href: "/compra-consciente",
  },
  {
    tag: "gerador",
    name: "Convite de Pedal",
    desc: "Cria convites prontos para compartilhar no WhatsApp.",
    href: "/pedal",
  },
  {
    tag: "jogo",
    name: "Match Colors",
    desc: "Jogo de adivinhação de cores no navegador.",
    href: "/jogos",
  },
];

export default function FeaturedProjects() {
  return (
    <div className="w-full max-w-xl mx-auto px-4 pb-10">
      <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-border">
        <span className="text-xs font-medium tracking-widest uppercase text-foreground">
          Projetos
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {projects.map((project) => (
          <Link
            key={project.href}
            href={project.href}
            className="block p-4 rounded-lg bg-secondary border border-border hover:border-brand/40 transition-colors no-underline group"
          >
            <p className="font-mono text-[10px] tracking-widest uppercase mb-2 text-brand">
              {project.tag}
            </p>
            <p className="text-sm font-medium text-foreground mb-1 group-hover:text-brand transition-colors">
              {project.name}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {project.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
