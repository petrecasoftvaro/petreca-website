import { PostType } from "@/types/blog";
import PostItem from "./PostItem";
import { Grid } from "@mui/material/";

export default function PostsGrid({ posts }: { posts: PostType[] }) {
  if (!posts || posts.length === 0) {
    return <p>No posts found!</p>;
  }
  return (
    <Grid container spacing={2} columns={12}>
      {posts.map((post) => (
        <Grid key={post.slug} size={{ xs: 12, md: 4 }}>
          <PostItem key={post.slug} post={post} />
        </Grid>
      ))}
    </Grid>
  );
}
