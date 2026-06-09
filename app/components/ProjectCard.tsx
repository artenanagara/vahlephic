"use client";

import Link from "next/link";
import { TiltCard } from "./TiltCard";
import { muted, cardShadow, innerShadow, cardGradient, ASSETS } from "@/app/lib/constants";
import type { Project } from "@/app/lib/types";

export function ProjectCardFooter({ project }: { project: Project }) {
  return (
    <>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          className={`group/live flex items-center gap-1.25 font-light text-sm leading-4.25 ${muted} underline`}
        >
          Visit the live site
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSETS.arrowUpRight}
            alt=""
            className="size-4 transition-transform duration-150 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5"
          />
        </a>
      )}
      {project.appStores.length > 0 && (
        <div className="flex items-center gap-2">
          <span className={`font-light text-sm leading-4.25 ${muted} whitespace-nowrap`}>
            Visit App:
          </span>
          <div className="flex items-center gap-1">
            {project.appStores.includes("googlePlay") && (
              <a
                href={project.appStoreUrls?.googlePlay}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-150 hover:scale-110 active:scale-95"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ASSETS.googlePlay} alt="Google Play" className="theme-store-icon size-5" />
              </a>
            )}
            {project.appStores.includes("apple") && (
              <a
                href={project.appStoreUrls?.apple}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-150 hover:scale-110 active:scale-95"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ASSETS.apple} alt="App Store" className="theme-store-icon size-5" />
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}

interface ProjectCardProps {
  num: string;
  title: string;
  description: string;
  period: string;
  logo: React.ReactNode;
  caseStudy?: boolean;
  slug?: string;
  footer: React.ReactNode;
}

export function ProjectCard({
  num, title, description, period, logo, caseStudy, slug, footer,
}: ProjectCardProps) {
  return (
    <div className="flex w-full flex-col gap-5 sm:gap-6">
      <div className="flex flex-col gap-4">
        <p className={`font-light text-base leading-5.5 ${muted}`}>{num}</p>
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-2xl leading-9 text-[#111]">{title}</p>
          <p className={`font-light text-base leading-5.5 ${muted}`}>{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className={`font-light text-base leading-5.5 ${muted}`}>{period}</p>
          {caseStudy && slug && (
            <>
              <div className="w-px h-4.5 bg-black/20" />
              <Link
                href={`/work/${slug}`}
                className={`group/cs flex items-center gap-2 font-light text-base leading-5.5 ${muted} underline`}
              >
                Read case study
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ASSETS.document}
                  alt=""
                  className="size-5 transition-transform duration-150 group-hover/cs:translate-x-0.5"
                />
              </Link>
            </>
          )}
        </div>
      </div>

      <TiltCard className="flex flex-col w-full">
        <div
          className={`relative flex h-45 w-full items-center justify-center overflow-hidden rounded-t-xl p-2 sm:h-56.25 ${cardGradient} ${cardShadow}`}
        >
          {logo}
          <div className={`absolute inset-0 rounded-t-xl pointer-events-none ${innerShadow}`} />
        </div>
        <div
          className={`relative flex w-full flex-wrap items-center justify-between gap-3 overflow-hidden rounded-b-xl px-4 py-4 sm:px-5 ${cardGradient} ${cardShadow}`}
        >
          {footer}
          <div className={`absolute inset-0 rounded-b-xl pointer-events-none ${innerShadow}`} />
        </div>
      </TiltCard>
    </div>
  );
}
