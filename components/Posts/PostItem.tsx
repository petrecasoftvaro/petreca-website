"use client";

import { PostType } from "@/types/blog";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

export default function PostItem(props: { post: PostType }) {
  const { slug, image, title, excerpt, date, author } = props.post;

  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const linkPath = `/posts/${slug}`;

  return (
    <Card className="overflow-hidden border-border hover:shadow-lg transition-shadow h-full flex flex-col w-full">
      <Link 
        href={linkPath}
        className="no-underline text-inherit flex flex-col h-full w-full"
      >
        <div className="relative w-full aspect-video overflow-hidden flex-shrink-0">
          <Image
            priority={false}
            src={image}
            alt={title}
            fill={true}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4 flex-1 flex flex-col">
          <h3 className="text-xl font-semibold mb-2 line-clamp-2">
            {title}
          </h3>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {excerpt}
          </p>

          <div className="flex flex-row items-center justify-between gap-4 pt-4 border-t border-border mt-auto">
            <div className="flex flex-row items-center gap-2">
              {author && (
                <>
                  <Avatar className="w-6 h-6">
                    <AvatarImage 
                      src={author.image} 
                      alt={author.name}
                    />
                    <AvatarFallback className="text-xs">
                      {author.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    {author.name}
                  </span>
                </>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {formattedDate}
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}