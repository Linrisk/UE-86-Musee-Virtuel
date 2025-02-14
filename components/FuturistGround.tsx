"use client";
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const FuturisticGround: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const createFuturisticTexture = (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Unable to get 2D context');
    }

   
    context.clearRect(0, 0, canvas.width, canvas.height);

   
    const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
    };

   
    context.strokeStyle = '#6600ff'; 
    context.lineWidth = 3;

    const horizonY = canvas.height * 0.5;
    const vanishingPointX = canvas.width * 0.5;
    const numLines = 20;
    const spacing = canvas.height / numLines;

    for (let i = 0; i <= numLines; i++) {
      const y = horizonY + (i * spacing);
      
      drawLine(0, y, canvas.width, y);

     
      const startX = (i * canvas.width) / numLines;
      drawLine(startX, canvas.height, vanishingPointX, horizonY);
      drawLine(canvas.width - startX, canvas.height, vanishingPointX, horizonY);
    }

    const gradient = context.createLinearGradient(0, canvas.height, 0, horizonY);
    gradient.addColorStop(0, 'rgba(102, 0, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(102, 0, 255, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    return canvas;
  };

  useEffect(() => {
    const texture = new THREE.CanvasTexture(createFuturisticTexture());
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.map = texture;
      material.needsUpdate = true;
    }
  }, []);

  return (
    <group>
    
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100, 32, 32]} />
        <meshStandardMaterial
          transparent={true}
          opacity={0.7}
          emissive="#6600ff"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial
          color="#6600ff"
          transparent={true}
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      
      <pointLight position={[10, 10, 10]} color="#6600ff" intensity={0.5} />
      <pointLight position={[-10, 10, -10]} color="#6600ff" intensity={0.5} />
    </group>
  );
};

export default FuturisticGround;
