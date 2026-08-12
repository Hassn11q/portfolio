"use client";

import { useRef, type ReactNode } from "react";

/**
 * The control leans towards the pointer and springs back when it leaves. The
 * transform is written straight to the node inside a frame, so React never
 * re-renders while the pointer moves. Touch and reduced motion get nothing.
 */
export function Magnetic({
  children,
  strength = 0.28,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);

  function move(event: React.PointerEvent<HTMLSpanElement>) {
    const node = ref.current;
    if (!node || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const box = node.getBoundingClientRect();
    const x = (event.clientX - (box.left + box.width / 2)) * strength;
    const y = (event.clientY - (box.top + box.height / 2)) * strength;

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  }

  function reset() {
    const node = ref.current;
    if (!node) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    node.style.transform = "";
  }

  return (
    <span
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
    >
      {children}
    </span>
  );
}
