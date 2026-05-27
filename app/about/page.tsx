"use client";

import { motion } from "framer-motion";
import aboutData from "@/data/about.json";
import { FadeUp }     from "@/app/components/FadeUp";
import { CharReveal } from "@/app/components/CharReveal";

// ─── Assets (expire 7 days from 2026-05-25) ───────────────────────────────────
const A = {
  avatar:    "https://www.figma.com/api/mcp/asset/f6887da9-a0dd-4f1c-ac61-87b8c5aa845a",
  moon:      "https://www.figma.com/api/mcp/asset/d695bfa2-6c2b-4e59-809c-686401735d29",
  instagram: "https://www.figma.com/api/mcp/asset/63485ff5-a47e-4cbd-b98f-fd08cecb5139",
  dribbble:  "https://www.figma.com/api/mcp/asset/20a67230-424f-47cd-99bb-dc946e5a8ddb",
  linkedin:  "https://www.figma.com/api/mcp/asset/42db4c6d-e6ee-4c6b-b5d3-97dd51bbbf33",
};

const muted = "text-[rgba(17,17,17,0.8)]";
const ease  = [0.22, 1, 0.36, 1] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionHeader({ title }: { title: string }) {
  return (
    <p className="font-medium text-[14px] leading-[22px] text-[#111] tracking-[1.4px] uppercase">
      {title}
    </p>
  );
}

function LogoBox({ src, alt, rounded = "rounded-[10.75px]" }: { src: string | null; alt: string; rounded?: string }) {
  return (
    <div className={`size-[43px] ${rounded} border border-[#e7e7e7] flex items-center justify-center overflow-hidden shrink-0 bg-[#f8f8f8]`}>
      {src && <img src={src} alt={alt} className="w-full h-full object-cover" />}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
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
            <a href="/"     className={`font-light leading-5 opacity-80 transition-opacity duration-150 hover:opacity-100 ${muted}`}>Home</a>
            <a href="/work" className={`font-light leading-5 opacity-80 transition-opacity duration-150 hover:opacity-100 ${muted}`}>Work</a>
            <p className="font-semibold text-[#111] leading-5">About</p>
          </div>
          <div className="h-px w-full bg-black/10" />
          <a href="#" className={`font-light text-[14px] leading-5 underline opacity-80 ${muted}`}>Download CV</a>
        </motion.div>
      </nav>

      {/* ── Scrollable content ── */}
      <div className="pt-[200px] pb-20 flex flex-col gap-[80px]" style={{ marginLeft: "calc(25% + 110px)", width: 500 }}>

        {/* ── Bio ── */}
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
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

          <motion.p
            className={`font-light text-base leading-[26px] ${muted}`}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, ease, delay: 0.62 }}
          >
            {aboutData.bio}
          </motion.p>
        </div>

        {/* ── Experience ── */}
        <FadeUp>
          <div className="flex flex-col gap-6">
            <SectionHeader title="Experience" />
            <div className="flex flex-col gap-4">
              <p className={`font-light text-base leading-[22px] ${muted}`}>
                {aboutData.experience.summary}
              </p>
              <div className="flex flex-col gap-2">
                {aboutData.experience.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 px-3 -mx-3 rounded-xl transition-colors duration-150 hover:bg-black/[0.025]">
                    <div className="flex items-center gap-3">
                      <LogoBox src={item.logo} alt={item.company} />
                      <div className="flex flex-col gap-[2px]">
                        <p className="font-medium text-[16px] leading-[24px] text-[#111]">{item.role}</p>
                        <div className="flex items-center gap-2">
                          <p className={`font-light text-[14px] leading-[17px] ${muted}`}>{item.company}</p>
                          <div className="w-px h-3 bg-black/30 shrink-0" />
                          <p className={`font-light text-[14px] leading-[17px] ${muted}`}>{item.type}</p>
                        </div>
                      </div>
                    </div>
                    <p className={`font-light text-[14px] leading-[17px] ${muted} shrink-0`}>{item.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ── Education ── */}
        <FadeUp>
          <div className="flex flex-col gap-6">
            <SectionHeader title="Education" />
            <div className="flex flex-col gap-2">
              {aboutData.education.map((edu, i) => (
                <div key={i} className="flex items-center justify-between py-2 px-3 -mx-3 rounded-xl transition-colors duration-150 hover:bg-black/[0.025]">
                  <div className="flex items-center gap-3">
                    <LogoBox src={edu.logo} alt={edu.institution} rounded="rounded-[7.94px]" />
                    <div className="flex flex-col gap-[2px]">
                      <p className="font-medium text-[16px] leading-[24px] text-[#111]">{edu.institution}</p>
                      <p className={`font-light text-[14px] leading-[17px] ${muted}`}>{edu.degree}</p>
                    </div>
                  </div>
                  <p className={`font-light text-[14px] leading-[17px] ${muted} shrink-0 pt-[3.5px]`}>{edu.period}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* ── Listening to ── */}
        <FadeUp>
          <div className="flex flex-col gap-6">
            <SectionHeader title="Listening to" />
            <div className="flex flex-col gap-6">
              {Array.from({ length: Math.ceil(aboutData.listening.length / 2) }).map((_, row) => (
                <div key={row} className="flex justify-between">
                  {aboutData.listening.slice(row * 2, row * 2 + 2).map((track, col) => (
                    <div key={col} className="flex items-center gap-3 py-2 px-3 -mx-3 rounded-xl transition-colors duration-150 hover:bg-black/[0.025]" style={{ width: 225 }}>
                      <div className="size-[43px] rounded-[7.94px] overflow-hidden shrink-0 bg-[#f0f0f0]">
                        {track.cover && <img src={track.cover} alt={track.album} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex flex-col gap-[2px]">
                        <p className="font-medium text-[16px] leading-[24px] text-[#111]">{track.artist}</p>
                        <p className={`font-light text-[14px] leading-[17px] ${muted}`}>{track.album}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* ── Footer ── */}
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
