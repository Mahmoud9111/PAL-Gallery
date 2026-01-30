import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

// Utility function for className merging (you can replace with your own cn utility)
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ============================================
// LAYOUT TEXT FLIP COMPONENT
// ============================================
// Dependencies: gsap (npm install gsap)
// Usage: <LayoutTextFlip text="Welcome to" words={["React", "GSAP", "Magic"]} />
// ============================================

export const LayoutTextFlip = ({
  text = "Build Amazing",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedWord, setDisplayedWord] = useState(words[0]);
  const wordRef = useRef(null);
  const containerRef = useRef(null);
  const isAnimating = useRef(false);

  const animateWord = useCallback(
    (newIndex) => {
      if (!wordRef.current || !containerRef.current || isAnimating.current)
        return;

      isAnimating.current = true;
      const newWord = words[newIndex];

      // Create a temporary span to measure the new word width
      const tempSpan = document.createElement("span");
      const computedStyle = window.getComputedStyle(wordRef.current);
      tempSpan.style.cssText = `
        visibility: hidden;
        position: absolute;
        white-space: nowrap;
        font-family: ${computedStyle.fontFamily};
        font-size: ${computedStyle.fontSize};
        font-weight: ${computedStyle.fontWeight};
        letter-spacing: ${computedStyle.letterSpacing};
      `;
      tempSpan.textContent = newWord;
      document.body.appendChild(tempSpan);
      const newWidth = tempSpan.offsetWidth;
      document.body.removeChild(tempSpan);

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
        },
      });

      // Exit animation
      tl.to(wordRef.current, {
        y: 50,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.25,
        ease: "power2.in",
      });

      // Animate container width
      tl.to(
        containerRef.current,
        {
          width: newWidth + 64, // Adding padding (px-8 = 32px * 2)
          duration: 0.3,
          ease: "power2.inOut",
        },
        "-=0.1"
      );

      // Update text and enter animation
      tl.call(() => {
        setDisplayedWord(newWord);
        setCurrentIndex(newIndex);
      });

      tl.set(wordRef.current, {
        y: -40,
        opacity: 1,
        filter: "blur(10px)",
      });

      tl.to(wordRef.current, {
        y: 0,
        filter: "blur(0px)",
        duration: 0.25,
        ease: "power2.out",
      });
    },
    [words]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % words.length;
      animateWord(nextIndex);
    }, duration);

    return () => clearInterval(interval);
  }, [currentIndex, words.length, duration, animateWord]);

  // Set initial width
  useEffect(() => {
    if (containerRef.current && wordRef.current) {
      gsap.set(containerRef.current, {
        width: wordRef.current.offsetWidth + 64,
      });
    }
  }, []);

  return (
    <>
      <span className="text-6xl font-bold tracking-tight drop-shadow-2xl md:text-8xl lg:text-9xl">
        {text}
      </span>

      <span
        ref={containerRef}
        className="relative inline-flex items-center justify-center overflow-hidden rounded-md border border-transparent bg-white px-8 py-6 font-sans text-6xl font-bold tracking-tight text-blue-500 shadow-xl ring shadow-black/10 ring-black/10 drop-shadow-2xl md:text-8xl lg:text-9xl"
      >
        <span ref={wordRef} className={cn("inline-block whitespace-nowrap")}>
          {displayedWord}
        </span>
      </span>
    </>
  );
};

// ============================================
// DEMO COMPONENT (Example Usage)
// ============================================

export default function LayoutTextFlipDemo() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="relative mx-4 my-4 flex flex-col items-center justify-center text-black gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
        <LayoutTextFlip
          text="Welcome to rege"
          words={["Aceternity UI", "Fight Club", "The Matrix", "The Jungle"]}
        />
      </div>
      <p className="mt-8 text-center text-xl max-w-7xl mx-auto text-black md:text-2xl lg:text-7xl ">
        Experience the power of modern UI components that bring your ideas to
        life.
      </p>
    </div>
  );
}
