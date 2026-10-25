
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
    <div className="w-full">
      <div
        ref={cardRef}
        className="relative flex aspect-square w-full flex-col justify-between overflow-hidden border border-[#233C60] bg-[#071426] p-[7%] text-[#F0F5FF]"
      >
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[16%] top-1/3 h-[58%] w-[58%] rounded-full bg-[#163C70]/40 blur-[65px] sm:blur-[90px]"
        />

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between gap-3">
          <span className="shrink-0 text-[clamp(14px,4vw,20px)] font-semibold tracking-[-0.07em]">
            BPT<span className="text-[#5B9DFF]">.</span>
          </span>

          <span className="text-right text-[clamp(7px,2vw,10px)] uppercase tracking-[0.15em] text-[#91A8C7] sm:tracking-[0.2em]">
            PSU BEAVER / 2026
          </span>
        </div>

        {/* Score */}
        <div className="relative z-10 min-w-0">
          <p className="mb-[4%] text-[clamp(8px,2vw,10px)] uppercase tracking-[0.2em] text-[#91A8C7] sm:tracking-[0.3em]">
            My Beaver Purity Score.
          </p>

          <div className="text-[clamp(5.5rem,24vw,11rem)] font-semibold leading-none tracking-[-0.1em] text-[#5B9DFF]">
            {score}
          </div>

          <h2 className="mt-[4%] text-[clamp(17px,5vw,30px)] font-medium leading-tight tracking-tight">
            {title}
          </h2>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-end justify-between border-t border-[#233C60] pt-[4%]">
          <span className="text-[clamp(9px,2.4vw,12px)] font-medium text-[#F0F5FF]">
            &quot;be young. be foolish. be happy.&quot;
          </span>
        </div>
      </div>
    </div>
  );
}
