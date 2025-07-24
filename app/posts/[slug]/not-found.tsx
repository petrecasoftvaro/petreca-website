import StyledNextLink from "@/components/Layout/NextLink";
import PostsGrid from "@/components/Posts/PostsGrid";
import { getFeaturedPosts } from "@/lib/Utils/postsUtils";
import { Box, Container, Typography } from "@mui/material";
import { get } from "http";
import React from "react";

const NotFound = () => {
  const posts = getFeaturedPosts();
  return (
    <Container sx={{ padding: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box sx={{ maxWidth: 680, mt: 4, textAlign: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Esse post não foi encontrado.
        </Typography>
        <Typography variant="body1">
          Por favor, verifique a URL ou volte para a{" "}
          <StyledNextLink href="/">página inicial</StyledNextLink>.
        </Typography>
      </Box>
      <Box sx={{ marginTop: 12 }}>

        <Typography variant="h3" component="h1" gutterBottom>
          Posts em destaque
        </Typography>
        <PostsGrid posts={posts} />
      </Box>
    </Container>
  );
};

export default NotFound;
