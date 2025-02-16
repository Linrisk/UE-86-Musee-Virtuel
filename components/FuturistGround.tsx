"use client";
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const FuturisticGround: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const createGridTexture = (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Unable to get 2D context');
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = '#6600ff';
    context.lineWidth = 2;
    context.globalAlpha = 0.8;

    const gridSize = 120;

    for (let x = 0; x <= canvas.width; x += gridSize) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
      context.stroke();
    }

    for (let y = 0; y <= canvas.height; y += gridSize) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(canvas.width, y);
      context.stroke();
    }

    return canvas;
  };

  useEffect(() => {
    const texture = new THREE.CanvasTexture(createGridTexture());
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);

    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.map = texture;
      material.map.needsUpdate = true;
    }
  }, []);

  return (
    <group>
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100, 1, 1]} />
        <meshStandardMaterial
          transparent={true}
          opacity={0.9}
          emissive="#6600ff"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <pointLight position={[10, 10, 10]} color="#6600ff" intensity={0.5} />
      <pointLight position={[-10, 10, -10]} color="#6600ff" intensity={0.5} />
    </group>
  );
};

export default FuturisticGround;
