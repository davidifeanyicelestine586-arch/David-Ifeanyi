"use client";

import dynamic from "next/dynamic";
import * as React from "react";

const Globe = dynamic(() => import("./Globe"), { ssr: false });

type Props = {
  style?: React.CSSProperties;
  density?: number;
  spin?: number;
  hoverOn?: boolean;
  onError?: (error: unknown) => void;
};

export default function AccessibleGlobe({
  style,
  density = 10,
  spin = 8,
  hoverOn = true,
  onError,
}: Props) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [motionPreference, setMotionPreference] = React.useState<"reduced" | "full" | null>(null);
  const [isNarrow, setIsNarrow] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [pageVisible, setPageVisible] = React.useState(true);
  const [globeFailed, setGlobeFailed] = React.useState(false);

  React.useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 800px)");
    const update = () => {
      setMotionPreference(motion.matches ? "reduced" : "full");
      setIsNarrow(narrow.matches);
      setPageVisible(!document.hidden);
    };
    update();
    motion.addEventListener("change", update);
    narrow.addEventListener("change", update);

    const onVisibilityChange = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      motion.removeEventListener("change", update);
      narrow.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container || motionPreference === "reduced") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [motionPreference]);

  const renderGlobe = motionPreference === "full" && isVisible && pageVisible && !globeFailed;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minWidth: 120,
        minHeight: 120,
        overflow: "hidden",
        ...style,
      }}
    >
      {motionPreference === "reduced" || globeFailed ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 50%, rgba(216,255,100,.08), transparent 52%), radial-gradient(circle at 50% 50%, transparent 58%, rgba(216,255,100,.18) 59%, transparent 61%)",
          }}
        />
      ) : renderGlobe ? (
        <Globe
          style={{ width: "100%", height: "100%" }}
          density={isNarrow ? Math.min(density, 7) : density}
          spin={isNarrow ? Math.min(spin, 5) : spin}
          hoverOn={isNarrow ? false : hoverOn}
          onError={onError}
        />
      ) : null}
    </div>
  );
}
