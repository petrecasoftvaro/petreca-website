"use client";
import { useUser } from "@auth0/nextjs-auth0";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CommentFormProps = {
  text: string;
  setText: (value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
};

export default function CommentForm({
  text,
  setText,
  onSubmit,
}: CommentFormProps) {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="space-y-4">
        <Textarea
          value={text}
          rows={3}
          onChange={(e) => setText(e.target.value)}
          disabled={!user}
          placeholder={
            user ? "Mande seu comentario" : "Faça login para comentar"
          }
          className="w-full"
        />
        {user ? (
          <div className="flex justify-end gap-2">
            <Button type="submit">
              Enviar
            </Button>
            <Button variant="outline" asChild>
              <Link href="/auth/logout">Logout</Link>
            </Button>
          </div>
        ) : (
          <Button variant="outline" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        )}
      </form>
    </div>
  );
}
