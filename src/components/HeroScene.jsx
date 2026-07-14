import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, Sparkles, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import InteractiveShape from './InteractiveShape';

const HeroScene = () => {
  return (
    // position: fixed makes it span the whole screen in the background
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]} // Support for high-dpi displays
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'auto' }} // Re-enable pointer events for the canvas itself if needed
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <spotLight position={[-10, 10, 10]} intensity={2} angle={0.3} penumbra={1} color="#00D4FF" />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          
          <InteractiveShape />
          
          {/* Space background with stars and nebula dust */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Sparkles count={200} scale={20} size={2} speed={0.2} opacity={0.5} color="#00D4FF" />

          {/* Soft shadow directly below the object */}
          <ContactShadows 
            position={[0, -3.5, 0]} 
            opacity={0.4} 
            scale={15} 
            blur={2.5} 
            far={4} 
            color="#00D4FF" 
          />
        </Suspense>

        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
          <Noise opacity={0.03} />
          <Vignette eskil={false} offset={0.1} darkness={0.9} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default HeroScene;
