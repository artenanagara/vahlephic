"use client";

import { motion } from "framer-motion";
import projects from "@/data/projects.json";
import { FadeUp }     from "@/app/components/FadeUp";
import { TiltCard }   from "@/app/components/TiltCard";
import { CharReveal } from "@/app/components/CharReveal";

// ─── Assets (expire 7 days from 2026-05-25) ───────────────────────────────────
const A = {
  avatar:       "https://www.figma.com/api/mcp/asset/f6887da9-a0dd-4f1c-ac61-87b8c5aa845a",
  kasheerMask:  "https://www.figma.com/api/mcp/asset/54f48593-3b62-40e4-8b68-9d745a267bf2",
  billing:      "https://www.figma.com/api/mcp/asset/6de8833f-b187-498e-b35c-4eeef1a82c03",
  nyari:        "https://www.figma.com/api/mcp/asset/4a850b92-e653-4349-8dac-bee84cf7e7e5",
  moon:         "https://www.figma.com/api/mcp/asset/d695bfa2-6c2b-4e59-809c-686401735d29",
  email:        "https://www.figma.com/api/mcp/asset/4f362378-a8e9-453e-a53b-6ceb2eeda9b1",
  document:     "https://www.figma.com/api/mcp/asset/b3789615-96c0-4a29-ab34-ea9f04940012",
  arrowUpRight: "https://www.figma.com/api/mcp/asset/51d30ff1-39bb-43c8-8bfc-644f7074874f",
  googlePlay:   "https://www.figma.com/api/mcp/asset/83a3f6a1-9b94-444d-bd68-c14bc8ba0dbf",
  apple:        "https://www.figma.com/api/mcp/asset/72569266-a697-46f9-aa2a-6438f641a1ef",
  instagram:    "https://www.figma.com/api/mcp/asset/63485ff5-a47e-4cbd-b98f-fd08cecb5139",
  dribbble:     "https://www.figma.com/api/mcp/asset/20a67230-424f-47cd-99bb-dc946e5a8ddb",
  linkedin:     "https://www.figma.com/api/mcp/asset/42db4c6d-e6ee-4c6b-b5d3-97dd51bbbf33",
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
    <div className="flex flex-col gap-6 w-full">
      {/* Meta */}
      <div className="flex flex-col gap-4">
        <p className={`font-light text-base leading-[22px] ${muted}`}>{num}</p>

        <div className="flex flex-col gap-4">
          <p className="font-semibold text-2xl leading-9 text-[#111]">{title}</p>
          <p className={`font-light text-base leading-[22px] ${muted}`}>{description}</p>
        </div>

        <div className="flex items-center gap-4">
          <p className={`font-light text-base leading-[22px] ${muted} whitespace-nowrap`}>{period}</p>
          {caseStudy && slug && (
            <>
              <div className="w-px h-[18px] bg-black/20" />
              <a href={`/work/${slug}`} className={`group/cs flex items-center gap-2 font-light text-base leading-[22px] ${muted} underline whitespace-nowrap`}>
                Read case study
                <img src={A.document} alt="" className="size-5 transition-transform duration-150 group-hover/cs:translate-x-[2px]" />
              </a>
            </>
          )}
        </div>
      </div>

      {/* 3-D tilt card */}
      <TiltCard className="flex flex-col w-full">
        {/* Top — logo preview */}
        <div
          className={`relative h-[225px] w-full rounded-t-[12px] overflow-hidden flex items-center justify-center p-2 ${cardGradient} ${cardShadow}`}
        >
          {logo}
          <div className={`absolute inset-0 rounded-t-[12px] pointer-events-none ${innerShadow}`} />
        </div>

        {/* Bottom — links */}
        <div
          className={`relative w-full rounded-b-[12px] overflow-hidden px-5 py-4 flex items-center justify-between ${cardGradient} ${cardShadow}`}
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
    <img src={A.nyari} alt="nyaritempat logo"
         style={{ width: "78.022px", height: "28px" }}
         className="block max-w-none" />
  ),
  kasheer: (
    <div
      style={{
        width: 118.125,
        height: 21.375,
        backgroundColor: "#714333",
        maskImage: `url('${A.kasheerMask}')`,
        WebkitMaskImage: `url('${A.kasheerMask}')`,
        maskSize: "106.006px 18px",
        WebkitMaskSize: "106.006px 18px",
        maskPosition: "6.188px 1.688px",
        WebkitMaskPosition: "6.188px 1.688px",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    />
  ),
  "billing-rintisan": (
    <div style={{ width: 28, height: 28, position: "relative", overflow: "hidden" }}>
      <img
        src={A.billing}
        alt="Billing Rintisan logo"
        style={{
          position: "absolute",
          width: "392.96%",
          height: "392.96%",
          left: "-51.67%",
          top: "-146.73%",
          maxWidth: "none",
        }}
      />
    </div>
  ),
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="bg-[#fafafa] min-h-screen">

      {/* ── Fixed sidebar ── */}
      <nav className="fixed top-[200px] flex flex-col gap-8"
           style={{ left: "calc(12.5% + 60px)" }}>
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
          <div className="flex flex-col gap-[6px] text-[14px]">
            <p className="font-semibold text-[#111] leading-5">Home</p>
            <a href="/work"  className={`font-light leading-5 opacity-80 transition-opacity duration-150 hover:opacity-100 ${muted}`}>Work</a>
            <a href="/about" className={`font-light leading-5 opacity-80 transition-opacity duration-150 hover:opacity-100 ${muted}`}>About</a>
          </div>
          <div className="h-px w-full bg-black/10" />
          <a href="#" className={`font-light text-[14px] leading-5 underline opacity-80 ${muted}`}>
            Download CV
          </a>
        </motion.div>
      </nav>

      {/* ── Scrollable content ── */}
      <div
        className="pt-[200px] pb-20 flex flex-col gap-[80px]"
        style={{ marginLeft: "calc(25% + 110px)", width: 500 }}
      >
        {/* ── Author ── */}
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              {/* Character-by-character name reveal */}
              <p className="font-semibold text-[28px] text-[#111]" style={{ lineHeight: "1.35" }}>
                <CharReveal text="Rizal Vahlevi" startDelay={0.1} />
              </p>

              <motion.p
                className="text-base leading-[22px]"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease, delay: 0.52 }}
              >
                <span className={`font-light ${muted}`}>Product Designer at </span>
                <a href="#" className={`font-medium underline decoration-solid ${muted}`}>Rintisan</a>
              </motion.p>
            </div>

            {/* Moon — spins slightly on hover */}
            <motion.button
              aria-label="Toggle dark mode"
              className="mt-1"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease, delay: 0.58 }}
              whileHover={{ rotate: 22, transition: { duration: 0.3, ease: "easeOut" } }}
            >
              <img src={A.moon} alt="" className="size-5" />
            </motion.button>
          </div>

          <motion.div
            className="flex flex-col gap-3"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, ease, delay: 0.62 }}
          >
            <div className="flex flex-col gap-1">
              <p className={`font-light text-base leading-[22px] ${muted} whitespace-nowrap`}>
                Exploring many things while designing. Open for project
              </p>
              <div className="flex items-center gap-1">
                <img src={A.email} alt="" className="size-4 shrink-0" />
                <a href="mailto:vahlephic@gmail.com"
                   className={`font-medium text-base leading-[22px] ${muted} underline whitespace-nowrap`}>
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
                        className={`group/live flex items-center gap-[5px] font-light text-[14px] leading-[17px] ${muted} underline whitespace-nowrap`}
                      >
                        Visit the live site
                        <img src={A.arrowUpRight} alt="" className="size-4 transition-transform duration-150 group-hover/live:translate-x-[2px] group-hover/live:-translate-y-[2px]" />
                      </a>
                    )}
                    {project.appStores.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className={`font-light text-[14px] leading-[17px] ${muted} underline whitespace-nowrap`}>Visit App:</span>
                        <div className="flex items-center gap-1">
                          {project.appStores.includes("googlePlay") && (
                            <img src={A.googlePlay} alt="Google Play" className="size-5 opacity-80" />
                          )}
                          {project.appStores.includes("apple") && (
                            <img src={A.apple} alt="App Store" className="size-5 opacity-80" />
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
          <div className="flex flex-col gap-4">
            <div className="h-px w-full bg-black/10" />
            <div className="flex items-center justify-between">
              <p className={`font-light text-base leading-[22px] ${muted} opacity-80`}>vahlephic ⓒ 2026</p>
              <div className="flex items-center gap-2">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                   className="bg-[rgba(43,43,43,0.05)] p-[5px] rounded-full transition-transform duration-150 hover:scale-110 active:scale-95">
                  <img src={A.instagram} alt="Instagram" className="size-5" />
                </a>
                <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer"
                   className="bg-[rgba(43,43,43,0.05)] p-[5px] rounded-full overflow-hidden transition-transform duration-150 hover:scale-110 active:scale-95">
                  <img src={A.dribbble} alt="Dribbble" className="size-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                   className="bg-[rgba(43,43,43,0.05)] p-[5px] rounded-full transition-transform duration-150 hover:scale-110 active:scale-95">
                  <img src={A.linkedin} alt="LinkedIn" className="size-5" />
                </a>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
