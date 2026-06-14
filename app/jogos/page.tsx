import MatchColors from "@/components/Jogos/MatchColors";

export default function JogosPage() {
  return (
    <div className="w-full max-w-xl mx-auto px-4 pt-10 pb-16">
      <div className="mb-10">
        <h1 className="text-3xl font-medium tracking-tight text-foreground mb-2">
          Match Colors
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tente descobrir a sequência correta de cores. A cada tentativa você recebe um feedback de quantas cores estão na posição correta.
        </p>
      </div>
      <MatchColors />
    </div>
  );
}
