import * as THREE from "three";
import React, { useRef, useLayoutEffect } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { GLTF } from "three-stdlib";
import gsap from "gsap";

// Define the structure of your GLB file
type GLTFResult = GLTF & {
  nodes: {
    Clapper_Base: THREE.Mesh;
    Clapper_Arm: THREE.Mesh; // The part that actually moves
  };
  materials: {
    MainMaterial: THREE.MeshStandardMaterial;
  };
};

export const Clapperboard: React.FC = () => {
  const { nodes, materials } = useGLTF(
    "/clapperboard.glb",
  ) as unknown as GLTFResult;
  console.log("My Model Nodes:", nodes); // Open your browser console (F12) to see this!
  const scroll = useScroll();

  // Refs for animation
  const groupRef = useRef<THREE.Group>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  useLayoutEffect(() => {
    tl.current = gsap.timeline({ 
      defaults: { duration: 2, ease: "power1.inOut" },
      paused: true 
    });

    if (groupRef.current) {
      tl.current
        // Rotation
        .to(groupRef.current.rotation, { y: Math.PI * 2, x: 0.5 }, 0)
        // Zoom in/out
        .to(groupRef.current.scale, { x: 2, y: 2, z: 2 }, 1)
        // Move it off screen at the end
        .to(groupRef.current.position, { x: 5 }, 2);
    }
  }, []);
  useFrame(() => {
    if (tl.current) {
      // seek() takes a time value, so we multiply offset by duration
      tl.current.seek(scroll.offset * tl.current.duration());
    }
  });

  // 1. Update the Type
  type GLTFResult = GLTF & {
    nodes: {
      mesh_0: THREE.Mesh; // Use the name from your console
    };
    materials: {
      // Usually, materials are named after the material in the 3D software
      // If you're unsure, you can check console.log(materials) too
      [key: string]: THREE.MeshStandardMaterial;
    };
  };

  // 2. Update the Component Return
  return (
    <group ref={groupRef} dispose={null}>
      <mesh
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material} // Using the material attached to the mesh
      />
    </group>
  );
};

// Pre-load to prevent flickering
useGLTF.preload("/clapperboard.glb");
