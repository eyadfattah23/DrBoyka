import { useEffect, useRef } from "react";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";

const toHexNumber = (color) => {
  if (typeof color === "number") return color;
  if (typeof color === "string") {
    return parseInt(color.replace("#", ""), 16);
  }
  return color;
};

export default function FogBackground({
  fixed = false,
  className = "",

  highlightColor = "#ebfc4f",
  midtoneColor = "#d9fc23",
  lowlightColor = "#a9c933",
  baseColor = "#f7ffeb",
}) {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = FOG({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,

        highlightColor: toHexNumber(highlightColor),
        midtoneColor: toHexNumber(midtoneColor),
        lowlightColor: toHexNumber(lowlightColor),
        baseColor: toHexNumber(baseColor),

        blurFactor: 0.4,
        zoom: 0.9,
        speed: 1,
      });
    }

    const resize = () => vantaEffect.current?.resize();
    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      vantaEffect.current?.destroy();
      vantaEffect.current = null;
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className={`
        ${fixed ? "fixed inset-0" : "absolute inset-0"}
        ${className} 
      `}
    />
  );
}
