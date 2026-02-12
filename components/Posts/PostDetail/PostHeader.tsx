"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function PostHeader(props: { title: string; image: string }) {
  const { title, image } = props;
  return (
    <div className="text-center mb-8 w-full">
      <h1 className="text-3xl font-bold mb-4 text-foreground">
        {title}
      </h1>

      <div
        className={cn(
          "self-center relative w-full mt-6 rounded-lg",
          "outline outline-2 outline-border/20",
          "border border-border",
          "shadow-lg",
          "h-[300px] sm:h-[240px] md:h-[350px] lg:h-[500px]",
          "dark:shadow-[0_0_24px_12px_hsl(210_100%_25%_/_0.2)]",
          "dark:outline-border/10"
        )}
      >
        <Image
          src={image}
          alt={title}
          fill={true}
          className="object-cover rounded-lg"
          sizes="width: 100%"
        />
      </div>
    </div>
  );
}
