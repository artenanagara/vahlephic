"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import projectsData from "@/data/projects.json";
import { FadeUp }   from "@/app/components/FadeUp";
import { Footer }   from "@/app/components/Footer";
import { TiltCard } from "@/app/components/TiltCard";

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
const ease = [0.22, 1, 0.36, 1] as const;

// ─── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({
  num, title, description, period, logo, caseStudy, slug, footer,
}: {
  num: string; title: string; description: string; period: string;
  logo: React.ReactNode; caseStudy?: boolean; slug?: string; footer: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-5 sm:gap-6">
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

      <TiltCard className="flex flex-col w-full">
        <div className={`relative flex h-[180px] w-full items-center justify-center overflow-hidden rounded-t-[12px] p-2 sm:h-[225px] ${cardGradient} ${cardShadow}`}>
          {logo}
          <div className={`absolute inset-0 rounded-t-[12px] pointer-events-none ${innerShadow}`} />
        </div>
        <div className={`relative flex w-full flex-wrap items-center justify-between gap-3 overflow-hidden rounded-b-[12px] px-4 py-4 sm:px-5 ${cardGradient} ${cardShadow}`}>
          {footer}
          <div className={`absolute inset-0 rounded-b-[12px] pointer-events-none ${innerShadow}`} />
        </div>
      </TiltCard>
    </div>
  );
}

// ─── Exploration card ─────────────────────────────────────────────────────────
function ExplorationCard({ src, num }: { src: string; num: number }) {
  return (
    <img src={src} alt={`Exploration ${num}`} className="w-full h-auto block rounded-[12px]" />
  );
}

// ─── Logo map ─────────────────────────────────────────────────────────────────
const logoMap: Record<string, React.ReactNode> = {
  nyaritempat: (
    <img src="/works/nyaritempat/nyaritempat-logo.svg" alt="nyaritempat logo"
         className="project-logo block" style={{ height: 28, width: "auto" }} />
  ),
  kasheer: (
    <img src="/works/kasheer/kasheer-logo.png" alt="Kasheer logo"
         className="project-logo block" style={{ height: 24, width: "auto" }} />
  ),
  "billing-rintisan": (
    <img src="/works/rintisan/rintisan-logo.png" alt="Billing Rintisan logo"
         className="project-logo block" style={{ height: 44, width: 44 }} />
  ),
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WorkPage() {
  return (
    <div className="bg-[#fafafa] min-h-screen">

      {/* ── Fixed sidebar ── */}
      <nav className="side-nav-shell sticky top-0 z-20 mx-auto flex w-full max-w-[620px] items-center justify-between gap-4 bg-[#fafafa]/90 px-5 py-4 backdrop-blur-md sm:px-8 lg:fixed lg:top-[200px] lg:mx-0 lg:w-auto lg:flex-col lg:items-start lg:justify-start lg:gap-8 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
        <motion.div
          className="size-8 rounded-[8.5px] overflow-hidden border border-[#e9e9e9] bg-[#f2f7ff] shrink-0"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease }}
        >
          <img src={A.avatar} alt="Rizal Vahlevi" className="size-full object-cover" />
        </motion.div>

        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.1 }}
        >
          <div className="flex items-center gap-4 text-[14px] lg:flex-col lg:items-start lg:gap-[6px]">
            <Link href="/"      className={`font-light leading-5 opacity-80 transition-opacity duration-150 hover:opacity-100 ${muted}`}>Home</Link>
            <p className="font-semibold text-[#111] leading-5">Work</p>
            <Link href="/about" className={`font-light leading-5 opacity-80 transition-opacity duration-150 hover:opacity-100 ${muted}`}>About</Link>
          </div>
          <div className="hidden h-px w-full bg-black/10 lg:block" />
          <a href="https://drive.google.com/file/d/1GXsLufZDGFd8XLUrG6vti1HrxOAW-3q0/view?usp=sharing" target="_blank" rel="noopener noreferrer" className={`hidden font-light text-[14px] leading-5 underline opacity-80 sm:block ${muted}`}>Download CV</a>
        </motion.div>
      </nav>

      {/* ── Scrollable content ── */}
      <div className="page-content-shell mx-auto flex w-full max-w-[620px] flex-col gap-16 px-5 pb-16 pt-14 sm:px-8 sm:pb-20 lg:gap-[80px] lg:px-0 lg:pt-[200px]">

        {/* ── Work section ── */}
        <div className="flex flex-col gap-[80px]">
          <FadeUp>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-[14px] text-[#111] whitespace-nowrap">
                <p className="font-medium tracking-[1.4px] uppercase leading-[22px]">Work</p>
                <p className="font-light opacity-80 leading-[22px]">{String(projects.length).padStart(2, "0")}</p>
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
                      <a href={project.liveUrl} className={`group/live flex items-center gap-[5px] font-light text-[14px] leading-[17px] ${muted} underline`}>
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

        {/* ── Exploration section ── */}
        <div className="flex flex-col gap-5">
          <FadeUp>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-[14px] text-[#111] whitespace-nowrap">
                <p className="font-medium tracking-[1.4px] uppercase leading-[22px]">Exploration</p>
                <p className="font-light opacity-80 leading-[22px]">07</p>
              </div>
              <div className="flex-1 h-px bg-black/10" />
            </div>
          </FadeUp>

          {[1,2,3,4,5,6,7].map((n, i) => (
            <FadeUp key={n} delay={i * 0.05}>
              <ExplorationCard src={`/works/exploration/image-${n}.png`} num={n} />
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
