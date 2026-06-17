import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function ParadoxShape() {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate and float the geometry over time
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time / 4) * 0.5;
      meshRef.current.rotation.y = time * 0.4;
      meshRef.current.position.y = Math.sin(time) * 0.15;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={active ? 1.4 : 1.1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* Torus Knot Geometry */}
      <torusKnotGeometry args={[1.2, 0.4, 150, 16]} />
      {/* Neo-brutalist wireframe look */}
      <meshStandardMaterial
        color={hovered ? '#ffd23f' : '#046bd2'}
        roughness={0.1}
        metalness={0.9}
        wireframe={true}
        wireframeLinewidth={2}
      />
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <div className="w-full h-[320px] md:h-[450px] cursor-grab active:cursor-grabbing neo-border bg-black relative shadow-none">
      {/* Grid pattern background for a tech feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>
      
      {/* Tag indicator on the Neo-Brutalist Box */}
      <div className="absolute top-4 left-4 bg-accent text-black font-montserrat font-bold text-xs uppercase px-2.5 py-1 neo-border z-10">
        3D Interactive Paradox Knot
      </div>
      <div className="absolute bottom-4 right-4 text-gray-500 font-poppins text-xs pointer-events-none z-10 select-none">
        Drag to orbit • Click to scale • Hover to light up
      </div>

      <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }} className="w-full h-full">
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-5, 5, 5]} intensity={1.2} />
        <ParadoxShape />
        <OrbitControls enableZoom={false} enableDamping={true} dampingFactor={0.05} />
      </Canvas>
    </div>
  );
}
