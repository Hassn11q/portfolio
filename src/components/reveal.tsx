import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger index for grouped items. */
  index?: number;
  className?: string;
  id?: string;
  as?: "div" | "li" | "article" | "section";
};

/**
 * The page has one entrance gesture: content settles up as it enters view.
 * The element ships static markup with a class; a single observer in
 * RevealObserver switches it on, so no JavaScript is bundled per element.
 * Reduced motion and no-JS both resolve to plain visible content.
 */
export function Reveal({ children, index = 0, className, id, as = "div" }: RevealProps) {
  const Component = as;
  const delay = Math.min(index * 60, 240);

  return (
    <Component
      id={id}
      data-reveal=""
      className={className ? `reveal ${className}` : "reveal"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}
