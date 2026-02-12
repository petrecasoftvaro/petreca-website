import MatchColors from "@/components/Jogos/MatchColors";

export default function Contact() {
  return (
    <div className="container mx-auto max-w-6xl px-4 w-full pl-0">
      <div className="flex flex-col gap-4 mt-2 mb-2">
        <h2 className="text-3xl font-bold mb-2 text-foreground">
          Jogo de acerto
        </h2>
        <p className="text-base font-bold mb-2 text-foreground">
          O objetivo deste jogo é tentar descobrir a sequência correta de cores. A cada tentativa você recebe um feedback de quantas cores estão na posição correta.
        </p>
        <MatchColors />
      </div>
    </div>
  );
}
