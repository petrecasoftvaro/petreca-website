import PostsGrid from "../Posts/PostsGrid";
import { PostType } from "@/types/blog";

export default function FeaturedPosts({ posts }: { posts: PostType[] }) {
  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl md:text-4xl font-semibold mb-4 md:mb-6">
        Posts em destaque!
      </h2>
      <div className="mt-4 md:mt-8">
        <PostsGrid posts={posts} />
      </div>
    </div>
  );
}
