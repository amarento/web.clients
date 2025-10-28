"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";

export default function LoveStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Element refs for viewport-based triggers
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const paymentOption1Ref = useRef<HTMLDivElement>(null);
  const paymentOption2Ref = useRef<HTMLDivElement>(null);

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
  const description = useViewportAnimation(descriptionRef);
  const paymentOption1 = useViewportAnimation(paymentOption1Ref);
  const paymentOption2 = useViewportAnimation(paymentOption2Ref);

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col bg-[#1D1A1B] py-20 text-[#EEEEEE]"
    >
      <div className="mx-auto px-8 sm:px-12 md:px-14">
        <motion.h1
          ref={titleRef}
          className="mb-8 text-center font-cormorant text-[31px] drop-shadow-2xl"
          style={{
            opacity: title.opacity,
            y: title.y,
          }}
        >
          LOVE GIFTS
        </motion.h1>
        <motion.h5
          ref={descriptionRef}
          className="mx-auto mb-10 text-center font-freight text-[14px] lg:text-[16px] lg:w-[80%] tracking-wide drop-shadow-2xl"
          style={{
            opacity: description.opacity,
            y: description.y,
          }}
        >
          Having you join us on our special day is truly enough, but if you wish
          to share a gift, you may do so through the feature below.
          Alternatively, you’re most welcome to present your gift in person on
          the wedding day.
        </motion.h5>
        <div className="md:flex md:justify-center md:gap-20 lg:gap-52">
          <motion.div
            ref={paymentOption1Ref}
            className="pb-8 text-center md:flex md:flex-col md:text-left"
            style={{
              opacity: paymentOption1.opacity,
              y: paymentOption1.y,
            }}
          >
            <h2 className="font-freight text-[25px] mb-[6px] drop-shadow-2xl">
              PayNow / PayLah
            </h2>
            <h4 className="font-hanken text-[12px] font-light drop-shadow-2xl">
              Phone Number: +65 98660013
            </h4>
          </motion.div>
          <motion.div
            ref={paymentOption2Ref}
            className="text-center md:flex md:flex-col md:text-left"
            style={{
              opacity: paymentOption2.opacity,
              y: paymentOption2.y,
            }}
          >
            <h2 className="mb-[6px] font-freight text-[25px] drop-shadow-2xl">
              Bank Transfer
            </h2>
            <h4 className="mb-1 font-hanken text-[12px] font-light drop-shadow-2xl">
              Name: Marvel Wijaya
            </h4>
            <h4 className="mb-1 font-hanken text-[12px] font-light drop-shadow-2xl">
              Bank: SMBC Indonesia (BTPN / Jenius)
            </h4>
            <h4 className="mb-1 font-hanken text-[12px] font-light drop-shadow-2xl">
              Account Number: 90200022976
            </h4>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
