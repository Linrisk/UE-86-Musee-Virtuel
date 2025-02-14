import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import Rover from "../../components/Rover";
import InfoZone from "../../components/InfoZone";
import ThirdPersonCamera from "../../components/ThirdPerson";
import InfoModal from "../../components/InfoModal";
import InfoZone3D from "../../components/InfoZone3D";
import FuturistGround from "../../components/FuturistGround";
import InstructionsModal from "../../components/InstructionsModal";
import * as THREE from 'three';
interface InfoZoneData {
  position: [number, number, number];
  message: string;
}

interface ModalContent {
  title: string;
  description: string;
  image?: string;
  yearRange?: string;
}

interface ExperienceProps {
  setModalContent: (content: ModalContent) => void;
  roverRef: React.RefObject<THREE.Group>;
  infoZones: InfoZoneData[];
}

function Experience({ setModalContent, roverRef, infoZones }: ExperienceProps) {
  const discoveryData: (ModalContent & { position: [number, number, number] })[] = [
    {
      position: [8, 1, 8],
      title: "Le Cratère Gale",
      yearRange: "2012-2023",
      description:
        "Site d'atterrissage du rover Curiosity, ce cratère contient des preuves d'anciens lacs martiens.",
      image:
        "https://mars.nasa.gov/system/resources/detail_files/24951_PIA21719-web.jpg",
    },
    {
      position: [-8, 1, -8],
      title: "Olympus Mons",
      yearRange: "1971-2023",
      description:
        "Plus grand volcan du système solaire, s'élevant à 21km au-dessus de la surface.",
      image:
        "https://solarsystem.nasa.gov/system/resources/detail_files/625_PIA23262.jpg",
    },
  ];
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      <FuturistGround />

      {infoZones.map((zone, index) => (
        <InfoZone
          key={index}
          position={zone.position}
          message={zone.message}
          onClick={() =>
            setModalContent({
              title: "Information",
              description: zone.message,
            })
          }
        />
      ))}

{discoveryData.map((data, index) => (
  <InfoZone3D
    key={`3d-${index}`}
    position={data.position}
    title={data.title}
    description={data.description}
    image={data.image}
    yearRange={data.yearRange}
    onClick={() => setModalContent(data)} // data already matches ModalContent
  />
))}


      <Rover
        setModalContent={setModalContent}
        roverRef={roverRef}
        infoZones={infoZones}
      />
      <ThirdPersonCamera target={roverRef} />
    </>
  );
}

export default function Scene() {
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const roverRef = useRef<THREE.Group>(null);
  const [showInstructions, setShowInstructions] = useState(true);

  const infoZones: InfoZoneData[] = [
    {
      position: [5, 0.1, 5],
      message:
        "Bienvenue sur Mars ! Cette zone regorge de secrets à découvrir.",
    },
    {
      position: [-5, 0.1, -5],
      message:
        "Regardez ce cratère ! Il témoigne de l'histoire mouvementée de Mars.",
    },
  ];

  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 1.2, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Experience
             setModalContent={setModalContent} // This should match the correct function type in Experience
             roverRef={roverRef} 
             infoZones={infoZones}
          />
        </Suspense>
      </Canvas>

      {modalContent && (
        <InfoModal zone={modalContent} onClose={() => setModalContent(null)} />
      )}

      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
}
