import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';


function ThreeBackground() {
  const outerRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pointerX = state.pointer.x * 0.5;
    const pointerY = state.pointer.y * 0.5;

    // Slow automatic spin + pointer movement tracking
    if (outerRef.current) {
      outerRef.current.rotation.y = time * 0.12 + pointerX * 0.15;
      outerRef.current.rotation.x = time * 0.06 + pointerY * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -time * 0.18 - pointerX * 0.15;
      innerRef.current.rotation.x = -time * 0.09 - pointerY * 0.15;
    }
  });

  return (
    <group>
      {/* Outer Sphere (Blue) */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[1.7, 18, 18]} />
        <meshBasicMaterial color="#046bd2" wireframe transparent opacity={0.35} />
      </mesh>
      {/* Inner Sphere (Red) */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[1.2, 14, 14]} />
        <meshBasicMaterial color="#e03131" wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

export default function ImpactHero() {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const line1Text = 'THE LESS YOU CHASE,';
  const line2Text = 'THE MORE THEY COME.';

  useEffect(() => {
    let active = true;
    let timerId = null;

    const runTypewriter = async () => {
      // Settle delay before typing
      await new Promise(resolve => {
        timerId = setTimeout(resolve, 600);
      });
      if (!active) return;

      // Type line 1
      for (let i = 0; i <= line1Text.length; i++) {
        if (!active) return;
        setLine1(line1Text.slice(0, i));
        await new Promise(resolve => {
          timerId = setTimeout(resolve, 65);
        });
      }

      // Pause between lines
      await new Promise(resolve => {
        timerId = setTimeout(resolve, 350);
      });
      if (!active) return;

      // Type line 2
      for (let i = 0; i <= line2Text.length; i++) {
        if (!active) return;
        setLine2(line2Text.slice(0, i));
        await new Promise(resolve => {
          timerId = setTimeout(resolve, 65);
        });
      }
    };

    runTypewriter();

    return () => {
      active = false;
      clearTimeout(timerId);
    };
  }, []);

  // Blinking cursor logic
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[var(--color-impact-beige)] overflow-hidden border-b-2 border-black pt-[120px] pb-[70px] px-6 md:px-12">
      <div className="z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column - Content & Copy */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Logo */}
          <div className="mb-[25px]">
            <img 
              src="/paradox-logo-trans.png" 
              alt="Paradox Logo" 
              className="h-[75px] md:h-[85px] w-auto max-w-[200px] object-contain" 
            />
          </div>

          {/* Dynamic Typewriter Heading */}
          <h1 className="font-sans font-bold text-3xl sm:text-5xl md:text-[3.5rem] uppercase text-black tracking-tight leading-[1.15] mb-6 select-none min-h-[90px] md:min-h-[140px]">
            <span className="block">
              {line1}
              {(!line1 || (line1 && !line2)) && (
                <span className={`inline-block ml-1 text-[#046bd2] font-light transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
                  |
                </span>
              )}
            </span>
            <span className="block">
              {line2}
              {line2 && (
                <span className={`inline-block ml-1 text-[#046bd2] font-light transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
                  |
                </span>
              )}
            </span>
          </h1>

          {/* Flickering Tagline Badge Button */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-8 select-none">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e03131] animate-[pulse_1.5s_ease-in-out_infinite] shadow-[0_0_8px_rgba(224,49,49,0.8)]"></span>
            <span className="text-xs font-sans font-bold tracking-widest text-black">
              SOCIAL MEDIA LEADGEN AGENCY
            </span>
          </div>

          {/* Hero Paragraph Text */}
          <p className="text-black text-[1.05rem] md:text-[1.15rem] font-sans font-medium max-w-[680px] leading-[1.65] mb-[30px]">
            At Paradox, we build digital experiences that demand attention and drive growth. We believe in a simple contradiction: that the most <strong className="text-[#e03131] font-bold">impactful creative</strong> is backed by the most <strong className="text-[#046bd2] font-bold">precise systems</strong>. We make your brand impossible to ignore.
          </p>

          {/* Blue Brutalist Button */}
          <button 
            onClick={() => handleScroll('approach')}
            className="bg-[#046bd2] hover:bg-[#0352a2] text-white px-[30px] py-[15px] font-sans font-bold text-[1rem] border-2 border-black rounded-[4px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer font-sans"
          >
            Know More &rarr;
          </button>
        </div>

        {/* Right Column - Transparent 3D Globe */}
        <div className="lg:col-span-5 w-full flex justify-center z-10">
          <div className="w-full max-w-[450px] lg:max-w-none h-[360px] md:h-[460px] relative">
            <Canvas camera={{ position: [0, 0, 4.0], fov: 60 }} className="w-full h-full cursor-grab active:cursor-grabbing">
              <ThreeBackground />
              <OrbitControls enableZoom={false} enableDamping={true} dampingFactor={0.05} />
            </Canvas>
          </div>
        </div>

      </div>
    </section>
  );
}
