import { useEffect, useRef } from "react";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";

export default function FogBackground() {
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

        highlightColor: 0xebfc4f, // أصفر لايم فاتح شويه
        midtoneColor: 0xd9fc23, // اللون الأساسي بتاعك
        lowlightColor: 0xa9c933, // لايم متوسط، مش غامق أوي
        baseColor: 0xf7ffeb,

        blurFactor: 0.4, // ضبابية تفتح المشهد
        zoom: 0.9,
        speed: 1, //
      });
    }

    return () => {
      vantaEffect.current?.destroy();
      vantaEffect.current = null;
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 z-0"
    />
  );
}
