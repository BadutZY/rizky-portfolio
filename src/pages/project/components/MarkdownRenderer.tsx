/**
 * MarkdownRenderer.tsx — Modrinth-compatible Markdown + HTML renderer, pixel edition.
 *
 * Uses react-markdown with rehype-raw (HTML support) and remark-gfm
 * (tables, strikethrough, autolinks, task lists) — same feature set as the
 * Rizky Website renderer, restyled with pixel-portofolio's design tokens
 * (square corners, thick borders, pixel-label/body-text typography).
 */

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="pixel-label mb-3 mt-6 text-foreground" style={{ fontSize: 14 }}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2
      className="pixel-label mb-2.5 mt-5 flex items-center gap-2 text-foreground"
      style={{ fontSize: 12 }}
    >
      <span className="inline-block h-3 w-1.5 shrink-0 bg-secondary" />
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="pixel-label mb-2 mt-4 text-foreground" style={{ fontSize: 10 }}>
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="pixel-label mb-1.5 mt-3 text-muted-foreground" style={{ fontSize: 9 }}>
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="pixel-label mb-1 mt-2 text-muted-foreground" style={{ fontSize: 8 }}>
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className="pixel-label mb-1 mt-2 text-muted-foreground/80" style={{ fontSize: 8 }}>
      {children}
    </h6>
  ),

  p: ({ children, node }) => {
    const hasOnlyImage =
      node?.children?.length === 1 &&
      node.children[0]?.type === "element" &&
      (node.children[0] as any).tagName === "img";
    if (hasOnlyImage) return <>{children}</>;
    return <p className="body-text my-2 text-muted-foreground">{children}</p>;
  },

  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-secondary underline underline-offset-2 hover:opacity-80"
    >
      {children}
    </a>
  ),

  img: ({ src, alt, width, height, ...props }) => (
    <img
      src={src}
      alt={alt || ""}
      width={width}
      height={height}
      className="pixel-inset my-3 inline-block max-w-full p-1"
      loading="lazy"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
      {...props}
    />
  ),

  code: ({ children, className }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className="whitespace-pre font-mono text-xs text-foreground/90">{children}</code>
      );
    }
    return (
      <code className="pixel-tag" style={{ fontSize: 10, padding: "1px 5px" }}>
        {children}
      </code>
    );
  },
  pre: ({ children }) => <pre className="pixel-inset my-4 overflow-x-auto p-4">{children}</pre>,

  ul: ({ children }) => (
    <ul className="my-3 list-disc space-y-1 pl-5 marker:text-secondary">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 list-decimal space-y-1 pl-5 marker:text-secondary">{children}</ol>
  ),
  li: ({ children }) => <li className="body-text text-muted-foreground">{children}</li>,

  blockquote: ({ children }) => (
    <blockquote
      className="pixel-inset my-4 border-l-4 border-secondary py-2 pr-3 pl-4 text-muted-foreground italic"
      style={{ fontSize: "1rem" }}
    >
      {children}
    </blockquote>
  ),

  table: ({ children }) => (
    <div className="pixel-inset my-4 overflow-x-auto">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
  th: ({ children }) => (
    <th
      className="border-b-2 border-border px-4 py-2.5 text-left pixel-label text-foreground"
      style={{ fontSize: 9 }}
    >
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b-2 border-border/40 px-4 py-2 text-muted-foreground">{children}</td>
  ),
  tr: ({ children }) => <tr className="last:[&>td]:border-0 hover:bg-muted/40">{children}</tr>,

  hr: () => <hr className="my-5 border-t-4 border-border" />,

  strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
  em: ({ children }) => <em className="italic text-foreground/90">{children}</em>,
  del: ({ children }) => <del className="text-muted-foreground/60">{children}</del>,

  details: ({ children, ...props }) => (
    <details className="pixel-inset my-3 overflow-hidden" {...props}>
      {children}
    </details>
  ),
  summary: ({ children }) => (
    <summary
      className="pixel-label cursor-pointer px-4 py-2.5 text-foreground select-none hover:bg-muted"
      style={{ fontSize: 9 }}
    >
      {children}
    </summary>
  ),

  kbd: ({ children }) => (
    <kbd className="rounded-none border-2 border-border bg-muted px-1.5 py-0.5 font-mono text-[0.8em] text-foreground">
      {children}
    </kbd>
  ),
  mark: ({ children }) => (
    <mark className="bg-secondary px-0.5 text-secondary-foreground">{children}</mark>
  ),
  iframe: ({ src, title, width, height, ...props }) => (
    <div className="pixel-inset my-4 aspect-video overflow-hidden">
      <iframe
        src={src}
        title={title || "Embedded content"}
        width={width || "100%"}
        height={height || "100%"}
        className="h-full w-full"
        allowFullScreen
        loading="lazy"
        {...props}
      />
    </div>
  ),
  center: ({ children }) => <div className="my-4 text-center">{children}</div>,
  div: ({ children, style, className: cn, ...props }) => (
    <div className={cn || "my-1"} style={style} {...props}>
      {children}
    </div>
  ),
  section: ({ children }) => <div className="my-4">{children}</div>,
  figure: ({ children }) => <figure className="my-4 flex flex-col items-start">{children}</figure>,
  figcaption: ({ children }) => (
    <figcaption className="pixel-label mt-1.5 text-muted-foreground" style={{ fontSize: 8 }}>
      {children}
    </figcaption>
  ),
  small: ({ children }) => <small className="text-[0.8em] text-muted-foreground">{children}</small>,
  sup: ({ children }) => <sup className="align-super text-[0.7em]">{children}</sup>,
  sub: ({ children }) => <sub className="align-sub text-[0.7em]">{children}</sub>,
  u: ({ children }) => <u className="underline underline-offset-2">{children}</u>,
  s: ({ children }) => <s className="text-muted-foreground/60">{children}</s>,
  br: () => <br />,

  input: ({ checked, type, ...props }) => {
    if (type === "checkbox") {
      return (
        <input
          type="checkbox"
          checked={checked}
          readOnly
          className="accent-secondary mr-1.5"
          {...props}
        />
      );
    }
    return <input type={type} {...props} />;
  },
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content?.trim()) return null;

  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
