"use client";

import { useMemo } from "react";
import { useCakeBuilderStore } from "@/store/cake-builder";
import { FROST_HEX } from "@/types/cake-builder";

/** Procedural hybrid cake: garden sheet base + couture round upper. */
export function HybridCakeMesh() {
  const hybridMode = useCakeBuilderStore((s) => s.hybridMode);
  const baseStyle = useCakeBuilderStore((s) => s.baseStyle);
  const secondaryStyle = useCakeBuilderStore((s) => s.secondaryStyle);
  const fusionRatio = useCakeBuilderStore((s) => s.fusionRatio);

  const baseColor = FROST_HEX[baseStyle.frost];
  const topColor = FROST_HEX[secondaryStyle.frost];

  const topScale = useMemo(() => {
    const t = hybridMode ? 0.55 + fusionRatio * 0.45 : 0.15;
    return t;
  }, [hybridMode, fusionRatio]);

  const topY = hybridMode ? 0.55 + fusionRatio * 0.25 : 0.35;

  return (
    <group>
      {/* Board */}
      <mesh position={[0, -0.42, 0]} receiveShadow>
        <cylinderGeometry args={[1.55, 1.55, 0.08, 48]} />
        <meshStandardMaterial color="#f5efe6" roughness={0.55} />
      </mesh>

      {/* Garden base — rounded rectangle feel via scaled box + soft edges */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.2, 0.55, 1.55]} />
        <meshStandardMaterial
          color={baseColor}
          roughness={baseStyle.piping === "smooth" ? 0.45 : 0.7}
        />
      </mesh>
      {/* Shell piping rim on garden base */}
      {(baseStyle.piping === "shell" || baseStyle.piping === "lambeth") && (
        <mesh position={[0, 0.28, 0]}>
          <torusGeometry args={[1.15, 0.06, 10, 48]} />
          <meshStandardMaterial color={baseColor} roughness={0.55} />
        </mesh>
      )}

      {/* Couture upper tier — only meaningful in hybrid */}
      {hybridMode && (
        <group position={[0, topY, 0]} scale={[topScale, topScale, topScale]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.85, 0.92, 0.7, 48]} />
            <meshStandardMaterial
              color={topColor}
              roughness={secondaryStyle.piping === "smooth" ? 0.35 : 0.6}
              metalness={secondaryStyle.frost === "gold" ? 0.35 : 0.05}
            />
          </mesh>
          {(secondaryStyle.piping === "lambeth" ||
            secondaryStyle.piping === "shell") && (
            <mesh position={[0, 0.38, 0]}>
              <torusGeometry args={[0.82, 0.05, 10, 48]} />
              <meshStandardMaterial color={topColor} />
            </mesh>
          )}
          {secondaryStyle.piping === "drip" && (
            <mesh position={[0, 0.2, 0]}>
              <cylinderGeometry args={[0.88, 0.78, 0.25, 32]} />
              <meshStandardMaterial
                color={
                  secondaryStyle.frost === "choc" ? "#3d2918" : "#d4af37"
                }
                roughness={0.4}
              />
            </mesh>
          )}
          {(secondaryStyle.accents === "goldLeaf" ||
            secondaryStyle.accents === "bows") && (
            <mesh position={[0, 0.55, 0]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial
                color="#d4af37"
                metalness={0.8}
                roughness={0.25}
              />
            </mesh>
          )}
          {secondaryStyle.accents === "florals" && (
            <>
              <mesh position={[0.35, 0.5, 0.2]}>
                <sphereGeometry args={[0.1, 12, 12]} />
                <meshStandardMaterial color="#f2c4ce" />
              </mesh>
              <mesh position={[-0.3, 0.48, -0.15]}>
                <sphereGeometry args={[0.09, 12, 12]} />
                <meshStandardMaterial color="#e8a9b6" />
              </mesh>
            </>
          )}
        </group>
      )}

      {/* Single-mode: taller round only */}
      {!hybridMode && (
        <mesh position={[0, 0.55, 0]} castShadow>
          <cylinderGeometry args={[0.95, 1.05, 1.1, 48]} />
          <meshStandardMaterial color={baseColor} roughness={0.45} />
        </mesh>
      )}
    </group>
  );
}
