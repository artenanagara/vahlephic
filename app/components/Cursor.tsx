"use client";
import { useEffect, useRef } from "react";

export function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("custom-cursor");

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let raf = 0;
    let hovered = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onLeave = () => { mx = -200; my = -200; };

    const tick = () => {
      rx = lerp(rx, mx, 0.13);
      ry = lerp(ry, my, 0.13);
      if (dotRef.current)  dotRef.current.style.transform  = `translate(${mx}px,${my}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(tick);
    };

    const setHover   = () => { if (!hovered) { hovered = true;  ringRef.current?.classList.add("is-hover"); } };
    const clearHover = () => { if (hovered)  { hovered = false; ringRef.current?.classList.remove("is-hover"); } };

    const attach = () => {
      document.querySelectorAll("a, button, [role='button'], input, label, select, textarea").forEach(el => {
        el.removeEventListener("mouseenter", setHover);
        el.removeEventListener("mouseleave", clearHover);
        el.addEventListener("mouseenter", setHover);
        el.addEventListener("mouseleave", clearHover);
      });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    attach();
    raf = requestAnimationFrame(tick);

    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
