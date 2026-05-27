"use client";

import { motion } from "framer-motion";
import projects from "@/data/projects.json";
import { FadeUp }   from "@/app/components/FadeUp";
import { TiltCard } from "@/app/components/TiltCard";

// ─── Assets (expire 7 days from 2026-05-25) ───────────────────────────────────
const A = {
  avatar:       "https://www.figma.com/api/mcp/asset/f6887da9-a0dd-4f1c-ac61-87b8c5aa845a",
  kasheerMask:  "https://www.figma.com/api/mcp/asset/54f48593-3b62-40e4-8b68-9d745a267bf2",
  billing:      "https://www.figma.com/api/mcp/asset/6de8833f-b187-498e-b35c-4eeef1a82c03",
  nyari:        "https://www.figma.com/api/mcp/asset/4a850b92-e653-4349-8dac-bee84cf7e7e5",
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
const ease = [0.22, 1, 0.36, 1] as const;

// ─── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({
  num, title, description, period, logo, caseStudy, slug, footer,
}: {
  num: string; title: string; description: string; period: string;
  logo: React.ReactNode; caseStudy?: boolean; slug?: string; footer: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 w-full">
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

      <TiltCard className="flex flex-col w-full">
        <div className={`relative h-[225px] w-full rounded-t-[12px] overflow-hidden flex items-center justify-center p-2 ${cardGradient} ${cardShadow}`}>
          {logo}
          <div className={`absolute inset-0 rounded-t-[12px] pointer-events-none ${innerShadow}`} />
        </div>
        <div className={`relative w-full rounded-b-[12px] overflow-hidden px-5 py-4 flex items-center justify-between ${cardGradient} ${cardShadow}`}>
          {footer}
          <div className={`absolute inset-0 rounded-b-[12px] pointer-events-none ${innerShadow}`} />
        </div>
      </TiltCard>
    </div>
  );
}

// ─── Exploration card ─────────────────────────────────────────────────────────
function ExplorationCard({ height, children }: { height: number; children: React.ReactNode }) {
  return (
    <div
      className={`relative w-full rounded-[12px] overflow-hidden ${cardShadow}`}
      style={{ height }}
    >
      {children}
      <div className={`absolute inset-0 rounded-[12px] pointer-events-none ${innerShadow}`} />
    </div>
  );
}

// ─── Logo map ─────────────────────────────────────────────────────────────────
const logoMap: Record<string, React.ReactNode> = {
  nyaritempat: (
    <img src={A.nyari} alt="nyaritempat logo" style={{ width: "78.022px", height: "28px" }} className="block max-w-none" />
  ),
  kasheer: (
    <div style={{ width: 118.125, height: 21.375, backgroundColor: "#714333", maskImage: `url('${A.kasheerMask}')`, WebkitMaskImage: `url('${A.kasheerMask}')`, maskSize: "106.006px 18px", WebkitMaskSize: "106.006px 18px", maskPosition: "6.188px 1.688px", WebkitMaskPosition: "6.188px 1.688px", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat" }} />
  ),
  "billing-rintisan": (
    <div style={{ width: 28, height: 28, position: "relative", overflow: "hidden" }}>
      <img src={A.billing} alt="Billing Rintisan logo" style={{ position: "absolute", width: "392.96%", height: "392.96%", left: "-51.67%", top: "-146.73%", maxWidth: "none" }} />
    </div>
  ),
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WorkPage() {
  return (
    <div className="bg-[#fafafa] min-h-screen">

      {/* ── Fixed sidebar ── */}
      <nav className="fixed top-[200px] flex flex-col gap-8" style={{ left: "calc(12.5% + 60px)" }}>
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
          <div className="flex flex-col gap-[6px] text-[14px]">
            <a href="/"      className={`font-light leading-5 opacity-80 transition-opacity duration-150 hover:opacity-100 ${muted}`}>Home</a>
            <p className="font-semibold text-[#111] leading-5">Work</p>
            <a href="/about" className={`font-light leading-5 opacity-80 transition-opacity duration-150 hover:opacity-100 ${muted}`}>About</a>
          </div>
          <div className="h-px w-full bg-black/10" />
          <a href="#" className={`font-light text-[14px] leading-5 underline opacity-80 ${muted}`}>Download CV</a>
        </motion.div>
      </nav>

      {/* ── Scrollable content ── */}
      <div className="pt-[200px] pb-20 flex flex-col gap-[80px]" style={{ marginLeft: "calc(25% + 110px)", width: 500 }}>

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
                      <a href={project.liveUrl} className={`group/live flex items-center gap-[5px] font-light text-[14px] leading-[17px] ${muted} underline whitespace-nowrap`}>
                        Visit the live site
                        <img src={A.arrowUpRight} alt="" className="size-4 transition-transform duration-150 group-hover/live:translate-x-[2px] group-hover/live:-translate-y-[2px]" />
                      </a>
                    )}
                    {project.appStores.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className={`font-light text-[14px] leading-[17px] ${muted} underline whitespace-nowrap`}>Visit App:</span>
                        <div className="flex items-center gap-1">
                          {project.appStores.includes("googlePlay") && <img src={A.googlePlay} alt="Google Play" className="size-5 opacity-80" />}
                          {project.appStores.includes("apple")      && <img src={A.apple}      alt="App Store"   className="size-5 opacity-80" />}
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

          {/* 01 — Landing Page (Running Club) */}
          <FadeUp delay={0}>
            <ExplorationCard height={375}>
              <div className="w-full h-full" style={{ background: "linear-gradient(160deg, #1c1814 0%, #2d2118 50%, #1a1512 100%)" }}>
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 70%, rgba(120,90,60,0.18) 0%, transparent 70%)" }} />
                <div className="absolute left-0 right-0 top-0 h-[46%]" style={{ background: "linear-gradient(180deg, #251d15 0%, #1c1410 100%)" }}>
                  <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/5" />
                  <div className="absolute top-5 left-8 flex items-center gap-[6px]">
                    <div className="w-[5px] h-[5px] rounded-full bg-[#c87941]" />
                    <div className="w-[30px] h-[4px] rounded-full bg-white/10" />
                    <div className="w-[22px] h-[4px] rounded-full bg-white/10" />
                    <div className="w-[26px] h-[4px] rounded-full bg-white/10" />
                  </div>
                  <div className="absolute bottom-10 left-8 flex flex-col gap-[6px]">
                    <div className="w-[140px] h-[11px] rounded-sm" style={{ background: "rgba(255,255,255,0.85)" }} />
                    <div className="w-[100px] h-[11px] rounded-sm" style={{ background: "rgba(255,255,255,0.85)" }} />
                    <div className="w-[72px] h-[7px] rounded-sm mt-1 bg-white/30" />
                  </div>
                  <div className="absolute bottom-8 right-8 h-[28px] rounded-full flex items-center px-4" style={{ background: "#c87941" }}>
                    <div className="w-[56px] h-[6px] rounded-sm bg-white/80" />
                  </div>
                </div>
                <div className="absolute right-10 top-4 bottom-4 rounded-[14px] overflow-hidden" style={{ width: 90, background: "linear-gradient(180deg, #211a11 0%, #1a1208 100%)", border: "1.5px solid rgba(255,255,255,0.12)" }}>
                  <div className="absolute top-0 inset-x-0 h-[55%]" style={{ background: "linear-gradient(180deg, #2e2015 0%, #1c1208 100%)" }} />
                  <div className="absolute top-3 inset-x-0 flex justify-center"><div className="w-[28px] h-[3px] rounded-full bg-[#c87941]" /></div>
                  <div className="absolute top-9 left-3 flex flex-col gap-[5px]">
                    <div className="w-[40px] h-[5px] rounded-sm bg-white/70" />
                    <div className="w-[28px] h-[5px] rounded-sm bg-white/70" />
                    <div className="w-[56px] h-[3px] rounded-sm mt-1 bg-white/30" />
                  </div>
                  <div className="absolute top-[72px] left-3 h-[14px] rounded-full flex items-center px-2" style={{ background: "#c87941", width: 54 }}>
                    <div className="w-[32px] h-[4px] rounded-sm bg-white/80" />
                  </div>
                  <div className="absolute bottom-4 inset-x-3 flex flex-col gap-[4px]">
                    <div className="w-full h-[3px] rounded-sm bg-white/20" />
                    <div className="w-[60%] h-[3px] rounded-sm bg-white/20" />
                  </div>
                </div>
                <div className="absolute bottom-5 left-6">
                  <p className="font-light text-[11px] leading-[16px] text-white/40 tracking-[0.8px] uppercase">Landing Page</p>
                </div>
              </div>
            </ExplorationCard>
          </FadeUp>

          {/* 02 — Music Player Widget */}
          <FadeUp delay={0.05}>
            <ExplorationCard height={331}>
              <div className="w-full h-full" style={{ background: "linear-gradient(145deg, #0e0e11 0%, #12101a 60%, #0a0a0e 100%)" }}>
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(130,80,200,0.12) 0%, transparent 70%)" }} />
                <div className="absolute rounded-[10px] overflow-hidden" style={{ width: 120, height: 120, top: 60, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #4a2060 0%, #6a3090 50%, #3a1050 100%)" }}>
                  <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.15) 0%, transparent 60%)" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[8px] border-l-white/60 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-[2px]" />
                    </div>
                  </div>
                </div>
                <div className="absolute flex flex-col items-center gap-[4px]" style={{ top: 194, left: "50%", transform: "translateX(-50%)", width: 200, textAlign: "center" }}>
                  <div className="w-[90px] h-[5px] rounded-sm bg-white/70" />
                  <div className="w-[60px] h-[4px] rounded-sm bg-white/30" />
                </div>
                <div className="absolute" style={{ top: 224, left: "50%", transform: "translateX(-50%)", width: 200 }}>
                  <div className="w-full h-[2px] rounded-full bg-white/15">
                    <div className="h-full rounded-full bg-[#9b5de5]" style={{ width: "38%" }} />
                  </div>
                  <div className="flex justify-between mt-[5px]">
                    <div className="w-[22px] h-[3px] rounded-sm bg-white/30" />
                    <div className="w-[22px] h-[3px] rounded-sm bg-white/30" />
                  </div>
                </div>
                <div className="absolute flex items-center justify-center gap-8" style={{ top: 258, insetInline: 0 }}>
                  <div className="w-4 h-4 opacity-40" style={{ borderLeft: "5px solid white", borderTop: "5px solid transparent", borderBottom: "5px solid transparent" }} />
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[9px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-[2px]" />
                  </div>
                  <div className="w-4 h-4 opacity-40" style={{ borderRight: "5px solid white", borderTop: "5px solid transparent", borderBottom: "5px solid transparent" }} />
                </div>
                <div className="absolute bottom-5 left-6">
                  <p className="font-light text-[11px] leading-[16px] text-white/30 tracking-[0.8px] uppercase">Music Player Widget</p>
                </div>
              </div>
            </ExplorationCard>
          </FadeUp>

          {/* 03 — Upload Files */}
          <FadeUp delay={0.05}>
            <ExplorationCard height={352}>
              <div className="w-full h-full bg-[#f8f8f8] flex flex-col items-center justify-center gap-5 px-10">
                <div className="w-full rounded-[10px] flex flex-col items-center justify-center gap-3 py-8" style={{ border: "1.5px dashed #d0d0d0", background: "#ffffff" }}>
                  <div className="w-10 h-10 rounded-full bg-[#f0f0f0] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center gap-[5px]">
                    <div className="w-[130px] h-[5px] rounded-sm bg-[#ccc]" />
                    <div className="w-[180px] h-[4px] rounded-sm bg-[#e0e0e0]" />
                  </div>
                  <div className="h-[28px] rounded-full px-4 flex items-center" style={{ background: "#111" }}>
                    <div className="w-[60px] h-[4px] rounded-sm bg-white/70" />
                  </div>
                </div>
                <div className="w-full flex flex-col gap-[6px]">
                  <div className="w-[80px] h-[4px] rounded-sm bg-[#ccc] mb-1" />
                  {[{ name: "my-files.pdf", color: "#ef4444" }, { name: "design-v2.png", color: "#3b82f6" }].map((file) => (
                    <div key={file.name} className="w-full flex items-center gap-3 py-2 px-3 rounded-[8px] bg-white" style={{ border: "1px solid #eee" }}>
                      <div className="w-7 h-8 rounded-[4px] flex items-center justify-center text-[8px] font-bold text-white" style={{ background: file.color }}>
                        {file.name.split(".")[1].toUpperCase()}
                      </div>
                      <div className="flex flex-col gap-[3px] flex-1">
                        <div className="w-[90px] h-[4px] rounded-sm bg-[#bbb]" />
                        <div className="w-[50px] h-[3px] rounded-sm bg-[#ddd]" />
                      </div>
                      <div className="w-4 h-4 rounded-full border border-[#e0e0e0] flex items-center justify-center">
                        <div className="w-[6px] h-[1.5px] bg-[#aaa]" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-5 left-6">
                  <p className="font-light text-[11px] leading-[16px] text-black/30 tracking-[0.8px] uppercase">Upload Files</p>
                </div>
              </div>
            </ExplorationCard>
          </FadeUp>

          {/* 04 — Pricing UI */}
          <FadeUp delay={0.05}>
            <ExplorationCard height={349}>
              <div className="w-full h-full bg-[#fafafa] overflow-hidden relative">
                <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "repeating-linear-gradient(0deg, #111 0, #111 1px, transparent 0, transparent 50%), repeating-linear-gradient(90deg, #111 0, #111 1px, transparent 0, transparent 50%)", backgroundSize: "32px 32px" }} />
                <div className="absolute inset-0 flex items-center justify-center gap-4 px-6">
                  <div className="flex-1 rounded-[10px] bg-white p-4 flex flex-col gap-3" style={{ border: "1px solid #e8e8e8", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <div className="w-[50px] h-[4px] rounded-sm bg-[#ccc]" />
                    <div className="w-[40px] h-[9px] rounded-sm bg-[#111]" />
                    <div className="w-full h-px bg-[#f0f0f0]" />
                    {[70, 55, 80, 65].map((w, i) => (
                      <div key={i} className="w-full flex items-center gap-2">
                        <div className="w-[6px] h-[6px] rounded-full bg-[#e0e0e0] shrink-0" />
                        <div className="h-[3px] rounded-sm bg-[#e8e8e8]" style={{ width: `${w}%` }} />
                      </div>
                    ))}
                    <div className="w-full h-[26px] rounded-[6px] border border-[#ddd] flex items-center justify-center mt-1">
                      <div className="w-[50px] h-[3px] rounded-sm bg-[#ccc]" />
                    </div>
                  </div>
                  <div className="flex-1 rounded-[10px] p-4 flex flex-col gap-3" style={{ background: "#16a34a", boxShadow: "0 4px 16px rgba(22,163,74,0.3)" }}>
                    <div className="w-[50px] h-[4px] rounded-sm bg-white/40" />
                    <div className="w-[40px] h-[9px] rounded-sm bg-white/90" />
                    <div className="w-full h-px bg-white/20" />
                    {[70, 55, 80, 65].map((w, i) => (
                      <div key={i} className="w-full flex items-center gap-2">
                        <div className="w-[6px] h-[6px] rounded-full bg-white/40 shrink-0" />
                        <div className="h-[3px] rounded-sm bg-white/30" style={{ width: `${w}%` }} />
                      </div>
                    ))}
                    <div className="w-full h-[26px] rounded-[6px] bg-white flex items-center justify-center mt-1">
                      <div className="w-[50px] h-[3px] rounded-sm bg-[#16a34a]/60" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-5 left-6">
                  <p className="font-light text-[11px] leading-[16px] text-black/30 tracking-[0.8px] uppercase">Pricing UI</p>
                </div>
              </div>
            </ExplorationCard>
          </FadeUp>

          {/* 05 — Tickets App */}
          <FadeUp delay={0.05}>
            <ExplorationCard height={354}>
              <div className="w-full h-full overflow-hidden" style={{ background: "linear-gradient(160deg, #0d1b2a 0%, #1a2d44 60%, #0f2030 100%)" }}>
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(56,130,210,0.12) 0%, transparent 70%)" }} />
                <div className="absolute top-8 left-1/2 -translate-x-1/2 rounded-[18px] overflow-hidden" style={{ width: 160, height: 280, background: "#0d1b2a", border: "1.5px solid rgba(255,255,255,0.10)" }}>
                  <div className="absolute top-0 inset-x-0 h-[20px] flex items-center justify-between px-4" style={{ background: "#0d1b2a" }}>
                    <div className="w-[20px] h-[3px] rounded-sm bg-white/40" />
                    <div className="w-[16px] h-[3px] rounded-sm bg-white/40" />
                  </div>
                  <div className="absolute top-[20px] inset-x-0 px-4 py-3 flex items-center justify-between">
                    <div className="w-[50px] h-[5px] rounded-sm bg-white/80" />
                    <div className="w-5 h-5 rounded-full border border-white/20" />
                  </div>
                  <div className="absolute rounded-[10px] overflow-hidden" style={{ top: 58, left: 12, right: 12, height: 100, background: "linear-gradient(135deg, #1e3a5f 0%, #2a4d7a 100%)" }}>
                    <div className="absolute top-4 left-4 flex flex-col gap-[4px]">
                      <div className="w-[60px] h-[4px] rounded-sm bg-white/60" />
                      <div className="w-[40px] h-[3px] rounded-sm bg-white/30" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div className="flex flex-col gap-[3px]">
                        <div className="w-[28px] h-[3px] rounded-sm bg-white/30" />
                        <div className="w-[40px] h-[5px] rounded-sm bg-white/70" />
                      </div>
                      <div className="rounded-[4px] px-2 h-[16px] flex items-center" style={{ background: "rgba(56,130,210,0.5)", border: "1px solid rgba(56,130,210,0.4)" }}>
                        <div className="w-[24px] h-[3px] rounded-sm bg-white/60" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute flex flex-col gap-[6px]" style={{ top: 172, left: 12, right: 12 }}>
                    {[80, 65, 70].map((w, i) => (
                      <div key={i} className="flex items-center gap-2 py-2 px-2 rounded-[6px]" style={{ background: "rgba(255,255,255,0.04)" }}>
                        <div className="w-[5px] h-[5px] rounded-full bg-[#3882d2]/60 shrink-0" />
                        <div className="h-[3px] rounded-sm bg-white/20" style={{ width: `${w}%` }} />
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-[36px] flex items-center justify-around px-4" style={{ background: "#0d1b2a", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-4 h-4 rounded-sm bg-white/10" style={i === 0 ? { background: "rgba(56,130,210,0.5)" } : {}} />
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-5 left-6">
                  <p className="font-light text-[11px] leading-[16px] text-white/30 tracking-[0.8px] uppercase">Tickets App</p>
                </div>
              </div>
            </ExplorationCard>
          </FadeUp>

          {/* 06 — Sharing Modal */}
          <FadeUp delay={0.05}>
            <ExplorationCard height={342}>
              <div className="w-full h-full bg-[#f0f0f0] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 flex flex-col gap-3 p-8 opacity-30">
                  {[100, 85, 95, 70, 90, 80].map((w, i) => (
                    <div key={i} className="h-[4px] rounded-sm bg-[#999]" style={{ width: `${w}%` }} />
                  ))}
                </div>
                <div className="relative rounded-[14px] bg-white flex flex-col gap-4 p-6" style={{ width: 280, boxShadow: "0 8px 40px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.06)" }}>
                  <div className="w-8 h-1 rounded-full bg-[#e0e0e0] self-center" />
                  <div className="w-[100px] h-[5px] rounded-sm bg-[#ccc]" />
                  <div className="flex items-center gap-3">
                    {["#1877f2", "#1da1f2", "#25d366", "#000"].map((color, i) => (
                      <div key={i} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: color + "18", border: `1.5px solid ${color}28` }}>
                        <div className="w-4 h-4 rounded-sm" style={{ background: color + "60" }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 rounded-[8px] bg-[#f8f8f8] px-3 py-2" style={{ border: "1px solid #eee" }}>
                    <div className="flex-1 h-[4px] rounded-sm bg-[#ddd]" />
                    <div className="h-[22px] rounded-[5px] px-3 flex items-center bg-[#111]">
                      <div className="w-[24px] h-[3px] rounded-sm bg-white/70" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-5 left-6">
                  <p className="font-light text-[11px] leading-[16px] text-black/30 tracking-[0.8px] uppercase">Sharing Modal</p>
                </div>
              </div>
            </ExplorationCard>
          </FadeUp>

          {/* 07 — Form UI */}
          <FadeUp delay={0.05}>
            <ExplorationCard height={468}>
              <div className="w-full h-full bg-[#fafafa] overflow-hidden relative">
                <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "radial-gradient(circle, #111 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                <div className="absolute inset-0 flex items-center justify-center px-8">
                  <div className="w-full rounded-[14px] bg-white flex flex-col gap-4 p-6" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.06)" }}>
                    <div className="flex flex-col gap-[5px]">
                      <div className="w-[80px] h-[6px] rounded-sm bg-[#bbb]" />
                      <div className="w-[160px] h-[4px] rounded-sm bg-[#e0e0e0]" />
                    </div>
                    <div className="h-px bg-[#f0f0f0]" />
                    {[{ label: 60, value: 140 }, { label: 80, value: 180 }, { label: 50, value: 120 }].map((field, i) => (
                      <div key={i} className="flex flex-col gap-[6px]">
                        <div className="h-[3px] rounded-sm bg-[#ddd]" style={{ width: field.label }} />
                        <div className="w-full h-[36px] rounded-[8px] bg-[#f8f8f8] px-3 flex items-center" style={{ border: "1px solid #e8e8e8" }}>
                          <div className="h-[3px] rounded-sm bg-[#e0e0e0]" style={{ width: field.value }} />
                        </div>
                      </div>
                    ))}
                    <div className="flex flex-col gap-[6px]">
                      <div className="w-[70px] h-[3px] rounded-sm bg-[#ddd]" />
                      <div className="w-full h-[72px] rounded-[8px] bg-[#f8f8f8]" style={{ border: "1px solid #e8e8e8" }} />
                    </div>
                    <div className="w-full h-[40px] rounded-[8px] bg-[#111] flex items-center justify-center">
                      <div className="w-[70px] h-[4px] rounded-sm bg-white/60" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-5 left-6">
                  <p className="font-light text-[11px] leading-[16px] text-black/30 tracking-[0.8px] uppercase">Form UI</p>
                </div>
              </div>
            </ExplorationCard>
          </FadeUp>
        </div>

        {/* Footer */}
        <FadeUp>
          <div className="flex flex-col gap-4">
            <div className="h-px w-full bg-black/10" />
            <div className="flex items-center justify-between">
              <p className={`font-light text-base leading-[22px] ${muted} opacity-80`}>vahlephic ⓒ 2026</p>
              <div className="flex items-center gap-2">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-[rgba(43,43,43,0.05)] p-[5px] rounded-full transition-transform duration-150 hover:scale-110 active:scale-95">
                  <img src={A.instagram} alt="Instagram" className="size-5" />
                </a>
                <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="bg-[rgba(43,43,43,0.05)] p-[5px] rounded-full overflow-hidden transition-transform duration-150 hover:scale-110 active:scale-95">
                  <img src={A.dribbble} alt="Dribbble" className="size-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-[rgba(43,43,43,0.05)] p-[5px] rounded-full transition-transform duration-150 hover:scale-110 active:scale-95">
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
