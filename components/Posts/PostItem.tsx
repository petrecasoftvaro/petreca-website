"use client";

import { PostType } from "@/types/blog";
import { Avatar, Box, Card, styled, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

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

  const StyledLink = styled(Link)({
    textDecoration: "none",
    color: "inherit",
  });

  const linkPath = `/posts/${slug}`;

  return (
    <Card variant="outlined" className={""}>
      <StyledLink href={linkPath}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 200,
            overflow: "hidden",
          }}
        >
          <Image
            priority={false}
            src={image}
            alt={title}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography gutterBottom variant="h3" component="div">
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
      </StyledLink>
    </Card>
  );
}
