"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useUIStore } from "@/store/useUIStore";
import { COLORS } from "@/lib/three/colors";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const PARTICLE_CONFIG = {
  COUNT: 2000,
  SIZE: 0.015,
  SPREAD: 10,
  BASE_SPEED: 0.02,
  VELOCITY_INFLUENCE: 0.05,
} as const;

export const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const scrollVelocity = useUIStore((state) => state.scrollVelocity);
  const scrollDirection = useUIStore((state) => state.scrollDirection);
  const prefersReducedMotion = useReducedMotion();

  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_CONFIG.COUNT * 3);
    for (let i = 0; i < PARTICLE_CONFIG.COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * PARTICLE_CONFIG.SPREAD;
      pos[i * 3 + 1] = (Math.random() - 0.5) * PARTICLE_CONFIG.SPREAD;
      pos[i * 3 + 2] = (Math.random() - 0.5) * PARTICLE_CONFIG.SPREAD;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (prefersReducedMotion) return;

    if (pointsRef.current) {
      // Rotate slowly
      pointsRef.current.rotation.y += delta * PARTICLE_CONFIG.BASE_SPEED;
      pointsRef.current.rotation.x += delta * (PARTICLE_CONFIG.BASE_SPEED / 2);

      // React to scroll velocity
      const velocityFactor = scrollVelocity * PARTICLE_CONFIG.VELOCITY_INFLUENCE;
      const direction = scrollDirection === "down" ? 1 : -1;
      
      pointsRef.current.position.y += velocityFactor * direction * 0.1;
      
      // Elastic return to center
      pointsRef.current.position.y *= 0.95;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={COLORS.accent2}
        size={PARTICLE_CONFIG.SIZE}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

export default ParticleField;
