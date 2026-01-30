import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook to measure element width and update on resize
 */
const useElementWidth = (ref) => {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);

  return width;
};

/**
 * ScrollVelocity Component - Single scrolling text line
 */
const ScrollVelocity = ({
  children,
  velocity = 100,
  scrollContainerRef,
  className = "",
  damping = 50,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
}) => {
  const scrollerRef = useRef(null);
  const copyRef = useRef(null);
  const copyWidth = useElementWidth(copyRef);
  const animationRef = useRef(null);
  const xPositionRef = useRef(0);
  const velocityRef = useRef(0);
  const directionRef = useRef(1);
  const lastScrollYRef = useRef(0);
  const smoothVelocityRef = useRef(0);

  useGSAP(() => {
    if (!scrollerRef.current || copyWidth === 0) return;

    // Wrap function for seamless looping
    const wrap = (min, max, v) => {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    };

    // Map velocity value from input range to output range
    const mapRange = (value, inMin, inMax, outMin, outMax) => {
      return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    };

    // Smooth velocity with spring-like damping
    const smoothVelocity = (targetVelocity, currentVelocity, damping, delta) => {
      const dampingFactor = Math.min(1, damping * delta);
      return currentVelocity + (targetVelocity - currentVelocity) * dampingFactor;
    };

    // Create ScrollTrigger to track scroll velocity
    const scrollTrigger = ScrollTrigger.create({
      trigger: scrollContainerRef?.current || document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const currentScrollY = self.scroll();
        const scrollDelta = currentScrollY - lastScrollYRef.current;
        
        // Calculate instantaneous velocity (pixels per frame)
        velocityRef.current = scrollDelta;
        lastScrollYRef.current = currentScrollY;
      },
    });

    // Animation loop
    const animate = () => {
      const delta = 1 / 60; // Approximate 60fps

      // Apply smoothing to velocity
      const targetVelocity = velocityRef.current;
      smoothVelocityRef.current = smoothVelocity(
        targetVelocity,
        smoothVelocityRef.current,
        damping / 1000, // Convert to appropriate scale
        delta
      );

      // Map velocity to velocity factor
      const velocityFactor = mapRange(
        Math.abs(smoothVelocityRef.current),
        velocityMapping.input[0],
        velocityMapping.input[1],
        velocityMapping.output[0],
        velocityMapping.output[1]
      );

      // Update direction based on scroll direction
      if (smoothVelocityRef.current < 0) {
        directionRef.current = -1;
      } else if (smoothVelocityRef.current > 0) {
        directionRef.current = 1;
      }

      // Calculate base movement
      let moveBy = directionRef.current * velocity * delta;
      
      // Add velocity-based acceleration
      moveBy += directionRef.current * moveBy * velocityFactor;

      // Update position
      xPositionRef.current += moveBy;

      // Wrap position for seamless looping
      const wrappedX = wrap(-copyWidth, 0, xPositionRef.current);

      // Apply transform
      if (scrollerRef.current) {
        gsap.set(scrollerRef.current, {
          x: wrappedX,
        });
      }

      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
    };
  }, [
    copyWidth,
    velocity,
    scrollContainerRef,
    damping,
    velocityMapping,
  ]);

  // Render multiple copies for seamless scrolling
  const spans = [];
  for (let i = 0; i < numCopies; i++) {
    spans.push(
      <span
        className={`flex-shrink-0 ${className}`}
        key={i}
        ref={i === 0 ? copyRef : null}
      >
        {children}
      </span>
    );
  }

  return (
    <div
      className={`${parallaxClassName || ""} relative overflow-hidden h-[120px] flex items-center`}
      style={parallaxStyle}
    >
      <div
        ref={scrollerRef}
        className={`${scrollerClassName || ""} flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem]`}
        style={{ ...scrollerStyle, willChange: "transform" }}
      >
        {spans}
      </div>
    </div>
  );
};

export default ScrollVelocity;
