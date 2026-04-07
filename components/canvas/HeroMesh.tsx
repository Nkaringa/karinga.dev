"use client";

import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei";
import * as THREE from "three";
import { COLORS } from "@/lib/three/colors";
import { useUIStore } from "@/store/useUIStore";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const MESH_CONFIG = {
  SPHERE_ARGS: [1, 128, 128] as [number, number, number],
  POSITION: [2, 0, 0] as [number, number, number],
  FLOAT: {
    SPEED: 2,
    MAX_SPEED: 6,
    ROTATION_INTENSITY: 0.5,
    FLOAT_INTENSITY: 1,
  },
  MATERIAL: {
    DISTORT_SPEED: 3,
    MAX_DISTORT_SPEED: 10,
    DISTORT_AMOUNT: 0.4,
    RADIUS: 1,
    METALNESS: 0.8,
    ROUGHNESS: 0.1,
    EMISSIVE_INTENSITY: 0.2,
    OPACITY: 0.8,
  },
  ROTATION_SPEED: {
    X: 0.001,
    Y: 0.002,
  },
  INTERACTION: {
    MOUSE_INTENSITY: 0.5,
    SCROLL_INTENSITY: 0.05,
    LERP_FACTOR: 0.1,
  },
};

export const HeroMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const smoothVelocityRef = useRef(0);
  const { mouse } = useThree();
  const prefersReducedMotion = useReducedMotion();

  useFrame(() => {
    if (prefersReducedMotion) return;

    // Imperative state retrieval to avoid React render cycle on scroll
    const rawVel = useUIStore.getState().scrollVelocity;
    smoothVelocityRef.current = THREE.MathUtils.lerp(smoothVelocityRef.current, rawVel, 0.05);

    if (meshRef.current) {
      // Base Rotation
      meshRef.current.rotation.x += MESH_CONFIG.ROTATION_SPEED.X;
      meshRef.current.rotation.y += MESH_CONFIG.ROTATION_SPEED.Y;

      // Mouse Interaction
      const targetX = mouse.x * MESH_CONFIG.INTERACTION.MOUSE_INTENSITY;
      const targetY = mouse.y * MESH_CONFIG.INTERACTION.MOUSE_INTENSITY;
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x, 
        MESH_CONFIG.POSITION[0] + targetX, 
        MESH_CONFIG.INTERACTION.LERP_FACTOR
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y, 
        MESH_CONFIG.POSITION[1] + targetY, 
        MESH_CONFIG.INTERACTION.LERP_FACTOR
      );
    }

    // Imperative Material Update
    if (materialRef.current) {
      materialRef.current.speed = Math.min(
        MESH_CONFIG.MATERIAL.DISTORT_SPEED + smoothVelocityRef.current * 3,
        MESH_CONFIG.MATERIAL.MAX_DISTORT_SPEED
      );
    }
  });

  return (
    <Float 
      speed={prefersReducedMotion ? 0 : MESH_CONFIG.FLOAT.SPEED} 
      rotationIntensity={MESH_CONFIG.FLOAT.ROTATION_INTENSITY} 
      floatIntensity={MESH_CONFIG.FLOAT.FLOAT_INTENSITY}
    >
      <Sphere ref={meshRef} args={MESH_CONFIG.SPHERE_ARGS} position={MESH_CONFIG.POSITION}>
        <MeshDistortMaterial
          ref={materialRef}
          color={COLORS.accent}
          speed={prefersReducedMotion ? 0 : MESH_CONFIG.MATERIAL.DISTORT_SPEED}
          distort={MESH_CONFIG.MATERIAL.DISTORT_AMOUNT}
          radius={MESH_CONFIG.MATERIAL.RADIUS}
          metalness={MESH_CONFIG.MATERIAL.METALNESS}
          roughness={MESH_CONFIG.MATERIAL.ROUGHNESS}
          emissive={COLORS.accent2}
          emissiveIntensity={MESH_CONFIG.MATERIAL.EMISSIVE_INTENSITY}
          transparent
          opacity={MESH_CONFIG.MATERIAL.OPACITY}
        />
      </Sphere>
    </Float>
  );
};

export default HeroMesh;
