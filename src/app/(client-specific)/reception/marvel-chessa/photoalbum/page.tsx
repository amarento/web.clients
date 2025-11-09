"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

import img5 from "../_images/IMG5.jpg";
import img6 from "../_images/IMG6.jpg";
import img7 from "../_images/IMG7.jpg";

export default function PhotoAlbum() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Element refs for viewport-based triggers
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);

  // Viewport-based image animation hook with parallax scrolling effect
  const useViewportImageAnimation = (
    ref: React.RefObject<HTMLDivElement>,
    startY = 50,
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

  // All animations with viewport-based parallax triggers
  const image1 = useViewportImageAnimation(image1Ref, 120, 1.2); // Standard parallax layer
  const image2 = useViewportImageAnimation(image2Ref, 150, 2); // Faster parallax layer
  const image3 = useViewportImageAnimation(image3Ref, 60, 1); // Slowest parallax layer

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col bg-[#1D1A1B] pb-24 text-[#111111] sm:pt-24 lg:pt-24"
    >
      <motion.div
        ref={image1Ref}
        className="relative"
        style={{
          y: image1.y,
        }}
      >
        <Image
          className="lg:mt-18 h-auto w-[46%] object-cover sm:mt-20 sm:w-[45%] md:mt-12 md:w-[42%] lg:ml-16 lg:w-[32%]"
          src={img5}
          alt="IMG5"
          priority
        />
      </motion.div>
      <motion.div
        ref={image2Ref}
        className="relative z-20"
        style={{
          y: image2.y,
        }}
      >
        <Image
          className="relative -mt-60 ml-auto h-auto w-[47%] object-cover sm:-mt-[360px] sm:w-[45%] md:-mt-[410px] md:w-[42%] lg:-mt-[580px] lg:mr-16 lg:w-[34%]"
          src={img6}
          alt="IMG6"
          priority
        />
      </motion.div>
      <motion.div
        ref={image3Ref}
        className="relative z-10"
        style={{
          y: image3.y,
        }}
      >
        <Image
          className="-mt-32 ml-[15%] h-auto w-[45%] object-cover sm:-mt-40 sm:ml-[25%] sm:w-[42%] md:w-[40%] lg:ml-[35%] lg:w-[33%]"
          src={img7}
          alt="IMG7"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
