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
  const image1 = useViewportImageAnimation(image1Ref, 120, 1.2);
  const image2 = useViewportImageAnimation(image2Ref, 150, 2);
  const image3 = useViewportImageAnimation(image3Ref, 120, 1.2);
  const image4 = useViewportImageAnimation(image4Ref, 150, 2);
  const image5 = useViewportImageAnimation(image5Ref, 60, 1);
  const image6 = useViewportImageAnimation(image6Ref, 120, 1.2);
  const image7 = useViewportImageAnimation(image7Ref, 150, 1.2);
  const image8 = useViewportImageAnimation(image8Ref, 80, 2); 

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col bg-[#F6F4F1] pb-24 text-[#111111]"
    >
      <motion.div
        ref={image1Ref}
        className="relative"
        style={{
          y: image1.y,
        }}
      >
        <Image
          className="mb-12 h-auto w-[55%] object-cover sm:ml-[5%] md:w-[50%] lg:ml-[8%] lg:w-[40%] 2xl:ml-[10%] 2xl:w-[30%]"
          src={img8}
          alt="IMG8"
          width={800}
          height={800}
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
          className="mb-12 ml-auto mt-10 h-auto w-[75%] object-cover sm:mt-16 sm:w-[65%] md:mr-[5%] md:w-[60%] lg:mb-24 lg:mr-64 lg:w-[50%] 2xl:mr-[10%] 2xl:w-[40%]"
          src={img9}
          alt="IMG9"
          width={800}
          height={800}
        />
      </motion.div>
      <div className="mb-8">
        <motion.div
          ref={image3Ref}
          className="relative"
          style={{
            y: image3.y,
          }}
        >
          <Image
            className="lg:mt-18 h-auto w-[46%] object-cover sm:mt-16 sm:w-[45%] md:mt-12 md:w-[42%] lg:ml-16 lg:w-[32%] 2xl:ml-[10%] 2xl:w-[27%]"
            src={img10}
            alt="IMG10"
            width={800}
            height={800}
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
            className="relative -mt-60 ml-auto h-auto w-[47%] object-cover sm:-mt-[360px] sm:w-[45%] md:-mt-[410px] md:w-[42%] lg:-mt-[580px] lg:mr-16 lg:w-[34%] 2xl:mr-[10%] 2xl:w-[30%]"
            src={img11}
            alt="IMG11"
            width={800}
            height={800}
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
            className="-mt-32 ml-[15%] h-auto w-[45%] object-cover sm:-mt-40 sm:ml-[25%] sm:w-[42%] md:w-[40%] lg:ml-[35%] lg:w-[33%] 2xl:ml-[20%] 2xl:mt-20 2xl:w-[28%]"
            src={img12}
            alt="IMG12"
            width={800}
            height={800}
          />
        </motion.div>
      </div>
      <motion.div
        ref={image6Ref}
        className="relative z-10"
        style={{
          y: image6.y,
        }}
      >
        <Image
          className="mb-20 ml-auto mt-10 h-auto w-[75%] object-cover sm:mb-20 sm:mt-24 sm:w-[65%] md:mr-[5%] md:w-[60%] lg:mb-24 lg:mr-[10%] lg:w-[50%] 2xl:mt-60 2xl:w-[48%]"
          src={img13}
          alt="IMG13"
          width={800}
          height={800}
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
          className="ml-[8%] w-[50%] sm:ml-[5%] sm:w-[50%] md:ml-[10%] md:w-[45%] lg:ml-[20%] lg:w-[35%] 2xl:mt-40 2xl:w-[33%] 2xl:ml-[10%]"
          src={img14}
          alt="IMG14"
          width={800}
          height={800}
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
          className="-mt-20 ml-auto mr-[8%] w-[55%] sm:-mt-24 sm:mr-[5%] sm:w-[45%] md:-mt-28 md:mr-[10%] md:w-[50%] lg:-mt-20 lg:mr-[20%] lg:w-[37%] 2xl:mr-[10%] 2xl:-mt-40 2xl:w-[35%]"
          src={img15}
          alt="IMG15"
          width={800}
          height={800}
        />
      </motion.div>
    </motion.div>
  );
}
