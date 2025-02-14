"use client";
import React from 'react';
import { Object3D } from 'three';

interface InfoZoneProps {
  position: [number, number, number];
  message: string;
  onClick: () => void;
}

const InfoZone: React.FC<InfoZoneProps> = ({ position, message, onClick }) => {
  return (
    <group position={position} onClick={onClick}>
      {/* Cylindre de base */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="#2979ff" transparent opacity={0.8} />
      </mesh>
      {/* Sphère du dessus */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#42a5f5"
          emissive="#42a5f5"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
};

export default InfoZone;
