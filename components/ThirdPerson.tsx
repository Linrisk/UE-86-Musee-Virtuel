import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

interface ThirdPersonCameraProps {
  target: React.RefObject<THREE.Object3D>;
}

const ThirdPersonCamera: React.FC<ThirdPersonCameraProps> = ({ target }) => {
  const { camera } = useThree();

  useFrame(() => {
    if (target.current) {
      // Ajustez l'offset pour écarter la caméra du personnage
      const offset = new THREE.Vector3(0, 3, 8); // Augmentez la valeur de Z pour écarter la caméra
      const targetPosition = target.current.position.clone().add(offset);
      camera.position.lerp(targetPosition, 0.1);
      camera.lookAt(target.current.position);
    }
  });

  return null;
};

export default ThirdPersonCamera;
