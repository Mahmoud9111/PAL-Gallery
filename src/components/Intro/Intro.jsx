import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ScrollVelocity from "../ScrollVelocity/ScrollVelocity";

gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const imageContainerRef = useRef(null);
    const scrollTriggerRef = useRef(null);
    const timelineRef = useRef(null);
    const secondImageRef = useRef(null);
    const secondImageContainerRef = useRef(null);
    const textOverlayRef = useRef(null);
    const secondTextOverlayRef = useRef(null);
    const thirdImageRef = useRef(null);
    const thirdImageContainerRef = useRef(null);
    const thirdTextOverlayRef = useRef(null);

    useGSAP(() => {
        const container = containerRef.current;
        if (!container || !imageRef.current) return;

        // Kill any existing ScrollTrigger and timeline
        if (scrollTriggerRef.current) {
            scrollTriggerRef.current.kill();
            scrollTriggerRef.current = null;
        }
        if (timelineRef.current) {
            timelineRef.current.kill();
            timelineRef.current = null;
        }
        // Kill by ID as well (in case refs are lost)
        const existingST = ScrollTrigger.getById("intro-scroll-trigger");
        if (existingST) {
            existingST.kill();
        }

        // Set initial states - "before" state: image at container sizesible
        // gsap.set() instantly sets properties without animation (initial state)
        gsap.set(imageRef.current, {
            scale:0.60, // Start image at container size (100% of container))
            opacity: 1, // Image is fully visible from the start
            borderRadius: "22rem", // Sets rounded corners for the image
        });

        // Set initial states for image1 container - same as image1
        if (imageContainerRef.current) {
            gsap.set(imageContainerRef.current, {
                scale: 0.60,
                opacity: 1,
                borderRadius: "15rem",
            });
        }

        // Set initial states for second image and text - start from bottom
        const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
        if (secondImageRef.current) {
            gsap.set(secondImageRef.current, {
                opacity: 1, // Always visible
                y: viewportHeight, // Start from bottom of viewport
                scale: 1.0, // Fixed scale at 0.9
                borderRadius: "20.5rem",
            });
        }

        // Set initial states for image2 container - same as image2
        if (secondImageContainerRef.current) {
            gsap.set(secondImageContainerRef.current, {
                opacity: 1,
                y: viewportHeight,
                scale: 1.0,
                borderRadius: "20.5rem",
            });
        }

        // Set initial states for text overlay - hidden and off-screen to the right
        if (textOverlayRef.current) {
            gsap.set(textOverlayRef.current, {
                opacity: 0,
                x: 25, // Start off-screen to the right
            });
        }

        // Set initial states for second text overlay - hidden and off-screen to the right
        if (secondTextOverlayRef.current) {
            gsap.set(secondTextOverlayRef.current, {
                opacity: 0,
                x: 25, // Start off-screen to the right
            });
        }

        // Set initial states for third image and text - start from bottom
        if (thirdImageRef.current) {
            gsap.set(thirdImageRef.current, {
                opacity: 1,
                y: viewportHeight,
                scale: 1.0,
                borderRadius: "20.5rem",
            });
        }

        // Set initial states for image3 container - same as image3
        if (thirdImageContainerRef.current) {
            gsap.set(thirdImageContainerRef.current, {
                opacity: 1,
                y: viewportHeight,
                scale: 1.0,
                borderRadius: "20.5rem",
            });
        }

        // Set initial states for third text overlay - hidden and off-screen to the right
        if (thirdTextOverlayRef.current) {
            gsap.set(thirdTextOverlayRef.current, {
                opacity: 0,
                x: 25,
            });
        }

        // Create the main scroll timeline - sequences multiple animations together
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container, // The container element triggers animation when it enters viewport
                start: "top top", // Animation starts when top of container reaches top of viewport
               end: "+=650%", // Extended scroll distance to accommodate all three images
                pin: true, // Pins (fixes) the container in place while scrolling through animation
                scrub: 1, // Ties animation progress directly to scroll position with 1 second lag for smoothness
                id: "intro-scroll-trigger", // Unique ID for easy reference and cleanup
                // markers: true, // Uncomment for debugging - shows start/end points visually
                invalidateOnRefresh: true, // Recalculates positions when window is resized
            },
        });

        // Store references for cleanup - prevents memory leaks
        timelineRef.current = tl; // Save timeline instance in ref for cleanup
        // Get ScrollTrigger instance from timeline or by ID - for cleanup purposes
        scrollTriggerRef.current = tl.scrollTrigger || ScrollTrigger.getById("intro-scroll-trigger");

        // Phase 1: Image stays at container size, just changes border radius
        // Animate both image1 and its container together
        const image1Targets = imageContainerRef.current 
            ? [imageRef.current, imageContainerRef.current]
            : [imageRef.current];
        
        tl.to(image1Targets, {
            scale: 1.01, // Animates image from 0.7 to 0.9 scale (70% to 90% size)
            borderRadius: "10.5rem", // Sets rounded corners for the image% to 70% size)
            duration: 5.5, // Takes 60% of the total scroll distance to complete
            ease: "power2.out", // Easing: starts fast, ends slow (decelerates)
            // Phase 2: Image transitions to full view (keeps at 1.0 scale)
        })
            // Phase 2: Continue growing - image becomes more prominent

            // Phase 3: Image reaches final size

        
        // Phase 3: Text animation - slide in from right to left
        if (textOverlayRef.current) {
            tl.to(
                textOverlayRef.current,
                {
                    opacity: 1,
                    x: 0, // Move to final position
                    duration:  5.5,
                    ease: "power2.out",
                },
                "-=0.4" // Start during phase 3
            );
        }
        
        // Phase 6: Scale down first image slightly and keep it visible
        tl.to(
                image1Targets,
                {
                    scale: 0.95, // Scale down to 75% to make room for new images
                    duration:  5.5,
                    ease: "power2.inOut",
                },
                "+=0.2" // Start after a small delay
            );

        // Phase 7-9: Second images (only if refs exist)
        if (secondImageRef.current) {
            const image2Targets = secondImageContainerRef.current
                ? [secondImageRef.current, secondImageContainerRef.current]
                : [secondImageRef.current];
            
            tl.to(
                image2Targets,
                {
                    y: 0, // Move to center position
                    scale: 1.01,
                    borderRadius: "6.5rem",
                    duration: 20.5,
                    ease: "power2.out",
                },
                "-=10"
            );

            // After Phase 9: Second image text animation - slide in from right to left
            if (secondTextOverlayRef.current) {
                tl.to(
                    secondTextOverlayRef.current,
                    {
                        opacity: 1,
                        x: 0, // Move to final position
                        duration:5.5,
                        ease: "power2.out",
                    },
                    "+=0.2" // Start after phase 9 completes
                );
            }
        }

        // Phase 10: Scale down second image slightly and keep it visible when third image comes up
        if (secondImageRef.current) {
            const image2Targets = secondImageContainerRef.current
                ? [secondImageRef.current, secondImageContainerRef.current]
                : [secondImageRef.current];
            
            tl.to(
                image2Targets,
                {
                    scale: 0.95, // Scale down to 95% to make room for new image
                    duration:5.5,
                    ease: "power2.inOut",
                },
                "+=0.2" // Start after a small delay
            );
        }

        // Phase 10-12: Third images (only if refs exist)
        if (thirdImageRef.current) {
            const image3Targets = thirdImageContainerRef.current
                ? [thirdImageRef.current, thirdImageContainerRef.current]
                : [thirdImageRef.current];

            tl.to(
                image3Targets,
                {
                    y: 0,
                    scale: 1.01,
                    borderRadius: "6.5rem",
                    duration: 20.5,
                    ease: "power2.out",
                },
                "-=10" // Start before the scale-down animation completes (overlaps)
            );

            if (thirdTextOverlayRef.current) {
                tl.to(
                    thirdTextOverlayRef.current,
                    {
                        opacity: 1,
                        x: 0,
                        duration: 5.5,
                        ease: "power2.out",
                    },
                    "+=0.2"
                );
            }
        }

        // Cleanup function - runs when component unmounts or dependencies change (prevents memory leaks)
        return () => {
            // Kill ScrollTrigger if it exists in the ref
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill(); // Removes ScrollTrigger and stops all animations
                scrollTriggerRef.current = null; // Clears the ref
            }
            // Kill timeline if it exists in the ref
            if (timelineRef.current) {
                timelineRef.current.kill(); // Removes timeline and stops all animations
                timelineRef.current = null; // Clears the ref
            }
            // Also kill by ID as fallback (in case refs are lost)
            const st = ScrollTrigger.getById("intro-scroll-trigger");
            if (st) {
                st.kill(); // Removes ScrollTrigger by ID as safety net
            }
        };
    }, []);



    return (









        
        <section
            ref={containerRef}
            className="intro-section relative w-full mx-auto h-screen bg-[#ffffff] overflow-hidden"
        >
            {/* ScrollVelocity Background - Behind everything */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: -1000 }}>
                <ScrollVelocity
                    velocity={50}
                    damping={50}
                    numCopies={6}
                    velocityMapping={{ input: [0, 1000], output: [0, 5] }}
                    className="text-black"
                    parallaxClassName="bg-white"
                >
                    PAL ENGINEERING&nbsp;
                </ScrollVelocity>
            </div>

            {/* Main Capsule Image */}
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
                <div
                    ref={imageContainerRef}
                    className="w-full h-full relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem]"
                    style={{
                        transformOrigin: "center center",
                        willChange: "transform",
                    }}
                >
                    <img
                        ref={imageRef}
                        src="/4.jpg"
                        alt="Classic Capsule"
                        className="intro-image w-full h-full object-cover rounded-[2.5rem] md:rounded-[3rem] shadow-2xl"
                        style={{
                            transformOrigin: "center center",
                            willChange: "transform",
                        }}
                    />
                    {/* Title & Subtitle overlay - inside the image */}
                    <div 
                        ref={textOverlayRef}
                        className="absolute inset-0 z-20 flex flex-col items-start justify-center p-6 md:p-10 text-white pointer-events-none"
                    >
                        <h2 className="text-4xl md:text-7xl font-bold drop-shadow-lg">
                            Your Title Here
                        </h2>
                        <p className="mt-4 text-lg md:text-2xl max-w-md drop-shadow-lg">
                            Your subtitle goes here, describing the image or section in a short line.
                        </p>
                    </div>
                </div>
            </div>

            {/* Second Image - Comes from bottom */}
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8" style={{ zIndex: 40 }}>
                <div
                    ref={secondImageContainerRef}
                    className="w-full h-full"
                    style={{
                        transformOrigin: "center center",
                        willChange: "transform",
                    }}
                >
                    <img
                        ref={secondImageRef}
                        src="/5.jpg"
                        alt="Second Capsule"
                        className="intro-image w-full h-full object-cover rounded-[2.5rem] md:rounded-[3rem] shadow-2xl"
                        style={{
                            transformOrigin: "center center",
                            willChange: "transform",
                        }}
                    />
                    {/* Title & Subtitle overlay - inside the second image */}
                    <div 
                        ref={secondTextOverlayRef}
                        className="absolute inset-0 z-20 flex flex-col items-start justify-center p-6 md:p-10 text-white pointer-events-none"
                    >
                        <h2 className="text-4xl md:text-7xl font-bold drop-shadow-lg">
                            Your Title Here
                        </h2>
                        <p className="mt-4 text-lg md:text-2xl max-w-md drop-shadow-lg">
                            Your subtitle goes here, describing the image or section in a short line.
                        </p>
                    </div>
                </div>
            </div>

            {/* Third Image - Comes from bottom, same as second */}
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8" style={{ zIndex: 50 }}>
                <div
                    ref={thirdImageContainerRef}
                    className="w-full h-full"
                    style={{
                        transformOrigin: "center center",
                        willChange: "transform",
                    }}
                >
                    <img
                        ref={thirdImageRef}
                        src="/3.jpg"
                        alt="Third Capsule"
                        className="intro-image w-full h-full object-cover rounded-[2.5rem] md:rounded-[3rem]"
                        style={{
                            transformOrigin: "center center",
                            willChange: "transform",
                        }}
                    />
                    {/* Title & Subtitle overlay - inside the third image */}
                    <div 
                        ref={thirdTextOverlayRef}
                        className="absolute inset-0 z-20 flex flex-col items-start justify-center p-6 md:p-10 text-white pointer-events-none"
                    >
                        <h2 className="text-4xl md:text-7xl font-bold drop-shadow-lg">
                            Your Title Here
                        </h2>
                        <p className="mt-4 text-lg md:text-2xl max-w-md drop-shadow-lg">
                            Your subtitle goes here, describing the image or section in a short line.
                        </p>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Intro;
