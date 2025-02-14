"use client";

import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ModalContent {
  title: string;
  description: string;
  image?: string;
  yearRange?: string;
}

interface RoverProps {
  setModalContent: (content: ModalContent) => void;
  roverRef: React.RefObject<THREE.Group>;
  infoZones: Array<{ position: [number, number, number]; message: string }>;
}


const Rover: React.FC<RoverProps> = ({ setModalContent, roverRef, infoZones }) => {
  const { scene } = useGLTF("/robot.glb");
  const speed = 0.2;
  const rotationSpeed = 0.05;
  const keys = useRef<{ [key: string]: boolean }>({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    " ": false,
  });
  const [currentZone, setCurrentZone] = useState<{ position: [number, number, number]; message: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (keys.current.hasOwnProperty(e.key)) {
        keys.current[e.key] = true;
      }
      if (e.key === " " && currentZone) {
        setModalContent({
          title: "Zone Information", 
          description: currentZone.message, 
        });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (keys.current.hasOwnProperty(e.key)) {
        keys.current[e.key] = false;
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
      if (keys.current.ArrowUp) {
        roverRef.current.position.x += Math.sin(roverRef.current.rotation.y) * speed;
        roverRef.current.position.z += Math.cos(roverRef.current.rotation.y) * speed;
      }
      if (keys.current.ArrowDown) {
        roverRef.current.position.x -= Math.sin(roverRef.current.rotation.y) * speed;
        roverRef.current.position.z -= Math.cos(roverRef.current.rotation.y) * speed;
      }
      
     
      if (keys.current.ArrowLeft) {
        roverRef.current.rotation.y += rotationSpeed;
      }
      if (keys.current.ArrowRight) {
        roverRef.current.rotation.y -= rotationSpeed;
      }

      let nearestZone = null;
      let minDistance = Number.POSITIVE_INFINITY;
      infoZones.forEach((zone) => {
        if (roverRef.current) {
          const distance = roverRef.current.position.distanceTo(new THREE.Vector3(...zone.position));
          if (distance < 2 && distance < minDistance) {
            nearestZone = zone;
            minDistance = distance;
          }
        }
      });

      setCurrentZone(nearestZone);
    }
  });

  return <primitive ref={roverRef} object={scene} scale={0.5} />;
};

export default Rover;
