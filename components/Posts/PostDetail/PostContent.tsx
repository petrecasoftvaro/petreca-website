import ReactMarkdown, { ExtraProps } from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/esm/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import PostHeader from "./PostHeader";
import { PostType } from "@/types/blog";
import { ComponentProps, ElementType } from "react";
import Image from "next/image";

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
          props: { src: string; alt?: string };
        };

        return (
          <Image
            src={`/images/posts/${post.slug}${imgElement.props.src}`}
            alt={(imgElement.props.alt as string) || "Post image"}
            width={600}
            height={300}
            className="rounded-lg w-full my-6"
          />
        );
      }

      return <p className="mb-5 leading-relaxed text-foreground/90">{children}</p>;
    },
    h2(props: ComponentProps<"h2"> & ExtraProps) {
      return (
        <h2 className="text-xl font-medium tracking-tight text-foreground mt-10 mb-4">
          {props.children}
        </h2>
      );
    },
    h3(props: ComponentProps<"h3"> & ExtraProps) {
      return (
        <h3 className="text-base font-medium text-foreground mt-8 mb-3">
          {props.children}
        </h3>
      );
    },
    a(props: ComponentProps<"a"> & ExtraProps) {
      const { href, children } = props;
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 decoration-dotted transition-colors"
          style={{ color: "var(--color-brand)" }}
        >
          {children}
        </a>
      );
    },
    ul(props: ComponentProps<"ul"> & ExtraProps) {
      return <ul className="list-disc list-outside pl-5 mb-5 space-y-1.5 text-foreground/90">{props.children}</ul>;
    },
    ol(props: ComponentProps<"ol"> & ExtraProps) {
      return <ol className="list-decimal list-outside pl-5 mb-5 space-y-1.5 text-foreground/90">{props.children}</ol>;
    },
    blockquote(props: ComponentProps<"blockquote"> & ExtraProps) {
      return (
        <blockquote className="border-l-2 pl-4 my-6 text-muted-foreground italic" style={{ borderColor: "var(--color-brand)" }}>
          {props.children}
        </blockquote>
      );
    },
    code(props: ComponentProps<"code"> & ExtraProps) {
      const { children, className } = props;
      const language = className ? className.replace("language-", "") : "";

      if (!language) {
        return (
          <code className="font-mono text-sm bg-secondary px-1.5 py-0.5 rounded text-foreground">
            {children}
          </code>
        );
      }

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
    <div className="w-full max-w-xl mx-auto px-4 pt-10 pb-16">
      <PostHeader
        title={post.title}
        image={post.image}
        date={post.date}
        author={post.author}
      />
      <div className="text-base">
        <ReactMarkdown components={customRenders(post)}>
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
