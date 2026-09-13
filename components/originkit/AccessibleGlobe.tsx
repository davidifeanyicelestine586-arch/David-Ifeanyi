"use client";

import * as React from "react";
import Globe from "./Globe";

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
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (reducedMotion) {
    return (
      <Globe
        style={style}
        density={density}
        spin={0}
        hoverOn={false}
        dots={{ size: 8, wobble: 0, flicker: 0 }}
        shimmer={{ color: "#D8CCFF", speed: 0, style: "sweep", angle: 90, width: 7 }}
        waves={{ color: "#6FA8FF", color2: "#FF5E8F", size: 9, glow: 11, speed: 0 }}
      />
    );
  }

  return <Globe style={style} density={density} spin={spin} hoverOn={hoverOn} />;
}
