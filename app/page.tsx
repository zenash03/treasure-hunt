"use client";
import VirtualPet from "@/components/VirtualPet";
import BoxGrid from "@/components/BoxGrid";
import { treasureHunt } from "@/lib/dummyData";
import Image from "next/image";
import HeaderTitle from "@/components/HeaderTitle";
import FormCode from "@/components/FormCode";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import AnimatedQuarterCircle from "@/components/AnimatedQuarterCircle";

export default function Home() {
  const chest = treasureHunt[0];

  const [chestImage, setChestImage] = useState("/assets/chest.svg");
  const [alertMessage, setAlertMessage] = useState<string | null>("Enter The Code");
  const alertRef = useRef<HTMLDivElement>(null);
  const chestRef = useRef<HTMLImageElement>(null);

  const handleFormResult = (isCodeCorrect: boolean) => {
    if (isCodeCorrect) {
      setAlertMessage("Code is Correct");
      animateSuccess();
    } else {
      setAlertMessage("Incorrect code, please try again!");
      animateError();
    }
  };

  const animateSuccess = () => {
    if (alertRef.current) {
      gsap.fromTo(
        alertRef.current,
        { scale: 0.5, opacity: 0, backgroundColor: "#4CAF50" },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
          onStart: () => {animateOpenChest()}
          // onComplete: () => gsap.to(alertRef.current, { opacity: 0, delay: 2 }),
        }
      );
    }
  };

  const animateError = () => {
    if (alertRef.current) {
      gsap.fromTo(
        alertRef.current,
        { x: -10, backgroundColor: "#F44336" },
        {
          x: 10,
          duration: 0.1,
          yoyo: true,
          repeat: 5,
          ease: "power1.inOut",
          onStart: () => {
            setChestImage("/assets/chest.svg")
          },
          onComplete: () => {
            gsap.to(alertRef.current, {x: 0})
          },
          // onComplete: () => gsap.to(alertRef.current, { opacity: 0, delay: 2 }),
        }
      );
    }
  }
  const animateOpenChest = () => {
    gsap.fromTo(
      chestRef.current,
      { scale: 0.5, rotate: 0 },
      {
        scale: 1.3,
        rotate: 5,
        yoyo: true,
        repeat: 1,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
        onStart: () => {
          setChestImage("/assets/chest-open.svg")
        },
        onComplete: () => {
          gsap.to(chestRef.current, {scale: 1, rotate: 0, duration: 0.3, ease: "back.out(2)"})
        }
      }
    )
  }

  return (
    <div className="bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-slate-950 via-violet-950 to-slate-900 w-full h-screen">
        <div className="flex flex-col w-full h-full">
            <div className="grid grid-cols-8 grid-rows-4 w-full h-full">
              <div className="row-span-1 col-span-8 border-white/50 w-full h-full flex flex-col">
                <div className="border-b-2 border-white/50 py-2 px-4 flex items-center justify-between">
                  <p className="font-mono">Treasure Hunt</p>
                  <Image src={"/assets/BBCC.jpg"} alt="" width={1} height={1} className="w-6 h-6 rounded-sm" />
                </div>
                <HeaderTitle text={"BINUS BLOCKCHAIN AND CRYPTO CLUB"} speed={40} />
              </div>
              <div className="row-span-2 col-span-1 bg-transparent border border-white/50 w-full h-full"></div>
              <div className="row-span-1 col-span-1 bg-transparent border border-white/50 w-full h-full flex flex-col">
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <p className="text-transparent text-stroke text-9xl z-0 font-bold opacity-50">B</p>
                </div>
              </div>
              <div className="row-span-1 col-span-1 bg-transparent border border-white/50 w-full h-full flex flex-col">
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <p className="text-transparent text-stroke text-9xl z-0 font-bold opacity-50">B</p>
                </div>
              </div>
              <div className="row-span-3 col-span-2 bg-transparent border border-white/50 w-full h-full flex flex-col">
                <div className="w-full border-b-2 border-white/50 py-2 px-3">
                  <p className="font-mono">Treasure Hunt</p>
                </div>
                <div className="py-4 px-4 mt-3 flex flex-col items-start gap-5 w-full h-full">
                { (alertMessage) ? (
                  <div
                    ref={alertRef}
                    className="border rounded-md h-full w-full p-4 text-white flex items-center justify-center"
                  >
                    <p className="text-4xl text-center font-mono tracking-widest">
                      {alertMessage}
                    </p>
                  </div>
                  ) : 
                  (
                    <div
                      ref={alertRef}
                      className="border rounded-md h-full w-full p-4 text-white"
                    >
                      {alertMessage}
                    </div>
                  )
                }
                  <div className="h-full">
                    <p className="font-mono mb-2 text-lg">Enter Crudential Code</p>
                    <FormCode onCodeCheck={handleFormResult} passCode={chest.passCode} />
                  </div>
                </div>
              </div>
              <div className="row-span-2 col-span-2 bg-transparent border border-white/50 w-full h-full flex flex-col">
                <div className="w-full h-full p-4 flex flex-col justify-center items-center relative">
                  <Image src={chestImage} alt="" width={1} height={1} className="w-64 z-10" ref={chestRef} />
                  <p className="text-transparent text-stroke text-7xl absolute z-0 top-10 left-1/2 -translate-x-1/2 font-bold opacity-50 uppercase">{chest.name}</p>
                </div>
              </div>
              <div className="row-span-2 col-span-1 bg-transparent border border-white/50 w-full h-full"></div>
              <div className="row-span-1 col-span-1 bg-transparent border border-white/50 w-full h-full flex flex-col">
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <p className="text-transparent text-stroke text-9xl z-0 font-bold opacity-50">C</p>
                </div>
              </div>
              <div className="row-span-1 col-span-1 bg-transparent border border-white/50 w-full h-full flex flex-col">
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <p className="text-transparent text-stroke text-9xl z-0 font-bold opacity-50">C</p>
                </div>
              </div>
              <div className="row-span-2 col-span-1 bg-transparent border border-white/50 w-full h-full">
                <AnimatedQuarterCircle />
              </div>
              <div className="row-span-2 col-span-2 bg-transparent border border-white/50 w-full h-full flex flex-col">
                {/* <div className="w-full h-full flex flex-col p-8">
                  <div className="w-28 h-28 grid grid-cols-2 grid-rows-2 gap-2">
                    <div className="w-full h-full bg-transparent border-2 border-white/50 rounded-xl" />
                    <div className="w-full h-full bg-transparent border-2 border-white/50 rounded-xl" />
                    <div className="w-full h-full bg-transparent border-2 border-white/50 rounded-xl" />
                    <div className="w-full h-full bg-transparent border-2 border-white/50 rounded-xl" />
                  </div>
                </div> */}
              </div>
              <div className="row-span-1 col-span-2 bg-transparent border border-white/50 w-full h-full flex flex-col">
                <div className="relative overflow-hidden w-full h-full flex flex-col items-start justify-start">
                  <div className="grid grid-cols-6 justify-end w-full h-full">
                    <div className="w-full h-full col-span-2" />
                    <div className="w-full h-full border border-white/60 rounded-l-full" />
                    <div className="w-full h-full border border-white/60 rounded-l-full" />
                    <div className="w-full h-full border border-white/60 rounded-r-full" />
                    <div className="w-full h-full border border-white/60 rounded-r-full" />
                  </div>
                  <div className="w-full border-t-2 border-white/50 py-2 px-3">
                    <p className="font-mono text-right">Find The Code.</p>
                  </div>
                  {/* <VirtualPet /> */}
                </div>
              </div>
              <div className="row-span-1 col-span-1 bg-transparent border border-white/50 w-full h-full">
              </div>
              <div className="row-span-1 col-span-2 bg-transparent border border-white/50 w-full h-full">
              </div>
              <div className="row-span-1 col-span-3 bg-transparent border border-white/50 w-full h-full flex flex-col">
                <div className="p-4 flex flex-col w-full h-full relative overflow-hidden">
                  <BoxGrid grid={[3, 13]} width={10} gutter={15} />
                </div>
              </div>
            </div>
        </div>
    </div>
  );
}
