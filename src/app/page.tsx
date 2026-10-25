
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  sections,
  questions,
  QUESTION_VERSION,
} from "@/data/questions";

const STORAGE_KEY = `bpt-answers-v${QUESTION_VERSION}`;

function getScoreTitle(score: number): string {
  if (score >= 90) return "The Freshman";
  if (score >= 75) return "The Model Beaver";
  if (score >= 60) return "The Campus Regular";
  if (score >= 40) return "The Harmony Hall Veteran";
  if (score >= 20) return "The Campus Menace";
  return "The Beaver Legend";
}

export default function TestPage() {
  const [selected, setSelected] = useState<number[]>([]);
  const [ready, setReady] = useState(false);
  const [finished, setFinished] = useState(false);

  // Restore locally saved answers.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed: unknown = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          const valid = parsed.filter(
            (id): id is number =>
              typeof id === "number" &&
              Number.isInteger(id) &&
              id >= 1 &&
              id <= questions.length
          );

          setSelected([...new Set(valid)]);
        }
      }
    } catch {
      // Ignore corrupted local storage.
    }

    setReady(true);
  }, []);

  // Automatically save selections locally.
  useEffect(() => {
    if (!ready) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(selected)
      );
    } catch {
      // The questionnaire works without local storage.
    }
  }, [selected, ready]);

  function toggleQuestion(id: number) {
    setSelected((previous) =>
      previous.includes(id)
        ? previous.filter((value) => value !== id)
        : [...previous, id]
    );
  }

  function calculateScore() {
    setFinished(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restartTest() {
    setSelected([]);
    setFinished(false);
    localStorage.removeItem(STORAGE_KEY);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const score = 100 - selected.length;
  const checkedCount = selected.length;

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#071426] text-[#91A8C7]">
        Loading...
      </main>
    );
  }

  return (
    <main className="custom-cursor-area min-h-screen bg-[#071426] text-[#F0F5FF]">
      <div className="mx-auto max-w-4xl px-6 py-8 md:px-12">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#233C60] pb-6">
          <Link
            href="/"
            className="text-xl font-semibold tracking-[-0.07em]"
          >
            BPT<span className="text-[#5B9DFF]">.</span>
          </Link>

          <span className="text-[10px] uppercase tracking-[0.15em] text-[#91A8C7]">
            {finished
              ? "Your Results"
              : "NOT AFFILIATED WITH PENN STATE OR ANY OF IT'S SUBSIDIARIES"}
          </span>
        </header>

        {finished ? (
          /* Results Screen */
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[75vh] flex-col items-center justify-center py-20 text-center"
          >
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[#91A8C7]">
              Your Beaver Purity Score
            </p>

            <h1 className="text-[clamp(7rem,25vw,13rem)] font-semibold leading-none tracking-[-0.1em] text-[#5B9DFF]">
              {score}
            </h1>

            <h2 className="mt-6 text-2xl font-medium tracking-tight md:text-4xl">
              {getScoreTitle(score)}
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#91A8C7]">
              You checked {checkedCount} out of 100
              experiences. The lower your score, the more
              you've experienced.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <button
                onClick={async () => {
                  const message =
                    `I scored ${score}/100 on the Beaver Purity Test. ` +
                    `What's your score?`;

                  try {
                    if (navigator.share) {
                      await navigator.share({
                        title: "Beaver Purity Test",
                        text: message,
                        url: window.location.origin,
                      });
                    } else {
                      await navigator.clipboard.writeText(
                        `${message} ${window.location.origin}`
                      );
                    }
                  } catch {
                    // Sharing was canceled or unavailable.
                  }
                }}
                className="bg-[#F0F5FF] px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#071426] transition-colors hover:bg-[#5B9DFF]"
              >
                Share Score ↗
              </button>

              <button
                onClick={restartTest}
                className="border border-[#233C60] px-8 py-4 text-xs uppercase tracking-[0.15em] transition-colors hover:border-[#5B9DFF]"
              >
                Restart Test
              </button>
            </div>

            <p className="mt-10 text-xs text-[#91A8C7]">
              Your individual answers are stored only
              in this browser.
            </p>
          </motion.section>
        ) : (
          <>
            {/* Introduction */}
            <section className="pb-14 pt-16">

              <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.07em] md:text-7xl">
                the beaver
                <br />
                purity test<span className="text-[#5B9DFF]">.</span>
              </h1>

              <p className="mt-8 max-w-xl text-sm leading-7 text-[#91A8C7] md:text-base">
                you know what this is.
              </p>

              <p className="mt-4 text-xs text-[#6684A8]">
                your individual answers remain in your browser.
                no personal information is stored.

              </p>
            </section>

            {/* Question Sections */}
            {sections.map((section, sectionIndex) => (
              <section
                key={section.id}
                className="mb-16"
              >
                <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-[#5B9DFF]/50 pb-5">
                  <div>
                    <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#5B9DFF]">
                      section {String(sectionIndex + 1).padStart(2, "0")}
                    </p>

                    <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
                      {section.title}
                    </h2>

                    <p className="mt-2 text-xs text-[#91A8C7]">
                      {section.subtitle}
                    </p>
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#6684A8]">
                    {section.questions.length} Questions
                  </span>
                </div>

                <div>
                  {section.questions.map((question) => {
                    const checked = selected.includes(question.id);

                    return (
                      <label
                        key={question.id}
                        className="group flex cursor-pointer items-center gap-5 border-b border-[#233C60]/70 py-5 transition-colors hover:bg-[#102541]/50"
                      >
                        <span className="w-7 shrink-0 text-xs tabular-nums text-[#6684A8]">
                          {String(question.id).padStart(2, "0")}
                        </span>

                        <span className="flex-1 text-sm leading-6 text-[#E8F0FC] md:text-base">
                          {question.text}
                        </span>

                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleQuestion(question.id)}
                          className="sr-only"
                        />

                        <span
                          aria-hidden="true"
                          className={`flex h-6 w-6 shrink-0 items-center justify-center border transition-all duration-200 group-focus-within:ring-2 group-focus-within:ring-[#5B9DFF] group-focus-within:ring-offset-2 group-focus-within:ring-offset-[#071426] ${
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

            {/* Submit Area */}
            <section className="border-t border-[#233C60] py-14">
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#91A8C7]">
                    Experiences Checked
                  </p>
                  <p className="text-4xl font-semibold tracking-tight">
                    {checkedCount}
                    <span className="text-lg text-[#6684A8]">
                      {" "}/ 100
                    </span>
                  </p>
                </div>

                <p className="text-xs text-[#91A8C7]">
                  {checkedCount}% selected
                </p>
              </div>

              <div className="mb-10 h-[3px] overflow-hidden bg-[#233C60]">
                <motion.div
                  className="h-full bg-[#5B9DFF]"
                  animate={{ width: `${checkedCount}%` }}
                  transition={{ duration: 0.25 }}
                />
              </div>

              <button
                onClick={calculateScore}
                className="group flex w-full items-center justify-between bg-[#F0F5FF] px-7 py-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#071426] transition-colors hover:bg-[#5B9DFF]"
              >
                Calculate My Purity Score
                <span className="text-lg transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </button>

              <p className="mt-5 text-center text-xs text-[#6684A8]">
                There are no right or wrong answers.
              </p>
            </section>
          </>
        )}

        {/* Footer */}
        <footer className="border-t border-[#233C60] py-8 text-center text-[10px]  tracking-[0.15em] text-[#6684A8]">
          beaver purity test · unofficial student project created out of boredom
        </footer>
      </div>
    </main>
  );
}
