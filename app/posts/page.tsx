import { getAllPosts } from "@/lib/Utils/postsUtils";
import Link from "next/link";

export default async function AllPostsPage() {
  const posts = getAllPosts();

  return (
    <div className="w-full max-w-xl mx-auto px-4 pt-10 pb-16">
      <div className="mb-10">
        <h1 className="text-3xl font-medium tracking-tight text-foreground mb-2">
          Blog
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Reflexões sobre tecnologia, desenvolvimento e os experimentos do caminho.
        </p>
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
              className="flex items-baseline justify-between py-4 border-b border-border group no-underline"
            >
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-brand transition-colors mb-1">
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
