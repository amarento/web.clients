"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

import img5 from "../_images/IMG5.jpg";
import img6 from "../_images/IMG6.jpg";
import img7 from "../_images/IMG7.jpg";
import img8 from "../_images/IMG8.jpg";
import img9 from "../_images/IMG9.jpg";

export default function PhotoAlbum() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Element refs for viewport-based triggers
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);
  const image4Ref = useRef<HTMLDivElement>(null);
  const image5Ref = useRef<HTMLDivElement>(null);

  // Viewport-based image animation hook - triggers when element is 5% from bottom
  const useViewportImageAnimation = (ref: React.RefObject<HTMLDivElement>) => {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end 95%"], // Animation starts when element enters viewport, completes when it's 5% from bottom
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
  const image1 = useViewportImageAnimation(image1Ref);
  const image2 = useViewportImageAnimation(image2Ref);
  const image3 = useViewportImageAnimation(image3Ref);
  const image4 = useViewportImageAnimation(image4Ref);
  const image5 = useViewportImageAnimation(image5Ref);

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col bg-[#F6F4F1] pt-20 text-[#111111] sm:pt-24 lg:pt-24"
    >
      <motion.div
        ref={image1Ref}
        style={{
          opacity: image1.opacity,
          scale: image1.scale,
        }}
      >
        <Image
          className="w-[80%] sm:w-[65%] md:w-[60%] lg:w-[45%]"
          src={img5}
          alt="IMG5"
          priority
        />
      </motion.div>
      <motion.div
        ref={image2Ref}
        style={{
          opacity: image2.opacity,
          scale: image2.scale,
        }}
      >
        <Image
          className="ml-auto mt-10 w-[65%] sm:mt-24 sm:w-[48%] md:w-[45%] lg:mt-24 lg:w-[35%]"
          src={img6}
          alt="IMG6"
          priority
        />
      </motion.div>
      <motion.div
        ref={image3Ref}
        style={{
          opacity: image3.opacity,
          scale: image3.scale,
        }}
      >
        <Image
          className="mt-20 w-[46%] sm:mt-28 sm:w-[45%] md:w-[42%] lg:mt-32 lg:w-[27%]"
          src={img7}
          alt="IMG7"
          priority
        />
      </motion.div>
      <motion.div
        ref={image4Ref}
        className="relative"
        style={{
          opacity: image4.opacity,
          scale: image4.scale,
        }}
      >
        <Image
          className="relative z-20 -mt-36 ml-auto w-[47%] sm:-mt-[360px] sm:w-[45%] lg:w-[32%] md:-mt-[410px] md:w-[42%] lg:-mt-[580px]"
          src={img8}
          alt="IMG8"
          priority
        />
      </motion.div>
      <motion.div
        ref={image5Ref}
        style={{
          opacity: image5.opacity,
          scale: image5.scale,
        }}
      >
        <Image
          className="relative z-10 -mt-40 ml-[15%] w-[45%] sm:-mt-32 sm:ml-[25%] lg:w-[30%] sm:w-[42%] md:w-[40%]"
          src={img9}
          alt="IMG9"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
