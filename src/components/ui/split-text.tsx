"use client";

import { Children, type ReactNode } from "react";

type SplitTextProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
};

/**
 * Wraps each text segment (split by `\n` or each child) in overflow-hidden
 * wrappers so GSAP can animate `.js-split-line` elements upward into view.
 */
export function SplitText({
  children,
  as: Tag = "span",
  className = "",
}: Readonly<SplitTextProps>) {
  const text = typeof children === "string" ? children : null;

  // If children is a plain string, split by newlines or word-wrap naturally
  if (text) {
    const segments = text.split("\n").filter(Boolean);

    // If no explicit newlines, treat the whole string as one block
    const lines = segments.length > 1 ? segments : [text];

    return (
      <Tag
        className={`js-line-reveal ${className}`}
        aria-label={text}
      >
        {lines.map((line, i) => (
          <span key={i} className="split-line-wrapper" aria-hidden="true">
            <span className="js-split-line split-line-inner">{line}</span>
          </span>
        ))}
      </Tag>
    );
  }

  // If children are React elements, wrap each child
  const childArray = Children.toArray(children);

  return (
    <Tag className={`js-line-reveal ${className}`}>
      {childArray.map((child, i) => (
        <span key={i} className="split-line-wrapper" aria-hidden="true">
          <span className="js-split-line split-line-inner">{child}</span>
        </span>
      ))}
    </Tag>
  );
}
