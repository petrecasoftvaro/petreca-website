import Pedal from "@/components/Pedal/Pedal";

const Page = () => {
    return (
    <div className="container mx-auto max-w-6xl px-4 mt-10">
            <h1 className="text-4xl font-bold mb-4 text-foreground">
                Gerador de convite para o pedal
            </h1>
            <p className="mb-4 text-base text-foreground">
                Preencha o formulário abaixo para gerar um convite para o pedal.
            </p>
            <p> O texto será gerado logo abaixo e voce poderá compartilhar por whatsapp, email, etc.</p>
            
            <Pedal />
    </div>
  );
}

export default Page;