import type { JSX } from "react";

type LexNode = {
  type?: string;
  text?: string;
  tag?: string;
  listType?: string;
  url?: string;
  format?: number | string;
  children?: LexNode[];
  [key: string]: unknown;
};

type SerializedLexical = { root?: LexNode };

function TextFormat({ node }: { node: LexNode }) {
  const text = node.text ?? "";
  const f = typeof node.format === "number" ? node.format : 0;
  const bold = f & 1;
  const italic = f & 2;
  const underline = f & 4;
  const strike = f & 8;
  const code = f & 16;
  let el: JSX.Element = <>{text}</>;
  if (bold) el = <strong>{el}</strong>;
  if (italic) el = <em>{el}</em>;
  if (underline) el = <u>{el}</u>;
  if (strike) el = <s>{el}</s>;
  if (code) el = <code>{el}</code>;
  return el;
}

function Node({ node }: { node: LexNode }) {
  const type = node.type ?? "text";

  if (type === "text") {
    return <TextFormat node={node} />;
  }
  if (type === "linebreak") {
    return <br />;
  }
  if (type === "paragraph") {
    return (
      <p className="text-muted-foreground leading-relaxed">
        {node.children?.map((c, i) => <Node key={i} node={c} />)}
      </p>
    );
  }
  if (type === "heading") {
    const Tag = (node.tag ?? "h2") as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    return (
      <Tag className="mt-6 font-semibold text-foreground first:mt-0">
        {node.children?.map((c, i) => <Node key={i} node={c} />)}
      </Tag>
    );
  }
  if (type === "list") {
    return node.listType === "number" ? (
      <ol className="my-4 space-y-2 list-decimal pl-6 text-muted-foreground">
        {node.children?.map((c, i) => <Node key={i} node={c} />)}
      </ol>
    ) : (
      <ul className="my-4 space-y-2 text-muted-foreground">
        {node.children?.map((c, i) => <Node key={i} node={c} />)}
      </ul>
    );
  }
  if (type === "listitem") {
    return (
      <li className="flex items-start gap-2">
        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
        <span>
          {node.children?.map((c, i) => <Node key={i} node={c} />)}
        </span>
      </li>
    );
  }
  if (type === "quote") {
    return (
      <blockquote className="my-4 border-l-4 border-primary pl-4 italic text-muted-foreground">
        {node.children?.map((c, i) => <Node key={i} node={c} />)}
      </blockquote>
    );
  }
  if (type === "link") {
    return (
      <a
        href={node.url ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline"
      >
        {node.children?.map((c, i) => <Node key={i} node={c} />)}
      </a>
    );
  }
  return (
    <>{node.children?.map((c, i) => <Node key={i} node={c} />)}</>
  );
}

export function RichText({ data }: { data: SerializedLexical | null }) {
  if (!data?.root?.children) {
    return null;
  }
  return (
    <div className="prose prose-lg max-w-none">
      {data.root.children.map((c, i) => <Node key={i} node={c} />)}
    </div>
  );
}