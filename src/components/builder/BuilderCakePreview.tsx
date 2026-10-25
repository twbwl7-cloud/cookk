"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { HybridCakeMesh } from "@/components/builder/HybridCakeMesh";

export function BuilderCakePreview() {
  return (
    <div className="relative h-[340px] w-full overflow-hidden rounded-[1.5rem] bg-gradient-to-b from-[#fffaf8] to-pink-soft/60 contact-shadow sm:h-[420px]">
      <Canvas
        camera={{ position: [2.8, 2.2, 3.2], fov: 38 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#fff5f7"]} />
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 6, 2]} intensity={1.15} castShadow />
        <Suspense fallback={null}>
          <HybridCakeMesh />
          <Environment preset="studio" />
          <ContactShadows
            position={[0, -0.42, 0]}
            opacity={0.35}
            scale={8}
            blur={2.4}
          />
        </Suspense>
        <OrbitControls
          enablePan={false}
          minPolarAngle={0.6}
          maxPolarAngle={1.45}
          minDistance={3}
          maxDistance={6}
        />
      </Canvas>
      <p className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-white/80 px-3 py-1 text-[10px] font-extrabold text-ink">
        סובבו בעדינות · Hybrid Preview
      </p>
    </div>
  );
}
