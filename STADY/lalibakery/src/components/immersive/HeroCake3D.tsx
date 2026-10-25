"use client";

/**
 * Hero Path C1 — procedural 3-tier cake (MeshBasic) + real poster LCP.
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, Html, useProgress } from "@react-three/drei";
import {
  Suspense,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import Image from "next/image";

export type HeroCakeHandle = {
  setZoom: (t: number) => void;
};

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="rounded-full border border-gold-1/45 bg-white/90 px-4 py-2 text-sm font-extrabold text-ink">
        טוען… <bdi>{progress.toFixed(0)}%</bdi>
      </div>
    </Html>
  );
}

function TierCake({
  zoomRef,
  segments,
}: {
  zoomRef: React.MutableRefObject<number>;
  segments: number;
}) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scaleTarget = useMemo(() => new THREE.Vector3(1, 1, 1), []);

  const frosting = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#F2C4CE" }),
    [],
  );
  const cream = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#E8D5DA" }),
    [],
  );
  const gold = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#D4AF37" }),
    [],
  );
  const plate = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#F7D6DE" }),
    [],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      frosting.dispose();
      cream.dispose();
      gold.dispose();
      plate.dispose();
    };
  }, [frosting, cream, gold, plate]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const z = zoomRef.current;
    const s = 1 + z * 0.55;
    scaleTarget.set(s, s, s);
    group.current.scale.lerp(scaleTarget, 1 - Math.exp(-6 * delta));
    group.current.position.z = THREE.MathUtils.damp(
      group.current.position.z,
      z * 0.85,
      6,
      delta,
    );
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      pointer.current.x * 0.35 + performance.now() * 0.00015,
      3,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      pointer.current.y * -0.12,
      3,
      delta,
    );
  });

  return (
    <group ref={group} position={[0, -0.35, 0]}>
      <mesh position={[0, -0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.55, segments]} />
        <primitive object={plate} attach="material" />
      </mesh>
      <mesh position={[0, -0.52, 0]}>
        <torusGeometry args={[1.45, 0.04, 8, segments]} />
        <primitive object={gold} attach="material" />
      </mesh>

      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[1.15, 1.2, 0.55, segments]} />
        <primitive object={frosting} attach="material" />
      </mesh>
      <mesh position={[0, 0.14, 0]}>
        <torusGeometry args={[1.05, 0.06, 8, segments]} />
        <primitive object={gold} attach="material" />
      </mesh>

      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.85, 0.9, 0.48, segments]} />
        <primitive object={cream} attach="material" />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <torusGeometry args={[0.78, 0.05, 8, segments]} />
        <primitive object={gold} attach="material" />
      </mesh>

      <mesh position={[0, 0.98, 0]}>
        <cylinderGeometry args={[0.55, 0.62, 0.42, segments]} />
        <primitive object={frosting} attach="material" />
      </mesh>
      <mesh position={[0, 1.22, 0]}>
        <torusGeometry args={[0.48, 0.045, 8, segments]} />
        <primitive object={gold} attach="material" />
      </mesh>

      <mesh position={[0, 1.48, 0]}>
        <coneGeometry args={[0.22, 0.28, 5]} />
        <primitive object={gold} attach="material" />
      </mesh>
      <mesh position={[0, 1.62, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <primitive object={gold} attach="material" />
      </mesh>
    </group>
  );
}

const HeroCake3D = forwardRef<HeroCakeHandle>(function HeroCake3D(_, ref) {
  const [mountCanvas, setMountCanvas] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(false);
  const zoomRef = useRef(0);

  useImperativeHandle(ref, () => ({
    setZoom: (t: number) => {
      zoomRef.current = Math.min(1, Math.max(0, t));
    },
  }));

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthMq = window.matchMedia("(max-width: 767px)");
    setReduced(motionMq.matches);
    setMobile(widthMq.matches);

    const onWidth = () => setMobile(widthMq.matches);
    widthMq.addEventListener("change", onWidth);

    if (motionMq.matches) {
      return () => widthMq.removeEventListener("change", onWidth);
    }

    let idleHandle: number | null = null;
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null;
    const start = () => setMountCanvas(true);
    if (typeof window.requestIdleCallback === "function") {
      idleHandle = window.requestIdleCallback(start, { timeout: 120 });
    } else {
      timeoutHandle = setTimeout(start, 100);
    }

    return () => {
      widthMq.removeEventListener("change", onWidth);
      if (idleHandle !== null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== null) clearTimeout(timeoutHandle);
    };
  }, []);

  return (
    <div
      className="relative h-[min(42vh,380px)] w-full touch-none sm:h-[480px] lg:h-[560px]"
      role="img"
      aria-label="הדמיית תלת־ממד של עוגת שלוש קומות עם כתר זהב. ניתן לסובב במגע או בעכבר."
    >
      <p className="sr-only" aria-live="polite">
        {reduced
          ? "מוצגת תמונת פוסטר סטטית במקום תלת־ממד."
          : canvasReady
            ? "סצנת התלת־ממד מוכנה. הזיזו לעיגול כדי לסובב."
            : "טוענים הדמיית תלת־ממד."}
      </p>
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          canvasReady && !reduced ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative aspect-square w-[86%] overflow-hidden rounded-full border border-gold-luxury/50 shadow-[0_1px_0_rgb(242_196_206/0.12)_inset,0_24px_48px_-20px_rgb(0_0_0/0.8),0_0_0_1px_rgb(212_175_55/0.25)]">
          <Image
            src="/cakes/hero/round-gold-crown.jpg"
            alt="עוגת שלוש קומות עם כתר זהב — LALIBAKERY"
            fill
            priority
            className="object-cover"
            sizes="(max-width:1024px) 90vw, 520px"
          />
        </div>
      </div>

      {mountCanvas && !reduced && (
        <Canvas
          camera={{ position: [0, 1.4, 3.6], fov: 38 }}
          dpr={mobile ? [1, 1.35] : [1, 1.75]}
          gl={{
            antialias: !mobile,
            alpha: true,
            powerPreference: "high-performance",
          }}
          onCreated={() => {
            window.requestAnimationFrame(() => setCanvasReady(true));
          }}
        >
          <Suspense fallback={<Loader />}>
            <Float
              speed={mobile ? 0.6 : 1}
              rotationIntensity={0.04}
              floatIntensity={mobile ? 0.12 : 0.22}
            >
              <TierCake zoomRef={zoomRef} segments={mobile ? 24 : 48} />
            </Float>
            <ContactShadows
              position={[0, -0.95, 0]}
              opacity={0.65}
              scale={12}
              blur={2.8}
              far={5}
              color="#0D0D0D"
            />
          </Suspense>
        </Canvas>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center px-3">
        <span className="rounded-full border border-gold-1/40 bg-white/85 px-3 py-1.5 text-[10px] font-bold tracking-wide text-ink/80 backdrop-blur-md sm:text-[11px]">
          הדמיית תלת־ממד אינטראקטיבית · הזיזו לעיגול
        </span>
      </div>
    </div>
  );
});

export default HeroCake3D;
