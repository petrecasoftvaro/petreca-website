import Link from "next/link";
import { PostType } from "@/types/blog";

export default function FeaturedPosts({ posts }: { posts: PostType[] }) {
  return (
    <div className="w-full max-w-xl mx-auto px-4 pb-12">
      <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-border">
        <span className="text-xs font-medium tracking-widest uppercase text-foreground">
          Blog
        </span>
        <Link
          href="/posts"
          className="font-mono text-xs hover:text-foreground transition-colors"
          style={{ color: "var(--color-brand)" }}
        >
          ver todos →
        </Link>
      </div>

      <div>
        {posts.map((post) => {
          const formattedDate = new Date(post.date).toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "short",
            day: "numeric",
            timeZone: "UTC",
          });

          return (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="flex items-baseline justify-between py-3 border-b border-border group no-underline"
            >
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-brand transition-colors mb-0.5">
                  {post.title}
                </p>
                <p className="font-mono text-[10px] text-muted-foreground">
                  {formattedDate}
                </p>
              </div>
              <span className="font-mono text-xs ml-4 flex-shrink-0 text-brand">
                →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
