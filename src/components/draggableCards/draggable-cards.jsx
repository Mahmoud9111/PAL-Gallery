"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import GradientText from "../GradientText/GradientText";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable, InertiaPlugin);
}

// Utility function for className merging (replace with your own cn utility if you have one)
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function DraggableCardBody({ className, children }) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const draggableRef = useRef(null);
  const velocityTracker = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, lastTime: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Spring config matching the original Framer Motion feel
  const springConfig = {
    duration: 0.8,
    ease: "elastic.out(1, 0.75)",
  };

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || isDragging) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Calculate rotation based on mouse position (matching original ranges)
    const rotateX = gsap.utils.mapRange(-300, 300, 25, -25, deltaY);
    const rotateY = gsap.utils.mapRange(-300, 300, -25, 25, deltaX);

    // Calculate opacity and glare (matching original)
    const normalizedX = Math.abs(deltaX) / 300;
    const opacity = gsap.utils.clamp(0.8, 1, 1 - normalizedX * 0.2);
    const glareOpacity = gsap.utils.clamp(0, 0.2, normalizedX * 0.2);

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      opacity: opacity,
      duration: 0.15,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: glareOpacity,
        duration: 0.15,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, [isDragging]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current || isDragging) return;

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      ...springConfig,
      overwrite: "auto",
    });

    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0,
        ...springConfig,
        overwrite: "auto",
      });
    }
  }, [isDragging]);

  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current || isDragging) return;

    gsap.to(cardRef.current, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
      overwrite: false,
    });
  }, [isDragging]);

  useEffect(() => {
    if (!cardRef.current || typeof window === "undefined") return;

    const card = cardRef.current;
    let animationFrameId = null;

    // Create draggable instance with inertia for smooth skiing effect
    draggableRef.current = Draggable.create(card, {
      type: "x,y",
      bounds: {
        minX: -window.innerWidth / 2,
        maxX: window.innerWidth / 2,
        minY: -window.innerHeight / 2,
        maxY: window.innerHeight / 2,
      },
      inertia: true,
      throwResistance: 1500,
      overshootTolerance: 0,
      edgeResistance: 0.85,
      dragResistance: 0,
      onPress: function () {
        // Track velocity manually for smoother physics
        velocityTracker.current = {
          x: 0,
          y: 0,
          lastX: this.x,
          lastY: this.y,
          lastTime: performance.now(),
        };
      },
      onDragStart: function () {
        setIsDragging(true);
        document.body.style.cursor = "grabbing";
        
        // Kill any ongoing animations for clean drag start
        gsap.killTweensOf(card);
        
        gsap.to(card, {
          scale: 1.03,
          rotateX: 0,
          rotateY: 0,
          duration: 0.2,
          ease: "power2.out",
        });

        if (glareRef.current) {
          gsap.to(glareRef.current, {
            opacity: 0.1,
            duration: 0.2,
          });
        }
      },
      onDrag: function () {
        // Calculate velocity for momentum
        const now = performance.now();
        const dt = (now - velocityTracker.current.lastTime) / 1000;
        
        if (dt > 0) {
          velocityTracker.current.x = (this.x - velocityTracker.current.lastX) / dt;
          velocityTracker.current.y = (this.y - velocityTracker.current.lastY) / dt;
          velocityTracker.current.lastX = this.x;
          velocityTracker.current.lastY = this.y;
          velocityTracker.current.lastTime = now;
        }

        // Subtle tilt based on drag velocity for dynamic feel
        const tiltX = gsap.utils.clamp(-8, 8, -velocityTracker.current.y * 0.005);
        const tiltY = gsap.utils.clamp(-8, 8, velocityTracker.current.x * 0.005);
        
        gsap.to(card, {
          rotateX: tiltX,
          rotateY: tiltY,
          duration: 0.1,
          ease: "none",
          overwrite: "auto",
        });
      },
      onThrowUpdate: function () {
        // Continue tilt effect during throw/glide
        const vx = InertiaPlugin.getVelocity(card, "x") || 0;
        const vy = InertiaPlugin.getVelocity(card, "y") || 0;
        
        const tiltX = gsap.utils.clamp(-5, 5, -vy * 0.003);
        const tiltY = gsap.utils.clamp(-5, 5, vx * 0.003);
        
        gsap.set(card, {
          rotateX: tiltX,
          rotateY: tiltY,
        });
      },
      onThrowComplete: function () {
        // Smooth spring back to neutral after skiing stops
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        });

        if (glareRef.current) {
          gsap.to(glareRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      },
      onDragEnd: function () {
        setIsDragging(false);
        document.body.style.cursor = "default";

        // If no inertia/throw happens, reset immediately
        if (!this.tween) {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            ...springConfig,
          });

          if (glareRef.current) {
            gsap.to(glareRef.current, {
              opacity: 0,
              ...springConfig,
            });
          }
        }
      },
    })[0];

    // Handle window resize
    const handleResize = () => {
      if (draggableRef.current) {
        draggableRef.current.applyBounds({
          minX: -window.innerWidth / 2,
          maxX: window.innerWidth / 2,
          minY: -window.innerHeight / 2,
          maxY: window.innerHeight / 2,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (draggableRef.current) {
        draggableRef.current.kill();
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        willChange: "transform",
        transformStyle: "preserve-3d",
        touchAction: "none",
      }}
      className={cn(
        "relative min-h-[500px] w-[700px] overflow-hidden rounded-md bg-neutral-100 p-6 shadow-2xl cursor-grab active:cursor-grabbing",
        className
      )}
    >
      {children}
      <div
        ref={glareRef}
        style={{ opacity: 0 }}
        className="pointer-events-none absolute inset-0 bg-white select-none"
      />
    </div>
  );
}

export function DraggableCardContainer({ className, children }) {
  return (
    <div
      className={cn(className)}
      style={{ perspective: "3000px" }}
    >
      {children}
    </div>
  );
}

// Demo component with all cards
export default function DraggableCardsDemo() {
  const items = [
    {
      title: "Tyler Durden",
      image:
        "1.jpg",
      className: "absolute top-10 left-[35%] rotate-[5deg]",
    },
    {
      title: "The Narrator",
      image:
      "2.jpg",
      className: "absolute top-20 left-[25%] rotate-[4deg]",
    },
    {
      title: "Iceland",
      image:
      "3.jpg",
      className: "absolute top-5 left-[25%] rotate-[1deg]",
    },
    {
      title: "Japan",
      image:
      "4.jpg",
      className: "absolute top-32 left-[10%] rotate-[1deg]",
    },
    {
      title: "Norway",
      image:
      "5.jpg",
      className: "absolute top-20 right-[20%] rotate-[10deg]",
    },
    {
      title: "New Zealand",
      image:
      "6.jpg",
      className: "absolute top-34 left-[-25%] rotate-[1deg]",
    },
    {
      title: "Canada",
      image:
      "5.jpg",
      className: "absolute top-8 left-[-25%] rotate-[-7deg]",
    },
  ];

  return (
    <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
      <div className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black md:text-4xl">
        <GradientText 
          colors={['#274BFF', '#46F9FF', '#3770FF']}
          animationSpeed={5}
          direction="horizontal"
          className="text-2xl md:text-4xl font-black"
        >
          If its your first day at Fight Club, you have to fight.
        </GradientText>
      </div>
      {items.map((item, index) => (
        <DraggableCardBody key={index} className={item.className}>
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            className="pointer-events-none relative z-10 h-[400px] w-[700px] object-cover"
          />
          <h3 className="mt-4 text-center text-4xl font-bold text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
