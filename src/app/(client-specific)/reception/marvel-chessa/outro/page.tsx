"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

import img4 from "../_images/IMG16.jpg";

export default function Outro() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Element refs for viewport-based triggers
  const titleRef = useRef<HTMLDivElement>(null);

  // Viewport-based animation hook - triggers when element is 5% from bottom
  const useViewportAnimation = (
    ref: React.RefObject<HTMLElement>,
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

  return (
    <motion.div
      ref={containerRef}
      className="relative flex h-[70vh] w-full flex-col items-center justify-center text-[#111111] md:h-[80vh] lg:h-[100vh]"
    >
      <Image
        alt="Outro background"
        className="-z-5 absolute inset-0"
        fill
        priority
        src={img4}
        style={{
          objectFit: "cover",
          objectPosition: "center 25%",
        }}
      />
      <div className="absolute inset-0 z-5 bg-black/20" />
      <motion.h5
        ref={titleRef}
        className="relative z-10 text-center font-cormorant text-[12px] text-[#FFFFFF] md:text-[14px] lg:text-[16px]"
        style={{
          opacity: title.opacity,
          y: title.y,
        }}
      >
        WE CAN&apos;T WAIT TO SEE YOU THERE!
      </motion.h5>
    </motion.div>
  );
}
