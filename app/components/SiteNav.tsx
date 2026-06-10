"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ease, muted, ASSETS, CV_URL } from "@/app/lib/constants";

export type ActivePage = "home" | "work" | "about";

const NAV_LINKS: { label: string; href: string; page: ActivePage }[] = [
  { label: "Home",  href: "/",      page: "home"  },
  { label: "Work",  href: "/work",  page: "work"  },
  { label: "About", href: "/about", page: "about" },
];

export function SiteNav({ activePage }: { activePage: ActivePage }) {
  return (
    <nav className="side-nav-shell sticky top-0 z-20 flex w-full items-center justify-between gap-4 bg-[#fafafa]/90 py-4 backdrop-blur-md lg:sticky lg:top-34 lg:w-32 lg:shrink-0 lg:flex-col lg:items-start lg:justify-start lg:gap-8 lg:self-start lg:bg-transparent lg:py-0 lg:backdrop-blur-none lg:pt-34">
      <motion.div
        className="size-8 rounded-lg overflow-hidden border border-[#e9e9e9] bg-[#f2f7ff] shrink-0"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease }}
      >
        <img src={ASSETS.avatar} alt="Rizal Vahlevi" className="size-full object-cover" />
      </motion.div>

      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease, delay: 0.1 }}
      >
        <div className="flex items-center gap-4 text-sm lg:flex-col lg:items-start lg:gap-1.5">
          {NAV_LINKS.map(({ label, href, page }) =>
            page === activePage ? (
              <p key={page} className="font-semibold text-[#111] leading-5">{label}</p>
            ) : (
              <Link
                key={page}
                href={href}
                className={`font-light leading-5 opacity-80 transition-opacity duration-150 hover:opacity-100 ${muted}`}
              >
                {label}
              </Link>
            )
          )}
        </div>
        <div className="hidden h-px w-full bg-black/10 lg:block" />
        <a
          href={CV_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden font-light text-sm leading-5 underline opacity-80 sm:block ${muted}`}
        >
          Download CV
        </a>
      </motion.div>
    </nav>
  );
}
