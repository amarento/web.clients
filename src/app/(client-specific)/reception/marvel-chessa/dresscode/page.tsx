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
      offset: ["start end", "end 95%"], // Animation starts when element enters viewport, completes when it's 10% from bottom
    });

    const opacityRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const yRaw = useTransform(scrollYProgress, [0, 1], [yValue, 0]);

    return {
      opacity: useSpring(opacityRaw, { stiffness: 120, damping: 25, mass: 1 }),
      y: useSpring(yRaw, { stiffness: 100, damping: 20, mass: 1 }),
    };
  };

  // Viewport-based image animation hook
  const useViewportImageAnimation = (ref: React.RefObject<HTMLDivElement>) => {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end 95%"], // Same trigger: 5% from viewport bottom
    });

    const opacityRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const scaleRaw = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

    return {
      opacity: useSpring(opacityRaw, {
        stiffness: 150,
        damping: 30,
        mass: 0.8,
      }),
      scale: useSpring(scaleRaw, { stiffness: 120, damping: 25, mass: 0.8 }),
    };
  };

  // All animations with viewport-based triggers
  const title = useViewportAnimation(titleRef);
  const welcome = useViewportAnimation(welcomeRef);
  const ceremony = useViewportAnimation(ceremonyRef);
  const image1 = useViewportImageAnimation(image1Ref);
  const image2 = useViewportImageAnimation(image2Ref);

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col bg-[#F6F4F1] pb-20 text-[#111111] sm:pb-24"
    >
      <motion.h1
        ref={titleRef}
        className="mx-auto mb-8 lg:mb-16 font-cormorant text-[31px] tracking-tight drop-shadow-2xl xl:text-[39px]"
        style={{
          opacity: title.opacity,
          y: title.y,
        }}
      >
        DRESSCODE
      </motion.h1>
      <motion.div
        ref={welcomeRef}
        className="mb-10 lg:mb-16 flex flex-col items-center"
        style={{
          opacity: welcome.opacity,
          y: welcome.y,
        }}
      >
        <h3 className="font-freight text-[18px] drop-shadow-2xl lg:text-[20px]">
          Welcome Dinner
        </h3>
        <h5 className="mb-[6px] font-hanken text-[12px] font-light drop-shadow-2xl lg:text-[14px]">
          Casual and Comfortable
        </h5>
      </motion.div>
      <motion.div
        ref={ceremonyRef}
        className="mb-20 flex flex-col items-center sm:mb-24"
        style={{
          opacity: ceremony.opacity,
          y: ceremony.y,
        }}
      >
        <h3 className="font-freight text-[18px] drop-shadow-2xl lg:text-[20px]">
          Tea Ceremony, Holy Matrimony, Reception
        </h3>
        <h5 className="mb-[6px] font-hanken text-[12px] font-light drop-shadow-2xl lg:text-[14px]">
          TBC
        </h5>
      </motion.div>
      <motion.div
        className="relative z-20"
        ref={image1Ref}
        style={{
          opacity: image1.opacity,
          scale: image1.scale,
        }}
      >
        <Image
          className="w-[60%] sm:ml-20 sm:w-[45%] md:ml-24 md:w-[42%] lg:ml-80 lg:w-[24%]"
          src={img3}
          alt="IMG3"
          priority
        />
      </motion.div>
      <motion.div
        className="relative z-10"
        ref={image2Ref}
        style={{
          opacity: image2.opacity,
          scale: image2.scale,
        }}
      >
        <Image
          className="-mt-10 ml-auto w-[65%] sm:-mt-16 sm:mr-20 sm:w-[50%] md:mr-24 md:w-[45%] lg:mr-80 lg:w-[26%]"
          src={img4}
          alt="IMG4"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
