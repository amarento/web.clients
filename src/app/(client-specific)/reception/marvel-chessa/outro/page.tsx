"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

import img4 from "../_images/IMG4.jpg";

export default function Outro() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Element refs for viewport-based triggers
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  // Viewport-based animation hook - triggers when element is 5% from bottom
  const useViewportAnimation = (
    ref: React.RefObject<HTMLElement>,
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
  const subtitle = useViewportAnimation(subtitleRef);

  return (
    <motion.div
      ref={containerRef}
      className="relative flex h-[70vh] w-full flex-col pt-[304px] text-[#111111] sm:pt-[360px] md:h-[80vh]"
    >
      <Image
        alt="Outro background"
        className="absolute inset-0 -z-10"
        fill
        priority
        src={img4}
        style={{
          objectFit: "cover",
          objectPosition: "center 25%",
        }}
      />
      <div className="-z-5 absolute inset-0 bg-black/20" />
      <motion.h4
        ref={titleRef}
        className="relative z-10 text-center font-freight text-[18px] text-[#FFFFFF] md:text-[20px]"
        style={{
          opacity: title.opacity,
          y: title.y,
        }}
      >
        We can&apos;t wait to see you there!
      </motion.h4>
      <motion.h5
        ref={subtitleRef}
        className="relative z-10 text-center font-cormorant text-[12px] text-[#FFFFFF] md:text-[14px] lg:text-[16px]"
        style={{
          opacity: subtitle.opacity,
          y: subtitle.y,
        }}
      >
        MARVEL & CHESSA
      </motion.h5>
    </motion.div>
  );
}
