"use client";

/**
 * Real cake photo on a turntable disc — drag to spin 360°.
 * Book: P23 mental simulation / A23 product rotation.
 * Poster first (A01) — Canvas lazy.
 */

import { Canvas, useLoader } from "@react-three/fiber";
import {
  ContactShadows,
  Float,
  Html,
  OrbitControls,
  useProgress,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import Image from "next/image";

const CAKE_SRC = "/cakes/hero/round-hero-3d.jpg";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="rounded-full bg-ink px-4 py-2 text-sm font-extrabold text-pink-soft">
        טוען… <bdi>{progress.toFixed(0)}%</bdi>
      </div>
    </Html>
  );
}

function RealCakeTurntable() {
  const texture = useLoader(THREE.TextureLoader, CAKE_SRC);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
  }, [texture]);

  const photoMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: texture,
        toneMapped: false,
      }),
    [texture],
  );

  const rimMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0A0A0A",
        roughness: 0.45,
        metalness: 0.35,
      }),
    [],
  );

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#D4AF37",
        roughness: 0.3,
        metalness: 0.85,
      }),
    [],
  );

  const backMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1A1A1A",
        roughness: 0.6,
        metalness: 0.2,
      }),
    [],
  );

  return (
    <group position={[0, 0.05, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[1.62, 1.62, 0.14, 64]} />
        <primitive object={rimMat} attach="material" />
      </mesh>

      <mesh position={[0, 0.08, 0]}>
        <torusGeometry args={[1.58, 0.035, 12, 64]} />
        <primitive object={goldMat} attach="material" />
      </mesh>

      <mesh position={[0, 0.078, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.52, 96]} />
        <primitive object={photoMat} attach="material" />
      </mesh>

      <mesh position={[0, -0.078, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.52, 64]} />
        <primitive object={backMat} attach="material" />
      </mesh>
    </group>
  );
}

export default function HeroCake3D() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="relative h-full min-h-[340px] w-full cursor-grab touch-none active:cursor-grabbing sm:min-h-[420px] lg:min-h-[520px]">
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${ready ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <div className="relative aspect-square w-[78%] max-w-[420px] overflow-hidden rounded-full border-[3px] border-gold-1/40 contact-shadow">
          <Image
            src={CAKE_SRC}
            alt="עוגה מעוצבת תלת־ממד · LALIBAKERY"
            fill
            priority
            className="object-cover"
            sizes="(max-width:1024px) 90vw, 420px"
          />
        </div>
      </div>

      {ready && (
        <Canvas
          camera={{ position: [0, 2.6, 2.8], fov: 40 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.95} />
          <directionalLight position={[3, 5, 2]} intensity={1.1} color="#ffffff" />
          <directionalLight position={[-2, 2, -1]} intensity={0.35} color="#ffd1dc" />
          <Suspense fallback={<Loader />}>
            <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.25}>
              <RealCakeTurntable />
            </Float>
            <ContactShadows
              position={[0, -0.85, 0]}
              opacity={0.55}
              scale={10}
              blur={2.6}
              far={5}
              color="#0A0A0A"
            />
          </Suspense>
          <OrbitControls
            makeDefault
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.7}
            rotateSpeed={1}
            minPolarAngle={0.35}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center sm:bottom-4">
        <span className="rounded-full border border-gold-1/40 bg-ink/85 px-4 py-1.5 text-[11px] font-extrabold tracking-wide text-pink-soft backdrop-blur">
          עוגה אמיתית · גררו לסיבוב 360°
        </span>
      </div>
    </div>
  );
}
