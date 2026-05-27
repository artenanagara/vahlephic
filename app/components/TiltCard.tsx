"use client";
import { useRef, MouseEvent, ReactNode, useCallback } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function TiltCard({ children, className = "", intensity = 7 }: Props) {
  const ref    = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const tx = useRef(0), ty = useRef(0), tz = useRef(0);
  const cx = useRef(0), cy = useRef(0), cz = useRef(0);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const loop = useCallback(() => {
    cx.current = lerp(cx.current, tx.current, 0.09);
    cy.current = lerp(cy.current, ty.current, 0.09);
    cz.current = lerp(cz.current, tz.current, 0.09);

    if (ref.current) {
      ref.current.style.transform =
        `perspective(1100px) rotateX(${cx.current}deg) rotateY(${cy.current}deg) translateZ(${cz.current}px)`;
    }

    const stillMoving =
      Math.abs(cx.current - tx.current) > 0.005 ||
      Math.abs(cy.current - ty.current) > 0.005 ||
      Math.abs(cz.current - tz.current) > 0.05;

    rafRef.current = stillMoving ? requestAnimationFrame(loop) : null;
  }, []);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left)  / rect.width  - 0.5;
    const ny = (e.clientY - rect.top)   / rect.height - 0.5;
    tx.current = -ny * intensity;
    ty.current =  nx * intensity;
    tz.current = 10;
    if (!rafRef.current) rafRef.current = requestAnimationFrame(loop);
  };

  const onLeave = () => {
    tx.current = 0; ty.current = 0; tz.current = 0;
    if (!rafRef.current) rafRef.current = requestAnimationFrame(loop);
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}
