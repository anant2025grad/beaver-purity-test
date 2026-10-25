
"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { toPng } from "html-to-image";
import ResultCard from "@/components/ResultCard";
import {
  getScoreTitle,
  getScoreDescription,
} from "@/lib/scoring";
import { QUESTION_VERSION } from "@/data/questions";

const RESULT_KEY = `bpt-result-v${QUESTION_VERSION}`;

function subscribeToResult() {
  // The score does not change while this page is displayed.
  return () => {};
}

function getResultSnapshot(): string | null {
  return sessionStorage.getItem(RESULT_KEY);
}

function getServerSnapshot(): null {
  return null;
}

export default function ResultsPage() {
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState("");

  const cardRef = useRef<HTMLDivElement>(null);

    const storedScore = useSyncExternalStore(
    subscribeToResult,
    getResultSnapshot,
    getServerSnapshot
    );

    const parsedScore =
    storedScore !== null ? Number(storedScore) : null;

    const score =
    parsedScore !== null &&
    Number.isInteger(parsedScore) &&
    parsedScore >= 0 &&
    parsedScore <= 100
        ? parsedScore
        : null;

  async function downloadCard() {
    if (!cardRef.current || exporting) return;

    setExporting(true);
    setMessage("");

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#071426",
      });

      const link = document.createElement("a");
      link.download = "beaver-purity-score.png";
      link.href = dataUrl;
      link.click();

      setMessage("Your result card is ready.");
    } catch {
      setMessage("Could not export the card. Please try again.");
    } finally {
      setExporting(false);
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(
        window.location.origin
      );
      setMessage("Test link copied to clipboard.");
    } catch {
      setMessage("Unable to copy the link.");
    }
  }


  if (score === null) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#071426] px-6 text-center text-[#F0F5FF]">
        <h1 className="text-3xl font-semibold">
          no result found.
        </h1>
        <p className="text-sm text-[#91A8C7]">
          complete the Beaver Purity Test to see your score.
        </p>
        <Link
          href="/"
          className="bg-[#F0F5FF] px-8 py-4 text-xs font-semibold uppercase tracking-widest text-[#071426]"
        >
          take the test ↗
        </Link>
      </main>
    );
  }

  const title = getScoreTitle(score);
  const description = getScoreDescription(score);

  return (
    <main className="custom-cursor-area min-h-screen bg-[#071426] text-[#F0F5FF]">
      <div className="mx-auto max-w-5xl px-6 py-8 md:px-12">
        <header className="flex items-center justify-between border-b border-[#233C60] pb-6">
          <Link
            href="/"
            className="text-xl font-semibold tracking-[-0.07em]"
          >
            BPT<span className="text-[#5B9DFF]">.</span>
          </Link>

          <span className="text-[10px] uppercase tracking-[0.2em] text-[#91A8C7]">
            your Results
          </span>
        </header>

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="flex flex-col items-center py-16 md:py-24"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#5B9DFF]">
            the verdict is in.
          </p>

          <h1 className="mb-5 text-center text-4xl font-semibold tracking-[-0.06em] md:text-6xl">
            how pure are you<span className="text-[#5B9DFF]">?</span>
          </h1>

          <p className="mb-12 max-w-md text-center text-sm leading-7 text-[#91A8C7]">
            {description}
          </p>

          <div className="w-full max-w-[500px]">
            <ResultCard
              cardRef={cardRef}
              score={score}
              title={title}
            />
          </div>

          <p className="mt-8 text-center text-xs text-[#91A8C7]">
            your score is yours to share.
            individual answers are never included.
          </p>

          <div className="mt-10 flex w-full max-w-[500px] flex-col gap-3 sm:flex-row">
            <button
              onClick={downloadCard}
              disabled={exporting}
              className="flex-1 bg-[#F0F5FF] px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#071426] transition-colors hover:bg-[#5B9DFF] disabled:opacity-50"
            >
              {exporting ? "Exporting..." : "Save Result Card ↗"}
            </button>

            <button
              onClick={copyLink}
              className="flex-1 border border-[#456180] px-6 py-4 text-xs font-medium uppercase tracking-[0.12em] transition-colors hover:border-[#5B9DFF]"
            >
              Copy Test Link
            </button>
          </div>

          {message && (
            <p role="status" className="mt-5 text-sm text-[#91A8C7]">
              {message}
            </p>
          )}

          <Link
            href="/"
            className="mt-10 text-xs uppercase tracking-[0.15em] text-[#91A8C7] underline underline-offset-8 transition-colors hover:text-[#F0F5FF]"
          >
            Return to questionnaire
          </Link>
        </motion.section>

        <footer className="border-t border-[#233C60] py-8 text-center text-[10px] uppercase tracking-[0.15em] text-[#6684A8]">
          Beaver Purity Test · Unofficial Student Project
        </footer>
      </div>
    </main>
  );
}
