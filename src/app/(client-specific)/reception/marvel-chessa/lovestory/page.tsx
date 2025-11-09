"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

import imgstory1 from "../_images/story1.png";
import imgstory2 from "../_images/story2.png";
import imgstory3 from "../_images/story3.png";
import imgstory4 from "../_images/story4.png";
import imgstory5 from "../_images/story5.png";

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
      offset: ["start end", "end end"], // Animation starts when element enters viewport, completes when it's 10% from bottom
    });

    const opacityRaw = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
    const yRaw = useTransform(scrollYProgress, [0, 1], [yValue, 0]);

    return {
      opacity: useSpring(opacityRaw, { stiffness: 120, damping: 25, mass: 1 }),
      y: useSpring(yRaw, { stiffness: 100, damping: 20, mass: 1 }),
    };
  };

  // Viewport-based image animation hook with simple parallax scrolling effect
  const useViewportImageAnimation = (
    ref: React.RefObject<HTMLDivElement>,
    startY = 20,
    parallaxMultiplier = 1,
  ) => {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start 120%", "end -20%"], // Extended range for better parallax effect
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

  // All animations with viewport-based triggers
  const header = useViewportAnimation(headerRef, 80);
  const story1 = useViewportAnimation(story1Ref);
  const story2 = useViewportAnimation(story2Ref);
  const story3 = useViewportAnimation(story3Ref);
  const story4 = useViewportAnimation(story4Ref);
  const image1 = useViewportImageAnimation(image1Ref, 80, 1.5); // Parallax layer (80px travel, 1.5x speed)
  const image2 = useViewportImageAnimation(image2Ref, 80, 2); // Parallax layer (80px travel, 2x speed)

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col bg-[#F6F4F1] pb-10 pt-4 text-[#111111] md:pb-12"
    >
      <motion.div
        ref={headerRef}
        className="mx-auto mb-8 md:mb-10"
        style={{
          opacity: header.opacity,
          y: header.y,
        }}
      >
        {/* <h1 className="text-center font-cormorant text-[31px] drop-shadow-2xl lg:text-[39px] xl:text-[49px]">
          HOW IT ALL BEGAN
        </h1> */}
      </motion.div>
      <motion.div
        ref={story1Ref}
        className="px-8 sm:px-12 md:px-14"
        style={{
          opacity: story1.opacity,
          y: story1.y,
        }}
      >
        <div className="mx-auto md:w-[85%] lg:w-[75%] xl:w-[70%]">
          <h3 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
            2019 — Aug
          </h3>
          <h5 className="mb-8 font-hanken text-[11px] leading-relaxed md:text-[12px] lg:text-[14px] xl:text-[16px]">
            They first met at a university Christian Fellowship welcome tea.
            Marvel, a fourth-year senior; Chessa, a freshman. The committee (or
            fate?) happened to put them in the same small group. Marvel thought
            she was just “a friend of a friend.” Chessa thought he was that guy
            wearing a T-shirt with his own name on it. Confidence? Questionable.
            Memorable? Absolutely.
          </h5>
          <Image
            className="mx-auto mb-10 w-[65%] md:w-[40%]"
            src={imgstory1}
            alt="IMG1"
            priority
          />
        </div>
      </motion.div>
      <motion.div
        ref={story2Ref}
        className="flex justify-end px-8 sm:px-12 md:px-14"
        style={{
          opacity: story2.opacity,
          y: story2.y,
        }}
      >
        <div className="mx-auto md:w-[85%] lg:w-[75%] xl:w-[70%]">
          <h3 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
            2020 — Apr
          </h3>
          <h5 className="mb-8 font-hanken text-[11px] leading-relaxed md:text-[12px] lg:text-[14px] xl:text-[16px]">
            For months, they barely talked, unless you count math assignments
            and study room bookings. What Chessa didn’t know was that Marvel was
            already quietly drawn to her. So, with some encouragement from
            friends and impeccable timing, he confessed his feelings at the
            study spot they frequent right before Singapore’s lockdown. Talk
            about cutting it close.
          </h5>
          <Image
            className="mx-auto mb-10 w-[65%] md:w-[40%]"
            src={imgstory2}
            alt="IMG2"
            priority
          />
        </div>
      </motion.div>
      <motion.div
        ref={story3Ref}
        className="px-8 sm:px-12 md:px-14"
        style={{
          opacity: story3.opacity,
          y: story3.y,
        }}
      >
        <div className="mx-auto md:w-[85%] lg:w-[75%] xl:w-[70%]">
          <h3 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
            2020 — Sep
          </h3>
          <h5 className="mb-6 font-hanken text-[11px] leading-relaxed md:text-[12px] lg:text-[14px] xl:text-[16px]">
            Lockdown rules said two metres apart, but hearts had other plans.
            Between late-night calls, “study sessions”, and a few suspicious
            supermarket runs, they grew closer. Five months and four handwritten
            letters later, Marvel made it official — with one more letter, this
            time asking her to be his girlfriend.
          </h5>
          <Image
            className="mx-auto mb-10 w-[65%] md:w-[40%]"
            src={imgstory3}
            alt="IMG3"
            priority
          />
        </div>
      </motion.div>
      <motion.div
        ref={story4Ref}
        className="mb-20 px-8 sm:px-12 md:px-14 lg:flex lg:justify-end"
        style={{
          opacity: story4.opacity,
          y: story4.y,
        }}
      >
        <div className="mx-auto md:w-[85%] lg:w-[75%] xl:w-[70%]">
          <h3 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
            2025 — May
          </h3>
          <h5 className="mb-6 font-hanken text-[11px] leading-relaxed md:text-[12px] lg:text-[14px] xl:text-[16px]">
            What started as an awkward encounter turned into five years of love,
            growth, and a shared addiction to Netflix and snacks. Though
            opposites in many ways, they learned to meet in the middle.
            Somewhere along the way, they realised they didn’t just want to
            share a Netflix account, but a lifetime.
          </h5>
          <h5 className="mb-8 font-hanken text-[11px] leading-relaxed md:text-[12px] lg:text-[14px] xl:text-[16px]">
            With help from a few friends, Marvel planned the proposal (after one
            reschedule and many decoy errands). On the day itself, Chessa showed
            up with freshly washed hair and manicured nails, blissfully unaware
            — though her gut hinted something was up.
          </h5>
          <Image
            className="mx-auto mb-8 w-[65%] md:w-[40%]"
            src={imgstory4}
            alt="IMG4"
            priority
          />
          <Image
            className="mx-auto mb-8 w-[65%] md:w-[40%]"
            src={imgstory5}
            alt="IMG5"
            priority
          />
          <p className="text-center text-[12px] italic md:text-[14px] lg:text-[16px] xl:text-[18px]">
            Under the city skyline where it all began, he got down on one knee.
            The rest, as they say, is beautifully predictable.
          </p>
        </div>
      </motion.div>
      <motion.div
        className="relative z-20"
        ref={image1Ref}
        style={{
          y: image1.y,
        }}
      >
        <Image
          className="ml-8 w-[60%] sm:ml-[12%] sm:w-[49%] md:ml-[13%] md:w-[43%] lg:ml-[25%] lg:w-[28%]"
          src={img1}
          alt="IMG1"
          priority
        />
      </motion.div>
      <motion.div
        className="relative z-10"
        ref={image2Ref}
        style={{
          y: image2.y,
        }}
      >
        <Image
          className="-mt-20 ml-auto mr-8 w-[65%] sm:-mt-24 sm:mr-[12%] sm:w-[47%] md:-mt-28 md:mr-[13%] md:w-[45%] lg:-mt-32 lg:mr-[25%] lg:w-[30%]"
          src={img2}
          alt="IMG2"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
