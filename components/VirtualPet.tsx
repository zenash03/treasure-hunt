"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function VirtualPet() {
  const eyesRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const blink = () => {
    const eyes = document.querySelectorAll("[data-eye]");
    tl.current = gsap.timeline({ repeat: -1, repeatDelay: 3 });

    eyes.forEach((eye) => {
      tl.current?.to(eye, {
        duration: 0.2,
        height: "100%", 
        yoyo: true, 
        ease: "power2.inOut", 
      }, 0); 
    });
  };

  useEffect(() => {
    buildEyes();
    blink(); 

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (tl.current) {
        tl.current.kill();
      }
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const buildEyes = () => {
    if (!eyesRef.current) return;

    const eyeContainer = eyesRef.current;
    eyeContainer.innerHTML = ""; 

    eyeContainer.classList.add(
      "h-full",
      "aspect-[4/3]",
      "bg-white/90",
      // "rounded-t-[50%]",
      // "rounded-b-full",
      "relative"
    );
    eyeContainer.style.borderRadius = "50% 50% 50% 50% / 56% 56% 44% 44%";

    const eyes = ["left-1/3", "left-2/3"];

    for (let index = 0; index < eyes.length; index++) {
      const eyeBox = document.createElement("div");
      eyeBox.classList.add(
        "h-6",
        "aspect-square",
        "rounded-full",
        "absolute",
        "top-1/3",
        "-translate-x-2/4",
        "flex",
        "items-center",
        "justify-center",
        eyes[index]
      );
      eyeBox.dataset.index = index.toString();

      const eye = document.createElement("div");
      eye.classList.add("w-full", "h-1", "bg-slate-900", "rounded-full", "object-bottom");
      eye.dataset.eye = "true"; 

      eyeBox.appendChild(eye);
      eyeContainer.appendChild(eyeBox);
    }
    const mouthBox = document.createElement("div");
    mouthBox.classList.add(
      "h-10",
      "aspect-square",
      "rounded-full",
      "absolute",
      "top-1/2",
      "left-1/2",
      "-translate-x-2/4",
      "flex",
      "items-center",
      "justify-center",
    )
    const mouth = document.createElement("img");
    mouth.src = "/assets/mouth.svg";
    mouth.classList.add(
      "w-full",
      "h-full"
    )
    // mouth.dataset.eye = "true";
    // mouthBox.appendChild(mouth);
    // eyeContainer.appendChild(mouthBox);
  };

  const handleMouseMove = (event: MouseEvent) => {
    const eyes = document.querySelectorAll("[data-eye]");
    eyes.forEach((eye) => {
      const eyeBox = eye.parentElement;
      if (!eyeBox) return;

      const rect = eyeBox.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const dx = event.clientX - eyeCenterX;
      const dy = event.clientY - eyeCenterY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(Math.sqrt(dx * dx + dy * dy), 5); 
      const pupilX = Math.cos(angle) * distance;
      const pupilY = Math.sin(angle) * distance;

      (eye as HTMLElement).style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    });
  };

  return <div ref={eyesRef}></div>;
}
