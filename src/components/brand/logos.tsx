import { cn } from "@/lib/cn";

export function UnitelGlyph({
  className,
  alt = "UNITEL",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src="/unitel.png"
      alt={alt}
      className={cn(
        "inline-block h-[1.15em] w-[1.15em] shrink-0 rounded-full object-contain select-none align-middle shadow-xs",
        className,
      )}
      loading="eager"
      decoding="async"
    />
  );
}

// Backward-compatible alias
export const SignalGlyph = UnitelGlyph;

export function CeuGlyph({
  className,
  alt = "CEU",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src="/ceu-icon-logo.svg"
      alt={alt}
      className={cn(
        "inline-block h-[1.12em] w-[1.28em] shrink-0 object-contain select-none align-middle",
        className,
      )}
      loading="eager"
      decoding="async"
    />
  );
}

export function UnitelMark({
  className,
  wordmarkClassName,
  iconClassName,
  showWordmark = true,
}: {
  className?: string;
  wordmarkClassName?: string;
  iconClassName?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-[0.34em] leading-none align-middle", className)}>
      <UnitelGlyph className={iconClassName} />
      {showWordmark && (
        <span
          className={cn(
            "font-display font-black lowercase tracking-tight",
            wordmarkClassName,
          )}
        >
          unitel
        </span>
      )}
    </span>
  );
}

export function CeuMark({
  className,
  wordmarkClassName,
  iconClassName,
  showWordmark = true,
}: {
  className?: string;
  wordmarkClassName?: string;
  iconClassName?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-[0.36em] leading-none align-middle", className)}>
      <CeuGlyph className={iconClassName} />
      {showWordmark && (
        <span
          className={cn(
            "font-display font-extrabold tracking-[0.14em]",
            wordmarkClassName,
          )}
        >
          CEU
        </span>
      )}
    </span>
  );
}

export function BrandLockup({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const type =
    size === "lg"
      ? "text-[clamp(1.6rem,5.4cqi,3.4rem)]"
      : size === "sm"
        ? "text-[clamp(0.78rem,1.6cqi,1rem)]"
        : "text-[clamp(0.95rem,2.1cqi,1.25rem)]";

  return (
    <div className={cn("inline-flex items-center gap-[0.55em] leading-none", type, className)}>
      <UnitelMark />
      <span className="translate-y-px text-[0.7em] font-semibold opacity-50">×</span>
      <CeuMark />
    </div>
  );
}

export function CoverBadge() {
  return (
    <div className="relative mx-auto w-[min(86%,40rem)]">
      <div className="rounded-[2.15rem] bg-white px-[8%] py-[8.5%] text-center shadow-[0_28px_70px_-28px_rgb(80,20,0,0.5)]">
        <p className="font-display text-[clamp(0.68rem,1.45cqi,0.88rem)] font-bold uppercase tracking-[0.32em] text-ink-soft">
          Parceria estratégica
        </p>
        <div className="mt-[0.6em] flex items-center justify-center text-[clamp(2.2rem,7.2cqi,4.4rem)] text-unitel">
          <UnitelMark />
        </div>
        <div className="mx-auto mt-[0.75em] flex items-center justify-center gap-3 text-ink">
          <span className="h-px w-8 bg-line" />
          <CeuMark className="text-[clamp(1.1rem,3.2cqi,1.8rem)]" />
          <span className="h-px w-8 bg-line" />
        </div>
      </div>
    </div>
  );
}

