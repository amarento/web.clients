"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { Button } from "~/components/ui/button";
import Image from "next/image";

import imgdinner from "../_images/dinner.png";
import imgtea from "../_images/tea.png";
import imgholmat from "../_images/holmat.png";
import imgcocktails from "../_images/cocktails.png";
import imgreception from "../_images/reception.png";

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

  // Viewport-based animation hook
  const useViewportAnimation = (
    ref: React.RefObject<HTMLDivElement>,
    yValue = 10,
  ) => {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end 90%"],
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
      className="flex flex-col bg-[#F6F4F1] pb-20 pt-10 text-[#111111] lg:py-24"
    >
      <motion.h1
        ref={titleRef}
        className="mx-auto mb-8 font-cormorant text-[31px] tracking-tight drop-shadow-2xl lg:mb-12 lg:text-[39px] 2xl:text-[49px]"
        style={{
          opacity: title.opacity,
          y: title.y,
        }}
      >
        THE WEDDING
      </motion.h1>
      <motion.h3
        ref={date1Ref}
        className="mx-auto mb-10 font-freight text-[16px] tracking-wide drop-shadow-2xl lg:text-[20px] 2xl:text-[25px]"
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
        <Image
          className="mx-auto mb-8 w-[40%] sm:w-[30%] md:w-[25%] lg:w-[15%] 2xl:w-[10%]"
          src={imgdinner}
          alt="Welcome Dinner"
          width={800}
          height={800}
        />
        <h2 className="mb-[6px] font-cormorant text-[20px] tracking-tight drop-shadow-2xl xl:text-[25px] 2xl:text-[31px]">
          WELCOME DINNER
        </h2>
        <h3 className="mb-[6px] font-freight text-[16px] tracking-wide drop-shadow-2xl lg:text-[18px] 2xl:text-[20px]">
          6.30 pm — WITA
        </h3>
        <h4 className="mb-[6px] font-hanken text-[12px] font-light drop-shadow-2xl lg:text-[14px] 2xl:text-[16px]">
          Liu Li Palace, Rimba Ayana
        </h4>
        <h5 className="mb-5 font-freight text-[14px] tracking-wide drop-shadow-2xl lg:text-[16px] 2xl:text-[18px]">
          (Family Only)
        </h5>
        <Button
          className="active:scale-98 group mb-16 rounded-none border-[1px] border-[#555555] bg-[#F6F4F1] px-5 py-2 transition-all duration-200 ease-out hover:bg-[#FFFFFF] active:bg-[#1D1A1B] lg:px-6 lg:py-3"
          onClick={() =>
            window.open("https://maps.app.goo.gl/z5vjfxdMs31buMXq6")
          }
          type="button"
        >
          <p className="font-cormorant text-[12px] text-[#111111] transition-colors duration-200 group-active:text-[#FFFFFF] lg:text-[14px]">
            OPEN MAPS
          </p>
        </Button>
      </motion.div>

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

      {/* Grid container for side-by-side blocks */}
      <div className="mb-16 grid grid-cols-1 gap-10 px-4 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <motion.div
          ref={teaRef}
          className="flex flex-col items-center text-center"
          style={{
            opacity: tea.opacity,
            y: tea.y,
          }}
        >
          <Image
            className="mx-auto mb-8 w-[50%] sm:w-[45%] md:w-[40%] lg:w-[45%] 2xl:w-[37%]"
            src={imgtea}
            alt="Tea Ceremony"
            width={800}
            height={800}
          />
          <h2 className="mb-[6px] font-cormorant text-[20px] tracking-tight drop-shadow-2xl xl:text-[25px] 2xl:text-[31px]">
            TEA CEREMONY
          </h2>
          <h3 className="mb-[6px] font-freight text-[16px] tracking-wide drop-shadow-2xl lg:text-[18px] 2xl:text-[20px]">
            2 pm — WITA
          </h3>
          <h4 className="mb-[6px] font-hanken text-[12px] font-light drop-shadow-2xl lg:text-[14px] 2xl:text-[16px]">
            Venue TBC
          </h4>
          <h5 className="mb-5 font-freight text-[14px] tracking-wide drop-shadow-2xl lg:text-[16px]">
            (Family Only)
          </h5>
          <Button
            className="group rounded-none border-[1px] border-[#555555] bg-[#F6F4F1] px-5 py-2 hover:bg-[#FFFFFF] active:bg-[#1D1A1B] lg:px-6 lg:py-3"
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
          <Image
            className="mx-auto mb-8 w-[50%] sm:w-[40%] md:w-[33%] lg:mt-2 lg:w-[43%] 2xl:w-[35%]"
            src={imgholmat}
            alt="Holy Matrimony"
            width={800}
            height={800}
          />
          <h2 className="mb-[6px] font-cormorant text-[20px] tracking-tight drop-shadow-2xl xl:text-[25px] 2xl:text-[31px]">
            HOLY MATRIMONY
          </h2>
          <h3 className="mb-[6px] font-freight text-[16px] tracking-wide drop-shadow-2xl lg:text-[18px] 2xl:text-[20px]">
            4 pm — WITA
          </h3>
          <h4 className="mb-5 font-hanken text-[12px] font-light drop-shadow-2xl lg:mb-[50px] lg:text-[14px] 2xl:text-[16px]">
            SKY Ampitheatre, AYANA Resort Bali
          </h4>
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
      </div>

      {/* Grid container for side-by-side blocks */}
      <div className="grid grid-cols-1 gap-16 px-4 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <motion.div
          ref={cocktailRef}
          className="flex flex-col items-center text-center lg:mt-[116px]"
          style={{
            opacity: cocktail.opacity,
            y: cocktail.y,
          }}
        >
          <Image
            className="mx-auto mb-8 w-[50%] sm:w-[45%] md:w-[40%] lg:mb-12 lg:w-[50%] 2xl:w-[42%]"
            src={imgcocktails}
            alt="Cocktail & Canapes"
            width={800}
            height={800}
          />
          <h2 className="mb-[6px] font-cormorant text-[20px] tracking-tight drop-shadow-2xl xl:text-[25px] 2xl:text-[31px]">
            COCKTAIL & CANAPES
          </h2>
          <h3 className="mb-[6px] font-freight text-[16px] tracking-wide drop-shadow-2xl lg:text-[18px] 2xl:text-[20px]">
            5.30 pm — WITA
          </h3>
          <h4 className="mb-5 font-hanken text-[12px] font-light drop-shadow-2xl lg:mb-[52px] lg:text-[14px] 2xl:text-[16px]">
            SKY Lower Lawn, AYANA Resort Bali
          </h4>
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

        <motion.div
          ref={dinnerRef}
          className="flex flex-col items-center text-center"
          style={{
            opacity: dinner.opacity,
            y: dinner.y,
          }}
        >
          <Image
            className="mx-auto mb-8 w-[45%] sm:w-[36%] md:w-[33%] lg:mt-5 lg:w-[43%] 2xl:w-[35%]"
            src={imgreception}
            alt="Dinner Reception"
            width={800}
            height={800}
          />
          <h2 className="mb-[6px] font-cormorant text-[20px] tracking-tight drop-shadow-2xl xl:text-[25px] 2xl:text-[31px]">
            DINNER RECEPTION
          </h2>
          <h3 className="mb-[6px] font-freight text-[16px] tracking-wide drop-shadow-2xl lg:text-[18px] 2xl:text-[20px]">
            7 pm — WITA
          </h3>
          <h4 className="mb-[6px] font-hanken text-[12px] font-light drop-shadow-2xl lg:text-[14px] 2xl:text-[16px]">
            SKY Middle Lawn, AYANA Resort Bali
          </h4>
          <h3 className="mb-5 font-freight text-[14px] tracking-wide drop-shadow-2xl lg:mb-[22px] lg:text-[16px] 2xl:text-[18px]">
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
      </div>
    </motion.div>
  );
}
