import Link from "next/link";
import PostsGrid from "@/components/Posts/PostsGrid";
import { getFeaturedPosts } from "@/lib/Utils/postsUtils";
import React from "react";

const NotFound = () => {
  const posts = getFeaturedPosts();
  return (
    <div className="container mx-auto max-w-6xl px-4 py-4 flex flex-col items-center">
      <div className="max-w-[680px] mt-4 text-center">
        <h1 className="text-3xl font-bold mb-4 text-foreground">
          Esse post não foi encontrado.
        </h1>
        <p className="text-base text-foreground">
          Por favor, verifique a URL ou volte para a{" "}
          <Link href="/" className="text-primary hover:underline">página inicial</Link>.
        </p>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Posts em destaque
        </h2>
        <PostsGrid posts={posts} />
      </div>
    </div>
  );
};

export default NotFound;
