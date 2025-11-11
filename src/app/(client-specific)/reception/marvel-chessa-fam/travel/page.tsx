"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { Button } from "~/components/ui/button";
import Image from "next/image";

import imgplane from "../_images/plane.png";
import imgaccommodation from "../_images/accommodations.png";
import imgbus from "../_images/bus.png";

export default function Travel() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Element refs for viewport-based triggers
  const titleRef = useRef<HTMLDivElement>(null);
  const airportRef = useRef<HTMLDivElement>(null);
  const rimbaRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const divider1Ref = useRef<HTMLHRElement>(null);
  const accommodationTitleRef = useRef<HTMLDivElement>(null);
  const accommodationContentRef = useRef<HTMLDivElement>(null);
  const divider2Ref = useRef<HTMLHRElement>(null);
  const shuttleTitleRef = useRef<HTMLDivElement>(null);
  const shuttleContentRef = useRef<HTMLDivElement>(null);

  // Viewport-based animation hook - triggers when element is 5% from bottom
  const useViewportAnimation = (
    ref: React.RefObject<HTMLElement>,
    yValue = 10,
  ) => {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end 90%"], // Animation starts when element enters viewport, completes when it's 5% from bottom
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
  const airport = useViewportAnimation(airportRef);
  const rimba = useViewportAnimation(rimbaRef);
  const city = useViewportAnimation(cityRef);
  const divider1 = useViewportAnimation(divider1Ref);
  const accommodationTitle = useViewportAnimation(accommodationTitleRef);
  const accommodationContent = useViewportAnimation(accommodationContentRef);
  const divider2 = useViewportAnimation(divider2Ref);
  const shuttleTitle = useViewportAnimation(shuttleTitleRef);
  const shuttleContent = useViewportAnimation(shuttleContentRef);

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col bg-[#1D1A1B] px-8 pb-16 pt-20 text-[#EEEEEE] xl:px-16"
    >
      {/* Unified responsive layout */}
      <div className="flex flex-col xl:relative xl:flex-row xl:gap-16">
        {/* Travel Section */}
        <div className="flex-1">
          <div className="flex flex-col px-5 sm:px-24 xl:lg:w-[90%] xl:mx-auto xl:px-0 xl:text-center">
            <div className="mx-auto mb-8 xl:mb-12">
              <motion.h1
                ref={titleRef}
                className="font-cormorant text-[31px] drop-shadow-2xl lg:mb-5 lg:text-[39px]"
                initial={{ opacity: 0, y: 10 }}
                style={{
                  opacity: title.opacity,
                  y: title.y,
                }}
              >
                TRAVEL
              </motion.h1>
            </div>
            <motion.div
              ref={airportRef}
              className="mx-auto mb-8 text-center xl:mb-12"
              initial={{ opacity: 0, y: 10 }}
              style={{
                opacity: airport.opacity,
                y: airport.y,
              }}
            >
              <Image
                className="mx-auto mb-10 w-[50%] sm:w-[48%] md:w-[42%] xl:mb-12 xl:w-[48%]"
                src={imgplane}
                alt="Airplane"
                width={800}
                height={800}
              />
              <h3 className="mb-2 font-freight text-[16px] tracking-wide drop-shadow-2xl md:text-[18px] xl:mb-4 xl:text-[20px]">
                Fly in to Ngurah Rai International Airport — what to prepare?
              </h3>
              <div className="mx-auto text-center">
                <p className="mb-1 font-hanken text-[12px] font-light md:text-[14px] xl:mb-2 xl:text-[16px]">
                  Passport with at least 6 months before expiry date
                </p>
                <p className="mb-1 font-hanken text-[12px] font-light md:text-[14px] xl:mb-2 xl:text-[16px]">
                  Completed eCD form (https://ecd.beacukai.go.id)
                </p>
                <p className="mb-1 font-hanken text-[12px] font-light md:text-[14px] xl:mb-2 xl:text-[16px]">
                  Arrival visa VOA application (if required)
                </p>
              </div>
            </motion.div>
            <motion.div
              ref={rimbaRef}
              className="mx-auto mb-8 text-center xl:mb-12"
              initial={{ opacity: 0, y: 10 }}
              style={{
                opacity: rimba.opacity,
                y: rimba.y,
              }}
            >
              <h3 className="mb-2 font-freight text-[16px] tracking-wide drop-shadow-2xl md:text-[18px] xl:mb-4 xl:text-[20px]">
                Getting to RIMBA
              </h3>
              <div className="text-center">
                <p className="mb-1 font-hanken text-[12px] font-light md:text-[14px] xl:mb-2 xl:text-[16px]">
                  Approx. 30 minutes from Ngurah Rai Airport by car.
                </p>
                <p className="mb-1 font-hanken text-[12px] font-light md:text-[14px] xl:mb-2 xl:text-[16px]">
                  Cabs / Ride Hailing services available at the airport.
                </p>
                <p className="mb-1 font-hanken text-[12px] font-light md:text-[14px] xl:mb-2 xl:text-[16px]">
                  Check-in time: 3 PM WITA
                </p>
              </div>
            </motion.div>
            <motion.div
              ref={cityRef}
              className="mx-auto mb-16 text-center xl:mb-0"
              initial={{ opacity: 0, y: 10 }}
              style={{
                opacity: city.opacity,
                y: city.y,
              }}
            >
              <h3 className="mb-2 font-freight text-[16px] tracking-wide drop-shadow-2xl md:text-[18px] xl:mb-4 xl:text-[20px]">
                Getting around the City
              </h3>
              <p className="mx-auto text-center font-hanken text-[12px] font-light md:px-8 md:text-[14px] lg:w-[80%] xl:text-[16px]">
                Ride Hailing (Grab / Gojek) / Private Car Hire for extra comfort
                / Motorbikes (local rental / ride hailed) to beat Bali traffic.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Vertical divider line - only visible on xl screens */}
        <div className="hidden xl:absolute xl:left-1/2 xl:top-0 xl:block xl:h-full xl:w-px xl:-translate-x-1/2 xl:transform xl:bg-[#FFFFFF]"></div>

        {/* Accommodation & Shuttle Section */}
        <div className="flex-1">
          <div className="xl:lg:w-[90%] xl:mx-auto xl:text-center">
            <motion.hr
              ref={divider1Ref}
              className="mx-auto mb-8 w-72 border-t border-[#FFFFFF] lg:mb-10 xl:hidden"
              initial={{ opacity: 0, y: 10 }}
              style={{
                opacity: divider1.opacity,
                y: divider1.y,
              }}
            />
            <div className="px-4 text-center sm:px-20 xl:px-0">
              <motion.h1
                ref={accommodationTitleRef}
                className="mx-auto mb-8 font-cormorant text-[31px] tracking-tight drop-shadow-2xl lg:text-[39px] xl:mb-12"
                initial={{ opacity: 0, y: 10 }}
                style={{
                  opacity: accommodationTitle.opacity,
                  y: accommodationTitle.y,
                }}
              >
                ACCOMMODATION
              </motion.h1>
              <motion.div
                ref={accommodationContentRef}
                className="mx-auto mb-16 xl:mb-16"
                initial={{ opacity: 0, y: 10 }}
                style={{
                  opacity: accommodationContent.opacity,
                  y: accommodationContent.y,
                }}
              >
                <Image
                  className="mx-auto mb-10 w-[50%] md:w-[42%] lg:w-[35%] xl:w-[42%]"
                  src={imgaccommodation}
                  alt="Accommodation"
                  width={800}
                  height={800}
                />
                <h3 className="mb-10 text-center font-freight text-[14px] tracking-wide drop-shadow-2xl sm:mx-4 md:text-[16px] xl:mb-8 xl:text-[18px]">
                  As a token of appreciation, we are offering you 2 nights of
                  accommodation from 19-21 June 2026 at:
                </h3>
                <h2 className="mx-auto mb-[6px] font-cormorant text-[25px] tracking-tight drop-shadow-2xl xl:mb-4 xl:text-[31px]">
                  RIMBA by AYANA Bali
                </h2>
                <h4 className="mb-5 text-center font-hanken text-[12px] font-light drop-shadow-2xl sm:mx-4 md:mb-6 md:text-[14px] xl:mb-6 xl:text-[16px]">
                  Sejahtera, Jl. Karang Mas, Jimbaran, South Kuta, Badung
                  Regency, Bali 80364, Indonesia
                </h4>
                <Button
                  className="mb-10 rounded-none border-[1px] border-[#EEEEEE] bg-[#1D1A1B] px-5 py-2 font-cormorant text-[12px] text-[#EEEEEE] transition-all duration-200 ease-out active:bg-[#F6F4F1] active:text-[#1D1A1B] lg:px-7 lg:py-3 lg:text-[13px] xl:mb-8"
                  type="submit"
                  onClick={() =>
                    window.open("https://maps.app.goo.gl/Mha9Hfw28bBjTuhx8")
                  }
                >
                  OPEN MAPS
                </Button>
                <h3 className="text-center font-freight text-[14px] tracking-wide drop-shadow-2xl md:text-[16px] xl:text-[18px]">
                  Please let us know in advance if you prefer to arrange your
                  own accommodation.
                </h3>
              </motion.div>
              <div className="">
                <motion.hr
                  ref={divider2Ref}
                  className="mx-auto mb-8 w-72 border-t border-[#FFFFFF] lg:mb-10 xl:hidden"
                  initial={{ opacity: 0, y: 10 }}
                  style={{
                    opacity: divider2.opacity,
                    y: divider2.y,
                  }}
                />
                <motion.h1
                  ref={shuttleTitleRef}
                  className="mx-auto mb-10 font-cormorant text-[31px] tracking-tight drop-shadow-2xl lg:text-[39px]"
                  initial={{ opacity: 0, y: 10 }}
                  style={{
                    opacity: shuttleTitle.opacity,
                    y: shuttleTitle.y,
                  }}
                >
                  SHUTTLE CAR
                </motion.h1>
                <Image
                  className="mx-auto mb-8 w-[50%] md:w-[39%] lg:w-[35%] xl:w-[42%]"
                  src={imgbus}
                  alt="Shuttle Car"
                  width={800}
                  height={800}
                />
                <motion.h3
                  ref={shuttleContentRef}
                  className="mx-auto px-4 text-center font-freight text-[14px] tracking-wide drop-shadow-2xl md:text-[16px] lg:w-[80%] xl:px-0 xl:text-[18px]"
                  initial={{ opacity: 0, y: 10 }}
                  style={{
                    opacity: shuttleContent.opacity,
                    y: shuttleContent.y,
                  }}
                >
                  Shuttle services to SKY Ayana available only for those staying
                  at the arranged accommodation. Schedule and details to follow.
                </motion.h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
