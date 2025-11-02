"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Element refs for viewport-based triggers
  const dividerRef = useRef<HTMLHRElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  // Viewport-based animation hook - triggers when element is 5% from bottom
  const useViewportAnimation = (
    ref: React.RefObject<HTMLElement>,
    yValue = 10,
  ) => {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end 90%"], // Animation starts when element enters viewport, completes when it's 10% from bottom
    });

    const opacityRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const yRaw = useTransform(scrollYProgress, [0, 1], [yValue, 0]);

    return {
      opacity: useSpring(opacityRaw, { stiffness: 120, damping: 25, mass: 1 }),
      y: useSpring(yRaw, { stiffness: 100, damping: 20, mass: 1 }),
    };
  };

  // All animations with viewport-based triggers
  const divider = useViewportAnimation(dividerRef);
  const title = useViewportAnimation(titleRef);
  const description = useViewportAnimation(descriptionRef);

  return (
    <div className="flex flex-col bg-[#F6F4F1] text-[#111111]">
      <motion.div ref={containerRef} className="px-8 text-center sm:px-12">
        <motion.hr
          ref={dividerRef}
          className="mx-auto mb-8 w-72 lg:w-[40%] border-t border-[#111111]"
          style={{
            opacity: divider.opacity,
            y: divider.y,
          }}
        />
        <motion.h1
          ref={titleRef}
          className="mx-auto mb-8 font-cormorant text-[31px] tracking-tight drop-shadow-2xl"
          style={{
            opacity: title.opacity,
            y: title.y,
          }}
        >
          CONTACT US
        </motion.h1>
        <motion.h3
          ref={descriptionRef}
          className="mb-24 text-center font-freight text-[14px] lg:text-[16px] md:w-[70%] lg:w-[55%] xl:w-[45%] mx-auto tracking-wide drop-shadow-2xl"
          style={{
            opacity: description.opacity,
            y: description.y,
          }}
        >
          For any questions related to schedule, accommodation and shuttle,
          please contact Twogather Wedding Planner (+62 817-9079-090)
        </motion.h3>
      </motion.div>
    </div>
  );
}
