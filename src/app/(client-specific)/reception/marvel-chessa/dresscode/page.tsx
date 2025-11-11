"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

import img3 from "../_images/IMG3.jpg";
import img4 from "../_images/IMG4.jpg";

export default function Dresscode() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Element refs for viewport-based triggers
  const titleRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const ceremonyRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);

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

  // Viewport-based image animation hook with true parallax scrolling effect
  const useViewportImageAnimation = (
    ref: React.RefObject<HTMLDivElement>,
    startY = 20,
    parallaxMultiplier = 1,
  ) => {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start 120%", "end -20%"],
    });

    const yRaw = useTransform(
      scrollYProgress,
      [0, 1],
      [startY, -startY * 0.5 * parallaxMultiplier],
    );

    return {
      y: useSpring(yRaw, { stiffness: 120, damping: 25, mass: 0.8 }),
    };
  };

  // All animations with viewport-based triggers
  const title = useViewportAnimation(titleRef);
  const welcome = useViewportAnimation(welcomeRef);
  const ceremony = useViewportAnimation(ceremonyRef);
  const image1 = useViewportImageAnimation(image1Ref, 200, 1); // Slower parallax layer (200px travel, 80% scale, 2x speed)
  const image2 = useViewportImageAnimation(image2Ref, 100, 2); // Faster parallax layer (100px travel, 80% scale, 2.5x speed)

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col bg-[#F6F4F1] pb-20 text-[#111111] md:pb-24"
    >
      <motion.h1
        ref={titleRef}
        className="mx-auto mb-8 font-cormorant text-[31px] tracking-tight drop-shadow-2xl lg:mb-16 lg:text-[39px]"
        style={{
          opacity: title.opacity,
          y: title.y,
        }}
      >
        DRESS CODE
      </motion.h1>

      {/* 6 Small Circles */}
      <div className="flex flex-col items-center md:mb-12 md:flex-row md:justify-center md:gap-3 lg:mb-16">
        <div className="mx-auto mb-2 flex gap-4 md:mx-0 md:mb-0">
          <div className="h-10 w-10 rounded-full border-[0.5px] border-[#CCCCCC] bg-[#EBEBEB] md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16"></div>
          <div className="h-10 w-10 rounded-full border-[0.5px] border-[#CCCCCC] bg-[#D6D1C3] md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16"></div>
          <div className="h-10 w-10 rounded-full border-[0.5px] border-[#CCCCCC] bg-[#C9C4B9] md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16"></div>
          <div className="h-10 w-10 rounded-full border-[0.5px] border-[#CCCCCC] bg-[#AFA699] md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16"></div>
        </div>
        <div className="mx-auto mb-8 flex gap-4 md:mx-0 md:mb-0">
          <div className="h-10 w-10 rounded-full border-[0.5px] border-[#CCCCCC] bg-[#908375] md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16"></div>
          <div className="h-10 w-10 rounded-full border-[0.5px] border-[#CCCCCC] bg-[#696158] md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16"></div>
          <div className="h-10 w-10 rounded-full border-[0.5px] border-[#CCCCCC] bg-[#A2967D] md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16"></div>
          <div className="h-10 w-10 rounded-full border-[0.5px] border-[#CCCCCC] bg-[#000000] md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16"></div>
        </div>
      </div>

      <motion.div
        ref={welcomeRef}
        className="mx-auto mb-10 flex w-[80%] flex-col items-center text-center md:mb-12 lg:mb-16"
        style={{
          opacity: welcome.opacity,
          y: welcome.y,
        }}
      >
        <h3 className="mb-2 font-cormorant text-[18px] drop-shadow-2xl md:text-[20px] lg:text-[25px]">
          SHADES OF BEIGE | TAUPE | BLACK
        </h3>
        <h5 className="mb-[6px] font-freight text-[14px] font-light drop-shadow-2xl md:text-[16px] lg:text-[18px]">
          If you don’t have any of these colours, please opt for neutral tones
          and kindly{" "}
          <span className="font-medium underline underline-offset-4">
            avoid white
          </span>
        </h5>
      </motion.div>
      <motion.div
        ref={ceremonyRef}
        className="mx-auto mb-10 flex w-[80%] flex-col items-center text-center md:mb-12"
        style={{
          opacity: ceremony.opacity,
          y: ceremony.y,
        }}
      >
        <h3 className="mb-2 text-center font-cormorant text-[18px] drop-shadow-2xl md:text-[20px] lg:text-[25px]">
          LONG DRESS | BLACK SUIT | NO BATIK
        </h3>
        <h5 className="mb-[6px] font-freight text-[14px] font-light drop-shadow-2xl md:text-[16px] lg:text-[18px]">
          We recommend bringing a scarf or light wrap, as it may get
          breezy in the evening!
        </h5>
      </motion.div>
      <motion.div
        className="relative z-10"
        ref={image1Ref}
        style={{
          y: image1.y,
        }}
      >
        <Image
          className="w-[50%] sm:ml-[12%] sm:w-[45%] md:ml-[13%] md:w-[42%] lg:ml-[25%] lg:w-[28%]"
          src={img3}
          alt="IMG3"
          priority
          loading="eager"
        />
      </motion.div>
      <motion.div
        className="relative z-20"
        ref={image2Ref}
        style={{
          y: image2.y,
        }}
      >
        <Image
          className="-mt-48 ml-auto w-[55%] sm:-mt-20 sm:mr-[12%] sm:w-[50%] md:-mt-24 md:mr-[13%] md:w-[45%] lg:mr-[25%] lg:w-[30%]"
          src={img4}
          alt="IMG4"
          priority
          loading="eager"
        />
      </motion.div>
    </motion.div>
  );
}
