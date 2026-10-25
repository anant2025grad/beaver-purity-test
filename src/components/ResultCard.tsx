
import type { Ref } from "react";

type ResultCardProps = {
  score: number;
  title: string;
  cardRef?: Ref<HTMLDivElement>;
};

export default function ResultCard({
  score,
  title,
  cardRef,
}: ResultCardProps) {
  return (
    <div
      ref={cardRef}
      className="relative flex aspect-square w-full max-w-[500px] flex-col justify-between overflow-hidden border border-[#233C60] bg-[#071426] p-8 text-[#F0F5FF] sm:p-12"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-[#163C70]/40 blur-[90px]"
      />

      <div className="relative z-10 flex items-start justify-between">
        <span className="text-xl font-semibold tracking-[-0.07em]">
          BPT<span className="text-[#5B9DFF]">.</span>
        </span>

        <span className="text-[10px] uppercase tracking-[0.2em] text-[#91A8C7]">
          PSU BEAVER / 2026
        </span>
      </div>

      <div className="relative z-10">
        <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[#91A8C7]">
          My Beaver Purity Score.
        </p>

        <div className="text-[clamp(6rem,23vw,11rem)] font-semibold leading-none tracking-[-0.1em] text-[#5B9DFF]">
          {score}
        </div>

        <h2 className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">
          {title}
        </h2>
      </div>

      <div className="relative z-10 flex items-end justify-between border-t border-[#233C60] pt-5">


        <span className="text-xs font-medium text-[#F0F5FF]">
          some beavers aren&apos;t as innocent as others.
        </span>
      </div>
    </div>
  );
}
