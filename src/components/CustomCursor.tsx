
"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = {
    damping: 25,
    stiffness: 180,
    mass: 0.5,
  };

  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const pointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateEnabled = () => {
      setEnabled(
        pointerQuery.matches && !reducedMotion.matches
      );
    };

    updateEnabled();

    pointerQuery.addEventListener("change", updateEnabled);
    reducedMotion.addEventListener("change", updateEnabled);

    return () => {
      pointerQuery.removeEventListener("change", updateEnabled);
      reducedMotion.removeEventListener(
        "change",
        updateEnabled
      );
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const moveCursor = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);

      const target = event.target;

      setHovering(
        target instanceof Element &&
          Boolean(
            target.closest(
              "a, button, input, label, [data-cursor-hover]"
            )
          )
      );
    };

    const hideCursor = () => setVisible(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", hideCursor);
    window.addEventListener("blur", hideCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener(
        "mouseleave",
        hideCursor
      );
      window.removeEventListener("blur", hideCursor);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[#EAF3FF]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: visible ? 1 : 0 }}
      />

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-[#91B9F5]/60"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 54 : 30,
          height: hovering ? 54 : 30,
          opacity: visible ? 1 : 0,
          backgroundColor: hovering
            ? "rgba(91,157,255,0.10)"
            : "rgba(91,157,255,0)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
