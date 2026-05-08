import ContactForm from '@/components/Contact/ContactForm';

export const metadata = {
  title: 'Contato',
  description: 'Entre em contato comigo.',
};

export default function ContatoPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Contato</h1>
      <p className="text-muted-foreground mb-8">
        Mande uma mensagem — responderei pelo email informado.
      </p>
      <ContactForm />
    </div>
  );
}
