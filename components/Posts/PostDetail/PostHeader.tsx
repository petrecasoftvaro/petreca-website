"use client";
import Image from "next/image";
import Link from "next/link";

export default function PostHeader(props: {
  title: string;
  image: string;
  date: string;
  author?: { name: string; image: string };
}) {
  const { title, image, date, author } = props;

  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <div className="mb-10">
      <Link
        href="/posts"
        className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors no-underline"
        style={{ color: "var(--color-brand)" }}
      >
        ← Blog
      </Link>

      <h1 className="text-3xl font-medium tracking-tight text-foreground mt-4 mb-3">
        {title}
      </h1>

      <div className="flex items-center gap-3 mb-8">
        {author && (
          <span className="text-xs text-muted-foreground">{author.name}</span>
        )}
        <span className="font-mono text-[10px] text-muted-foreground">{formattedDate}</span>
      </div>

      <div className="relative w-full rounded-lg overflow-hidden aspect-video">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="100%"
          priority
        />
      </div>
    </div>
  );
}
