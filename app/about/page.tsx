"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import aboutData from "@/data/about.json";
import { FadeUp }     from "@/app/components/FadeUp";
import { CharReveal } from "@/app/components/CharReveal";
import { Footer }     from "@/app/components/Footer";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { SiteNav }    from "@/app/components/SiteNav";
import { ease, muted } from "@/app/lib/constants";

interface SpotifyPlaybackUpdate {
  data?: { isPaused?: boolean };
}

interface SpotifyEmbedController {
  addListener(event: "playback_update", callback: (event: SpotifyPlaybackUpdate) => void): void;
  loadUri(uri: string): void;
  pause(): void;
  play(): void;
}

interface SpotifyIframeApi {
  createController(
    element: HTMLElement,
    options: { uri: string; width: string; height: string },
    callback: (controller: SpotifyEmbedController) => void
  ): void;
}

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
  }
}

function SectionHeader({ title }: { title: string }) {
  return (
    <p className="font-medium text-sm leading-5.5 text-[#111] tracking-[1.4px] uppercase">
      {title}
    </p>
  );
}

function LogoBox({
  src, alt, rounded = "rounded-xl",
}: {
  src: string | null; alt: string; rounded?: string;
}) {
  return (
    <div className={`size-11 ${rounded} border border-[#e7e7e7] flex items-center justify-center overflow-hidden shrink-0 bg-[#f8f8f8]`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {src && <img src={src} alt={alt} className="w-full h-full object-cover" />}
    </div>
  );
}

export default function AboutPage() {
  const spotifyCtrl = useRef<SpotifyEmbedController | null>(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [playingId,   setPlayingId]   = useState<string | null>(null);
  const [visibleId,   setVisibleId]   = useState<string | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hideEl = (el: Element) => {
      const h = el as HTMLElement;
      h.style.opacity = "0";
      h.style.pointerEvents = "none";
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          const src = (node as HTMLIFrameElement).src ?? "";
          if (src.includes("spotify") || node.id?.includes("spotify") || node.className?.includes?.("spotify")) {
            hideEl(node);
          }
          node.querySelectorAll?.("iframe[src*='spotify']").forEach(hideEl);
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const setup = (IFrameAPI: SpotifyIframeApi) => {
      const el = document.getElementById("sp-player");
      if (!el) return;
      IFrameAPI.createController(
        el,
        { uri: "spotify:track:76DzFyYlkByQMN4VXK7ynB", width: "300", height: "80" },
        (ctrl) => {
          spotifyCtrl.current = ctrl;
          setPlayerReady(true);
          el.querySelectorAll("iframe").forEach(hideEl);
          ctrl.addListener("playback_update", (e) => {
            if (e?.data?.isPaused) setPlayingId(null);
          });
        }
      );
    };

    if (!window.onSpotifyIframeApiReady) {
      window.onSpotifyIframeApiReady = setup;
      if (!document.getElementById("spotify-api-script")) {
        const s = document.createElement("script");
        s.id    = "spotify-api-script";
        s.src   = "https://open.spotify.com/embed/iframe-api/v1";
        s.async = true;
        document.head.appendChild(s);
      }
    }

    return () => observer.disconnect();
  }, []);

  const show = useCallback((id: string) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setVisibleId(id);
  }, []);

  const scheduleHide = useCallback((id: string) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setVisibleId((prev) => (prev === id ? null : prev));
    }, 3000);
  }, []);

  const handleToggle = useCallback((embedId: string) => {
    if (!spotifyCtrl.current) return;
    const [type, trackId] = embedId.split("/");
    const uri = `spotify:${type}:${trackId}`;

    if (playingId === embedId) {
      spotifyCtrl.current.pause();
      setPlayingId(null);
      scheduleHide(embedId);
    } else {
      spotifyCtrl.current.loadUri(uri);
      spotifyCtrl.current.play();
      setPlayingId(embedId);
      show(embedId);
    }
  }, [playingId, scheduleHide, show]);

  const handleMouseEnter = useCallback((id: string) => {
    if (playerReady) show(id);
  }, [playerReady, show]);

  const handleMouseLeave = useCallback((id: string) => {
    if (playingId !== id) setVisibleId(null);
  }, [playingId]);

  return (
    <div className="bg-[#fafafa] min-h-screen">
      {/* Spotify player — in viewport but invisible (audio needs to be in viewport) */}
      <div
        id="sp-player"
        aria-hidden="true"
        style={{ position: "fixed", bottom: 0, right: 0, width: 300, height: 80, pointerEvents: "none", zIndex: -1 }}
      />

      <div className="mx-auto flex w-full max-w-155 flex-col px-5 sm:px-8 lg:max-w-[796px] lg:flex-row lg:items-start lg:gap-12 lg:px-0">
        <SiteNav activePage="about" />
        <div className="page-content-shell flex w-full flex-col gap-16 pb-16 pt-10 sm:pb-20 lg:flex-1 lg:gap-20 lg:pb-20 lg:pt-34">

        {/* ── Bio ── */}
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

          <motion.p
            className={`font-light text-base leading-6 ${muted}`}
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
              <p className={`font-light text-base leading-5.5 ${muted}`}>
                {aboutData.experience.summary}
              </p>
              <div className="flex flex-col gap-2">
                {aboutData.experience.items.map((item, i) => (
                  <div key={i} className="flex flex-col gap-3 py-2 px-3 -mx-3 rounded-xl transition-colors duration-150 hover:bg-black/2.5 min-[520px]:flex-row min-[520px]:items-center min-[520px]:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <LogoBox src={item.logo} alt={item.company} />
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <p className="font-medium text-base leading-6 text-[#111]">{item.role}</p>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <p className={`font-light text-sm leading-4.25 ${muted}`}>{item.company}</p>
                          <div className="w-px h-3 bg-black/30 shrink-0" />
                          <p className={`font-light text-sm leading-4.25 ${muted}`}>{item.type}</p>
                        </div>
                      </div>
                    </div>
                    <p className={`font-light text-sm leading-4.25 ${muted} shrink-0 min-[520px]:text-right`}>{item.period}</p>
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
                <div key={i} className="flex flex-col gap-3 py-2 px-3 -mx-3 rounded-xl transition-colors duration-150 hover:bg-black/2.5 min-[520px]:flex-row min-[520px]:items-center min-[520px]:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <LogoBox src={edu.logo} alt={edu.institution} rounded="rounded-lg" />
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <p className="font-medium text-base leading-6 text-[#111]">{edu.institution}</p>
                      <p className={`font-light text-sm leading-4.25 ${muted}`}>{edu.degree}</p>
                    </div>
                  </div>
                  <p className={`font-light text-sm leading-4.25 ${muted} shrink-0 pt-1 min-[520px]:text-right`}>{edu.period}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* ── Listening to ── */}
        <FadeUp>
          <div className="flex flex-col gap-6">
            <SectionHeader title="Listening to" />
            <div className="flex flex-col gap-3">
              {Array.from({ length: Math.ceil(aboutData.listening.length / 2) }).map((_, row) => (
                <div key={row} className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 min-[520px]:gap-4">
                  {aboutData.listening.slice(row * 2, row * 2 + 2).map((track, col) => {
                    const isPlaying = playingId === track.spotifyEmbed;
                    const isVisible = visibleId === track.spotifyEmbed;
                    return (
                      <div
                        key={col}
                        className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-2 transition-colors duration-150 hover:bg-black/2.5 min-[520px]:-mx-3"
                        onMouseEnter={() => handleMouseEnter(track.spotifyEmbed)}
                        onMouseLeave={() => handleMouseLeave(track.spotifyEmbed)}
                      >
                        <button
                          onClick={() => handleToggle(track.spotifyEmbed)}
                          className="relative size-11 rounded-lg overflow-hidden shrink-0 bg-[#f0f0f0] focus:outline-none"
                          aria-label={isPlaying ? "Pause" : "Play preview"}
                        >
                          {track.cover && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={track.cover} alt={track.album} className="w-full h-full object-cover" />
                          )}
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVisible || isPlaying ? 1 : 0 }}
                            transition={{ duration: 0.18 }}
                          >
                            {isPlaying ? (
                              <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
                                <rect x="1" y="1" width="3.5" height="12" rx="1.5"/>
                                <rect x="7.5" y="1" width="3.5" height="12" rx="1.5"/>
                              </svg>
                            ) : (
                              <svg width="13" height="14" viewBox="0 0 13 14" fill="white">
                                <path d="M2 1.5 L12 7 L2 12.5 Z"/>
                              </svg>
                            )}
                          </motion.div>
                        </button>

                        <a
                          href={track.spotifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col gap-0.5 min-w-0"
                        >
                          <p className="font-medium text-base leading-6 text-[#111] truncate">{track.artist}</p>
                          <p className={`font-light text-sm leading-4.25 ${muted} truncate`}>{track.album}</p>
                        </a>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        <FadeUp>
          <Footer />
        </FadeUp>
        </div>
      </div>
    </div>
  );
}
