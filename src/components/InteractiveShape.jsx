import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useLocation } from 'react-router-dom';

const InteractiveShape = () => {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const coreRef = useRef();
  const location = useLocation();
  
  // State for mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Target positions based on the current page
  const [targetPos, setTargetPos] = useState(new THREE.Vector3(0, 0, 0));

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Update target position based on route to make it dynamic
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setTargetPos(new THREE.Vector3(0, 0, 0));
        break;
      case '/about':
        setTargetPos(new THREE.Vector3(2, 1, -2));
        break;
      case '/services':
        setTargetPos(new THREE.Vector3(-2, -1, -1));
        break;
      case '/projects':
        setTargetPos(new THREE.Vector3(0, 2, -3));
        break;
      case '/contact':
        setTargetPos(new THREE.Vector3(-2, 0, 1));
        break;
      default:
        setTargetPos(new THREE.Vector3(0, 0, 0));
    }
  }, [location.pathname]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Slow continuous rotation
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.2;
      coreRef.current.rotation.y += delta * 0.3;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x -= delta * 0.4;
      ring1Ref.current.rotation.y -= delta * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x += delta * 0.1;
      ring2Ref.current.rotation.y += delta * 0.5;
    }

    // React slightly to mouse movement
    const mouseOffsetX = mousePosition.x * 0.8;
    const mouseOffsetY = mousePosition.y * 0.8;
    
    // Scroll effect (rotate and slightly move down)
    const scrollEffectY = scrollY * 0.002;
    
    // Lerp position towards the combined target (Route Target + Mouse + Scroll)
    const finalX = targetPos.x + mouseOffsetX;
    const finalY = targetPos.y + mouseOffsetY + scrollEffectY;
    const finalZ = targetPos.z;

    groupRef.current.position.lerp(new THREE.Vector3(finalX, finalY, finalZ), 0.05);
    
    // Rotate the whole group based on scroll for an extra dynamic feel
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, scrollY * 0.001, 0.05);
  });

  return (
    <Float 
      speed={2} 
      rotationIntensity={0.5} 
      floatIntensity={2} 
    >
      <group ref={groupRef}>
        {/* Core Planet */}
        <mesh ref={coreRef} scale={1.8}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial 
            color="#0a192f" 
            roughness={0.7} 
            metalness={0.3} 
            emissive="#001833" 
            emissiveIntensity={0.5} 
          />
        </mesh>

        {/* Planet Atmosphere Glow */}
        <mesh scale={1.9}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial 
            color="#00D4FF" 
            transparent 
            opacity={0.15} 
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Planetary Ring 1 (Asteroid Belt style) */}
        <mesh ref={ring1Ref} rotation={[Math.PI / 2.2, 0.1, 0]}>
          <torusGeometry args={[2.8, 0.03, 16, 100]} />
          <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={2} toneMapped={false} transparent opacity={0.8} />
        </mesh>
        
        {/* Planetary Ring 2 */}
        <mesh ref={ring2Ref} rotation={[Math.PI / 2.2, -0.1, 0]}>
          <torusGeometry args={[3.4, 0.01, 16, 100]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} toneMapped={false} transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
};

export default InteractiveShape;
