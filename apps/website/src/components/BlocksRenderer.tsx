import Image from "next/image";

import type { Page, Post, Announcement, Program, Short } from "@sevp/shared";
import { RichText } from "./RichText";

type Block = NonNullable<Page["blocks"]>[number];

type BlocksOwner = {
  blocks?: Page["blocks"] | Post["blocks"] | Announcement["blocks"] | Program["blocks"] | Short["blocks"];
};

function HeadingBlock({ block }: { block: Extract<Block, { blockType: "heading" }> }) {
  const level = block.level ?? "h2";
  const className = cls(block.align);
  switch (level) {
    case "h1":
      return <h1 className={className}>{block.heading}</h1>;
    case "h3":
      return <h3 className={className}>{block.heading}</h3>;
    case "h4":
      return <h4 className={className}>{block.heading}</h4>;
    default:
      return <h2 className={className}>{block.heading}</h2>;
  }
}

function cls(align?: "left" | "center" | "right" | null) {
  return `mt-6 font-bold tracking-tight text-foreground first:mt-0 ${
    align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"
  }`;
}

function ParagraphBlock({ block }: { block: Extract<Block, { blockType: "paragraph" }> }) {
  return <RichText data={block.content} />;
}

function HeroBlock({ block }: { block: Extract<Block, { blockType: "hero" }> }) {
  return (
    <section className="bg-gradient-to-br from-green-900 to-green-800 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">{block.title}</h1>
        {block.subtitle ? <p className="mt-4 max-w-2xl text-lg text-zinc-300">{block.subtitle}</p> : null}
        {block.imageUrl ? (
          <div className="mt-8 max-w-2xl overflow-hidden rounded-2xl">
            <Image src={block.imageUrl} alt={block.title} width={1280} height={640} className="h-auto w-full object-cover" />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ImageBlock({ block }: { block: Extract<Block, { blockType: "image" }> }) {
  return (
    <figure className="my-6">
      <div className={`overflow-hidden ${block.round ? "rounded-full" : "rounded-2xl"}`}>
        <Image
          src={block.imageUrl}
          alt={block.alt ?? "Image"}
          width={1280}
          height={720}
          className="h-auto w-full object-cover"
        />
      </div>
      {block.caption ? <figcaption className="mt-2 text-center text-sm text-muted-foreground">{block.caption}</figcaption> : null}
    </figure>
  );
}

function ListBlock({ block }: { block: Extract<Block, { blockType: "list" }> }) {
  const items = block.items ?? [];
  if (block.kind === "numbered") {
    return (
      <ol className="my-4 list-decimal space-y-2 pl-6 text-muted-foreground">
        {items.map((item, i) => (
          <li key={item.id ?? i}>{item.content}</li>
        ))}
      </ol>
    );
  }
  return (
    <ul className="my-4 space-y-2 text-muted-foreground">
      {items.map((item, i) => (
        <li key={item.id ?? i} className="flex items-start gap-2">
          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
          <span>{item.content}</span>
        </li>
      ))}
    </ul>
  );
}

function QuoteBlock({ block }: { block: Extract<Block, { blockType: "quote" }> }) {
  return (
    <blockquote className="my-6 border-l-4 border-primary pl-4 italic text-muted-foreground">
      <p>&ldquo;{block.quote}&rdquo;</p>
      {block.attribution ? <footer className="mt-2 not-italic font-semibold text-foreground">— {block.attribution}</footer> : null}
    </blockquote>
  );
}

function CtaBlock({ block }: { block: Extract<Block, { blockType: "cta" }> }) {
  return (
    <section className="my-6 rounded-2xl bg-primary/5 p-8 text-center">
      <h2 className="text-2xl font-bold text-foreground">{block.title}</h2>
      {block.body ? <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">{block.body}</p> : null}
      {block.buttonLabel && block.buttonUrl ? (
        <a
          href={block.buttonUrl}
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          {block.buttonLabel}
        </a>
      ) : null}
    </section>
  );
}

export function BlocksRenderer({ owner, className }: { owner: BlocksOwner; className?: string }) {
  const blocks = owner.blocks ?? [];
  if (blocks.length === 0) {
    return null;
  }
  return (
    <div className={className}>
      {blocks.map((block) => {
        switch (block.blockType) {
          case "paragraph":
            return <ParagraphBlock key={block.id ?? block.blockType} block={block} />;
          case "heading":
            return <HeadingBlock key={block.id ?? block.blockType} block={block} />;
          case "hero":
            return <HeroBlock key={block.id ?? block.blockType} block={block} />;
          case "image":
            return <ImageBlock key={block.id ?? block.blockType} block={block} />;
          case "list":
            return <ListBlock key={block.id ?? block.blockType} block={block} />;
          case "quote":
            return <QuoteBlock key={block.id ?? block.blockType} block={block} />;
          case "cta":
            return <CtaBlock key={block.id ?? block.blockType} block={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}