import FeaturedPosts from "@/components/HomePage/FeaturedPosts";
import Hero from "@/components/HomePage/Hero";
import { getFeaturedPosts } from "@/lib/Utils/postsUtils";
import { Fragment } from "react";

export default function Home() {
  const featuredPosts = getFeaturedPosts();
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={featuredPosts} />
    </Fragment>
  );
}
