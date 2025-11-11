"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { Button } from "~/components/ui/button";
import Image from "next/image";

import imgholmat from "../_images/holmat.png";
import imgcocktails from "../_images/cocktails.png";
import imgreception from "../_images/reception.png";

export default function Thewedding() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Element refs for viewport-based triggers
  const titleRef = useRef<HTMLDivElement>(null);
  const date2Ref = useRef<HTMLDivElement>(null);
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
      offset: ["start end", "end 90%"], // Animation starts when element enters viewport, completes when it's 10% from bottom
    });

    const opacityRaw = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
    const yRaw = useTransform(scrollYProgress, [0, 1], [yValue, 0]);

    return {
      opacity: useSpring(opacityRaw, { stiffness: 120, damping: 25, mass: 1 }),
      y: useSpring(yRaw, { stiffness: 100, damping: 20, mass: 1 }),
    };
  };

  // All animations with viewport-based triggers
  const title = useViewportAnimation(titleRef);
  const date2 = useViewportAnimation(date2Ref);
  const holy = useViewportAnimation(holyRef);
  const cocktail = useViewportAnimation(cocktailRef);
  const dinner = useViewportAnimation(dinnerRef);

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col bg-[#F6F4F1] pb-20 pt-10 text-[#111111] lg:py-24"
    >
      <motion.h1
        ref={titleRef}
        className="mx-auto mb-8 font-cormorant text-[31px] tracking-tight drop-shadow-2xl lg:mb-12 lg:text-[39px]"
        style={{
          opacity: title.opacity,
          y: title.y,
        }}
      >
        THE WEDDING
      </motion.h1>
      <motion.h3
        ref={date2Ref}
        className="mx-auto mb-10 font-freight text-[16px] tracking-wide drop-shadow-2xl lg:text-[20px]"
        style={{
          opacity: date2.opacity,
          y: date2.y,
        }}
      >
        Saturday, 20 June 2026
      </motion.h3>

      <motion.div
        ref={holyRef}
        className="flex flex-col items-center text-center"
        style={{
          opacity: holy.opacity,
          y: holy.y,
        }}
      >
        <Image
          className="mx-auto mb-8 w-[50%] sm:w-[40%] md:w-[33%] lg:mt-2 lg:w-[25%]"
          src={imgholmat}
          alt="Holy Matrimony"
          width={800}
          height={800}
        />
        <h2 className="mb-[6px] font-cormorant text-[20px] tracking-tight drop-shadow-2xl xl:text-[25px]">
          HOLY MATRIMONY
        </h2>
        <h3 className="mb-[6px] font-freight text-[16px] tracking-wide drop-shadow-2xl lg:text-[18px]">
          4 pm — WITA
        </h3>
        <h4 className="mb-5 font-hanken text-[12px] font-light drop-shadow-2xl lg:mb-[50px] lg:text-[14px]">
          SKY Ampitheatre, AYANA Resort Bali
        </h4>
        <Button
          className="active:scale-98 group mb-16 rounded-none border-[1px] border-[#555555] bg-[#F6F4F1] px-5 py-2 transition-all duration-200 ease-out hover:bg-[#FFFFFF] active:bg-[#1D1A1B] lg:px-6 lg:py-3"
          onClick={() =>
            window.open("https://maps.app.goo.gl/w6ayGkvMBsUkzvGL6")
          }
        >
          <p className="font-cormorant text-[12px] text-[#111111] transition-colors duration-200 group-active:text-[#FFFFFF] lg:text-[14px]">
            OPEN MAPS
          </p>
        </Button>
      </motion.div>

      <motion.div
        ref={cocktailRef}
        className="flex flex-col items-center text-center lg:mt-28"
        style={{
          opacity: cocktail.opacity,
          y: cocktail.y,
        }}
      >
        <Image
          className="mx-auto mb-8 w-[50%] sm:w-[45%] md:w-[40%] lg:mb-12 lg:w-[29%]"
          src={imgcocktails}
          alt="Cocktail & Canapes"
          width={800}
          height={800}
        />
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
          className="active:scale-98 group mb-16 rounded-none border-[1px] border-[#555555] bg-[#F6F4F1] px-5 py-2 transition-all duration-200 ease-out hover:bg-[#FFFFFF] active:bg-[#1D1A1B] lg:px-6 lg:py-3"
          onClick={() =>
            window.open("https://maps.app.goo.gl/w6ayGkvMBsUkzvGL6")
          }
        >
          <p className="font-cormorant text-[12px] text-[#111111] transition-colors duration-200 group-active:text-[#FFFFFF] lg:text-[14px]">
            OPEN MAPS
          </p>
        </Button>
      </motion.div>

      <motion.div
        ref={dinnerRef}
        className="flex flex-col items-center text-center lg:mt-24"
        style={{
          opacity: dinner.opacity,
          y: dinner.y,
        }}
      >
        <Image
          className="mx-auto mb-8 w-[45%] sm:w-[36%] md:w-[33%] lg:mt-5 lg:w-[25%]"
          src={imgreception}
          alt="Dinner Reception"
          width={800}
          height={800}
        />
        <h2 className="mb-[6px] font-cormorant text-[20px] tracking-tight drop-shadow-2xl xl:text-[25px]">
          DINNER RECEPTION
        </h2>
        <h3 className="mb-[6px] font-freight text-[16px] tracking-wide drop-shadow-2xl lg:text-[18px]">
          7 pm — WITA
        </h3>
        <h4 className="mb-[6px] font-hanken text-[12px] font-light drop-shadow-2xl lg:text-[14px]">
          SKY Upper Lawn, AYANA Resort Bali
        </h4>
        <h3 className="mb-5 font-freight text-[14px] tracking-wide drop-shadow-2xl lg:mb-[22px] lg:text-[16px]">
          (followed by After Party)
        </h3>
        <Button
          className="active:scale-98 group rounded-none border-[1px] border-[#555555] bg-[#F6F4F1] px-5 py-2 transition-all duration-200 ease-out hover:bg-[#FFFFFF] active:bg-[#1D1A1B] lg:px-6 lg:py-3"
          onClick={() =>
            window.open("https://maps.app.goo.gl/w6ayGkvMBsUkzvGL6")
          }
        >
          <p className="font-cormorant text-[12px] text-[#111111] transition-colors duration-200 group-active:text-[#FFFFFF] lg:text-[14px]">
            OPEN MAPS
          </p>
        </Button>
      </motion.div>
    </motion.div>
  );
}
