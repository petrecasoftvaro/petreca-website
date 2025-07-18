import ReactMarkdown, { ExtraProps } from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/esm/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import PostHeader from "./PostHeader";
import { PostType } from "@/types/blog";
import { ComponentProps, ElementType } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";

type Components = {
  [Key in Extract<ElementType, string>]?: ElementType<
    ComponentProps<Key> & ExtraProps
  >;
};

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("css", css);

const customRenders = (post: PostType): Components => {
  return {
    p(props: ComponentProps<"p"> & ExtraProps) {
      const { children } = props;

      if (
        (children as { type: string; props: { src: string; alt: string } })
          .type === "img"
      ) {
        const imgElement = children as React.ReactElement & {
          props: {
            src: string;
            alt?: string;
          };
        };

        return (
          <Image
            src={`/images/posts/${post.slug}${imgElement.props.src}`}
            alt={(imgElement.props.alt as string) || "Post image"}
            width={600}
            height={300}
          />
        );
      }

      return <p>{children}</p>;
    },
    code(props: ComponentProps<"code"> & ExtraProps) {
      const { children, className } = props;
      const language = className ? className.replace("language-", "") : "";

      return (
        <SyntaxHighlighter style={atomDark} language={language}>
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      );
    },
  };
};

export default function PostContent({ post }: { post: PostType }) {
  return (
    <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 2 , width: "100%"}}>
      <PostHeader {...post} />
      <Box sx={{ maxWidth: 680 }}>
        <ReactMarkdown components={customRenders(post)}>
          {post.content}
        </ReactMarkdown>
      </Box>
    </Container>
  );
}
