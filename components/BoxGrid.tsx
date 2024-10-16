"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface BoxGridProps {
  grid: [number, number];
  width: number;
  gutter: number;
}

const BoxGrid: React.FC<BoxGridProps> = ({ grid, width, gutter }) => {
  const position = ["end", "start"];
  const [startPosition, setStartPosition] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tl] = useState(() => gsap.timeline({ repeat: -1, repeatDelay: 0.1 }));

  const animateBoxes = (from: any, axis: any, ease: string) => {
    tl.to(".box", {
      duration: 1,
      scale: 0.1,
      y: 15,
      yoyo: true,
      repeat: -1,
      repeatDelay: 2,
      ease: ease || "power1.inOut",
      stagger: {
        amount: 1,
        grid: grid,
        axis: axis,
        from: from,
        ease: "power1.in",
      },
    });
    
  };

  const buildGrid = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = "";

    const [rows, cols] = grid;
    container.classList.add("grid");
    container.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
    container.style.gap = `${gutter}px`;

    for (let i = 0; i < rows * cols; i++) {
      const box = document.createElement("div");
      box.classList.add(
        "box",
        "rounded-md",
        "bg-transparent",
        "border-2",
        "border-white/60",
        "w-full",
        "aspect-square",
      );

      box.dataset.index = i.toString();

      container.appendChild(box);
    }
  };

  useEffect(() => {
    tl.seek(0).clear()
    buildGrid();
    animateBoxes(position[startPosition], null, "none"); 
    setStartPosition((prevPosition) => (prevPosition === 0 ? 1 : 0));
  }, [startPosition]);

  useEffect(() => {
    tl.seek
  })

  return <div ref={containerRef} className=""></div>;
};

export default BoxGrid;
