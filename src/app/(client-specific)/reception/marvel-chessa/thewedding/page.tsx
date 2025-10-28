"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { Button } from "~/components/ui/button";

export default function Thewedding() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Element refs for viewport-based triggers
  const titleRef = useRef<HTMLDivElement>(null);
  const date1Ref = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const date2Ref = useRef<HTMLDivElement>(null);
  const teaRef = useRef<HTMLDivElement>(null);
  const holyRef = useRef<HTMLDivElement>(null);
  const cocktailRef = useRef<HTMLDivElement>(null);
  const dinnerRef = useRef<HTMLDivElement>(null);

  // Viewport-based animation hook - triggers when element is 5% from bottom
  const useViewportAnimation = (
    ref: React.RefObject<HTMLDivElement>,
    yValue = 10,
  ) => {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end 95%"], // Animation starts when element enters viewport, completes when it's 10% from bottom
    });

    const opacityRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const yRaw = useTransform(scrollYProgress, [0, 1], [yValue, 0]);

    return {
      opacity: useSpring(opacityRaw, { stiffness: 120, damping: 25, mass: 1 }),
      y: useSpring(yRaw, { stiffness: 100, damping: 20, mass: 1 }),
    };
  };

  // All animations with viewport-based triggers
  const title = useViewportAnimation(titleRef);
  const date1 = useViewportAnimation(date1Ref);
  const welcome = useViewportAnimation(welcomeRef);
  const date2 = useViewportAnimation(date2Ref);
  const tea = useViewportAnimation(teaRef);
  const holy = useViewportAnimation(holyRef);
  const cocktail = useViewportAnimation(cocktailRef);
  const dinner = useViewportAnimation(dinnerRef);

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col bg-[#F6F4F1] py-20 text-[#111111] lg:py-24"
    >
      <motion.h1
        ref={titleRef}
        className="mx-auto mb-8 font-cormorant text-[31px] tracking-tight drop-shadow-2xl lg:mb-12"
        style={{
          opacity: title.opacity,
          y: title.y,
        }}
      >
        THE WEDDING
      </motion.h1>
      <motion.h3
        ref={date1Ref}
        className="mx-auto mb-60 font-freight text-[16px] tracking-wide drop-shadow-2xl lg:text-[18px]"
        style={{
          opacity: date1.opacity,
          y: date1.y,
        }}
      >
        Friday, 19 June 2026
      </motion.h3>
      <motion.div
        ref={welcomeRef}
        className="flex flex-col items-center lg:mb-12"
        style={{
          opacity: welcome.opacity,
          y: welcome.y,
        }}
      >
        <h2 className="mb-[6px] font-cormorant text-[20px] tracking-tight drop-shadow-2xl xl:text-[25px]">
          WELCOME DINNER
        </h2>
        <h3 className="mb-[6px] font-freight text-[16px] tracking-wide drop-shadow-2xl lg:text-[18px]">
          5.30 pm — WITA
        </h3>
        <h4 className="mb-[6px] font-hanken text-[12px] font-light drop-shadow-2xl lg:text-[14px]">
          Warung Laota, Jimbaran
        </h4>
        <h5 className="mb-5 font-freight text-[14px] tracking-wide drop-shadow-2xl lg:text-[16px]">
          (family only)
        </h5>
        <Button
          className="group mb-16 rounded-none border-[1px] border-[#555555] bg-[#F6F4F1] px-5 py-2 hover:bg-[#FFFFFF] active:bg-[#1D1A1B]"
          type="submit"
        >
          <p className="font-cormorant text-[12px] text-[#111111] group-active:text-[#FFFFFF] lg:text-[14px]">
            OPEN MAPS
          </p>
        </Button>
      </motion.div>

      <motion.h3
        ref={date2Ref}
        className="mx-auto mb-60 font-freight text-[16px] tracking-wide drop-shadow-2xl lg:text-[18px]"
        style={{
          opacity: date2.opacity,
          y: date2.y,
        }}
      >
        Saturday, 20 June 2026
      </motion.h3>

      {/* Grid container for side-by-side blocks */}
      <div className="mb-60 grid grid-cols-1 gap-60 px-4 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <motion.div
          ref={teaRef}
          className="flex flex-col items-center text-center"
          style={{
            opacity: tea.opacity,
            y: tea.y,
          }}
        >
          <h2 className="mb-[6px] font-cormorant text-[20px] tracking-tight drop-shadow-2xl xl:text-[25px]">
            TEA CEREMONY
          </h2>
          <h3 className="mb-[6px] font-freight text-[16px] tracking-wide drop-shadow-2xl lg:text-[18px]">
            2.30 pm — WITA
          </h3>
          <h4 className="mb-[6px] font-hanken text-[12px] font-light drop-shadow-2xl lg:text-[14px]">
            Venue TBC
          </h4>
          <h5 className="mb-5 font-freight text-[14px] tracking-wide drop-shadow-2xl lg:text-[16px]">
            (family only)
          </h5>
          <Button
            className="group rounded-none border-[1px] border-[#555555] bg-[#F6F4F1] px-5 py-2 hover:bg-[#FFFFFF] active:bg-[#1D1A1B]"
            type="submit"
          >
            <p className="font-cormorant text-[12px] text-[#111111] group-active:text-[#FFFFFF] lg:text-[14px]">
              OPEN MAPS
            </p>
          </Button>
        </motion.div>

        <motion.div
          ref={holyRef}
          className="flex flex-col items-center text-center"
          style={{
            opacity: holy.opacity,
            y: holy.y,
          }}
        >
          <h2 className="mb-[6px] font-cormorant text-[20px] tracking-tight drop-shadow-2xl xl:text-[25px]">
            HOLY MATRIMONY
          </h2>
          <h3 className="mb-[6px] font-freight text-[16px] tracking-wide drop-shadow-2xl lg:text-[18px]">
            4 pm — WITA
          </h3>
          <h4 className="mb-5 font-hanken text-[12px] font-light drop-shadow-2xl lg:mb-12 lg:text-[14px]">
            SKY Ampitheatre, AYANA Resort Bali
          </h4>
          <Button
            className="group rounded-none border-[1px] border-[#555555] bg-[#F6F4F1] px-5 py-2 hover:bg-[#FFFFFF] active:bg-[#1D1A1B]"
            type="submit"
          >
            <p className="font-cormorant text-[12px] text-[#111111] group-active:text-[#FFFFFF] lg:text-[14px]">
              OPEN MAPS
            </p>
          </Button>
        </motion.div>
      </div>

      {/* Grid container for side-by-side blocks */}
      <div className="grid grid-cols-1 gap-60 px-4 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <motion.div
          ref={cocktailRef}
          className="flex flex-col items-center text-center"
          style={{
            opacity: cocktail.opacity,
            y: cocktail.y,
          }}
        >
          <h2 className="mb-[6px] font-cormorant text-[20px] tracking-tight drop-shadow-2xl xl:text-[25px]">
            COCKTAIL & CANAPES
          </h2>
          <h3 className="mb-[6px] font-freight text-[16px] tracking-wide drop-shadow-2xl lg:text-[18px]">
            5.30 pm — WITA
          </h3>
          <h4 className="mb-5 font-hanken text-[12px] font-light drop-shadow-2xl lg:mb-[52px] lg:text-[14px]">
            SKY Lower to Middle Lawn, AYANA Resort Bali
          </h4>
          <Button
            className="group rounded-none border-[1px] border-[#555555] bg-[#F6F4F1] px-5 py-2 hover:bg-[#FFFFFF] active:bg-[#1D1A1B]"
            type="submit"
          >
            <p className="font-cormorant text-[12px] text-[#111111] group-active:text-[#FFFFFF] lg:text-[14px]">
              OPEN MAPS
            </p>
          </Button>
        </motion.div>

        <motion.div
          ref={dinnerRef}
          className="flex flex-col items-center text-center"
          style={{
            opacity: dinner.opacity,
            y: dinner.y,
          }}
        >
          <h2 className="mb-[6px] font-cormorant text-[20px] tracking-tight drop-shadow-2xl xl:text-[25px]">
            DINNER RECEPTION
          </h2>
          <h3 className="mb-[6px] font-freight text-[16px] tracking-wide drop-shadow-2xl lg:text-[18px]">
            7 pm — WITA
          </h3>
          <h4 className="mb-[6px] font-hanken text-[12px] font-light drop-shadow-2xl lg:text-[14px]">
            SKY Upper Lawn, AYANA Resort Bali
          </h4>
          <h3 className="mb-5 font-freight text-[14px] tracking-wide drop-shadow-2xl lg:text-[16px]">
            (followed by After Party)
          </h3>
          <Button
            className="group rounded-none border-[1px] border-[#555555] bg-[#F6F4F1] px-5 py-2 hover:bg-[#FFFFFF] active:bg-[#1D1A1B]"
            type="submit"
          >
            <p className="font-cormorant text-[12px] text-[#111111] group-active:text-[#FFFFFF] lg:text-[14px]">
              OPEN MAPS
            </p>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
