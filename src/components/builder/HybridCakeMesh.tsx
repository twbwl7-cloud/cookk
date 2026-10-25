"use client";

import { useMemo } from "react";
import { useCakeBuilderStore } from "@/store/cake-builder";
import { FROST_HEX } from "@/types/cake-builder";

/**
 * ONE connected hybrid cake:
 * rectangular garden sheet foundation + couture sculpted top
 * fused with a frosting collar — never two floating cakes.
 */
export function HybridCakeMesh() {
  const hybridMode = useCakeBuilderStore((s) => s.hybridMode);
  const baseStyle = useCakeBuilderStore((s) => s.baseStyle);
  const secondaryStyle = useCakeBuilderStore((s) => s.secondaryStyle);
  const fusionRatio = useCakeBuilderStore((s) => s.fusionRatio);

  const baseColor = FROST_HEX[baseStyle.frost];
  const topColor = FROST_HEX[secondaryStyle.frost];

  const topScale = useMemo(
    () => (hybridMode ? 0.72 + fusionRatio * 0.28 : 0.9),
    [hybridMode, fusionRatio],
  );

  return (
    <group>
      {/* Board */}
      <mesh position={[0, -0.48, 0]} receiveShadow>
        <boxGeometry args={[2.6, 0.08, 1.9]} />
        <meshStandardMaterial color="#f5efe6" roughness={0.55} />
      </mesh>

      {/* —— GARDEN FOUNDATION (connected body) —— */}
      <mesh position={[0, -0.05, 0]} castShadow>
        <boxGeometry args={[2.25, 0.62, 1.55]} />
        <meshStandardMaterial
          color={baseColor}
          roughness={baseStyle.piping === "smooth" ? 0.42 : 0.68}
        />
      </mesh>

      {/* Shell piping around garden sheet — classic gan look */}
      <mesh position={[0, 0.28, 0.78]}>
        <boxGeometry args={[2.2, 0.1, 0.08]} />
        <meshStandardMaterial color={baseColor} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.28, -0.78]}>
        <boxGeometry args={[2.2, 0.1, 0.08]} />
        <meshStandardMaterial color={baseColor} roughness={0.5} />
      </mesh>
      <mesh position={[1.12, 0.28, 0]}>
        <boxGeometry args={[0.08, 0.1, 1.5]} />
        <meshStandardMaterial color={baseColor} roughness={0.5} />
      </mesh>
      <mesh position={[-1.12, 0.28, 0]}>
        <boxGeometry args={[0.08, 0.1, 1.5]} />
        <meshStandardMaterial color={baseColor} roughness={0.5} />
      </mesh>

      {hybridMode ? (
        <>
          {/* Frosting collar — physically joins sheet → couture top */}
          <mesh position={[0, 0.38, 0]}>
            <cylinderGeometry args={[0.95, 1.05, 0.22, 48]} />
            <meshStandardMaterial color={baseColor} roughness={0.55} />
          </mesh>

          {/* —— COUTURE SCULPTED TOP (same cake, upper volume) —— */}
          <group position={[0, 0.72 + fusionRatio * 0.12, 0]} scale={topScale}>
            <mesh castShadow>
              <cylinderGeometry args={[0.78, 0.88, 0.75, 48]} />
              <meshStandardMaterial
                color={topColor}
                roughness={secondaryStyle.piping === "smooth" ? 0.32 : 0.55}
                metalness={secondaryStyle.frost === "gold" ? 0.3 : 0.04}
              />
            </mesh>

            {/* Lambeth / shell crown */}
            {(secondaryStyle.piping === "lambeth" ||
              secondaryStyle.piping === "shell") && (
              <mesh position={[0, 0.4, 0]}>
                <torusGeometry args={[0.76, 0.055, 12, 48]} />
                <meshStandardMaterial color={topColor} />
              </mesh>
            )}

            {secondaryStyle.piping === "drip" && (
              <mesh position={[0, 0.22, 0]}>
                <cylinderGeometry args={[0.82, 0.7, 0.28, 32]} />
                <meshStandardMaterial
                  color={secondaryStyle.frost === "choc" ? "#3d2918" : "#d4af37"}
                  roughness={0.4}
                />
              </mesh>
            )}

            {/* Accents on the SAME top */}
            {(secondaryStyle.accents === "goldLeaf" ||
              secondaryStyle.accents === "bows") && (
              <mesh position={[0, 0.55, 0]}>
                <sphereGeometry args={[0.11, 16, 16]} />
                <meshStandardMaterial
                  color="#d4af37"
                  metalness={0.85}
                  roughness={0.22}
                />
              </mesh>
            )}
            {secondaryStyle.accents === "florals" && (
              <>
                <mesh position={[0.32, 0.5, 0.18]}>
                  <sphereGeometry args={[0.09, 12, 12]} />
                  <meshStandardMaterial color="#f2c4ce" />
                </mesh>
                <mesh position={[-0.28, 0.48, -0.12]}>
                  <sphereGeometry args={[0.08, 12, 12]} />
                  <meshStandardMaterial color="#e8a9b6" />
                </mesh>
              </>
            )}
            {secondaryStyle.accents === "figures" && (
              <mesh position={[0, 0.58, 0]}>
                <boxGeometry args={[0.22, 0.28, 0.12]} />
                <meshStandardMaterial color="#d4af37" metalness={0.4} />
              </mesh>
            )}
          </group>
        </>
      ) : (
        <mesh position={[0, 0.55, 0]} castShadow>
          <cylinderGeometry args={[0.95, 1.05, 1.05, 48]} />
          <meshStandardMaterial color={baseColor} roughness={0.45} />
        </mesh>
      )}
    </group>
  );
}
