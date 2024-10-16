"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

type Props = {
    text: string,
    speed: number
};

export default function HeaderTitle({ text, speed }: Props) {
    const texts = [text, text, text];
    const containerRef = useRef<HTMLDivElement | null>(null);
    const textRefs = useRef<HTMLParagraphElement[]>([]);


    const addToRefs = (el: HTMLParagraphElement) => {
        if (el && !textRefs.current.includes(el)) {
            textRefs.current.push(el);
        }
    };

    useEffect(() => {
        const totalTextWidth = textRefs.current.reduce((total, el) => total + el.offsetWidth, 0);
        const containerWidth = containerRef.current?.offsetWidth || 0;
        const duration = (totalTextWidth + containerWidth) / speed;

        const tl = gsap.timeline({ repeat: -1 }); 
        tl.to(textRefs.current, {
            x: `-${totalTextWidth + containerWidth}`, 
            ease: "none", 
            duration: duration,
            repeat: -1, 
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % (totalTextWidth + containerWidth))
            }
        });

        return () => {
            tl.kill(); 
        };
    }, [speed]);

    return (
        <div ref={containerRef} className="w-full h-full overflow-hidden relative flex justify-center border-white/50 border-b">
            <div className="flex items-center justify-start w-full relative">
                {texts.map((text, index) => (
                    <p
                        ref={addToRefs} 
                        key={index}
                        className="text-[16vh] px-4 whitespace-nowrap"
                    >
                        {text}
                    </p>
                ))}
            </div>
        </div>
    );
}
