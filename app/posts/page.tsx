import AllPosts from "@/components/Posts/AllPosts";
import { getAllPosts } from "@/lib/postsUtils";
import { Box, Typography } from "@mui/material";

export default async function AllPostsPage() {
  const posts = getAllPosts();

  return (
    <Box sx={{ padding: 2 }}>
      <Typography gutterBottom variant="h2" component="div">
        Aqui estão todos os posts!
      </Typography>
      <Box sx={{ marginTop: 8 }}>
        <AllPosts posts={posts} />
      </Box>
    </Box>
  );
}
