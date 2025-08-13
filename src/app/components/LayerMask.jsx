'use client'
import React from 'react';
import { 
  Heart, Activity, Stethoscope, Pill, UserCheck, 
  Calendar, FileText, Shield, Thermometer, Cross
} from 'lucide-react';

const LayerMask = () => {
  const medicalIcons = [
    { Icon: Heart }, { Icon: Activity }, { Icon: Stethoscope },
    { Icon: Pill }, { Icon: UserCheck }, { Icon: Calendar },
    { Icon: FileText }, { Icon: Shield }, { Icon: Thermometer }, { Icon: Cross }
  ];

  const floatingIcons = Array.from({ length: 20 }, (_, i) => {
    const IconComponent = medicalIcons[i % medicalIcons.length].Icon;
    return {
      id: i,
      Icon: IconComponent,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 8,
      floatAmplitude: Math.random() * 15 + 5
    };
  });

  const particleDots = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3,
    duration: Math.random() * 5 + 8
  }));

  return (
    <div className="w-full h-full fixed top-0 left-0 z-[-1] overflow-hidden">
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="medicalGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="softBlur"/>
            <feMerge>
              <feMergeNode in="softBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--from)] via-[var(--via)] to-[var(--to)] opacity-20" />

      {/* Particle dots */}
      <div className="absolute inset-0">
        {particleDots.map((dot) => (
          <div
            key={dot.id}
            className="absolute rounded-full opacity-40"
            style={{
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              background: `var(--surface, #5c3ad8)`,
              boxShadow: `0 0 ${dot.size * 2}px var(--surface, #5c3ad8)`,
              filter: 'url(#softGlow)',
              animation: `calmFloat ${dot.duration}s ease-in-out ${dot.delay}s infinite`
            }}
          />
        ))}
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0">
        {floatingIcons.map((icon) => {
          const Icon = icon.Icon;
          return (
            <div
              key={icon.id}
              className="absolute"
              style={{
                left: `${icon.x}%`,
                top: `${icon.y}%`,
                animation: `calmIcon ${icon.duration}s cubic-bezier(0.42, 0, 0.58, 1) ${icon.delay}s infinite`
              }}
            >
              <Icon
                size={icon.size}
                className="text-[var(--surface)] opacity-70"
                style={{ filter: 'url(#medicalGlow)' }}
              />
            </div>
          );
        })}
      </div>

      {/* Cross pulse pattern */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 2) * 30}%`,
              animation: `calmPulse ${3 + i}s cubic-bezier(0.42, 0, 0.58, 1) infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <Cross size={40} className="text-[var(--surface)]" style={{ filter: 'url(#medicalGlow)' }} />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes calmFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-10px) scale(1.05); opacity: 0.8; }
        }
        @keyframes calmIcon {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          25% { transform: translate(5px, -10px) scale(1.05); opacity: 0.8; }
          50% { transform: translate(-5px, 5px) scale(0.95); opacity: 0.7; }
          75% { transform: translate(3px, -5px) scale(1.03); opacity: 0.85; }
        }
        @keyframes calmPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.15); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default LayerMask;
