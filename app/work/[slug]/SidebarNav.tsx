"use client";

import { useEffect, useState } from "react";

interface NavItem {
  id: string;
  title: string;
}

import { muted } from "@/app/lib/constants";

export default function SidebarNav({ items }: { items: NavItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const OFFSET = 120; // px from top to trigger section switch
    let rafId: number;

    function check() {
      let current = items[0].id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= OFFSET) {
          current = item.id;
        }
      }
      setActiveId((prev) => (prev === current ? prev : current));
      rafId = requestAnimationFrame(check);
    }

    rafId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(rafId);
  }, [items]);

  const handleClick = (id: string) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-[6px]">
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={[
              "text-left text-[14px] leading-5 transition-all duration-200",
              isActive
                ? "font-semibold text-[#111]"
                : `font-light opacity-60 ${muted}`,
            ].join(" ")}
          >
            {item.title}
          </button>
        );
      })}
    </div>
  );
}
