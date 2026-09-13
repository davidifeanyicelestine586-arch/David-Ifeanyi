"use client";

import dynamic from "next/dynamic";
import * as React from "react";

const Globe = dynamic(() => import("./Globe"), { ssr: false });

type Props = {
  style?: React.CSSProperties;
  density?: number;
  spin?: number;
  hoverOn?: boolean;
};

export default function AccessibleGlobe({
  style,
  density = 10,
  spin = 8,
  hoverOn = true,
}: Props) {
  const [motionPreference, setMotionPreference] = React.useState<"reduced" | "full" | null>(null);
  const [isNarrow, setIsNarrow] = React.useState(false);

  React.useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 800px)");
    const update = () => {
      setMotionPreference(motion.matches ? "reduced" : "full");
      setIsNarrow(narrow.matches);
    };
    update();
    motion.addEventListener("change", update);
    narrow.addEventListener("change", update);
    return () => {
      motion.removeEventListener("change", update);
      narrow.removeEventListener("change", update);
    };
  }, []);

  if (motionPreference === null) {
    return <div aria-hidden="true" style={style} />;
  }

  if (motionPreference === "reduced") {
    return (
      <div
        aria-hidden="true"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minWidth: 120,
          minHeight: 120,
          overflow: "hidden",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(216,255,100,.08), transparent 52%), radial-gradient(circle at 50% 50%, transparent 58%, rgba(216,255,100,.18) 59%, transparent 61%)",
          ...style,
        }}
      />
    );
  }

  return (
    <Globe
      style={style}
      density={isNarrow ? Math.min(density, 7) : density}
      spin={isNarrow ? Math.min(spin, 5) : spin}
      hoverOn={isNarrow ? false : hoverOn}
    />
  );
}
