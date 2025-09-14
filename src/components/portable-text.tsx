"use client";

import { PortableText, PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mb-4 text-2xl font-semibold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 text-xl font-semibold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 text-lg font-semibold">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-7 text-zinc-700">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc pl-5 text-zinc-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal pl-5 text-zinc-700">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = (value as any)?.href || "#";
      return (
        <a
          href={href}
          className="underline decoration-zinc-400 hover:decoration-zinc-800"
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      );
    },
  },
};

export default function PT({ value }: { value: any[] }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return <PortableText value={value} components={components} />;
}
