"use client";

import Image from "next/image";
import { FadeUp }   from "@/app/components/FadeUp";
import { Footer }   from "@/app/components/Footer";
import { SiteNav }  from "@/app/components/SiteNav";
import { ProjectCard, ProjectCardFooter } from "@/app/components/ProjectCard";
import { logoMap }  from "@/app/lib/logoMap";
import projectsData from "@/data/projects.json";
import type { Project } from "@/app/lib/types";

const projects = projectsData as Project[];

export default function WorkPage() {
  return (
    <div className="bg-[#fafafa] min-h-screen">
      <div className="mx-auto flex w-full max-w-155 flex-col px-5 sm:px-8 lg:max-w-[796px] lg:flex-row lg:items-start lg:gap-12 lg:px-0 lg:pt-34">
        <SiteNav activePage="work" />
        <div className="page-content-shell flex w-full flex-col gap-16 pb-16 pt-10 sm:pb-20 lg:flex-1 lg:gap-20 lg:pb-20 lg:pt-0">

        {/* ── Work section ── */}
        <div className="flex flex-col gap-20">
          <FadeUp>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm text-[#111] whitespace-nowrap">
                <p className="font-medium tracking-[1.4px] uppercase leading-5.5">Work</p>
                <p className="font-light opacity-80 leading-5.5">
                  {String(projects.length).padStart(2, "0")}
                </p>
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

        {/* ── Exploration section ── */}
        <div className="flex flex-col gap-5">
          <FadeUp>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm text-[#111] whitespace-nowrap">
                <p className="font-medium tracking-[1.4px] uppercase leading-5.5">Exploration</p>
                <p className="font-light opacity-80 leading-5.5">07</p>
              </div>
              <div className="flex-1 h-px bg-black/10" />
            </div>
          </FadeUp>

          {[1, 2, 3, 4, 5, 6, 7].map((n, i) => (
            <FadeUp key={n} delay={i * 0.05}>
              <Image
                src={`/works/exploration/image-${n}.png`}
                alt={`Exploration ${n}`}
                width={1200}
                height={800}
                className="w-full h-auto block rounded-xl"
              />
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <Footer />
        </FadeUp>
        </div>
      </div>
    </div>
  );
}
