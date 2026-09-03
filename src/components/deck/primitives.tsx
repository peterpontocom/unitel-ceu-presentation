import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { BrandLockup, CeuMark, UnitelMark } from "@/components/brand/logos";
import { cn } from "@/lib/cn";

export function Slide({
  theme,
  children,
  className,
  flush = false,
}: {
  theme: "orange" | "blue" | "paper";
  children: ReactNode;
  className?: string;
  flush?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative flex h-full min-h-[inherit] w-full flex-col overflow-hidden",
        theme === "orange" && "bg-unitel text-white",
        theme === "blue" && "bg-ceu text-white",
        theme === "paper" && "bg-paper text-ink",
        className,
      )}
    >
      {(theme === "orange" || theme === "blue") && <div className="dot-field" />}
      <div
        className={cn(
          "relative z-10 flex h-full min-h-[inherit] flex-1 flex-col",
          !flush && "slide-enter pad-slide",
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function Pill({
  children,
  inverted = false,
  tone = "auto",
}: {
  children: ReactNode;
  inverted?: boolean;
  tone?: "auto" | "orange" | "blue";
}) {
  const color =
    tone === "orange"
      ? "text-unitel"
      : tone === "blue"
        ? "text-ceu"
        : inverted
          ? "text-white"
          : "text-ink";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-[0.95em] py-[0.42em] text-kicker",
        inverted ? "bg-white/16 text-white" : "bg-white text-ink shadow-sm",
        !inverted && color,
      )}
    >
      {children}
    </span>
  );
}

export function SlideHeader({
  pill,
  mark = "lockup",
  inverted = false,
}: {
  pill?: string;
  mark?: "unitel" | "ceu" | "lockup" | "none";
  inverted?: boolean;
}) {
  return (
    <div className="mb-[clamp(0.7rem,2.1cqi,1.4rem)] flex items-center justify-between gap-4">
      {pill ? (
        <Pill
          inverted={inverted}
          tone={mark === "ceu" ? "blue" : mark === "unitel" ? "orange" : "auto"}
        >
          {pill}
        </Pill>
      ) : (
        <span />
      )}
      {mark === "unitel" && (
        <UnitelMark className={cn("text-[clamp(1rem,2.2cqi,1.35rem)]", inverted ? "text-white" : "text-unitel")} />
      )}
      {mark === "ceu" && (
        <CeuMark className={cn("text-[clamp(0.95rem,2cqi,1.25rem)]", inverted ? "text-white" : "text-ink")} />
      )}
      {mark === "lockup" && (
        <BrandLockup size="sm" className={cn(inverted ? "text-white" : "text-ink")} />
      )}
    </div>
  );
}

export function Title({
  children,
  className,
  light = false,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <h1 className={cn("text-display", light ? "text-white" : "text-ink", className)}>{children}</h1>
  );
}

export function Lead({
  children,
  className,
  light = false,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <p
      className={cn(
        "mt-[0.55em] max-w-[46rem] text-lead",
        light ? "text-white/88" : "text-ink-soft",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function IconOrb({
  icon: Icon,
  accent = "orange",
  size = "md",
}: {
  icon: LucideIcon;
  accent?: "orange" | "blue" | "white";
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-orb text-white",
        size === "sm" ? "size-10" : "size-[clamp(2.5rem,4.2cqi,3.05rem)]",
        accent === "orange" && "bg-unitel",
        accent === "blue" && "bg-ceu",
        accent === "white" && "bg-white/16 text-white",
      )}
    >
      <Icon
        className={size === "sm" ? "size-5" : "size-[clamp(1.1rem,1.8cqi,1.35rem)]"}
        strokeWidth={2.1}
      />
    </span>
  );
}

export function FeatureCard({
  n,
  icon,
  title,
  body,
  tag,
  featured = false,
  accent = "orange",
}: {
  n?: string;
  icon: LucideIcon;
  title: string;
  body: string;
  tag?: string;
  featured?: boolean;
  accent?: "orange" | "blue";
}) {
  const onFill = featured;
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-card p-[clamp(0.9rem,2cqi,1.4rem)]",
        onFill
          ? accent === "blue"
            ? "bg-ceu text-white"
            : "bg-unitel text-white"
          : "bg-white text-ink shadow-[var(--shadow-border)]",
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <IconOrb icon={icon} accent={onFill ? "white" : accent} />
        {n ? (
          <span
            className={cn(
              "font-display text-[clamp(0.82rem,1.4cqi,0.98rem)] font-extrabold",
              onFill ? "text-white/55" : "text-muted",
            )}
          >
            {n}
          </span>
        ) : null}
      </div>
      <h3 className={cn("text-card-title", onFill ? "text-white" : "text-ink")}>{title}</h3>
      <p className={cn("mt-1.5 text-card-body", onFill ? "text-white/88" : "text-ink-soft")}>{body}</p>
      {tag ? (
        <span
          className={cn(
            "mt-auto inline-flex w-fit rounded-full px-2.5 py-1 pt-3 font-display text-[0.68rem] font-bold",
            onFill
              ? "bg-white/16 text-white"
              : accent === "blue"
                ? "bg-paper text-ceu"
                : "bg-cream text-unitel",
          )}
        >
          {tag}
        </span>
      ) : null}
    </article>
  );
}

export function Torn({ tone }: { tone: "orange" | "blue" }) {
  return (
    <svg
      className={cn("torn-edge hidden md:block", tone === "orange" ? "text-unitel" : "text-ceu")}
      viewBox="0 0 42 1080"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M0 0 H28 C18 48 38 86 22 128 C8 168 34 210 18 258 C4 304 36 348 20 402 C6 452 32 500 16 552 C2 604 34 650 18 704 C6 752 30 804 14 858 C4 910 28 962 16 1010 C8 1042 22 1064 12 1080 H0 Z"
      />
    </svg>
  );
}

export function StepFlow({
  steps,
  accent = "orange",
}: {
  steps: { icon: LucideIcon; label: string; sub?: string }[];
  accent?: "orange" | "blue";
}) {
  return (
    <ol className="mt-auto grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-3">
      {steps.map((step, i) => (
        <li key={step.label} className="relative flex flex-col items-center text-center">
          {i < steps.length - 1 && (
            <span
              className={cn(
                "absolute top-[1.55rem] left-[62%] hidden h-px w-[76%] md:block",
                accent === "blue" ? "bg-ceu/25" : "bg-unitel/25",
              )}
            />
          )}
          <span
            className={cn(
              "relative z-10 mb-3 inline-flex size-[3.15rem] items-center justify-center rounded-full text-white",
              accent === "blue" ? "bg-ceu" : "bg-unitel",
            )}
          >
            <step.icon className="size-5" strokeWidth={2.1} />
            <span className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full bg-white font-display text-[0.62rem] font-extrabold text-ink shadow-sm">
              {i + 1}
            </span>
          </span>
          <p className="font-display text-[clamp(0.76rem,1.22cqi,0.94rem)] font-bold leading-snug text-ink">
            {step.label}
          </p>
          {step.sub ? (
            <p className="mt-1 text-[clamp(0.66rem,1.02cqi,0.76rem)] leading-snug text-muted">
              {step.sub}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function ListRow({
  icon: Icon,
  children,
  accent = "orange",
}: {
  icon: LucideIcon;
  children: ReactNode;
  accent?: "orange" | "blue";
}) {
  return (
    <li className="flex items-center gap-3.5 border-b border-line py-[0.78em] last:border-b-0">
      <span
        className={cn(
          "inline-flex size-10 shrink-0 items-center justify-center rounded-xl",
          accent === "blue" ? "bg-ceu/10 text-ceu" : "bg-cream text-unitel",
        )}
      >
        <Icon className="size-5" strokeWidth={2.1} />
      </span>
      <span className="font-display text-[clamp(0.86rem,1.45cqi,1.02rem)] font-semibold leading-snug text-ink">
        {children}
      </span>
    </li>
  );
}

export function SplitShell({
  tone,
  visual,
  children,
}: {
  tone: "orange" | "blue";
  visual: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="relative grid h-full min-h-[inherit] w-full overflow-hidden bg-white md:grid-cols-[0.42fr_0.58fr]">
      <div
        className={cn(
          "relative min-h-52 overflow-hidden text-white md:min-h-0",
          tone === "orange" ? "bg-unitel" : "bg-ceu",
        )}
      >
        <div className="dot-field" />
        {visual}
        <Torn tone={tone} />
      </div>
      <div className="slide-enter relative z-10 flex min-h-0 flex-col bg-white pad-slide text-ink">
        {children}
      </div>
    </section>
  );
}
