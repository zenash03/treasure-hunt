"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function AnimatedQuarterCircle({repeatDelay}: {repeatDelay: number}) {
  const blockRefs = useRef<HTMLDivElement[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    blockRefs.current.forEach((block, index) => {
      if (block) {
        gsap.fromTo(
          block,
          { x: 0, y: 0, opacity: 0 },
          {
            x: index % 2 === 0 ? -10 : 10,
            y: index < 2 ? -10 : 10,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            delay: index * 0.1,
            onComplete: () => {
              gsap.to(block, {x: 0, y: 0})
            }
          }
        );
        gsap.fromTo(
          boxRef.current, 
          { rotate: 0 },
          { delay: 2, rotate: 90, duration: 1.5, repeatDelay: repeatDelay, repeat: -1, ease: "power2.out"}
        )
      }
    });
  }, []);

  return (
    <div className="w-full h-full p-8 flex flex-col justify-end items-start relative">
      <div className="grid grid-cols-2 grid-rows-2 w-24 h-24" ref={boxRef}>
        {["rounded-tr-full", "rounded-br-full", "rounded-tl-full", "rounded-bl-full"].map(
          (rounded, index) => (
            <div
              key={index}
              className={`w-full h-full bg-white/60 ${rounded}`}
              ref={(el) => {
                if (el) blockRefs.current[index] = el;
              }}
            />
          )
        )}
      </div>
    </div>
  );
}
