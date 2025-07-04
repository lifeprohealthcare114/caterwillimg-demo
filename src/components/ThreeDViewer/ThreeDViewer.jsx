import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import './ThreeDViewer.css';

const WheelchairModel = ({ parts, onPartClick, focusedPart, setFocusedPart }) => {
  const groupRef = useRef();
  const { camera } = useThree();
  const [hoveredPart, setHoveredPart] = useState(null);

  useFrame(() => {
    if (!focusedPart && !hoveredPart) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  // Focus camera on part when selected
  React.useEffect(() => {
    if (focusedPart) {
      const part = parts.find(p => p.id === focusedPart);
      if (part) {
        const targetPosition = new THREE.Vector3(
          part.position.x/50 - 1,
          part.position.y/50 - 1,
          0
        );
        camera.lookAt(targetPosition);
      }
    }
  }, [focusedPart, camera, parts]);

  return (
    <group ref={groupRef}>
      {/* Basic wheelchair model */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[1.5, 0.8, 1]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      <mesh position={[0, 0, 0.5]}>
        <boxGeometry args={[1.5, 1.2, 0.1]} />
        <meshStandardMaterial color="#1e40af" />
      </mesh>

      {/* Hotspots */}
      {parts.map((part) => (
        <group 
          key={part.id} 
          position={[part.position.x/50-1, part.position.y/50-1, 0]}
        >
          <mesh
            onClick={() => {
              onPartClick(part);
              setFocusedPart(part.id);
            }}
            onPointerOver={() => setHoveredPart(part.id)}
            onPointerOut={() => setHoveredPart(null)}
          >
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial 
              color={
                focusedPart === part.id ? "#ef4444" : 
                hoveredPart === part.id ? "#f59e0b" : "#3b82f6"
              } 
              emissive={focusedPart === part.id ? "#ef4444" : "#000000"}
              emissiveIntensity={0.5}
            />
          </mesh>
          {(hoveredPart === part.id || focusedPart === part.id) && (
            <Html center>
              <div className={`hotspot-tooltip ${focusedPart === part.id ? 'focused' : ''}`}>
                {part.name}
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  );
};

const ThreeDViewer = ({ parts, onPartClick }) => {
  const [focusedPart, setFocusedPart] = useState(null);

  const handleResetView = () => {
    setFocusedPart(null);
  };

  return (
    <div className="three-d-viewer">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <WheelchairModel 
          parts={parts} 
          onPartClick={onPartClick}
          focusedPart={focusedPart}
          setFocusedPart={setFocusedPart}
        />
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI/6}
          maxPolarAngle={Math.PI/2}
          target={focusedPart ? 
            [parts.find(p => p.id === focusedPart).position.x/50-1, 
             parts.find(p => p.id === focusedPart).position.y/50-1, 
             0] : [0, 0, 0]}
        />
      </Canvas>
      
      <div className="viewer-controls">
        <button 
          className="control-button"
          onClick={handleResetView}
        >
          Reset View
        </button>
      </div>
    </div>
  );
};

export default ThreeDViewer;