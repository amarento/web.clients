"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

import img8 from "../_images/IMG8.jpg";
import img9 from "../_images/IMG9.jpg";
import img10 from "../_images/IMG10.jpg";
import img11 from "../_images/IMG11.jpg";
import img12 from "../_images/IMG12.jpg";
import img13 from "../_images/IMG13.jpg";
import img14 from "../_images/IMG14.jpg";
import img15 from "../_images/IMG15.jpg";

export default function PhotoAlbum2() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Element refs for viewport-based triggers
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);
  const image4Ref = useRef<HTMLDivElement>(null);
  const image5Ref = useRef<HTMLDivElement>(null);
  const image6Ref = useRef<HTMLDivElement>(null);
  const image7Ref = useRef<HTMLDivElement>(null);
  const image8Ref = useRef<HTMLDivElement>(null);

  // Viewport-based image animation hook with parallax scrolling effect
  const useViewportImageAnimation = (
    ref: React.RefObject<HTMLDivElement>,
    startY = 50,
    parallaxMultiplier = 1,
  ) => {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start 120%", "end -20%"], // Extended range outside viewport for enhanced parallax effect
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
  const image3 = useViewportImageAnimation(image3Ref, 120, 1.2); // Standard parallax layer
  const image4 = useViewportImageAnimation(image4Ref, 150, 2); // Faster parallax layer
  const image5 = useViewportImageAnimation(image5Ref, 60, 1); // Slowest parallax layer
  const image6 = useViewportImageAnimation(image6Ref, 120, 1.2); // Standard parallax layer
  const image7 = useViewportImageAnimation(image7Ref, 150, 2); // Faster parallax layer
  const image8 = useViewportImageAnimation(image8Ref, 60, 1); // Slowest parallax layer

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col bg-[#F6F4F1] pb-24 text-[#111111] sm:pt-24 lg:pt-24"
    >
      <motion.div
        ref={image1Ref}
        className="relative"
        style={{
          y: image1.y,
        }}
      >
        <Image
          className="h-auto w-[80%] object-cover sm:w-[65%] md:w-[60%] lg:ml-12 lg:w-[45%]"
          src={img8}
          alt="IMG8"
          priority
        />
      </motion.div>
      <motion.div
        ref={image2Ref}
        className="relative"
        style={{
          y: image2.y,
        }}
      >
        <Image
          className="ml-auto mt-10 h-auto w-[65%] object-cover sm:mt-24 sm:w-[48%] md:w-[45%] lg:mr-64 lg:w-[35%]"
          src={img9}
          alt="IMG9"
          priority
        />
      </motion.div>
      <motion.div
        ref={image3Ref}
        className="relative"
        style={{
          y: image3.y,
        }}
      >
        <Image
          className="lg:mt-18 h-auto w-[46%] object-cover sm:mt-20 sm:w-[45%] md:mt-12 md:w-[42%] lg:ml-16 lg:w-[32%]"
          src={img10}
          alt="IMG10"
          priority
        />
      </motion.div>
      <motion.div
        ref={image4Ref}
        className="relative z-20"
        style={{
          y: image4.y,
        }}
      >
        <Image
          className="relative -mt-60 ml-auto h-auto w-[47%] object-cover sm:-mt-[360px] sm:w-[45%] md:-mt-[410px] md:w-[42%] lg:-mt-[580px] lg:mr-16 lg:w-[34%]"
          src={img11}
          alt="IMG11"
          priority
        />
      </motion.div>
      <motion.div
        ref={image5Ref}
        className="relative z-10"
        style={{
          y: image5.y,
        }}
      >
        <Image
          className="-mt-32 ml-[15%] h-auto w-[45%] object-cover sm:-mt-40 sm:ml-[25%] sm:w-[42%] md:w-[40%] lg:ml-[35%] lg:w-[33%]"
          src={img12}
          alt="IMG12"
          priority
        />
      </motion.div>
      <motion.div
        ref={image6Ref}
        className="relative z-10"
        style={{
          y: image6.y,
        }}
      >
        <Image
          className="ml-auto mt-10 h-auto w-[65%] object-cover sm:mt-24 sm:w-[48%] md:w-[45%] lg:mr-64 lg:w-[35%]"
          src={img13}
          alt="IMG13"
          priority
        />
      </motion.div>
      <motion.div
        ref={image7Ref}
        className="relative z-10"
        style={{
          y: image7.y,
        }}
      >
        <Image
          className="ml-8 w-[60%] sm:ml-[8%] sm:w-[50%] md:ml-[10%] md:w-[48%] lg:ml-[30%] lg:w-[26%]"
          src={img14}
          alt="IMG14"
          priority
        />
      </motion.div>
      <motion.div
        ref={image8Ref}
        className="relative z-10"
        style={{
          y: image8.y,
        }}
      >
        <Image
          className="-mt-20 ml-auto mr-8 w-[65%] sm:-mt-24 sm:mr-[8%] sm:w-[47%] md:-mt-28 md:mr-[10%] md:w-[50%] lg:-mt-20 lg:mr-[30%] lg:w-[27%]"
          src={img15}
          alt="IMG15"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
