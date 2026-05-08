'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Field, FieldLabel, FieldError, FieldGroup } from '@/components/ui/field';

type FormValues = {
  name: string;
  email: string;
  message: string;
  website: string;
};

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'rate_limited'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setStatus('sending');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setStatus('sent');
      reset();
    } else if (res.status === 429) {
      setStatus('rate_limited');
    } else {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <div style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Nome</FieldLabel>
          <Input
            id="name"
            placeholder="Seu nome"
            {...register('name', { required: 'Nome obrigatório' })}
          />
          <FieldError errors={[errors.name]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            {...register('email', {
              required: 'Email obrigatório',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Email inválido' },
            })}
          />
          <FieldError errors={[errors.email]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="message">Mensagem</FieldLabel>
          <Textarea
            id="message"
            rows={5}
            placeholder="Sua mensagem..."
            {...register('message', { required: 'Mensagem obrigatória' })}
          />
          <FieldError errors={[errors.message]} />
        </Field>
      </FieldGroup>

      {status === 'sent' && (
        <p className="text-sm text-green-600 dark:text-green-400">Mensagem enviada com sucesso!</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-destructive">Falha ao enviar. Tente novamente.</p>
      )}
      {status === 'rate_limited' && (
        <p className="text-sm text-destructive">Muitas tentativas. Tente novamente mais tarde.</p>
      )}

      <Button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando...' : 'Enviar'}
      </Button>
    </form>
  );
}
