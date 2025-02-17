"use client";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ModalContent, InfoZoneData } from "../src/types/index.ts";

interface RoverProps {
  setModalContent: (content: ModalContent) => void;
  roverRef: React.RefObject<THREE.Group>;
  infoZones: InfoZoneData[];
  position?: [number, number, number];
}

const Rover: React.FC<RoverProps> = ({ 
  setModalContent, 
  roverRef, 
  infoZones,
  position = [0, 0, 0]
}) => {
  const { scene } = useGLTF("/robot.glb");
  const speed = 0.1;
  const rotationSpeed = 0.05;
  
  const keys = useRef<{ [key: string]: boolean }>({
    z: false,
    s: false,
    q: false,
    d: false,
    " ": false,
  });

  const [currentZone, setCurrentZone] = useState<InfoZoneData | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (keys.current.hasOwnProperty(key)) {
        keys.current[key] = true;
      }
      if (e.key === " " && currentZone) {
        setModalContent({
          title: "Zone Information",
          description: currentZone.message,
        });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (keys.current.hasOwnProperty(key)) {
        keys.current[key] = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [currentZone, setModalContent]);

  useFrame(() => {
    if (roverRef.current) {
      if (keys.current.z) {
        roverRef.current.position.x += Math.sin(roverRef.current.rotation.y) * speed;
        roverRef.current.position.z += Math.cos(roverRef.current.rotation.y) * speed;
      }
      if (keys.current.s) {
        roverRef.current.position.x -= Math.sin(roverRef.current.rotation.y) * speed;
        roverRef.current.position.z -= Math.cos(roverRef.current.rotation.y) * speed;
      }
      if (keys.current.q) {
        roverRef.current.rotation.y += rotationSpeed;
      }
      if (keys.current.d) {
        roverRef.current.rotation.y -= rotationSpeed;
      }

      let nearestZone = null;
      let minDistance = Number.POSITIVE_INFINITY;

      infoZones.forEach((zone) => {
        if (roverRef.current) {
          const distance = roverRef.current.position.distanceTo(
            new THREE.Vector3(...zone.position)
          );
          if (distance < 2 && distance < minDistance) {
            nearestZone = zone;
            minDistance = distance;
          }
        }
      });

      setCurrentZone(nearestZone);
    }
  });

  return (
    <primitive 
      ref={roverRef} 
      object={scene} 
      scale={0.5} 
      position={position}
    />
  );
};

export default Rover;