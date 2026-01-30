# Animation Code Explanation - Intro.jsx

## Setup & Imports (Lines 1-8)

**Line 2:** `import gsap from "gsap";`
- Imports the GSAP (GreenSock Animation Platform) library, the core animation engine

**Line 3:** `import { ScrollTrigger } from "gsap/ScrollTrigger";`
- Imports ScrollTrigger plugin, which allows animations to be triggered by scroll position

**Line 4:** `import { useGSAP } from "@gsap/react";`
- Imports React hook that automatically handles GSAP cleanup when component unmounts

**Line 8:** `gsap.registerPlugin(ScrollTrigger);`
- Registers ScrollTrigger as a GSAP plugin so it can be used throughout the component

---

## Refs Setup (Lines 11-18)

**Lines 11-18:** Create React refs to reference DOM elements
- `containerRef`: References the main section container
- `imageRef`: References the main image element
- `titleRef`: References the title heading
- `descriptionRef`: References the description box
- `reserveBtnRef`: References the Reserve button
- `menuBtnRef`: References the Menu button
- `scrollTriggerRef`: Stores the ScrollTrigger instance for cleanup
- `timelineRef`: Stores the GSAP timeline instance for cleanup

---

## Main Animation Setup (Lines 24-182)

### Cleanup Section (Lines 28-41)

**Line 24:** `useGSAP(() => { ... }, []);`
- React hook that runs animation code after component mounts
- Empty dependency array `[]` means it only runs once on mount

**Line 25:** `const container = containerRef.current;`
- Gets the actual DOM element from the ref

**Line 26:** `if (!container || !imageRef.current || !titleRef.current) return;`
- Safety check: exits early if required elements don't exist yet

**Lines 29-31:** Cleanup existing ScrollTrigger
- Checks if a ScrollTrigger instance exists in the ref
- If it does, kills it (removes it) and clears the ref
- Prevents memory leaks and duplicate animations

**Lines 33-35:** Cleanup existing timeline
- Same pattern: kills any existing timeline and clears the ref

**Lines 38-40:** Fallback cleanup by ID
- Gets ScrollTrigger by its unique ID "intro-scroll-trigger"
- Kills it if it exists (safety net in case refs are lost)

---

### Initial State Setup (Lines 43-72)

**Lines 44-48:** `gsap.set(imageRef.current, { ... })`
- **Line 44:** `gsap.set()` - Instantly sets properties without animation
- **Line 45:** `scale: 0.3` - Image starts at 30% of its normal size (very small)
- **Line 46:** `opacity: 1` - Image is fully visible from the start
- **Line 47:** `borderRadius: "2.5rem"` - Sets rounded corners

**Lines 50-54:** Set initial state for title
- **Line 51:** `opacity: 0` - Title is invisible
- **Line 52:** `y: 80` - Title is positioned 80px below its final position
- **Line 53:** `scale: 0.4` - Title is scaled to 40% size

**Lines 56-60:** Set initial state for description
- **Line 57:** `opacity: 0` - Description is invisible
- **Line 58:** `y: 50` - Description is 50px below its final position
- **Line 59:** `scale: 0.5` - Description is scaled to 50% size

**Lines 62-66:** Set initial state for Reserve button
- **Line 63:** `opacity: 0` - Button is invisible
- **Line 64:** `y: -30` - Button is 30px above its final position
- **Line 65:** `scale: 0.6` - Button is scaled to 60% size

**Lines 68-72:** Set initial state for Menu button
- **Line 69:** `opacity: 0` - Button is invisible
- **Line 70:** `y: 30` - Button is 30px below its final position
- **Line 71:** `scale: 0.75` - Button is scaled to 75% size

---

### ScrollTrigger Timeline Creation (Lines 74-86)

**Line 75:** `const tl = gsap.timeline({ ... });`
- Creates a GSAP timeline that sequences multiple animations
- Timeline allows chaining animations together

**Line 76:** `scrollTrigger: { ... }`
- Configures ScrollTrigger to control when timeline plays

**Line 77:** `trigger: container`
- The container element triggers the animation when it enters viewport

**Line 78:** `start: "top top"`
- Animation starts when the top of the container reaches the top of the viewport

**Line 79:** `end: "+=250%"`
- Animation ends after scrolling 250% of the container's height
- This creates a long scroll distance for smooth, gradual animation

**Line 80:** `pin: true`
- Pins (fixes) the container in place while scrolling
- Container stays visible during the entire animation

**Line 81:** `scrub: 1`
- Animation progress is tied directly to scroll position
- Value `1` adds 1 second of lag for smoother feel
- Scrolling forward plays animation forward, backward plays it backward

**Line 82:** `id: "intro-scroll-trigger"`
- Gives ScrollTrigger a unique ID for easy reference and cleanup

**Line 84:** `invalidateOnRefresh: true`
- Recalculates positions when window is resized
- Ensures animation works correctly after browser resize

**Lines 89-91:** Store references
- **Line 89:** Saves timeline in ref for cleanup
- **Line 91:** Gets ScrollTrigger instance and saves it in ref for cleanup

---

### Animation Phases (Lines 93-164)

**Lines 94-98:** Phase 1 - Image grows to medium size
- **Line 94:** `tl.to(imageRef.current, { ... })`
  - Adds animation to timeline that animates the image
- **Line 95:** `scale: 0.7` - Animates image from 0.3 to 0.7 scale (30% to 70%)
- **Line 96:** `duration: 0.6` - Takes 60% of the scroll distance to complete
- **Line 97:** `ease: "power2.out"` - Easing function: starts fast, ends slow

**Lines 100-108:** Phase 2 - Image continues growing
- **Line 100:** `.to(imageRef.current, { ... })`
  - Chains another animation to the timeline
- **Line 103:** `scale: 0.9` - Grows image from 0.7 to 0.9 scale
- **Line 104:** `duration: 0.8` - Takes 80% of scroll distance
- **Line 105:** `ease: "power1.inOut"` - Smooth ease: slow start, fast middle, slow end
- **Line 107:** `"-=0.2"` - Starts 0.2 seconds before previous animation ends (overlap)

**Lines 110-118:** Phase 3 - Image reaches final size, title appears
- **Line 110:** `.to(imageRef.current, { ... })`
  - Continues image animation
- **Line 113:** `scale: 1.0` - Image reaches full size (100%)
- **Line 114:** `duration: 0.6` - Takes 60% of scroll distance
- **Line 115:** `ease: "power1.inOut"` - Smooth easing
- **Line 117:** `"-=0.4"` - Starts 0.4 seconds before previous animation ends

**Lines 119-129:** Title reveal animation
- **Line 119:** `.to(titleRef.current, { ... })`
  - Animates the title element
- **Line 122:** `opacity: 1` - Fades title from 0 to fully visible
- **Line 123:** `y: 0` - Moves title from 80px below to its final position
- **Line 124:** `scale: 1` - Scales title from 0.4 to full size
- **Line 125:** `duration: 0.8` - Takes 80% of scroll distance
- **Line 126:** `ease: "power2.out"` - Fast start, slow end
- **Line 128:** `"-=0.5"` - Starts 0.5 seconds before previous animation ends

**Lines 131-141:** Description reveal animation
- **Line 131:** `.to(descriptionRef.current, { ... })`
  - Animates the description box
- **Line 134:** `opacity: 1` - Fades description from invisible to visible
- **Line 135:** `y: 0` - Moves description from 50px below to final position
- **Line 136:** `scale: 1` - Scales description from 0.5 to full size
- **Line 137:** `duration: 0.7` - Takes 70% of scroll distance
- **Line 138:** `ease: "power2.out"` - Fast start, slow end
- **Line 140:** `"-=0.3"` - Starts 0.3 seconds before previous animation ends

**Lines 143-153:** Reserve button reveal
- **Line 143:** `.to(reserveBtnRef.current, { ... })`
  - Animates the Reserve button
- **Line 146:** `opacity: 1` - Fades button from invisible to visible
- **Line 147:** `y: 0` - Moves button from -30px to final position
- **Line 148:** `scale: 1` - Scales button from 0.6 to full size
- **Line 149:** `duration: 0.5` - Takes 50% of scroll distance
- **Line 150:** `ease: "back.out(1.7)"` - Bouncy/elastic effect that overshoots then settles
- **Line 152:** `"-=0.5"` - Starts 0.5 seconds before previous animation ends

**Lines 154-164:** Menu button reveal
- **Line 154:** `.to(menuBtnRef.current, { ... })`
  - Animates the Menu button
- **Line 157:** `opacity: 1` - Fades button from invisible to visible
- **Line 158:** `y: 0` - Moves button from 30px below to final position
- **Line 159:** `scale: 1` - Scales button from 0.75 to full size
- **Line 160:** `duration: 0.5` - Takes 50% of scroll distance
- **Line 161:** `ease: "back.out(1.7)"` - Same bouncy effect as Reserve button
- **Line 163:** `"-=0.5"` - Starts 0.5 seconds before previous animation ends

---

### Cleanup Function (Lines 166-181)

**Line 167:** `return () => { ... }`
- Returns a cleanup function that runs when component unmounts or dependencies change
- Prevents memory leaks by removing animations

**Lines 168-170:** Kill ScrollTrigger if it exists
- Checks if ScrollTrigger ref has a value
- Kills it and clears the ref

**Lines 172-174:** Kill timeline if it exists
- Checks if timeline ref has a value
- Kills it and clears the ref

**Lines 177-179:** Fallback cleanup by ID
- Gets ScrollTrigger by ID as a safety net
- Kills it if found

---

## Parallax Animation (Lines 184-200)

**Line 185:** `useGSAP(() => { ... }, [isMobIntro]);`
- Second useGSAP hook that runs when `isMobIntro` changes
- Only runs on desktop (when `isMobIntro` is false)

**Line 186:** `if (!isMobIntro && imageRef.current) { ... }`
- Only runs if NOT on mobile AND image exists

**Line 187:** `gsap.to(imageRef.current, { ... })`
- Creates a separate animation for parallax effect

**Line 188:** `yPercent: "-5"`
- Moves image up by 5% of its height as you scroll
- Creates parallax effect (image moves slower than scroll)

**Line 189:** `scale: 1.2`
- Scales image to 120% during scroll
- Creates zoom effect

**Line 190:** `ease: "power1.inOut"`
- Smooth easing for parallax movement

**Lines 191-197:** ScrollTrigger configuration for parallax
- **Line 192:** `trigger: containerRef.current` - Container triggers the effect
- **Line 193:** `start: "top top"` - Starts when container top hits viewport top
- **Line 194:** `end: "bottom top"` - Ends when container bottom hits viewport top
- **Line 195:** `scrub: 1.5` - Smooth scrubbing with 1.5 second lag
- **Line 196:** Commented out markers for debugging

---

## CSS Performance Hints (Lines 214-217, 229, 243, 263, 289)

**Line 215:** `transformOrigin: "center center"`
- Sets the point around which scaling/rotation happens (center of image)

**Line 216:** `willChange: "transform"`
- Browser hint: this element will be transformed
- Browser can optimize by using GPU acceleration

**Line 229:** `willChange: "transform, opacity"`
- Hints that title will change transform and opacity
- Browser prepares for these changes

**Line 243:** `willChange: "transform, opacity"`
- Same hint for description box

**Line 263:** `willChange: "transform, opacity"`
- Same hint for Reserve button

**Line 289:** `willChange: "transform, opacity"`
- Same hint for Menu button

---

## Summary

This animation creates a scroll-triggered reveal sequence:
1. Image starts tiny and grows to full size in phases
2. Title fades in and slides up as image grows
3. Description appears after title
4. Buttons bounce in with elastic effect
5. On desktop, image has parallax zoom effect
6. All animations are tied to scroll position (scrub)
7. Container is pinned during animation
8. Everything cleans up properly to prevent memory leaks

