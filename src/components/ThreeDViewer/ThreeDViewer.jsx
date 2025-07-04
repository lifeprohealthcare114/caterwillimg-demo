import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import './ThreeDViewer.css';

const Model = ({ url, parts, onPartClick, focusedPart, setFocusedPart }) => {
  const { scene } = useGLTF(url);
  const groupRef = useRef();
  const { camera } = useThree();
  const [hoveredPart, setHoveredPart] = useState(null);
  const [visibleParts, setVisibleParts] = useState(new Set());
  const rotationSpeed = useRef(0.002);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed.current;
    }

    const newVisibleParts = new Set();
    parts.forEach(part => {
      const partPosition = new THREE.Vector3(
        part.position.x/50 - 1,
        part.position.y/50 - 1,
        0
      );
      partPosition.applyMatrix4(groupRef.current.matrixWorld);
      const screenPosition = partPosition.clone().project(camera);
      
      if (Math.abs(screenPosition.x) <= 1 && Math.abs(screenPosition.y) <= 1) {
        newVisibleParts.add(part.id);
      }
    });
    setVisibleParts(newVisibleParts);
  });

  useEffect(() => {
    if (focusedPart && camera) {
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

  const handlePartClick = (part) => {
    onPartClick(part);
    setFocusedPart(part.id);
  };

  return (
    <primitive 
      ref={groupRef}
      object={scene} 
      scale={1} 
      position={[0, -0.5, 0]}
    >
      {parts.map((part) => (
        <group 
          key={part.id} 
          position={[part.position.x/50-1, part.position.y/50-1, 0]}
        >
          {(visibleParts.has(part.id) || focusedPart === part.id) && (
            <>
              <line>
                <bufferGeometry attach="geometry" 
                  onUpdate={self => {
                    self.setFromPoints([
                      new THREE.Vector3(0, 0, 0),
                      new THREE.Vector3(0.5, 0.5, 0)
                    ]);
                  }} 
                />
                <lineBasicMaterial 
                  attach="material" 
                  color={focusedPart === part.id ? "#ef4444" : "#3b82f6"} 
                  linewidth={2}
                />
              </line>

              {!focusedPart && (
                <Html center>
                  <div 
                    className={`part-label ${hoveredPart === part.id ? 'hovered' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePartClick(part);
                    }}
                    onPointerOver={() => setHoveredPart(part.id)}
                    onPointerOut={() => setHoveredPart(null)}
                  >
                    {part.name}
                  </div>
                </Html>
              )}

              <mesh
                onClick={(e) => {
                  e.stopPropagation();
                  handlePartClick(part);
                }}
                onPointerOver={() => setHoveredPart(part.id)}
                onPointerOut={() => setHoveredPart(null)}
              >
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial 
                  color={
                    focusedPart === part.id ? "#ef4444" : 
                    hoveredPart === part.id ? "#f59e0b" : "#3b82f6"
                  } 
                  emissive={focusedPart === part.id ? "#ef4444" : "#000000"}
                  emissiveIntensity={0.5}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            </>
          )}
        </group>
      ))}
    </primitive>
  );
};

const ThreeDViewer = ({ parts, onPartClick, isModalOpen }) => {
  const [focusedPart, setFocusedPart] = useState(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const controlsRef = useRef();

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      setFocusedPart(null);
    }
  }, [isModalOpen]);

  const handleResetView = () => {
    setFocusedPart(null);
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="three-d-viewer">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Model 
          url="/assets/models/result.gltf"
          parts={parts} 
          onPartClick={onPartClick}
          focusedPart={focusedPart}
          setFocusedPart={setFocusedPart}
        />
        <OrbitControls 
          ref={controlsRef}
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI/6}
          maxPolarAngle={Math.PI/2}
          target={focusedPart ? 
            [parts.find(p => p.id === focusedPart).position.x/50-1, 
             parts.find(p => p.id === focusedPart).position.y/50-1, 
             0] : [0, 0, 0]}
          enableDamping={true}
          dampingFactor={0.05}
          autoRotate={!focusedPart}
          autoRotateSpeed={1}
        />
      </Canvas>
      
      <div className="viewer-controls">
        <button 
          className="control-button"
          onClick={handleResetView}
        >
          Reset View
        </button>
        {isTouchDevice && (
          <div className="touch-instructions">
            <p>Pinch to zoom | Swipe to rotate</p>
          </div>
        )}
      </div>
    </div>
  );
};

useGLTF.preload('/assets/models/wheelchair.glb');

export default ThreeDViewer;