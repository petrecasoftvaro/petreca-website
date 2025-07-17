import { PostType } from "@/types/blog";
import PostsGrid from "./PostsGrid";

export default function AllPosts({ posts }: { posts: PostType[] }) {
  return <PostsGrid posts={posts} />;
}
