import Pedal from "@/components/Pedal/Pedal";

export default function PedalPage() {
  return (
    <div className="w-full max-w-xl mx-auto px-4 pt-10 pb-16">
      <div className="mb-10">
        <h1 className="text-3xl font-medium tracking-tight text-foreground mb-2">
          Convite de Pedal
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Preencha os detalhes do pedal e gere um texto pronto para compartilhar no WhatsApp.
        </p>
      </div>
      <Pedal />
    </div>
  );
}
