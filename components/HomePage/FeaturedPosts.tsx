import { Box, Typography } from "@mui/material";
import PostsGrid from "../Posts/PostsGrid";
import { PostType } from "@/types/blog";

export default function FeaturedPosts({ posts }: { posts: PostType[] }) {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography gutterBottom variant="h2" component="div">
        Posts em destaque!
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <PostsGrid posts={posts} />
      </Box>
    </Box>
  );
}
