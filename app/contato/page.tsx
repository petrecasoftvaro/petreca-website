import ContactForm from '@/components/Contact/ContactForm';

export const metadata = {
  title: 'Contato',
  description: 'Entre em contato comigo.',
};

export default function ContatoPage() {
  return (
    <div className="w-full max-w-xl mx-auto px-4 pt-10 pb-16">
      <div className="mb-10">
        <h1 className="text-3xl font-medium tracking-tight text-foreground mb-2">
          Contato
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Mande uma mensagem — responderei pelo email informado.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
