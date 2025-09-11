"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "sanity";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="h-serif text-2xl mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="h-serif text-xl mt-6 mb-2">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const target = (value as any)?.blank ? "_blank" : undefined;
      return (
        <a
          href={(value as any)?.href}
          target={target}
          rel={target ? "noopener noreferrer" : undefined}
          className="text-gold underline"
        >
          {children}
        </a>
      );
    },
  },
};

export default function RichText({ value }: { value?: PortableTextBlock[] }) {
  if (!value || value.length === 0) return null;
  return <PortableText value={value} components={components} />;
}
