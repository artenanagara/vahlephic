"use client";

import { motion } from "framer-motion";
import projectsData from "@/data/projects.json";
import { FadeUp }     from "@/app/components/FadeUp";
import { CharReveal } from "@/app/components/CharReveal";
import { Footer }     from "@/app/components/Footer";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { SiteNav }    from "@/app/components/SiteNav";
import { ProjectCard, ProjectCardFooter } from "@/app/components/ProjectCard";
import { ease, muted } from "@/app/lib/constants";
import { logoMap }   from "@/app/lib/logoMap";
import type { Project } from "@/app/lib/types";

const projects = projectsData as Project[];

export default function HomePage() {
  return (
    <div className="bg-[#fafafa] min-h-screen">
      <SiteNav activePage="home" />
      <div className="page-content-shell mx-auto flex w-full max-w-155 flex-col gap-16 px-5 pb-16 pt-14 sm:px-8 sm:pb-20 lg:gap-20 lg:px-0 lg:pt-34">

        {/* ── Author ── */}
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-[26px] text-[#111] sm:text-[28px]" style={{ lineHeight: "1.35" }}>
                <CharReveal text="Rizal Vahlevi" startDelay={0.1} />
              </p>
              <motion.p
                className="text-base leading-5.5"
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
              <p className={`font-light text-base leading-5.5 ${muted}`}>
                Exploring many things while designing. Open for project
              </p>
              <div className="flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="theme-icon shrink-0 opacity-70">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <a
                  href="mailto:vahlephic@gmail.com"
                  className={`min-w-0 break-all font-medium text-base leading-5.5 ${muted} underline`}
                >
                  vahlephic@gmail.com
                </a>
              </div>
            </div>
            <p className="text-base">
              <span className={`font-light ${muted}`}>Currently working on </span>
              <a href="https://nyaritempat.com" target="_blank" rel="noopener noreferrer" className={`font-medium underline decoration-solid ${muted}`}>
                nyaritempat.com
              </a>
            </p>
          </motion.div>
        </div>

        {/* ── Work section ── */}
        <div id="work" className="flex flex-col gap-20">
          <FadeUp>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm text-[#111] whitespace-nowrap">
                <p className="font-medium tracking-[1.4px] uppercase leading-5.5">Work</p>
                <p className="font-light opacity-80 leading-5.5">03</p>
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
                footer={<ProjectCardFooter project={project} />}
              />
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <Footer />
        </FadeUp>
      </div>
    </div>
  );
}
