// components/ThreeDViewer/ThreeDViewer.js
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import WebGLErrorBoundary from '../WebGLErrorBoundary';
import './ThreeDViewer.css';

const Model = ({ url, parts, onPartClick, focusedPart, setFocusedPart }) => {
  const { scene } = useGLTF(url);
  const groupRef = useRef();
  const { camera } = useThree();
  const [hoveredPart, setHoveredPart] = useState(null);
  const [visibleParts, setVisibleParts] = useState(new Set());
  const rotationSpeed = useRef(0.002);

  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim;
      scene.scale.set(scale, scale, scale);
    }
  }, [scene]);

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
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <primitive object={scene} />
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
    </group>
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
      <WebGLErrorBoundary>
        <Canvas 
          camera={{ 
            position: [0, 0, 2.5], 
            fov: 50,
            near: 0.1,
            far: 1000 
          }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: true
          }}
        >
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
            minDistance={1.5}
            maxDistance={5}
            minPolarAngle={Math.PI/6}
            maxPolarAngle={Math.PI/2}
            target={[0, 0, 0]}
            enableDamping={true}
            dampingFactor={0.05}
            autoRotate={!focusedPart}
            autoRotateSpeed={1}
          />
        </Canvas>
      </WebGLErrorBoundary>
      
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