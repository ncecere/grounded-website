import screenshots from "@/lib/screenshots.json";
import slots from "@/lib/slots.json";
import { Image as ImageIcon } from "./icons";

export type SlotName = keyof typeof slots;

type Shot = { src: string; width: number; height: number };
const available = screenshots as Record<string, Shot | undefined>;

type Props = {
  slot: SlotName;
  /** Load eagerly (the hero image); everything else is lazy. */
  priority?: boolean;
  caption?: boolean;
  className?: string;
};

/**
 * A named screenshot slot. When `npm run images` has copied the matching file
 * (public/images/<slot>.webp, listed in lib/screenshots.json), it renders the
 * image with its intrinsic size; otherwise a clearly marked placeholder.
 */
export function Screenshot({ slot, priority = false, caption = true, className = "" }: Props) {
  const meta = slots[slot];
  const shot = available[slot];

  return (
    <figure className={`min-w-0 ${className}`}>
      <div className="overflow-hidden rounded-card border border-brand-border-emphasis bg-brand-surface shadow-brand-3">
        {shot ? (
          <img
            src={shot.src}
            width={shot.width}
            height={shot.height}
            alt={meta.alt}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            className="block h-auto w-full"
          />
        ) : (
          <div
            role="img"
            aria-label={`Screenshot placeholder: ${meta.alt}`}
            data-missing-screenshot={`${slot}.png`}
            className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 bg-[repeating-linear-gradient(135deg,var(--grounded-surface-sunken)_0_12px,var(--grounded-surface)_12px_24px)] p-6 text-center"
          >
            <span className="flex size-10 items-center justify-center rounded-md bg-brand-primary-subtle text-brand-primary-subtle-text">
              <ImageIcon className="size-5" />
            </span>
            <span className="text-sm font-medium text-brand-text">Screenshot coming soon</span>
            <code className="rounded-xs bg-brand-surface px-2 py-0.5 font-mono text-xs text-brand-muted ring-1 ring-brand-border-emphasis">
              {slot}.png
            </code>
          </div>
        )}
      </div>
      {caption ? <figcaption className="mt-3 text-sm text-brand-muted">{meta.caption}</figcaption> : null}
    </figure>
  );
}
