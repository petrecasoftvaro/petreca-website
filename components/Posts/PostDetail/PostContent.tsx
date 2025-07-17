import ReactMarkdown, { ExtraProps } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import PostHeader from "./PostHeader";
import { PostType } from "@/types/blog";
import { ComponentProps, ElementType } from "react";
import Image from "next/image";

type Components = {
  [Key in Extract<ElementType, string>]?: ElementType<
    ComponentProps<Key> & ExtraProps
  >;
};

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
    <div>
      <PostHeader {...post} />
      <ReactMarkdown components={customRenders(post)}>
        {post.content}
      </ReactMarkdown>
    </div>
  );
}
