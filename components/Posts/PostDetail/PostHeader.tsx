"use client";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const StyledBox = styled("div")(({ theme }) => ({
  alignSelf: "center",
  position: "relative",
  width: "100%",
  height: 300,
  marginTop: theme.spacing(4),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: "6px solid",
  outlineColor: "hsla(220, 25%, 80%, 0.2)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
  [theme.breakpoints.down("md")]: { 
    marginTop: theme.spacing(6),
    height: 350,
  },
  [theme.breakpoints.up("md")]: { 
    marginTop: theme.spacing(6),
    height: 500,
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(6),
    height: 240,
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
    outlineColor: "hsla(220, 20%, 42%, 0.1)",
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

export default function PostHeader(props: { title: string; image: string }) {
  const { title, image } = props;
  return (
    <Box sx={{ textAlign: "center", marginBottom: 4, width: "100%" }}>
      <Typography variant="h2" component="h1" gutterBottom>
        {title}
      </Typography>

      <StyledBox>
        <Image
          src={image}
          alt={title}
          fill={true}
          objectFit="cover"
          sizes="width: 100%"
        />
      </StyledBox>
    </Box>
  );
}
