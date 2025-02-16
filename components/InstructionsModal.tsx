import React from 'react';

interface InstructionsModalProps {
  onClose: () => void;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ onClose }) => {
  return (
    <div className="futuristic-modal">
      <h2>Instructions</h2>
      <p>Utilisez les flèches du clavier pour déplacer le robot :</p>
      <ul>
        <li>Z : Avancer</li>
        <li>S : Reculer</li>
        <li>Q : Tourner à gauche</li>
        <li>D : Tourner à droite</li>
      </ul>
      <button onClick={onClose}>Fermer</button>
    </div>
  );
};

export default InstructionsModal;
