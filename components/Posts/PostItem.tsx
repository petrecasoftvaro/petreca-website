'use client';

import { PostType } from "@/types/blog";
import { Avatar, Box, Card, Link, styled, Typography } from "@mui/material";
import Image from "next/image";

export default function PostItem(props: { post: PostType }) {
  const { slug, image, title, excerpt, date, author } = props.post;

  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const StyledTypography = styled(Typography)({
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
  });

  const linkPath = `/posts/${slug}`;

  return (
    <Card variant="outlined" className={""}>
      <Link href={linkPath} sx={{ textDecoration: "none", color: "inherit" }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 200,
            overflow: "hidden",
          }}>

        <Image src={image} alt={title} fill={true} />
          </Box>
        <Box sx={{ padding: 2 }}>
          <Typography gutterBottom variant="h2" component="div">
            {title}
          </Typography>

          <StyledTypography variant="body2" color="text.secondary" gutterBottom>
            {excerpt}
          </StyledTypography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignItems: "center",
              }}
            >
              {author && (
                <>
                  <Avatar
                    alt={author.name}
                    src={author.image}
                    sx={{ width: 24, height: 24 }}
                  />

                  <Typography variant="caption">{author.name}</Typography>
                </>
              )}
            </Box>
            <Typography variant="caption">{formattedDate}</Typography>
          </Box>
        </Box>
      </Link>
    </Card>
  );
}
