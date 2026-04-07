"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, Environment, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { HeroMesh } from "./HeroMesh";
import { ParticleField } from "./ParticleField";

interface SceneProps {
  children?: React.ReactNode;
}

export const Scene = ({ children }: SceneProps) => {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <Canvas
        shadows={false}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          
          <ParticleField />
          <HeroMesh />
          
          {children}
          <Preload all />
        </Suspense>
        
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
};

export default Scene;
