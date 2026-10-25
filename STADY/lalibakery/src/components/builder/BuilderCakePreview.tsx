"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { CREAM_HEX } from "@/lib/cake-pricing";
import { useCakeBuilderStore } from "@/store/cakeBuilder";

function PipingBeads({
  y,
  radius,
  count,
  color,
  style,
}: {
  y: number;
  radius: number;
  count: number;
  color: THREE.ColorRepresentation;
  style: string;
}) {
  const mat = useMemo(
    () => new THREE.MeshBasicMaterial({ color }),
    [color],
  );
  const beads = useMemo(() => {
    const items: { x: number; z: number; s: number }[] = [];
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const bulge =
        style === "rosette_garden" || style === "classic_ruffles" ? 1.08 : 1;
      items.push({
        x: Math.cos(a) * radius * bulge,
        z: Math.sin(a) * radius * bulge,
        s:
          style === "swiss_dots"
            ? 0.035
            : style === "shell_border"
              ? 0.055
              : 0.045,
      });
    }
    return items;
  }, [count, radius, style]);

  if (style === "smooth_buttercream") return null;

  return (
    <group>
      {beads.map((b, i) => (
        <mesh key={i} position={[b.x, y, b.z]}>
          <sphereGeometry args={[b.s, 8, 8]} />
          <primitive object={mat} attach="material" />
        </mesh>
      ))}
    </group>
  );
}

function LiveCake() {
  const tiers = useCakeBuilderStore((s) => s.tiers);
  const creamTone = useCakeBuilderStore((s) => s.creamTone);
  const piping = useCakeBuilderStore((s) => s.piping);
  const decors = useCakeBuilderStore((s) => s.decors);
  const plaqueText = useCakeBuilderStore((s) => s.plaqueText);

  const frosting = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: CREAM_HEX[creamTone],
      }),
    [creamTone],
  );
  const gold = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#D4AF37" }),
    [],
  );
  const plate = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#F7D6DE" }),
    [],
  );
  const sheet = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#FFF8F5" }),
    [],
  );
  const berry = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#8B1E3F" }),
    [],
  );

  const topY = tiers === 1 ? 0.16 : tiers === 2 ? 0.72 : 1.25;
  const drip = piping === "drip_ganache";

  return (
    <group position={[0, -0.2, 0]}>
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.45, 48]} />
        <primitive object={plate} attach="material" />
      </mesh>

      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[1.1, 1.15, 0.5, 48]} />
        <primitive object={frosting} attach="material" />
      </mesh>
      <PipingBeads
        y={0.16}
        radius={1.0}
        count={piping === "lambeth_lace" ? 28 : 18}
        color={CREAM_HEX[creamTone]}
        style={piping}
      />
      <mesh position={[0, 0.16, 0]}>
        <torusGeometry args={[1.0, 0.04, 8, 48]} />
        <primitive object={gold} attach="material" />
      </mesh>

      {drip &&
        Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return (
            <mesh
              key={`drip-${i}`}
              position={[Math.cos(a) * 1.05, -0.05, Math.sin(a) * 1.05]}
            >
              <capsuleGeometry args={[0.03, 0.18, 4, 8]} />
              <primitive object={gold} attach="material" />
            </mesh>
          );
        })}

      {tiers >= 2 && (
        <>
          <mesh position={[0, 0.48, 0]}>
            <cylinderGeometry args={[0.82, 0.88, 0.45, 48]} />
            <primitive object={frosting} attach="material" />
          </mesh>
          <PipingBeads
            y={0.72}
            radius={0.75}
            count={16}
            color={CREAM_HEX[creamTone]}
            style={piping}
          />
        </>
      )}

      {tiers >= 3 && (
        <>
          <mesh position={[0, 1.02, 0]}>
            <cylinderGeometry args={[0.52, 0.6, 0.4, 48]} />
            <primitive object={frosting} attach="material" />
          </mesh>
          <PipingBeads
            y={1.25}
            radius={0.46}
            count={12}
            color={CREAM_HEX[creamTone]}
            style={piping}
          />
        </>
      )}

      {decors.includes("sugar_sheet") && (
        <mesh position={[0, topY + 0.12, 0.02]} rotation={[-0.15, 0, 0]}>
          <planeGeometry args={[0.7, 0.55]} />
          <primitive object={sheet} attach="material" />
        </mesh>
      )}

      {decors.includes("macaron_crown") && (
        <mesh position={[0, topY + 0.2, 0]}>
          <torusGeometry args={[0.32, 0.07, 8, 24]} />
          <primitive object={gold} attach="material" />
        </mesh>
      )}

      {decors.includes("gold_leaf") && (
        <mesh position={[0.45, 0.12, 0.75]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <primitive object={gold} attach="material" />
        </mesh>
      )}

      {decors.includes("fresh_berries") &&
        [0, 1, 2, 3].map((i) => (
          <mesh
            key={`berry-${i}`}
            position={[
              Math.cos(i) * 0.35,
              topY + 0.18,
              Math.sin(i) * 0.35,
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <primitive object={berry} attach="material" />
          </mesh>
        ))}

      {decors.includes("name_topper") && plaqueText && (
        <mesh position={[0, topY + 0.28, 0.5]}>
          <boxGeometry args={[0.85, 0.16, 0.04]} />
          <primitive object={gold} attach="material" />
        </mesh>
      )}
    </group>
  );
}

export function BuilderCakePreview() {
  return (
    <div className="relative h-[340px] w-full overflow-hidden rounded-[1.4rem] border border-gold-1/35 bg-gradient-to-b from-white/90 to-pink-soft/80 contact-shadow sm:h-[460px]">
      <Canvas
        camera={{ position: [0, 1.15, 3.35], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#F7D6DE"]} />
        <Float speed={1} rotationIntensity={0.12} floatIntensity={0.22}>
          <LiveCake />
        </Float>
        <ContactShadows
          position={[0, -0.9, 0]}
          opacity={0.35}
          scale={10}
          blur={2.6}
          far={4}
          color="#0D0D0D"
        />
      </Canvas>
      <p className="pointer-events-none absolute bottom-3 inset-x-0 text-center text-[10px] font-bold text-ink/55">
        הדמיית תלת־ממד בשידור חי · זילוף · גוון קצפת · דף סוכר
      </p>
    </div>
  );
}
