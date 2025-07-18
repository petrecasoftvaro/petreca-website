import PostContent from "@/components/Posts/PostDetail/PostContent";
import { getAllPosts, getPostDataBySlug } from "@/lib/postsUtils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Comment from "@/components/Comment/Comment";
import { Box, Typography } from "@mui/material";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};


export default async function PostsDetails(props: Params) {
  const params = await props.params;
  const post = getPostDataBySlug(params.slug);

  if (!post) {
    return null
  }

  return (
    <>
      <PostContent post={post} />
      <Comment />
    </>
  );
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostDataBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Petreca.com Blog`;

  return {
    title,
    openGraph: {
      title,
      images: [post.image],
    },
  };
}


export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}