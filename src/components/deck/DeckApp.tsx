import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Printer } from "lucide-react";
import { BrandLockup } from "@/components/brand/logos";
import { SLIDES } from "@/components/deck/slides";
import { cn } from "@/lib/cn";

const LAST = SLIDES.length - 1;

function clampIndex(n: number) {
  return Math.max(0, Math.min(LAST, n));
}

export function DeckApp() {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback((n: number) => {
    setIndex(clampIndex(n));
  }, []);

  const prev = useCallback(() => setIndex((i) => clampIndex(i - 1)), []);
  const next = useCallback(() => setIndex((i) => clampIndex(i + 1)), []);

  useEffect(() => {
    const hash = Number(window.location.hash.replace("#", ""));
    if (Number.isFinite(hash) && hash >= 1 && hash <= SLIDES.length) {
      setIndex(hash - 1);
    }
  }, []);

  useEffect(() => {
    const nextHash = `#${index + 1}`;
    if (window.location.hash !== nextHash) {
      history.replaceState(null, "", nextHash);
    }
  }, [index]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        prev();
      } else if (event.key === "Home") {
        event.preventDefault();
        setIndex(0);
      } else if (event.key === "End") {
        event.preventDefault();
        setIndex(LAST);
      } else if (event.key === "f" || event.key === "F") {
        event.preventDefault();
        void toggleFullscreen();
      } else if (event.key === "p" || event.key === "P") {
        if (event.metaKey || event.ctrlKey) return;
        event.preventDefault();
        window.print();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  async function toggleFullscreen() {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    await document.documentElement.requestFullscreen();
  }

  const View = SLIDES[index]?.View;
  const label = SLIDES[index]?.label ?? "";

  return (
    <div className="flex min-h-dvh flex-col bg-stage text-white">
      <div className="live-stage flex flex-1 flex-col items-center justify-center p-2 sm:p-3">
        <div
          ref={stageRef}
          className="stage overflow-hidden rounded-xl shadow-[0_30px_80px_-40px_rgb(0,0,0,0.8)]"
          onTouchStart={(event) => {
            touchX.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchX.current == null) return;
            const dx = (event.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
            touchX.current = null;
            if (dx > 56) prev();
            if (dx < -56) next();
          }}
        >
          {View ? <View /> : null}
        </div>
      </div>

      <nav
        className="no-print flex items-center justify-between gap-3 px-3 py-2 sm:px-5"
        aria-label="Navegação da apresentação"
      >
        <div className="flex min-w-0 items-center gap-3">
          <button type="button" className="chrome-btn" onClick={prev} disabled={index === 0} aria-label="Slide anterior">
            <ChevronLeft className="size-5" />
          </button>
          <BrandLockup size="sm" className="hide-compact shrink-0 text-white" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
          <p className="truncate font-display text-[0.72rem] font-semibold tracking-wide text-white/70">
            {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
            <span className="mx-2 text-white/30">·</span>
            {label}
          </p>
          <div className="flex max-w-full flex-wrap items-center justify-center gap-1">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Ir para ${slide.label}`}
                aria-current={i === index}
                onClick={() => go(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-150",
                  i === index ? "w-6 bg-unitel" : "w-1.5 bg-white/25 hover:bg-white/50",
                )}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button type="button" className="chrome-btn" onClick={() => window.print()} aria-label="Imprimir">
            <Printer className="size-5" />
          </button>
          <button
            type="button"
            className="chrome-btn"
            onClick={() => void toggleFullscreen()}
            aria-label={fullscreen ? "Sair do ecrã inteiro" : "Ecrã inteiro"}
          >
            {fullscreen ? <Minimize2 className="size-5" /> : <Maximize2 className="size-5" />}
          </button>
          <button type="button" className="chrome-btn" onClick={next} disabled={index === LAST} aria-label="Slide seguinte">
            <ChevronRight className="size-5" />
          </button>
        </div>
      </nav>

      <div className="print-only hidden">
        {SLIDES.map((slide) => {
          const Page = slide.View;
          return (
            <div key={slide.id} className="print-page">
              <Page />
            </div>
          );
        })}
      </div>
    </div>
  );
}
