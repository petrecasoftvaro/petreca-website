"use client";
import useSWR from "swr";
import { useState } from "react";
import CommentForm from "./Form";
import CommentList from "./List";
import type { Comment } from "@/types/blog";

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

  return (
    <div className="w-full mx-auto">
      <h4 className="text-2xl font-semibold mb-4 text-foreground">Comentários</h4>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4">
          <CommentForm onSubmit={onSubmit} text={text} setText={setText} />
        </div>
        <div className="lg:col-span-8">
          <CommentList comments={comments} onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
}
