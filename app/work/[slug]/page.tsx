import { notFound } from "next/navigation";
import fs   from "fs";
import path from "path";
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
  layout?: "row" | "grid"; // "row" = single flex row, "grid" = 2-col (default)
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
  body?:           string[];   // paragraphs before main content
  image?:          string;     // single full-width image
  bodyAfterImage?: string[];   // paragraphs after single image
  beforeAfter?:    BeforeAfter;
  groups?:         ImageGroup[];
  intro?:          string;
  screens?:        Screen[];
  flow?:            FlowDiagram;      // user-flow snake diagram
  beforeAfterFlow?: BeforeAfterFlow;  // before (snake) + after (linear blue) flows
  card?:            boolean;          // render section inside #F8F8F8 card
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

// ─── Shared styles (mirrors main page) ────────────────────────────────────────
const cardShadow =
  "shadow-[0px_10px_10px_-6px_rgba(0,0,0,0.01),0px_4px_10px_-5px_rgba(35,54,55,0.24),0px_0px_0px_1px_#e5e5e5]";
const muted = "text-[rgba(17,17,17,0.8)]";

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Renders an HTML-safe paragraph that supports <strong> tags in JSON */
function Para({ text }: { text: string }) {
  return (
    <p
      className={`font-light text-base leading-[22px] ${muted}`}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}

/** Full-width image with card shadow */
function ContentImage({ src, alt }: { src: string; alt?: string }) {
  return (
    <div className={`w-full rounded-[10px] overflow-hidden transition-transform duration-200 hover:-translate-y-[2px] ${cardShadow}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt ?? ""} className="w-full h-auto block" />
    </div>
  );
}

/** Before / After comparison layout */
function BeforeAfterSection({ data }: { data: BeforeAfter }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {(["before", "after"] as const).map((key) => (
        <div key={key} className="flex flex-col gap-2">
          <p className={`font-medium text-sm leading-[18px] ${muted}`}>
            {data[key].label}
          </p>
          <ContentImage src={data[key].image} alt={data[key].label} />
        </div>
      ))}
    </div>
  );
}

/** Labeled image groups — "row" = equal-flex row, "grid" = 2-col wrap */
function ImageGroups({ groups }: { groups: ImageGroup[] }) {
  return (
    <div className="flex flex-col gap-6">
      {groups.map((group, gi) => (
        <div key={gi} className="flex flex-col gap-4">
          {group.label && (
            <p className={`font-light text-[16px] leading-[20px] ${muted}`}>
              {group.label}
            </p>
          )}
          {group.layout === "row" ? (
            /* Single flex row — all images equal width */
            <div className="flex items-stretch gap-[10px]">
              {group.images.map((img, ii) => (
                <div key={ii} className="flex-1 overflow-hidden rounded-[6px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${group.label ?? "reference"} ${ii + 1}`}
                    className="w-full h-full object-cover block"
                  />
                </div>
              ))}
            </div>
          ) : (
            /* 2-column grid with shadow */
            <div className="flex flex-wrap gap-3">
              {group.images.map((img, ii) => (
                <div
                  key={ii}
                  className={`rounded-[8px] overflow-hidden ${cardShadow}`}
                  style={{ width: "calc(50% - 6px)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${group.label ?? "reference"} ${ii + 1}`}
                    className="w-full h-auto block"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/** Labeled outcome screen groups */
function OutcomeScreens({ screens }: { screens: Screen[] }) {
  return (
    <div className="flex flex-col gap-4">
      {screens.map((screen, si) => (
        <div key={si} className="w-full rounded-[20px] bg-[#F8F8F8] border border-[#E9E9E9] p-4 flex flex-col gap-3">
          <p className={`font-light text-[16px] leading-[20px] ${muted}`}>
            {screen.label}
          </p>
          <div className="flex items-stretch gap-[10px]">
            {screen.images.map((img, ii) => (
              <div key={ii} className="flex-1 overflow-hidden rounded-[6px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`${screen.label} ${ii + 1}`}
                  className="w-full h-auto block"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Arrow from public/arrow.svg — rotate for direction */
function Arrow({ dir }: { dir: "right" | "left" | "down" }) {
  const rotate = { right: "0deg", left: "180deg", down: "90deg" };
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/arrow.svg"
      alt=""
      className="shrink-0"
      style={{ transform: `rotate(${rotate[dir]})`, width: 8, height: 7, display: "block" }}
    />
  );
}

/** A single step card in the flow */
function FlowCard({ text }: { text: string }) {
  return (
    <div
      className="flex-1 overflow-hidden rounded-[12px] p-[6px] pt-[11px] flex"
      style={{
        height: 88,
        background: "linear-gradient(180deg, white 0%, #FBFBFB 81%, #F6F6F6 100%)",
        boxShadow:
          "0px 0px 0px 1px #E5E5E5, 0px 4px 10px -5px rgba(35,54,55,0.24), inset 0px 0px 0px 2px white, 0px 10px 10px -6px rgba(0,0,0,0.01)",
      }}
    >
      <div className="flex-1 bg-[#F6F6F6] rounded-[8px] border-[0.5px] border-[#E7E7E7] overflow-hidden flex items-center justify-center p-2">
        <p className="text-center text-[11.7px] font-normal leading-[1.4] text-[#4F4F4F]">
          {text}
        </p>
      </div>
    </div>
  );
}

/** 2-row snake flow: row1 L→R, row2 R→L */
function ProblemFlow({ label, steps }: { label?: string; steps: string[] }) {
  const row1 = steps.slice(0, 3);
  // row2 displayed L→R as [step6, step5, step4] so arrows point ←
  const row2 = [steps[5], steps[4], steps[3]];

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {label && (
        <p className="font-light text-[16px] leading-[24px] text-[rgba(17,17,17,0.8)]">
          {label}
        </p>
      )}
      <div className="w-full flex flex-col items-end gap-2">
        {/* Row 1: left → right */}
        <div className="w-full flex items-center gap-[6px]">
          {row1.map((text, i) => (
            <div key={i} className="contents">
              <FlowCard text={text} />
              {i < 2 && <Arrow dir="right" />}
            </div>
          ))}
        </div>

        {/* ↓ arrow — centered above rightmost column */}
        <div className="w-full flex justify-end">
          <div
            className="flex items-center justify-center"
            style={{ width: "calc((100% - 40px) / 3)" }}
          >
            <Arrow dir="down" />
          </div>
        </div>

        {/* Row 2: right → left flow (visit ← get choice ← keep searching) */}
        <div className="w-full flex items-center gap-[6px]">
          {row2.map((text, i) => (
            <div key={i} className="contents">
              <FlowCard text={text} />
              {i < 2 && <Arrow dir="left" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Single-row linear flow with blue (#F0F9FE) inner cards — "After" variant */
function AfterFlow({ label, steps }: { label?: string; steps: string[] }) {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {label && (
        <p className="font-light text-[16px] leading-[24px] text-[rgba(17,17,17,0.8)]">
          {label}
        </p>
      )}
      <div className="w-full flex items-center gap-[6px]">
        {steps.map((text, i) => (
          <div key={i} className="contents">
            <div
              className="flex-1 overflow-hidden rounded-[12px] flex"
              style={{
                height: 88,
                paddingTop: 11.7,
                paddingLeft: 6.13,
                paddingRight: 6.13,
                paddingBottom: 6.13,
                background: "linear-gradient(180deg, white 0%, #FBFBFB 81%, #F6F6F6 100%)",
                boxShadow:
                  "0px 0px 0px 1px #E5E5E5, 0px 4px 10px -5px rgba(35,54,55,0.24), inset 0px 0px 0px 2px white, 0px 10px 10px -6px rgba(0,0,0,0.01)",
              }}
            >
              <div className="flex-1 bg-[#F0F9FE] rounded-[8px] border-[0.5px] border-[#E7E7E7] flex items-center justify-center p-2">
                <p className="text-center text-[11.7px] font-normal leading-[1.4] text-[#4F4F4F]">
                  {text}
                </p>
              </div>
            </div>
            {i < steps.length - 1 && <Arrow dir="right" />}
          </div>
        ))}
      </div>
    </div>
  );
}

/** A single case-study section */
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

  /* ── Card variant (e.g. Reference) ── */
  if (section.card) {
    return (
      <div id={section.id} className="flex flex-col gap-5">
        <div className="w-full rounded-[20px] bg-[#F8F8F8] border border-[#E9E9E9] p-4 flex flex-col gap-4">
          <p className="font-semibold text-[16px] leading-[24px] text-[#111]">
            {section.title}
          </p>
          {bodyBefore}
          {section.groups && <ImageGroups groups={section.groups} />}
        </div>
        {bodyAfter}
      </div>
    );
  }

  /* ── Standard variant ── */
  return (
    <div id={section.id} className="flex flex-col gap-5">
      {/* Heading + divider */}
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-xl leading-[28px] text-[#111]">
          {section.title}
        </p>
        <div className="h-px w-full bg-black/10" />
      </div>

      {bodyBefore}

      {/* Single image */}
      {section.image && <ContentImage src={section.image} />}

      {/* Snake flow (Problem) */}
      {section.flow && (
        <ProblemFlow label={section.flow.label} steps={section.flow.steps} />
      )}

      {/* Before + After flows (Solution) */}
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

      {/* Before / After images */}
      {section.beforeAfter && <BeforeAfterSection data={section.beforeAfter} />}

      {/* Image groups (non-card) */}
      {section.groups && <ImageGroups groups={section.groups} />}

      {/* Outcome intro + screens */}
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
  const Link = (await import("next/link")).default;

  const sectionNavItems = work.sections.map((s) => ({
    id: s.id,
    title: s.title,
  }));

  return (
    <div className="bg-[#fafafa] min-h-screen">

      {/* ── Fixed sidebar ── */}
      <nav
        className="fixed top-[200px] flex flex-col gap-8"
        style={{ left: "calc(12.5% + 60px)" }}
      >
        {/* Project icon */}
        {work.logo ? (
          <div className="shrink-0 inline-flex">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={work.logo} alt={`${work.title} logo`} className="h-8 w-auto block" />
          </div>
        ) : (
          <div className="size-8 rounded-[8.5px] overflow-hidden border border-[#e9e9e9] bg-[#f2f7ff] shrink-0 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b8cba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
        )}

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          {/* Back link */}
          <Link
            href="/"
            className={`flex items-center gap-1 font-light text-[14px] leading-5 opacity-80 transition-opacity duration-150 hover:opacity-100 ${muted}`}
          >
            ← Back
          </Link>

          <div className="h-px w-full bg-black/10" />

          {/* Section anchors — active state tracked client-side */}
          <SidebarNav items={sectionNavItems} />
        </div>
      </nav>

      {/* ── Scrollable content ── */}
      <div
        className="pt-[200px] pb-20 flex flex-col gap-[60px]"
        style={{ marginLeft: "calc(25% + 110px)", width: 500 }}
      >
        {/* ── Header ── */}
        <div className="flex flex-col gap-5" style={{ animation: "fadeUp 0.72s cubic-bezier(0.22,1,0.36,1) backwards" }}>
          {/* Title + description */}
          <div className="flex flex-col gap-3">
            <p className="font-semibold text-[28px] leading-[38px] text-[#111]">
              {work.title}
            </p>
            <p className={`font-light text-base leading-[22px] ${muted}`}>
              {work.description}
            </p>
          </div>

          {/* Meta + Hero — outer container: #F8F8F8, rounded-[20px], border */}
          <div className="w-full rounded-[20px] bg-[#F8F8F8] border border-[#E9E9E9] p-[6px] pb-3 flex flex-col gap-3">

            {/* Inner white card */}
            <div className="w-full bg-white rounded-[16px] border border-[#E9E9E9] p-[6px]">
              {/* Meta row: #FBFBFB bg, border #F0F0F0, rounded-[12px] */}
              <div className="w-full bg-[#FBFBFB] rounded-[12px] border border-[#F0F0F0] p-4 flex items-start justify-between">
                {/* Left: Role + Timeline */}
                <div className="flex items-center gap-8">
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-medium text-[16px] leading-[22px] text-[rgba(17,17,17,0.8)]">
                      Role
                    </p>
                    <p className="font-light text-[14px] leading-[17px] text-[rgba(17,17,17,0.8)]">
                      {work.meta.role}
                    </p>
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-medium text-[16px] leading-[22px] text-[rgba(17,17,17,0.8)]">
                      Timeline
                    </p>
                    <p className="font-light text-[14px] leading-[17px] text-[rgba(17,17,17,0.8)]">
                      {work.meta.timeline}
                    </p>
                  </div>
                </div>

                {/* Right: Visit website */}
                {work.meta.liveUrl && (
                  <a
                    href={work.meta.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/visit flex items-center gap-[5px] font-light text-[14px] leading-[17px] text-[rgba(17,17,17,0.8)] underline"
                  >
                    Visit website
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(17,17,17,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-150 group-hover/visit:translate-x-[2px] group-hover/visit:-translate-y-[2px]">
                      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Hero image — centered, padded on sides + bottom */}
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

        {/* ── Footer ── */}
        <RevealSection>
        <div className="flex flex-col gap-4">
          <div className="h-px w-full bg-black/10" />
          <div className="flex items-center justify-between">
            <p className={`font-light text-base leading-[22px] ${muted} opacity-80`}>
              vahlephic ⓒ 2026
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[rgba(43,43,43,0.05)] p-[5px] rounded-full transition-transform duration-150 hover:scale-110 active:scale-95"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(17,17,17,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[rgba(43,43,43,0.05)] p-[5px] rounded-full overflow-hidden transition-transform duration-150 hover:scale-110 active:scale-95"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(17,17,17,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[rgba(43,43,43,0.05)] p-[5px] rounded-full transition-transform duration-150 hover:scale-110 active:scale-95"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(17,17,17,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        </RevealSection>
      </div>
    </div>
  );
}
