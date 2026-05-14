"use client";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import { FadeUp } from "./motion";

export function WelcomeVideoSection({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showPoster, setShowPoster] = useState(true);
  const [progress, setProgress] = useState(0);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.muted = false;
      setMuted(false);
      setShowPoster(false);
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  return (
    <section
      id="welcome"
      className="relative section-pad section-divider overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 40% at 0% 0%, rgba(200,168,91,0.10), transparent 60%), radial-gradient(40% 40% at 100% 100%, rgba(14,42,90,0.06), transparent 60%)",
        }}
      />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-7 items-center">
          {/* Copy column */}
          <FadeUp className="lg:col-span-6 lg:order-1 order-2">
            <p className="micro-label">{t.welcome.eyebrow}</p>
            <h2 className="mt-4 font-serif text-display-lg text-ink text-balance">
              {t.welcome.title}
            </h2>
            <p className="mt-5 max-w-md text-[16.5px] leading-[1.65] text-muted text-pretty">
              {t.welcome.body}
            </p>

            <ul className="mt-7 space-y-2.5 text-[14px] text-ink/80 max-w-[34ch]">
              {[
                locale === "fr" ? "Une visite du cabinet" : "A walk through the practice",
                locale === "fr" ? "L'approche, en quelques mots" : "The approach, in a few words",
                locale === "fr" ? "À qui s'adresse ce travail" : "Who this work is for",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <span aria-hidden className="mt-2 h-1 w-1 rounded-full bg-gold/80 shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 inline-flex items-center gap-3 text-[12.5px] text-muted">
              <span className="tabular-nums">{t.welcome.duration}</span>
              <span className="h-1 w-1 rounded-full bg-line" />
              <span>{locale === "fr" ? "Présentation du cabinet" : "Clinic overview"}</span>
            </div>
          </FadeUp>

          {/* Video column — premium framed player */}
          <FadeUp delay={0.1} className="lg:col-span-6 lg:order-2 order-1">
            <div className="relative">
              {/* gold gradient frame glow */}
              <div
                aria-hidden
                className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-gold/30 via-gold/0 to-brand/15 blur-xl opacity-60"
              />
              <div
                aria-hidden
                className="absolute -inset-1 rounded-[22px] bg-gradient-to-br from-gold/30 via-cream/30 to-brand/15"
              />

              {/* video frame */}
              <div className="relative rounded-[18px] overflow-hidden bg-brand-deep shadow-[0_30px_80px_-30px_rgba(11,18,32,0.4),0_8px_24px_-12px_rgba(11,18,32,0.18)] ring-1 ring-white/40">
                {/* aspect frame to keep layout stable */}
                <div className="relative aspect-video bg-brand-deep">
                  <video
                    ref={videoRef}
                    src="/videos/welcome.mp4"
                    poster="/videos/welcome-poster.jpg"
                    playsInline
                    preload="metadata"
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onEnded={() => {
                      setPlaying(false);
                      setShowPoster(true);
                      if (videoRef.current) videoRef.current.currentTime = 0;
                    }}
                    onTimeUpdate={() => {
                      const v = videoRef.current;
                      if (v && v.duration) setProgress((v.currentTime / v.duration) * 100);
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  {/* Poster overlay */}
                  {showPoster && (
                    <div
                      className="absolute inset-0 cursor-pointer group"
                      onClick={togglePlay}
                      role="button"
                      aria-label={t.welcome.cta}
                      data-cursor={t.welcome.cta}
                    >
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-brand-deep/30 to-transparent"
                      />

                      {/* Play button center */}
                      <motion.div
                        animate={reduce ? {} : { scale: [1, 1.05, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-gold text-brand-deep shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-110">
                          <Play className="relative h-7 w-7 fill-brand-deep ml-1" strokeWidth={1.4} />
                        </span>
                      </motion.div>

                      {/* Bottom caption */}
                      <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-4 text-cream">
                        <p className="font-serif text-[18px] lg:text-[22px] leading-snug tracking-[-0.005em] text-balance max-w-[26ch]">
                          {locale === "fr"
                            ? "Le cabinet, ses services et son équipe."
                            : "The clinic, its services and its team."}
                        </p>
                        <span className="hidden sm:inline-block text-[10.5px] tracking-[0.16em] uppercase text-cream/65 shrink-0">
                          {locale === "fr" ? "Cabinet · Aperçu" : "Clinic · Overview"}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Custom controls when playing */}
                  {!showPoster && (
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-brand-deep/85 via-brand-deep/40 to-transparent">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={togglePlay}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold text-brand-deep hover:scale-105 transition-transform"
                          aria-label={playing ? "Pause" : "Play"}
                        >
                          {playing ? (
                            <Pause className="h-3.5 w-3.5 fill-current" strokeWidth={1.4} />
                          ) : (
                            <Play className="h-3.5 w-3.5 fill-current ml-0.5" strokeWidth={1.4} />
                          )}
                        </button>
                        <div className="flex-1 h-1 rounded-full bg-cream/15 overflow-hidden">
                          <div
                            className="h-full bg-gold transition-[width] duration-100 ease-linear"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={toggleMute}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-cream/80 hover:text-cream transition-colors"
                          aria-label={muted ? "Unmute" : "Mute"}
                        >
                          {muted ? (
                            <VolumeX className="h-4 w-4" strokeWidth={1.6} />
                          ) : (
                            <Volume2 className="h-4 w-4" strokeWidth={1.6} />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
