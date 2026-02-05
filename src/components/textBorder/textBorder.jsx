import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

export const TextHoverEffect = ({
  text,
  duration = 0,
  fontSize = "text-7xl",
  fontWeight = "font-bold",
  fontFamily = "font-[helvetica]",
  strokeColor = "stroke-neutral-200 dark:stroke-neutral-800",
  strokeWidth = "0.3",
  gradientColors = ["#274BFF", "#46F9FF", "#3770FF"],
  viewBox = "0 0 300 100",
  className = "",
  animateGradient = true,
  animationSpeed = 8,
}) => {
  const svgRef = useRef(null);
  const maskGradientRef = useRef(null);
  const animatedTextRef = useRef(null);
  const strokeGradientRef = useRef(null);
  const tweenRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const [gradientOffset, setGradientOffset] = useState(0);

  // Update mask position based on cursor
  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      
      const newPosition = {
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      };

      setMaskPosition(newPosition);

      // Animate mask position with GSAP
      if (maskGradientRef.current) {
        gsap.to(maskGradientRef.current, {
          attr: {
            cx: newPosition.cx,
            cy: newPosition.cy,
          },
          duration: duration || 0,
          ease: "power2.out",
        });
      }
    }
  }, [cursor, duration]);

  // Animate stroke on mount
  useEffect(() => {
    if (animatedTextRef.current) {
      gsap.fromTo(
        animatedTextRef.current,
        {
          strokeDashoffset: 1000,
          strokeDasharray: 1000,
        },
        {
          strokeDashoffset: 0,
          duration: 4,
          ease: "power2.inOut",
        }
      );
    }
  }, []);

  // Animate gradient for stroke
  useEffect(() => {
    if (!animateGradient) return;

    const animationObj = { progress: 0 };

    tweenRef.current = gsap.to(animationObj, {
      progress: 100,
      duration: animationSpeed,
      ease: 'none',
      repeat: -1,
      yoyo: true,
      onUpdate: () => {
        setGradientOffset(animationObj.progress);
      },
    });

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
    };
  }, [animateGradient, animationSpeed]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={`select-none ${className}`}
    >
      <defs>
        {/* Animated stroke gradient */}
        <linearGradient
          ref={strokeGradientRef}
          id="strokeGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          {[...gradientColors, gradientColors[0]].map((color, index) => {
            const totalStops = gradientColors.length + 1;
            const baseOffset = (index / totalStops) * 100;
            const adjustedOffset = (baseOffset + gradientOffset) % 100;
            
            return (
              <stop 
                key={index}
                offset={`${adjustedOffset}%`}
                stopColor={color}
              />
            );
          })}
        </linearGradient>

        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && gradientColors.map((color, index) => (
            <stop 
              key={index}
              offset={`${(index / (gradientColors.length - 1)) * 100}%`}
              stopColor={color}
            />
          ))}
        </linearGradient>

        <radialGradient
          ref={maskGradientRef}
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          cx={maskPosition.cx}
          cy={maskPosition.cy}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>

      {/* Background text that appears on hover */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth={strokeWidth}
        stroke={animateGradient ? "url(#strokeGradient)" : undefined}
        className={`fill-transparent ${!animateGradient ? strokeColor : ''} ${fontFamily} ${fontSize} ${fontWeight}`}
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>

      {/* Animated stroke text */}
      <text
        ref={animatedTextRef}
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth={strokeWidth}
        stroke={animateGradient ? "url(#strokeGradient)" : undefined}
        className={`fill-transparent ${!animateGradient ? strokeColor : ''} ${fontFamily} ${fontSize} ${fontWeight}`}
      >
        {text}
      </text>

      {/* Gradient text with mask */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth={strokeWidth}
        mask="url(#textMask)"
        className={`fill-transparent ${fontFamily} ${fontSize} ${fontWeight}`}
      >
        {text}
      </text>
    </svg>
  );
};

// Demo component (can be used directly or imported separately)
export default function TextBorderDemo() {
  return (
    <div className="h-[40rem] flex items-center justify-center">
      <TextHoverEffect 
        text="PALSD"
        fontSize="text-7xl"
        fontWeight="font-bold"
        fontFamily="font-[helvetica]"
        strokeWidth="0.3"
        gradientColors={["#274BFF", "#46F9FF", "#3770FF"]}
        viewBox="0 0 300 100"
        duration={0}
        animateGradient={true}
        animationSpeed={8}
      />
    </div>
  );
}
