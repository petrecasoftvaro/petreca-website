import AllPosts from "@/components/Posts/AllPosts";
import { getAllPosts } from "@/lib/postsUtils";

export default async function AllPostsPage() {
  const posts = getAllPosts();
  return <AllPosts posts={posts} />;
}
