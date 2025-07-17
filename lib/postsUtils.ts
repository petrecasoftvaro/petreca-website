import { PostType } from "@/types/blog";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "markdown-content");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((fileName) => {
    return !fileName.startsWith(".DS_Stored") && fileName.endsWith(".md");
  });
}

const getPostImagePath = (slug: string, image: string) => {
  return `/images/posts/${slug}/${image}`;
};

const getPostData = (fileName: string): PostType => {
  const filePath = path.join(postsDirectory, fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, "");
  const postData: PostType = {
    slug: postSlug,
    content,
    title: data.title,
    image: getPostImagePath(postSlug, data.image),
    excerpt: data.excerpt,
    date: data.date,
    isFeatured: data.isFeatured || false,
  };

  return postData;
};

export const getPostDataBySlug = (slug: string): PostType | null => {
  const postFileName = slug.replace(/\.md$/, "") + ".md";
  try {
    return getPostData(postFileName);
  } catch (error) {
    console.error(`Error fetching post data for slug "${slug}":`, error);
    return null;
  } 
};

export const getAllPosts = () => {
  const postFiles = getPostSlugs();

  const allPosts = postFiles.map((fileName) => {
    return getPostData(fileName);
  });

  return allPosts.sort((postA, postB) => {
    return new Date(postB.date).getTime() - new Date(postA.date).getTime();
  });
};

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.isFeatured);
};
