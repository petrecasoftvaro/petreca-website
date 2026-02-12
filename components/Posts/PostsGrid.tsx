import { PostType } from "@/types/blog";
import PostItem from "./PostItem";

export default function PostsGrid({ posts }: { posts: PostType[] }) {
  if (!posts || posts.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-8">
        Nenhum post foi encontrado 😬
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {posts.map((post) => (
        <div key={post.slug} className="w-full">
          <PostItem post={post} />
        </div>
      ))}
    </div>
  );
}