import AllPosts from "@/components/Posts/AllPosts";
import { getAllPosts } from "@/lib/Utils/postsUtils";

export default async function AllPostsPage() {
  const posts = getAllPosts();

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4 text-foreground">
        Aqui estão todos os posts!
      </h2>
      <div className="mt-8">
        <AllPosts posts={posts} />
      </div>
    </div>
  );
}
