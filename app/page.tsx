import FeaturedPosts from "@/components/HomePage/FeaturedPosts";
import FeaturedProjects from "@/components/HomePage/FeaturedProjects";
import Hero from "@/components/HomePage/Hero";
import { getFeaturedPosts } from "@/lib/Utils/postsUtils";
import { Fragment } from "react";

export default function Home() {
  const featuredPosts = getFeaturedPosts();
  return (
    <Fragment>
      <Hero />
      <FeaturedProjects />
      <FeaturedPosts posts={featuredPosts} />
    </Fragment>
  );
}
