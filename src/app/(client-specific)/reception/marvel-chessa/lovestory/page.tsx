"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import img1 from "../_images/IMG1.jpg";
import img2 from "../_images/IMG2.jpg";

export default function LoveStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Element refs for viewport-based triggers
  const headerRef = useRef<HTMLDivElement>(null);
  const story1Ref = useRef<HTMLDivElement>(null);
  const story2Ref = useRef<HTMLDivElement>(null);
  const story3Ref = useRef<HTMLDivElement>(null);
  const story4Ref = useRef<HTMLDivElement>(null);
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
  const header = useViewportAnimation(headerRef, 80);
  const story1 = useViewportAnimation(story1Ref);
  const story2 = useViewportAnimation(story2Ref);
  const story3 = useViewportAnimation(story3Ref);
  const story4 = useViewportAnimation(story4Ref);
  const image1 = useViewportImageAnimation(image1Ref);
  const image2 = useViewportImageAnimation(image2Ref);

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col bg-[#F6F4F1] py-20 text-[#111111] md:pb-24"
    >
      <motion.div
        ref={headerRef}
        className="mx-auto mb-8"
        style={{
          opacity: header.opacity,
          y: header.y,
        }}
      >
        <h1 className="text-center font-cormorant text-[31px] drop-shadow-2xl lg:text-[39px]">
          HOW IT ALL BEGAN
        </h1>
        <h5 className="text-center font-freight text-[14px] tracking-wide drop-shadow-2xl lg:text-[16px]">
          told by Marvel’s Sister and Chessa’s Best Friend (Marcelyn)
        </h5>
      </motion.div>
      <motion.div
        ref={story1Ref}
        className="mb-10 px-8 sm:px-12 md:px-14"
        style={{
          opacity: story1.opacity,
          y: story1.y,
        }}
      >
        <div className="lg:w-[50%]">
          <h3 className="mb-[6px] font-freight text-[20px] lg:text-[25px]">
            2019 — Aug
          </h3>
          <h5 className="font-hanken text-[11px] leading-relaxed lg:text-[14px]">
            Marvel’s POV: “She was a friend of a friend”. Chessa’s intrigued and
            slightly befuddled inner monologue: “Who wears his name on a
            T-shirt?” (IYKYK)
          </h5>
        </div>
      </motion.div>
      <motion.div
        ref={story2Ref}
        className="mb-10 flex justify-end px-8 sm:px-12 md:px-14"
        style={{
          opacity: story2.opacity,
          y: story2.y,
        }}
      >
        <div className="lg:w-[50%]">
          <h3 className="mb-[6px] font-freight text-[20px] lg:text-[25px]">
            2020 — Apr
          </h3>
          <h5 className="font-hanken text-[11px] leading-relaxed lg:text-[14px]">
            Marvel, ever the strategist, picked the perfect moment to confess
            his feelings: mere hours before the infamous lockdown. It was the
            modern day Romeo & Juliet: if feuding families can&apos;t separate
            these star-crossed lovers, what chance did the COVID pandemic have?
          </h5>
        </div>
      </motion.div>
      <motion.div
        ref={story3Ref}
        className="mb-10 px-8 sm:px-12 md:px-14"
        style={{
          opacity: story3.opacity,
          y: story3.y,
        }}
      >
        <div className="lg:w-[50%]">
          <h3 className="mb-[6px] font-freight text-[20px] lg:text-[25px]">
            2020 — Sep
          </h3>
          <h5 className="font-hanken text-[11px] leading-relaxed lg:text-[14px]">
            Social distancing kept them 2 metres apart, but hearts don&apos;t
            follow government guidelines. At Hai Di Lao, Marvel poured his heart
            out in a handwritten letter and asked Chessa to be his girlfriend.
            She said yes, and hotpot never tasted so shiok!
            <br />
            <br />
            Marvel likes football, Chessa likes K-drama. Two very different
            people but on occasion, two lines cross in sweet intersections. And
            as they journeyed through life together, 5 years went by.
          </h5>
        </div>
      </motion.div>
      <motion.div
        ref={story4Ref}
        className="mb-20 px-8 sm:mb-24 sm:px-12 md:px-14 lg:flex lg:justify-end"
        style={{
          opacity: story4.opacity,
          y: story4.y,
        }}
      >
        <div className="lg:w-[50%]">
          <h3 className="mb-[6px] font-freight text-[20px] lg:text-[25px]">
            2025 — May
          </h3>
          <h5 className="font-hanken text-[11px] leading-relaxed lg:text-[14px]">
            Marvel’s sense of timing struck again. He planned to propose… but
            the day before, Chessa fell sick (don’t worry, not COVID). The big
            moment was postponed. On D+1 month, she rocked up with perfectly
            washed hair and freshly manicured nails, not suspecting a thing, but
            with a gut instinct even Marvel couldn’t predict. 
            <br />
            <br />
            He got down on one knee, and the rest is history.
          </h5>
        </div>
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
          className="w-[60%] sm:ml-20 sm:w-[40%] md:ml-24 md:w-[38%] lg:ml-[460px] lg:w-[22%]"
          src={img1}
          alt="IMG1"
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
          className="-mt-10 ml-auto w-[65%] sm:-mt-16 sm:mr-20 sm:w-[45%] md:mr-24 md:w-[42%] lg:-mt-20 lg:mr-[440px] lg:w-[25%]"
          src={img2}
          alt="IMG2"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
