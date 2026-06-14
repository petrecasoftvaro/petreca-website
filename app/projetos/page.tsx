import Link from "next/link";

const projects = [
  {
    tag: "ferramenta",
    name: "Compra Consciente",
    desc: "Calculadora interativa para tomar decisões de compra mais conscientes. Responda algumas perguntas e descubra se aquela compra realmente vale a pena.",
    href: "/compra-consciente",
  },
  {
    tag: "gerador",
    name: "Convite de Pedal",
    desc: "Gerador de convites prontos para compartilhar no WhatsApp. Preencha os detalhes do pedal e gere um texto formatado para enviar ao grupo.",
    href: "/pedal",
  },
  {
    tag: "jogo",
    name: "Match Colors",
    desc: "Jogo de adivinhação de cores no navegador. Tente identificar a cor certa a partir do código — um exercício para olhos de designer.",
    href: "/jogos",
  },
];

export default function ProjetosPage() {
  return (
    <div className="w-full max-w-xl mx-auto px-4 pt-10 pb-16">
      <div className="mb-10">
        <h1 className="text-3xl font-medium tracking-tight text-foreground mb-2">
          Projetos
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Experimentos, ferramentas e jogos construídos nas horas vagas.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {projects.map((project) => (
          <Link
            key={project.href}
            href={project.href}
            className="block p-5 rounded-lg bg-secondary border border-border hover:border-brand/40 transition-colors no-underline group"
          >
            <p className="font-mono text-[10px] tracking-widest uppercase mb-2 text-brand">
              {project.tag}
            </p>
            <p className="text-base font-medium text-foreground mb-2 group-hover:text-brand transition-colors">
              {project.name}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
