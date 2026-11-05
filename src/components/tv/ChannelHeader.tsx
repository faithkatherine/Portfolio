import type { ReactNode } from 'react';

type ChannelHeaderProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
};

export default function ChannelHeader({ eyebrow, title, children }: ChannelHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-5">
      <div>
        <span className="block text-tv-butter font-tv-mono text-[10px] font-medium tracking-[0.13em] uppercase">
          {eyebrow}
        </span>
        <h2 className="mt-1 font-tv-display text-[clamp(24px,3.2vw,39px)] font-semibold tracking-[-0.045em] leading-[0.98] text-tv-cream drop-shadow-[3px_3px_0_rgba(11,11,16,0.35)]">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
