import React, { useState } from 'react';
import { Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const FuturisticHall = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const [showWelcome, setShowWelcome] = useState(true);
  const { camera } = useThree();

  React.useEffect(() => {
    camera.position.set(position[0], position[1] + 10, position[2] + 20);
    camera.lookAt(new THREE.Vector3(position[0], position[1], position[2]));
  }, [position, camera]);

  const WelcomeModal = () => (
    showWelcome && (
      <group 
        position={[position[0], position[1] + 2, position[2] - 5]}
        rotation={rotation}
      >
        <mesh>
          <planeGeometry args={[6, 4]} />
          <meshPhysicalMaterial color="#ffffff" metalness={0.3} roughness={0.4} transparent opacity={0.9} />
        </mesh>
        <Text position={[0, 1, 0.1]} fontSize={0.4} color="#00fff2" anchorX="center" anchorY="middle">
          Bienvenue au Musée du Futur
        </Text>
        <Text position={[0, 0, 0.1]} fontSize={0.2} color="#333333" anchorX="center" anchorY="middle" maxWidth={4}>
          Embarquez pour un voyage à travers le temps et l'espace
        </Text>
        <group position={[0, -1, 0.1]} onClick={() => setShowWelcome(false)}>
          <mesh>
            <boxGeometry args={[2, 0.5, 0.1]} />
            <meshStandardMaterial color="#00fff2" emissive="#00fff2" emissiveIntensity={0.5} />
          </mesh>
          <Text position={[0, 0, 0.1]} fontSize={0.2} color="#000000" anchorX="center" anchorY="middle">
            Commencer la visite
          </Text>
        </group>
      </group>
    )
  );

  return (
    <group position={position} rotation={rotation}>
      <WelcomeModal />

      <mesh position={[0, 20, 0]}>
        <icosahedronGeometry args={[25, 2]} />
        <meshPhysicalMaterial color="#6600ff" metalness={0.4} roughness={0.2} transparent opacity={0.3} side={THREE.DoubleSide} envMapIntensity={1} />
      </mesh>

      {[-15, 0, 15].map((x, index) => (
        <group key={index} position={[x, 0, 0]}>
          <mesh>
            <torusGeometry args={[10, 0.5, 16, 100, Math.PI]} />
            <meshStandardMaterial
              color="#6600ff"
              emissive="#00fff2"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
      ))}

      {[[-8, 4, -5], [8, 4, -5], [-8, 4, 5], [8, 4, 5]].map((pos, index) => (
        <group key={index} position={pos}>
          <mesh>
            <planeGeometry args={[4, 6]} />
            <meshPhysicalMaterial
              color="#6600ff"
              metalness={1}
              roughness={0}
              transparent
              opacity={0.3}
            />
          </mesh>
          <mesh position={[0, -3.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.2, 2.3, 32]} />
            <meshBasicMaterial color="#00fff2" transparent opacity={0.5} />
          </mesh>
        </group>
      ))}

      {[8, 16, 24].map((radius, index) => (
        <mesh
          key={index}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.02, 0]}
        >
          <ringGeometry args={[radius, radius + 0.2, 6]} />
          <meshStandardMaterial
            color="#00fff2"
            emissive="#00fff2"
            emissiveIntensity={0.5}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}

      <ambientLight intensity={0.4} />
      <pointLight position={[0, 25, 0]} intensity={0.8} color="#ffffff" />
      <spotLight
        position={[-20, 15, 0]}
        angle={0.4}
        penumbra={1}
        intensity={1}
        color="#00fff2"
      />
      <spotLight
        position={[20, 15, 0]}
        angle={0.4}
        penumbra={1}
        intensity={1}
        color="#00fff2"
      />
    </group>
  );
};

export default FuturisticHall;
