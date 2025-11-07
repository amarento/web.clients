"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Lenis from "lenis";
import img1 from "../_images/slides1.jpg";
import img2 from "../_images/slides2.jpg";
import img3 from "../_images/slides3.jpg";
import img4 from "../_images/slides4.jpg";
import img5 from "../_images/slides5.jpg";

export default function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Element refs for viewport-based triggers
  const firstTextRef = useRef<HTMLDivElement>(null);
  const secondTextRef = useRef<HTMLDivElement>(null);

  // Image slideshow state
  const images = [img1, img2, img3, img4, img5];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Initialize Lenis smooth scroll with spring animation
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Auto-rotate images every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 200); // Change every 200 milliseconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Start showing intro section earlier with scroll-up animation
  // Phase 1: Intro starts appearing from bottom (one scroll before fully visible)
  // Phase 2: Intro fully visible and settled
  const introOpacityRaw = useTransform(
    scrollY,
    [200, 300], // Start appearing earlier at 300px instead of suddenly
    [0, 1],
  );

  const introYRaw = useTransform(
    scrollY,
    [300, 400, 500, 600, 700, 800], // Scroll up animation range
    [250, 200, 150, 100, 50, 0], // Move from 100px below to final position
  );

  // Image scale animation - starts at 50%, grows to 100% on scroll
  const imageScale = useTransform(
    scrollY,
    [500, 600, 700, 800], // Animation range
    [0.7, 0.8, 0.9, 1], // From 50% scale to 100% scale
  );

  // Apply spring physics for smooth motion
  const introOpacity = useSpring(introOpacityRaw, {
    stiffness: 150,
    damping: 25,
    mass: 1,
  });

  const introY = useSpring(introYRaw, {
    stiffness: 120,
    damping: 20,
    mass: 1,
  });

  const imageScaleSpring = useSpring(imageScale, {
    stiffness: 100,
    damping: 25,
    mass: 0.8,
  });

  // Viewport-based animation hook for text elements - triggers when element is 5% from bottom
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

  // Text animations with viewport-based triggers
  const firstText = useViewportAnimation(firstTextRef);
  const secondText = useViewportAnimation(secondTextRef);

  return (
    <motion.div
      ref={containerRef}
      className="static inset-0 z-20 min-h-screen bg-[#F6F4F1]"
      style={{
        opacity: introOpacity,
        y: introY,
      }}
    >
      <motion.div className="flex h-screen flex-col justify-end px-8 pb-[25vh] sm:px-12 md:px-14">
        <motion.div
          ref={firstTextRef}
          className="mb-1"
          style={{
            opacity: firstText.opacity,
            y: firstText.y,
          }}
        >
          <h5 className="font-freight text-[16px] italic drop-shadow-2xl md:text-[18px] lg:text-center lg:font-cormorant lg:text-[18px] lg:uppercase lg:not-italic lg:tracking-[-0.015em]">
            By the grace of God, we’re getting married!
          </h5>
        </motion.div>
        <motion.div
          ref={secondTextRef}
          style={{
            opacity: secondText.opacity,
            y: secondText.y,
          }}
        >
          <h5 className="font-freight -ml-[2px] lg:ml-0 text-[16px] italic drop-shadow-2xl md:text-[18px] lg:text-center lg:font-cormorant lg:text-[18px] lg:uppercase lg:not-italic lg:tracking-[-0.015em]">
            We’d love for you to come and share in the joy of our wedding
            celebration.
          </h5>
        </motion.div>
      </motion.div>
      <motion.div
        className="mt-[25vh] flex justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.6,
        }}
      >
        <motion.div
          className="center max-h-screen w-full overflow-hidden"
          style={{ scale: imageScaleSpring }}
        >
          <motion.h4 className="font-cormorant text-center mb-8 text-[20px] lg:text-[25px]">
            A JOURNEY IN LOVE
          </motion.h4>
          <Image
            key={currentImageIndex}
            className="w-screen lg:-translate-y-12 xl:-translate-y-[80px]"
            alt={`Photo slide ${currentImageIndex + 1}`}
            priority
            src={images[currentImageIndex] ?? img1}
            style={{
              objectFit: "cover",
              objectPosition: "center 5%",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
