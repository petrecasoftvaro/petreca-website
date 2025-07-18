"use client";
import useSWR from "swr";
import { useState } from "react";
import CommentForm from "./Form";
import CommentList from "./List";
import type { Comment } from "@/types/blog";
import { Box, Grid, Typography } from "@mui/material";

export default function Comment() {
  const [text, setText] = useState("");

  const { data: comments, mutate } = useSWR<Comment[]>(
    "/api/comment",
    (url) =>
      fetch(url).then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(
          `${res.status} ${res.statusText} while fetching: ${url}`
        );
      }),
    { fallbackData: [] }
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setText("");
      await mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async (comment: Comment) => {
    try {
      await fetch("/api/comment", {
        method: "DELETE",
        body: JSON.stringify({ comment }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await mutate();
    } catch (err) {
      console.log(err);
    }
  };

  //'xs' | 'sm' | 'md' | 'lg' | 'xl'
  return (
    <Box sx={{ width: "100%", mx: "auto" }}>
      <Typography variant="h4" marginBottom={2}>Comentários</Typography>

      <Grid container spacing={4}>
        <Grid size={{ lg: 4, md: 12 }}>
          <CommentForm onSubmit={onSubmit} text={text} setText={setText} />
        </Grid>
        <Grid size={{ lg: 8, sm: 12 }}>
          <CommentList comments={comments} onDelete={onDelete} />
        </Grid>
       
      </Grid>
    </Box>
  );
}
