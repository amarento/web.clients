"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { Button } from "~/components/ui/button";

export default function LoveStory() {
  const [copiedPayNow, setCopiedPayNow] = useState(false);
  const [copiedBankTransfer, setCopiedBankTransfer] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Element refs for viewport-based triggers
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const paymentOption1Ref = useRef<HTMLDivElement>(null);
  const paymentOption2Ref = useRef<HTMLDivElement>(null);

  // Viewport-based animation hook
  const useViewportAnimation = (
    ref: React.RefObject<HTMLElement>,
    yValue = 10,
  ) => {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start 120%", "end -20%"],
    });

    const opacityRaw = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
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

  function handleCopyPayNow(
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    void navigator.clipboard
      .writeText("+6598660013")
      .then(() => {
        setCopiedPayNow(true);
        setTimeout(() => setCopiedPayNow(false), 1500);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }

  function handleCopyBankTransfer(
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    void navigator.clipboard
      .writeText("90260022976")
      .then(() => {
        setCopiedBankTransfer(true);
        setTimeout(() => setCopiedBankTransfer(false), 1500);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col bg-[#1D1A1B] pb-20 pt-16 text-[#EEEEEE]"
    >
      <div className="mx-auto px-8 sm:px-12 md:px-14">
        <motion.h1
          ref={titleRef}
          className="mb-8 text-center font-cormorant text-[31px] drop-shadow-2xl lg:text-[39px] 2xl:text-[49px]"
          style={{
            opacity: title.opacity,
            y: title.y,
          }}
        >
          LOVE GIFTS
        </motion.h1>
        <motion.h5
          ref={descriptionRef}
          className="mx-auto mb-10 text-center font-freight text-[14px] tracking-wide drop-shadow-2xl lg:w-[80%] lg:text-[16px] 2xl:mb-12 2xl:w-[65%] 2xl:text-[20px]"
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
            <h2 className="mb-[6px] font-freight text-[25px] drop-shadow-2xl lg:text-[31px] 2xl:text-[39px]">
              PayNow / PayLah
            </h2>
            <h4 className="mb-5 font-hanken text-[12px] font-light drop-shadow-2xl lg:text-[14px] 2xl:text-[16px]">
              Phone Number: +65 98660013
            </h4>
            <Button
              className="mb-10 rounded-none border-[1px] border-[#EEEEEE] px-5 py-2 font-cormorant text-[12px] text-[#EEEEEE] md:w-20 xl:mb-8"
              style={{
                backgroundColor: copiedPayNow ? "#FFFFFF" : "#1D1A1B",
                transition: "background-color 0.3s ease-out",
              }}
              type="submit"
              onClick={handleCopyPayNow}
            >
              <p
                className={`text-[10px] lg:text-[12px] ${
                  copiedPayNow ? "text-[#5D5C55]" : "text-white"
                }`}
              >
                {copiedPayNow ? "COPIED!" : "COPY"}
              </p>
            </Button>
          </motion.div>
          <motion.div
            ref={paymentOption2Ref}
            className="text-center md:flex md:flex-col md:text-left"
            style={{
              opacity: paymentOption2.opacity,
              y: paymentOption2.y,
            }}
          >
            <h2 className="mb-[6px] font-freight text-[25px] drop-shadow-2xl lg:text-[31px] 2xl:text-[39px]">
              Bank Transfer
            </h2>
            <h4 className="mb-1 font-hanken text-[12px] font-light drop-shadow-2xl lg:text-[14px] 2xl:text-[16px]">
              Name: Marvel Wijaya
            </h4>
            <h4 className="mb-1 font-hanken text-[12px] font-light drop-shadow-2xl lg:text-[14px] 2xl:text-[16px]">
              Bank: SMBC Indonesia
            </h4>
            <h4 className="mb-5 font-hanken text-[12px] font-light drop-shadow-2xl lg:text-[14px] 2xl:text-[16px]">
              Account Number: 90260022976
            </h4>
            <Button
              className="mb-10 rounded-none border-[1px] border-[#EEEEEE] px-5 py-2 font-cormorant text-[12px] text-[#EEEEEE] md:w-20 xl:mb-8"
              style={{
                backgroundColor: copiedBankTransfer ? "#FFFFFF" : "#1D1A1B",
                transition: "background-color 0.3s ease-out",
              }}
              type="submit"
              onClick={handleCopyBankTransfer}
            >
              <p
                className={`text-[10px] lg:text-[12px] ${
                  copiedBankTransfer ? "text-[#5D5C55]" : "text-white"
                }`}
              >
                {copiedBankTransfer ? "COPIED!" : "COPY"}
              </p>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
