
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { trackEvent } from "@/lib/analytics";
import {
  sections,
  QUESTION_VERSION,
} from "@/data/questions";

import { calculatePurityScore } from "@/lib/scoring";

export default function TestPage() {
  const router = useRouter();

  const [selected, setSelected] = useState<number[]>([]);

  const checkedCount = selected.length;
  const totalQuestions = sections.reduce(
    (total, section) => total + section.questions.length,
    0
  );

  const progress = (checkedCount / totalQuestions) * 100;

  // Select or deselect a question.
  function toggleQuestion(id: number) {
    setSelected((previous) =>
      previous.includes(id)
        ? previous.filter((value) => value !== id)
        : [...previous, id]
    );
  }

  // Calculate the final score and navigate to results.
    function calculateScore() {
    const finalScore = calculatePurityScore(checkedCount);

    sessionStorage.setItem(
        `bpt-result-v${QUESTION_VERSION}`,
        String(finalScore)
    );

    trackEvent("test_completed");

    router.push("/results");
    }

  // Clear all selected questions.
  function clearSelections() {
    setSelected([]);
  }

  return (
    <main className="custom-cursor-area min-h-screen bg-[#071426] text-[#F0F5FF]">
      <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6 sm:py-8 md:px-12">

        {/* HEADER */}
        <header className="flex items-center justify-between border-b border-[#233C60] pb-6">
          <Link
            href="/"
            className="text-xl font-semibold tracking-[-0.07em]"
          >
            BPT<span className="text-[#5B9DFF]">.</span>
          </Link>

          <span className="text-[10px] tracking-[0.15em] text-[#91A8C7]">
            not affiliated with penn state or any of its subsidiaries.
          </span>
        </header>

        {/* INTRODUCTION */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pb-14 pt-16"
        >
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-[#5B9DFF]">
            some beavers are less innocent than others.
          </p>

          <h1 className="text-[clamp(2.5rem,10vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.065em] md:text-7xl">
            the beaver
            <br />
            purity test.
            <span className="text-[#5B9DFF]">.</span>
          </h1>

          <p className="mt-8 max-w-xl text-sm leading-7 text-[#91A8C7] md:text-base">
            100 questions about life at Penn State Beaver.
            Check every experience you&apos;ve had, leave
            the rest unchecked, and discover how innocent
            you really are.
          </p>

          <p className="mt-4 text-xs text-[#6684A8]">
            no account required. your individual answers
            are not sent to our servers. completely anonymous.
          </p>
        </motion.section>

        {/* INSTRUCTIONS */}
        <div className="mb-16 flex items-start gap-4 border-l-2 border-[#5B9DFF] bg-[#102541]/40 px-6 py-5">
          <span className="text-[#5B9DFF]">↗</span>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em]">
              How It Works
            </p>

            <p className="text-sm leading-7 text-[#91A8C7]">
              come on. you know how this works.
            </p>
          </div>
        </div>

        {/* ALL 100 QUESTIONS */}
        {sections.map((section, sectionIndex) => (
          <section
            key={section.id}
            className="mb-16"
          >
            {/* SECTION HEADER */}
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-[#5B9DFF]/50 pb-5">
              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#5B9DFF]">
                  Section{" "}
                  {String(sectionIndex + 1).padStart(2, "0")}
                </p>

                <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
                  {section.title}
                  <span className="text-[#5B9DFF]">.</span>
                </h2>

                <p className="mt-2 text-xs text-[#91A8C7]">
                  {section.subtitle}
                </p>
              </div>

              <span className="text-[10px] uppercase tracking-[0.15em] text-[#6684A8]">
                {section.questions.length} Questions
              </span>
            </div>

            {/* QUESTIONS */}
            <div>
              {section.questions.map((question) => {
                const checked = selected.includes(question.id);

                return (
                  <label
                    key={question.id}
                    className="group flex min-h-[64px] cursor-pointer items-center gap-3 border-b border-[#233C60]/70 py-4 transition-colors active:bg-[#102541]/70 sm:gap-5 sm:py-5 sm:hover:bg-[#102541]/50"
                  >
                    {/* QUESTION NUMBER */}
                    <span className="w-7 shrink-0 text-xs tabular-nums text-[#6684A8]">
                      {String(question.id).padStart(2, "0")}
                    </span>

                    {/* QUESTION TEXT */}
                    <span
                      className={`flex-1 text-sm leading-6 transition-colors md:text-base ${
                        checked
                          ? "text-[#91A8C7]"
                          : "text-[#E8F0FC]"
                      }`}
                    >
                      {question.text}
                    </span>

                    {/* CHECKBOX */}
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        toggleQuestion(question.id)
                      }
                      className="sr-only"
                    />

                    <span
                      aria-hidden="true"
                      className={`flex h-7 w-7 shrink-0 items-center justify-center border transition-all duration-200 sm:h-6 sm:w-6 group-focus-within:ring-2 group-focus-within:ring-[#5B9DFF] group-focus-within:ring-offset-2 group-focus-within:ring-offset-[#071426] ${
                        checked
                          ? "border-[#5B9DFF] bg-[#5B9DFF] text-[#071426]"
                          : "border-[#456180] bg-transparent"
                      }`}
                    >
                      {checked && (
                        <span className="text-sm font-bold">
                          ✓
                        </span>
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
          </section>
        ))}

        {/* SCORE SUBMISSION */}
        <section className="border-t border-[#233C60] py-14">

          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#91A8C7]">
                Experiences Checked
              </p>

              <p className="text-4xl font-semibold tracking-tight">
                {checkedCount}
                <span className="text-lg text-[#6684A8]">
                  {" "}/ {totalQuestions}
                </span>
              </p>
            </div>

            <p className="text-xs text-[#91A8C7]">
              {Math.round(progress)}% selected
            </p>
          </div>

          {/* PROGRESS BAR */}
          <div className="mb-10 h-[3px] overflow-hidden bg-[#233C60]">
            <motion.div
              className="h-full bg-[#5B9DFF]"
              animate={{ width: `${progress}%` }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
            />
          </div>

          {/* CALCULATE BUTTON */}
          <button
            onClick={calculateScore}
            className="group flex min-h-[60px] w-full items-center justify-between gap-4 bg-[#F0F5FF] px-5 py-5 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#071426] transition-colors active:bg-[#5B9DFF] sm:px-7 sm:py-6 sm:tracking-[0.15em] sm:hover:bg-[#5B9DFF]"
          >
            Calculate My Purity Score

            <span className="text-lg transition-transform group-hover:translate-x-1">
              ↗
            </span>
          </button>

          {/* RESET BUTTON */}
          <button
            onClick={clearSelections}
            disabled={checkedCount === 0}
            className="mt-6 w-full text-center text-xs uppercase tracking-[0.15em] text-[#6684A8] transition-colors hover:text-[#F0F5FF] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear All Selections
          </button>

          <p className="mt-8 text-center text-xs text-[#6684A8]">
            There are no right or wrong answers.
          </p>
        </section>
        <p className="mb-6 text-center text-[11px] leading-6 text-[#6684A8]">
            We collect anonymous website engagement statistics,
            such as visits and completed tests.
            Your individual answers and purity score are never
            sent to our analytics services.
        </p>

        {/* FOOTER */}
        <footer className="border-t border-[#233C60] py-8 text-center text-[10px] uppercase tracking-[0.15em] text-[#6684A8]">
          Beaver Purity Test · Unofficial Student Project
        </footer>

      </div>
    </main>
  );
}
