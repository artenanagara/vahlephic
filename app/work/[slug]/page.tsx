import { notFound } from "next/navigation";
import Link from "next/link";
import fs   from "fs";
import path from "path";
import { Footer } from "@/app/components/Footer";
import { muted, cardShadow } from "@/app/lib/constants";
import SidebarNav      from "./SidebarNav";
import { RevealSection } from "./RevealSection";

// ─── Types ────────────────────────────────────────────────────────────────────
interface BeforeAfter {
  before: { label: string; image: string };
  after:  { label: string; image: string };
}

interface ImageGroup {
  label?: string;
  images: string[];
  layout?: "row" | "grid";
}

interface BeforeAfterFlow {
  beforeLabel?: string;
  beforeSteps:  string[];
  afterLabel?:  string;
  afterSteps:   string[];
}

interface Screen {
  label: string;
  images: string[];
}

interface FlowDiagram {
  label?: string;
  steps:  string[]; // exactly 6, logical order: 1→2→3→(↓)→4→5→6
}

interface WorkSection {
  id: string;
  title: string;
  body?:           string[];
  image?:          string;
  bodyAfterImage?: string[];
  beforeAfter?:    BeforeAfter;
  groups?:         ImageGroup[];
  intro?:          string;
  screens?:        Screen[];
  flow?:            FlowDiagram;
  beforeAfterFlow?: BeforeAfterFlow;
  card?:            boolean;
}

interface WorkMeta {
  role:      string;
  timeline:  string;
  liveUrl?:  string;
}

interface WorkData {
  slug:        string;
  title:       string;
  description: string;
  meta:        WorkMeta;
  logo?:       string;
  hero?:       string;
  sections:    WorkSection[];
}

// ─── Data helpers ─────────────────────────────────────────────────────────────
function getWorkSlugs(): string[] {
  const dir = path.join(process.cwd(), "data", "works");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

function getWorkData(slug: string): WorkData | null {
  const file = path.join(process.cwd(), "data", "works", `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf-8")) as WorkData;
}

export async function generateStaticParams() {
  return getWorkSlugs().map((slug) => ({ slug }));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Para({ text }: { text: string }) {
  return (
    <p
      className={`font-light text-base leading-5.5 ${muted}`}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}

function ContentImage({ src, alt }: { src: string; alt?: string }) {
  return (
    <div className={`w-full rounded-[10px] overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 ${cardShadow}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt ?? ""} className="w-full h-auto block" />
    </div>
  );
}

function BeforeAfterSection({ data }: { data: BeforeAfter }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {(["before", "after"] as const).map((key) => (
        <div key={key} className="flex flex-col gap-2">
          <p className={`font-medium text-sm leading-4.5 ${muted}`}>{data[key].label}</p>
          <ContentImage src={data[key].image} alt={data[key].label} />
        </div>
      ))}
    </div>
  );
}

function ImageGroups({ groups }: { groups: ImageGroup[] }) {
  return (
    <div className="flex flex-col gap-6">
      {groups.map((group, gi) => (
        <div key={gi} className="flex flex-col gap-4">
          {group.label && (
            <p className={`font-light text-base leading-5 ${muted}`}>{group.label}</p>
          )}
          {group.layout === "row" ? (
            <div className="flex snap-x items-stretch gap-2.5 overflow-x-auto pb-1 sm:overflow-visible sm:pb-0">
              {group.images.map((img, ii) => (
                <div key={ii} className="min-w-[68%] flex-1 snap-start overflow-hidden rounded-md sm:min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${group.label ?? "reference"} ${ii + 1}`} className="w-full h-full object-cover block" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {group.images.map((img, ii) => (
                <div key={ii} className={`rounded-lg overflow-hidden ${cardShadow}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${group.label ?? "reference"} ${ii + 1}`} className="w-full h-auto block" />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function OutcomeScreens({ screens }: { screens: Screen[] }) {
  return (
    <div className="flex flex-col gap-4">
      {screens.map((screen, si) => (
        <div key={si} className="w-full rounded-[20px] bg-[#F8F8F8] border border-[#E9E9E9] p-4 flex flex-col gap-3">
          <p className={`font-light text-base leading-5 ${muted}`}>{screen.label}</p>
          <div className="flex snap-x items-stretch gap-2.5 overflow-x-auto pb-1 sm:overflow-visible sm:pb-0">
            {screen.images.map((img, ii) => (
              <div key={ii} className="min-w-[68%] flex-1 snap-start overflow-hidden rounded-md sm:min-w-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`${screen.label} ${ii + 1}`} className="w-full h-auto block" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Arrow({ dir }: { dir: "right" | "left" | "down" }) {
  const rotateClass = { right: "rotate-0", left: "rotate-180", down: "rotate-90" } as const;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/icons/arrow.svg"
      alt=""
      className={`shrink-0 block w-2 h-1.75 ${rotateClass[dir]}`}
    />
  );
}

const flowCardShell: React.CSSProperties = {
  height: 88,
  background: "linear-gradient(180deg, white 0%, #FBFBFB 81%, #F6F6F6 100%)",
  boxShadow:
    "0px 0px 0px 1px #E5E5E5, 0px 4px 10px -5px rgba(35,54,55,0.24), inset 0px 0px 0px 2px white, 0px 10px 10px -6px rgba(0,0,0,0.01)",
};

function FlowCard({ text, blue = false }: { text: string; blue?: boolean }) {
  return (
    <div
      className="flow-card-shell flex min-w-30 flex-1 overflow-hidden rounded-xl p-1.5 pt-4.5 sm:min-w-0"
      style={flowCardShell}
    >
      <div
        className={`flow-card-inner flex-1 rounded-lg border-[0.5px] border-[#E7E7E7] overflow-hidden flex items-center justify-center p-2 ${blue ? "flow-card-inner--after bg-[#F0F9FE]" : "bg-[#F6F6F6]"}`}
      >
        <p className="text-center text-xs font-normal leading-4.5 text-[#4F4F4F]">
          {text}
        </p>
      </div>
    </div>
  );
}

/** 2-row snake flow: row1 L→R, row2 R→L */
function ProblemFlow({ label, steps }: { label?: string; steps: string[] }) {
  const row1 = steps.slice(0, 3);
  const row2 = [steps[5], steps[4], steps[3]];

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {label && (
        <p className={`font-light text-base leading-6 ${muted}`}>{label}</p>
      )}
      <div className="w-full overflow-x-auto pb-1">
        <div className="flex min-w-125 flex-col items-end gap-2 sm:min-w-0">
          <div className="w-full flex items-center gap-1.5">
            {row1.map((text, i) => (
              <div key={i} className="contents">
                <FlowCard text={text} />
                {i < 2 && <Arrow dir="right" />}
              </div>
            ))}
          </div>

          <div className="w-full flex justify-end">
            <div
              className="flex items-center justify-center"
              style={{ width: "calc((100% - 40px) / 3)" }}
            >
              <Arrow dir="down" />
            </div>
          </div>

          <div className="w-full flex items-center gap-1.5">
            {row2.map((text, i) => (
              <div key={i} className="contents">
                <FlowCard text={text} />
                {i < 2 && <Arrow dir="left" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Single-row linear flow with blue inner cards — "After" variant */
function AfterFlow({ label, steps }: { label?: string; steps: string[] }) {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {label && (
        <p className={`font-light text-base leading-6 ${muted}`}>{label}</p>
      )}
      <div className="w-full overflow-x-auto pb-1">
        <div className="flex min-w-125 items-center gap-1.5 sm:min-w-0">
          {steps.map((text, i) => (
            <div key={i} className="contents">
              <FlowCard text={text} blue />
              {i < steps.length - 1 && <Arrow dir="right" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CaseSection({ section }: { section: WorkSection }) {
  const bodyBefore = section.body ? (
    <div className="flex flex-col gap-3">
      {section.body.map((p, i) => <Para key={i} text={p} />)}
    </div>
  ) : null;

  const bodyAfter = section.bodyAfterImage ? (
    <div className="flex flex-col gap-3">
      {section.bodyAfterImage.map((p, i) => <Para key={i} text={p} />)}
    </div>
  ) : null;

  if (section.card) {
    return (
      <div id={section.id} className="flex flex-col gap-5">
        <div className="w-full rounded-2xl bg-[#F8F8F8] border border-[#E9E9E9] p-4 flex flex-col gap-4 sm:rounded-[20px]">
          <p className="font-semibold text-base leading-6 text-[#111]">{section.title}</p>
          {bodyBefore}
          {section.groups && <ImageGroups groups={section.groups} />}
        </div>
        {bodyAfter}
      </div>
    );
  }

  return (
    <div id={section.id} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-xl leading-7 text-[#111]">{section.title}</p>
        <div className="h-px w-full bg-black/10" />
      </div>

      {bodyBefore}
      {section.image && <ContentImage src={section.image} />}

      {section.flow && (
        <ProblemFlow label={section.flow.label} steps={section.flow.steps} />
      )}

      {section.beforeAfterFlow && (
        <div className="w-full flex flex-col items-center gap-8">
          <ProblemFlow
            label={section.beforeAfterFlow.beforeLabel}
            steps={section.beforeAfterFlow.beforeSteps}
          />
          <AfterFlow
            label={section.beforeAfterFlow.afterLabel}
            steps={section.beforeAfterFlow.afterSteps}
          />
        </div>
      )}

      {section.beforeAfter && <BeforeAfterSection data={section.beforeAfter} />}
      {section.groups && <ImageGroups groups={section.groups} />}
      {section.intro && <Para text={section.intro} />}
      {section.screens && <OutcomeScreens screens={section.screens} />}

      {bodyAfter}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWorkData(slug);
  if (!work) notFound();

  const sectionNavItems = work.sections.map((s) => ({ id: s.id, title: s.title }));

  return (
    <div className="bg-[#fafafa] min-h-screen">
      <div className="mx-auto flex w-full max-w-155 flex-col px-5 sm:px-8 lg:max-w-[796px] lg:flex-row lg:items-start lg:gap-12 lg:px-0 lg:pt-34">

      {/* ── Sidebar ── */}
      <nav
        className="side-nav-shell sticky top-0 z-20 flex w-full items-center justify-between gap-4 bg-[#fafafa]/90 py-4 backdrop-blur-md lg:sticky lg:top-34 lg:w-32 lg:shrink-0 lg:flex-col lg:items-start lg:justify-start lg:gap-8 lg:self-start lg:bg-transparent lg:py-0 lg:backdrop-blur-none"
      >
        {work.logo ? (
          <div className="shrink-0 inline-flex">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={work.logo} alt={`${work.title} logo`} className="project-logo h-8 w-auto block" />
          </div>
        ) : (
          <div className="size-8 rounded-[8.5px] overflow-hidden border border-[#e9e9e9] bg-[#f2f7ff] shrink-0 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b8cba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
        )}

        <div className="flex min-w-0 items-center gap-4 lg:flex-col lg:items-start">
          <Link
            href="/"
            className={`flex shrink-0 items-center gap-1 font-light text-sm leading-5 opacity-80 transition-opacity duration-150 hover:opacity-100 ${muted}`}
          >
            ← Back
          </Link>
          <div className="hidden h-px w-full bg-black/10 lg:block" />
          <div className="hidden lg:block">
            <SidebarNav items={sectionNavItems} />
          </div>
        </div>
      </nav>

      {/* ── Scrollable content ── */}
      <div className="page-content-shell flex w-full flex-col gap-12 pb-16 pt-10 sm:pb-20 lg:flex-1 lg:gap-15 lg:pb-20 lg:pt-0">

        {/* ── Header ── */}
        <div className="flex flex-col gap-5" style={{ animation: "fadeUp 0.72s cubic-bezier(0.22,1,0.36,1) backwards" }}>
          <div className="flex flex-col gap-3">
            <p className="font-semibold text-[26px] leading-8.5 text-[#111] sm:text-[28px] sm:leading-9.5">
              {work.title}
            </p>
            <p className={`font-light text-base leading-5.5 ${muted}`}>{work.description}</p>
          </div>

          <div className="w-full rounded-2xl bg-[#F8F8F8] border border-[#E9E9E9] p-1.5 pb-3 flex flex-col gap-3 sm:rounded-[20px]">
            <div className="w-full bg-white rounded-2xl border border-[#E9E9E9] p-1.5">
              <div className="w-full bg-[#FBFBFB] rounded-xl border border-[#F0F0F0] p-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="grid w-full grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:w-auto sm:flex sm:items-center sm:gap-8">
                  <div className="flex flex-col gap-0.5">
                    <p className={`font-medium text-base leading-5.5 ${muted}`}>Role</p>
                    <p className={`font-light text-sm leading-4.25 ${muted}`}>{work.meta.role}</p>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className={`font-medium text-base leading-5.5 ${muted}`}>Timeline</p>
                    <p className={`font-light text-sm leading-4.25 ${muted}`}>{work.meta.timeline}</p>
                  </div>
                </div>

                {work.meta.liveUrl && (
                  <a
                    href={work.meta.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/visit flex items-center gap-1.25 font-light text-sm leading-4.25 ${muted} underline`}
                  >
                    Visit website
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(17,17,17,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-150 group-hover/visit:translate-x-0.5 group-hover/visit:-translate-y-0.5">
                      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {work.hero && (
              <div className="w-full px-4 pb-4 flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={work.hero} alt={`${work.title} hero`} className="w-full h-auto block" />
              </div>
            )}
          </div>
        </div>

        {/* ── Sections ── */}
        {work.sections.map((section) => (
          <RevealSection key={section.id}>
            <CaseSection section={section} />
          </RevealSection>
        ))}

        <RevealSection>
          <Footer />
        </RevealSection>
      </div>
      </div>
    </div>
  );
}
