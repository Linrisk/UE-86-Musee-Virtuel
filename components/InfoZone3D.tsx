import { Text } from '@react-three/drei';
import { useState } from 'react';
import { useSpring, animated } from '@react-spring/three';

interface InfoZone3DProps {
  position: [number, number, number];
  title: string;
  description: string;
  image?: string;
  yearRange?: string;
  onClick: () => void;
}


const InfoZone3D: React.FC<InfoZone3DProps> = ({ position, title, yearRange, description, image, onClick }) => {
  const [hovered, setHovered] = useState(false);

  // Animation au survol
  const { scale } = useSpring({
    scale: hovered ? 1.1 : 1,
  });

  return (
    <animated.group
      position={position}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      <mesh>
        <planeGeometry args={[2, 3]} />
        <meshStandardMaterial
          color={hovered ? '#2a2a2a' : '#1a1a1a'}
          transparent
          opacity={0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <Text
        position={[0, 0.8, 0.01]}
        fontSize={0.2}
        color="white"
        anchorX="center"
      >
        {yearRange}
      </Text>

      <Text
        position={[0, 0.3, 0.01]}
        fontSize={0.3}
        color="white"
        anchorX="center"
      >
        {title}
      </Text>

      <Text
        position={[0, -0.3, 0.01]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        maxWidth={1.8}
      >
        {description}
      </Text>
    </animated.group>
  );
};

export default InfoZone3D;
