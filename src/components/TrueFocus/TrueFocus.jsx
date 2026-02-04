"use client";

import React from "react"

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const TrueFocus = ({
  sentence = "True Focus",
  separator = " ",
  manualMode = false,
  blurAmount = 5,
  borderColor = "#5227FF",
  glowColor = "rgba(82, 39, 255, 0.6)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  showBordersOnAll = false,
}) => {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const focusRef = useRef(null);
  const [focusRect, setFocusRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // Auto-cycle through words when not in manual mode
  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(
        () => {
          setCurrentIndex((prev) => (prev + 1) % words.length);
        },
        (animationDuration + pauseBetweenAnimations) * 1000
      );

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  // Calculate focus rectangle position
  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex].getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  // GSAP animation for focus rectangle
  useEffect(() => {
    if (!focusRef.current) return;

    gsap.to(focusRef.current, {
      x: focusRect.x,
      y: focusRect.y,
      width: focusRect.width,
      height: focusRect.height,
      opacity: currentIndex >= 0 ? 1 : 0,
      duration: animationDuration,
      ease: "power2.out",
    });
  }, [focusRect, currentIndex, animationDuration]);

  // GSAP animation for word blur
  useEffect(() => {
    wordRefs.current.forEach((wordRef, index) => {
      if (!wordRef) return;

      const isActive = index === currentIndex;
      gsap.to(wordRef, {
        filter: isActive ? "blur(0px)" : `blur(${blurAmount}px)`,
        duration: animationDuration,
        ease: "power2.out",
      });
    });
  }, [currentIndex, blurAmount, animationDuration]);

  const handleMouseEnter = (index) => {
    setLastActiveIndex(currentIndex);
    setCurrentIndex(index);
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex);
    }
  };

  return (
    <div
      className="relative flex gap-4 justify-center items-center flex-wrap"
      ref={containerRef}
      style={{ outline: "none", userSelect: "none" }}
    >
      {words.map((word, index) => (
        <span
          key={index}
          ref={(el) => {
            wordRefs.current[index] = el;
          }}
          className="relative text-[3rem] font-black cursor-pointer text-foreground"
          style={{
            filter: `blur(${index === 0 ? 0 : blurAmount}px)`,
            outline: "none",
            userSelect: "none",
            ...(showBordersOnAll && {
              border: `2px solid #ffffff`,
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              boxShadow: `0 0 8px #000000`,
            }),
          }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {word}
        </span>
      ))}

      <div
        ref={focusRef}
        className="absolute top-0 left-0 pointer-events-none box-border border-0"
        style={{
          "--border-color": borderColor,
          "--glow-color": glowColor,
        }}
      >
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] left-[-10px] border-r-0 border-b-0"
          style={{
            borderColor: borderColor,
            filter: `drop-shadow(0 0 4px ${borderColor})`,
          }}
        />
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0"
          style={{
            borderColor: borderColor,
            filter: `drop-shadow(0 0 4px ${borderColor})`,
          }}
        />
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0"
          style={{
            borderColor: borderColor,
            filter: `drop-shadow(0 0 4px ${borderColor})`,
          }}
        />
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0"
          style={{
            borderColor: borderColor,
            filter: `drop-shadow(0 0 4px ${borderColor})`,
          }}
        />
      </div>
    </div>
  );
};

export default TrueFocus;
