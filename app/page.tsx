"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import projectsData from "@/data/projects.json";
import { FadeUp }     from "@/app/components/FadeUp";
import { TiltCard }   from "@/app/components/TiltCard";
import { CharReveal } from "@/app/components/CharReveal";
import { Footer }     from "@/app/components/Footer";
import { ThemeToggle } from "@/app/components/ThemeToggle";

type AppStore = "googlePlay" | "apple";

interface Project {
  slug: string;
  num: string;
  title: string;
  description: string;
  period: string;
  caseStudy: boolean;
  liveUrl?: string;
  appStores: AppStore[];
  appStoreUrls?: Partial<Record<AppStore, string>>;
}

const projects = projectsData as Project[];

// ─── Assets ───────────────────────────────────────────────────────────────────
const A = {
  avatar:       "/Logo.png",
  document:     "/Document Icon.svg",
  arrowUpRight: "/solar_arrow-right-up-linear.svg",
  googlePlay:   "/playstore.svg",
  apple:        "/appstore.svg",
};

// ─── Shared styles ────────────────────────────────────────────────────────────
const cardShadow =
  "shadow-[0px_10px_10px_-6px_rgba(0,0,0,0.01),0px_4px_10px_-5px_rgba(35,54,55,0.24),0px_0px_0px_1px_#e5e5e5]";
const innerShadow = "shadow-[inset_0px_0px_0px_2px_white]";
const cardGradient = "bg-gradient-to-b from-white via-[#fbfbfb] to-[#f6f6f6] via-[81%]";
const muted = "text-[rgba(17,17,17,0.8)]";

// ─── Shared easing ────────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;

// ─── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({
  num,
  title,
  description,
  period,
  logo,
  caseStudy,
  slug,
  footer,
}: {
  num: string;
  title: string;
  description: string;
  period: string;
  logo: React.ReactNode;
  caseStudy?: boolean;
  slug?: string;
  footer: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-5 sm:gap-6">
      {/* Meta */}
      <div className="flex flex-col gap-4">
        <p className={`font-light text-base leading-[22px] ${muted}`}>{num}</p>

        <div className="flex flex-col gap-4">
          <p className="font-semibold text-2xl leading-9 text-[#111]">{title}</p>
          <p className={`font-light text-base leading-[22px] ${muted}`}>{description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className={`font-light text-base leading-[22px] ${muted}`}>{period}</p>
          {caseStudy && slug && (
            <>
              <div className="w-px h-[18px] bg-black/20" />
              <Link href={`/work/${slug}`} className={`group/cs flex items-center gap-2 font-light text-base leading-[22px] ${muted} underline`}>
                Read case study
                <img src={A.document} alt="" className="size-5 transition-transform duration-150 group-hover/cs:translate-x-[2px]" />
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 3-D tilt card */}
      <TiltCard className="flex flex-col w-full">
        {/* Top — logo preview */}
        <div
          className={`relative flex h-[180px] w-full items-center justify-center overflow-hidden rounded-t-[12px] p-2 sm:h-[225px] ${cardGradient} ${cardShadow}`}
        >
          {logo}
          <div className={`absolute inset-0 rounded-t-[12px] pointer-events-none ${innerShadow}`} />
        </div>

        {/* Bottom — links */}
        <div
          className={`relative flex w-full flex-wrap items-center justify-between gap-3 overflow-hidden rounded-b-[12px] px-4 py-4 sm:px-5 ${cardGradient} ${cardShadow}`}
        >
          {footer}
          <div className={`absolute inset-0 rounded-b-[12px] pointer-events-none ${innerShadow}`} />
        </div>
      </TiltCard>
    </div>
  );
}

// ─── Logo map (slug → JSX) ────────────────────────────────────────────────────
const logoMap: Record<string, React.ReactNode> = {
  nyaritempat: (
    // SVG: original 78×28 — keep natural height
    <img src="/works/nyaritempat/nyaritempat-logo.svg" alt="nyaritempat logo"
         className="project-logo block" style={{ height: 28, width: "auto" }} />
  ),
  kasheer: (
    // PNG: 106×18 — scale to 24px tall, ~141px wide
    <img src="/works/kasheer/kasheer-logo.png" alt="Kasheer logo"
         className="project-logo block" style={{ height: 24, width: "auto" }} />
  ),
  "billing-rintisan": (
    // PNG: 512×512 square icon — display at 44px
    <img src="/works/rintisan/rintisan-logo.png" alt="Billing Rintisan logo"
         className="project-logo block" style={{ height: 44, width: 44 }} />
  ),
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="bg-[#fafafa] min-h-screen">

      {/* ── Fixed sidebar ── */}
      <nav className="side-nav-shell sticky top-0 z-20 mx-auto flex w-full max-w-[620px] items-center justify-between gap-4 bg-[#fafafa]/90 px-5 py-4 backdrop-blur-md sm:px-8 lg:fixed lg:top-[200px] lg:mx-0 lg:w-auto lg:flex-col lg:items-start lg:justify-start lg:gap-8 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
        {/* Avatar */}
        <motion.div
          className="size-8 rounded-[8.5px] overflow-hidden border border-[#e9e9e9] bg-[#f2f7ff] shrink-0"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease }}
        >
          <img src={A.avatar} alt="Rizal Vahlevi" className="size-full object-cover" />
        </motion.div>

        {/* Links */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.1 }}
        >
          <div className="flex items-center gap-4 text-[14px] lg:flex-col lg:items-start lg:gap-[6px]">
            <p className="font-semibold text-[#111] leading-5">Home</p>
            <Link href="/work"  className={`font-light leading-5 opacity-80 transition-opacity duration-150 hover:opacity-100 ${muted}`}>Work</Link>
            <Link href="/about" className={`font-light leading-5 opacity-80 transition-opacity duration-150 hover:opacity-100 ${muted}`}>About</Link>
          </div>
          <div className="hidden h-px w-full bg-black/10 lg:block" />
          <a href="https://drive.google.com/file/d/1GXsLufZDGFd8XLUrG6vti1HrxOAW-3q0/view?usp=sharing" target="_blank" rel="noopener noreferrer" className={`hidden font-light text-[14px] leading-5 underline opacity-80 sm:block ${muted}`}>
            Download CV
          </a>
        </motion.div>
      </nav>

      {/* ── Scrollable content ── */}
      <div
        className="page-content-shell mx-auto flex w-full max-w-[620px] flex-col gap-16 px-5 pb-16 pt-14 sm:px-8 sm:pb-20 lg:gap-[80px] lg:px-0 lg:pt-[136px]"
      >
        {/* ── Author ── */}
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              {/* Character-by-character name reveal */}
              <p className="font-semibold text-[26px] text-[#111] sm:text-[28px]" style={{ lineHeight: "1.35" }}>
                <CharReveal text="Rizal Vahlevi" startDelay={0.1} />
              </p>

              <motion.p
                className="text-base leading-[22px]"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease, delay: 0.52 }}
              >
                <span className={`font-light ${muted}`}>Product Designer at </span>
                <a href="https://rintisan.co.id" target="_blank" rel="noopener noreferrer" className={`font-medium underline decoration-solid ${muted}`}>Rintisan</a>
              </motion.p>
            </div>

            <ThemeToggle className="mt-1" />
          </div>

          <motion.div
            className="flex flex-col gap-3"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, ease, delay: 0.62 }}
          >
            <div className="flex flex-col gap-1">
              <p className={`font-light text-base leading-[22px] ${muted}`}>
                Exploring many things while designing. Open for project
              </p>
              <div className="flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="theme-icon shrink-0 opacity-70"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <a href="mailto:vahlephic@gmail.com"
                   className={`min-w-0 break-all font-medium text-base leading-[22px] ${muted} underline`}>
                  vahlephic@gmail.com
                </a>
              </div>
            </div>
            <p className="text-base">
              <span className={`font-light ${muted}`}>Currently working on </span>
              <a href="https://nyaritempat.com" target="_blank" rel="noopener noreferrer"
                 className={`font-medium underline decoration-solid ${muted}`}>
                nyaritempat.com
              </a>
            </p>
          </motion.div>
        </div>

        {/* ── Work section ── */}
        <div id="work" className="flex flex-col gap-[80px]">
          {/* Section header */}
          <FadeUp>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-[14px] text-[#111] whitespace-nowrap">
                <p className="font-medium tracking-[1.4px] uppercase leading-[22px]">Work</p>
                <p className="font-light opacity-80 leading-[22px]">03</p>
              </div>
              <div className="flex-1 h-px bg-black/10" />
            </div>
          </FadeUp>

          {projects.map((project, i) => (
            <FadeUp key={project.slug} delay={i * 0.07}>
              <ProjectCard
                num={project.num}
                title={project.title}
                description={project.description}
                period={project.period}
                caseStudy={project.caseStudy}
                slug={project.slug}
                logo={logoMap[project.slug]}
                footer={
                  <>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        className={`group/live flex items-center gap-[5px] font-light text-[14px] leading-[17px] ${muted} underline`}
                      >
                        Visit the live site
                        <img src={A.arrowUpRight} alt="" className="size-4 transition-transform duration-150 group-hover/live:translate-x-[2px] group-hover/live:-translate-y-[2px]" />
                      </a>
                    )}
                    {project.appStores.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className={`font-light text-[14px] leading-[17px] ${muted} whitespace-nowrap`}>Visit App:</span>
                        <div className="flex items-center gap-1">
                          {project.appStores.includes("googlePlay") && (
                            <a href={project.appStoreUrls?.googlePlay} target="_blank" rel="noopener noreferrer" className="transition-transform duration-150 hover:scale-110 active:scale-95">
                              <img src={A.googlePlay} alt="Google Play" className="theme-store-icon size-5" />
                            </a>
                          )}
                          {project.appStores.includes("apple") && (
                            <a href={project.appStoreUrls?.apple} target="_blank" rel="noopener noreferrer" className="transition-transform duration-150 hover:scale-110 active:scale-95">
                              <img src={A.apple} alt="App Store" className="theme-store-icon size-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                }
              />
            </FadeUp>
          ))}
        </div>

        {/* Footer */}
        <FadeUp>
          <Footer />
        </FadeUp>
      </div>
    </div>
  );
}
