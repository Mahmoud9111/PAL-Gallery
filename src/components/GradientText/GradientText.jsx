'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

export default function GradientText({
  children,
  className = '',
  colors = ['#5227FF', '#FF9FFC', '#B19EEF'],
  animationSpeed = 8,
  showBorder = false,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = true,
}) {
  const textRef = useRef(null);
  const borderRef = useRef(null);
  const tweenRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const gradientAngle =
    direction === 'horizontal'
      ? 'to right'
      : direction === 'vertical'
        ? 'to bottom'
        : 'to bottom right';

  const gradientColors = [...colors, colors[0]].join(', ');

  const backgroundSize =
    direction === 'horizontal'
      ? '300% 100%'
      : direction === 'vertical'
        ? '100% 300%'
        : '300% 300%';

  useEffect(() => {
    const elements = [textRef.current, borderRef.current].filter(Boolean);

    if (elements.length === 0) return;

    const getBackgroundPosition = (progress) => {
      if (direction === 'horizontal') {
        return `${progress}% 50%`;
      } else if (direction === 'vertical') {
        return `50% ${progress}%`;
      } else {
        return `${progress}% 50%`;
      }
    };

    const animationObj = { progress: 0 };

    tweenRef.current = gsap.to(animationObj, {
      progress: 100,
      duration: animationSpeed,
      ease: 'none',
      repeat: -1,
      yoyo: yoyo,
      onUpdate: () => {
        const pos = getBackgroundPosition(animationObj.progress);
        elements.forEach((el) => {
          el.style.backgroundPosition = pos;
        });
      },
    });

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
    };
  }, [animationSpeed, direction, yoyo]);

  useEffect(() => {
    if (tweenRef.current) {
      if (isPaused) {
        tweenRef.current.pause();
      } else {
        tweenRef.current.resume();
      }
    }
  }, [isPaused]);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const gradientStyle = {
    backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
    backgroundSize: backgroundSize,
    backgroundRepeat: 'repeat',
  };

  return (
    <div
      className={`relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer ${showBorder ? 'py-1 px-2' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showBorder && (
        <div
          ref={borderRef}
          className="absolute inset-0 z-0 pointer-events-none rounded-[1.25rem]"
          style={gradientStyle}
        >
          <div
            className="absolute bg-black rounded-[1.25rem] z-[-1]"
            style={{
              width: 'calc(100% - 2px)',
              height: 'calc(100% - 2px)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      )}
      <div
        ref={textRef}
        className="inline-block relative z-2 text-transparent bg-clip-text"
        style={{
          ...gradientStyle,
          WebkitBackgroundClip: 'text',
        }}
      >
        {children}
      </div>
    </div>
  );
}
