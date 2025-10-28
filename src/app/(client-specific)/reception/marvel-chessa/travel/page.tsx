"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { Button } from "~/components/ui/button";

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
      className="flex flex-col bg-[#1D1A1B] px-8 py-20 text-[#EEEEEE] xl:px-16"
    >
      {/* Mobile and tablet layout */}
      <div className="flex flex-col xl:hidden">
        <div className="flex flex-col px-5 sm:px-24">
          <div className="mx-auto mb-8">
            <motion.h1
              ref={titleRef}
              className="font-cormorant text-[31px] drop-shadow-2xl"
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
            className="mx-auto mb-8 text-center"
            style={{
              opacity: airport.opacity,
              y: airport.y,
            }}
          >
            <h3 className="mb-2 font-freight text-[16px] tracking-wide drop-shadow-2xl lg:text-[18px]">
              Fly in to Ngurah Rai International Airport — what to prepare?
            </h3>
            <div className="mx-auto">
              <li className="mb-1 font-hanken text-[12px] font-light lg:text-[14px]">
                Passport with at least 6 months before expiry date
              </li>
              <li className="mb-1 font-hanken text-[12px] font-light lg:text-[14px]">
                Completed eCD form (https://ecd.beacukai.go.id)
              </li>
              <li className="mb-1 font-hanken text-[12px] font-light lg:text-[14px]">
                Arrival visa VOA application (if required)
              </li>
            </div>
          </motion.div>
          <motion.div
            ref={rimbaRef}
            className="mx-auto mb-8 text-center"
            style={{
              opacity: rimba.opacity,
              y: rimba.y,
            }}
          >
            <h3 className="mb-2 font-freight text-[16px] tracking-wide drop-shadow-2xl lg:text-[18px]">
              Getting to RIMBA
            </h3>
            <p className="mb-1 font-hanken text-[12px] font-light lg:text-[14px]">
              Approx. 30 minutes from Ngurah Rai Airport by car.
            </p>
            <p className="mb-1 font-hanken text-[12px] font-light lg:text-[14px]">
              Cabs / Ride Hailing services available at the airport.
            </p>
            <p className="mb-1 font-hanken text-[12px] font-light lg:text-[14px]">
              Check-in time: 3 PM WITA
            </p>
          </motion.div>
          <motion.div
            ref={cityRef}
            className="mx-auto mb-16 text-center"
            style={{
              opacity: city.opacity,
              y: city.y,
            }}
          >
            <h3 className="mb-2 font-freight text-[16px] tracking-wide drop-shadow-2xl lg:text-[18px]">
              Getting around the City
            </h3>
            <p className="font-hanken text-[12px] font-light mx-auto lg:w-[80%] lg:text-[14px]">
              Ride Hailing (Grab / Gojek) / Private Car Hire for extra comfort /
              Motorbikes (local rental / ride hailed) to beat Bali traffic.
            </p>
          </motion.div>
        </div>
        <motion.hr
          ref={divider1Ref}
          className="mx-auto mb-8 w-72 border-t border-[#FFFFFF]"
          style={{
            opacity: divider1.opacity,
            y: divider1.y,
          }}
        />
        <div className="px-4 pb-16 text-center sm:px-20">
          <motion.h1
            ref={accommodationTitleRef}
            className="mx-auto mb-8 font-cormorant text-[31px] tracking-tight drop-shadow-2xl"
            style={{
              opacity: accommodationTitle.opacity,
              y: accommodationTitle.y,
            }}
          >
            ACCOMMODATION
          </motion.h1>
          <motion.div
            ref={accommodationContentRef}
            className="mx-auto"
            style={{
              opacity: accommodationContent.opacity,
              y: accommodationContent.y,
            }}
          >
            <h3 className="mb-10 text-center font-freight text-[14px] tracking-wide drop-shadow-2xl sm:mx-4 lg:text-[16px]">
              As a token of appreciation, we are offering you 2 nights of
              accommodation from 19-21 June 2026 at:
            </h3>
            <h2 className="mx-auto mb-[6px] font-cormorant text-[25px] tracking-tight drop-shadow-2xl">
              RIMBA by AYANA Bali
            </h2>
            <h4 className="mb-5 text-center font-hanken text-[12px] font-light drop-shadow-2xl sm:mx-4 lg:text-[14px]">
              Sejahtera, Jl. Karang Mas, Jimbaran, South Kuta, Badung Regency,
              Bali 80364, Indonesia
            </h4>
            <Button
              className="group mb-10 rounded-none border-[1px] border-[#1D1A1B] bg-[#F6F4F1] px-5 py-2 hover:bg-[#FFFFFF] active:bg-[#1D1A1B]"
              type="submit"
            >
              <p className="font-cormorant text-[12px] text-[#111111] group-active:text-[#FFFFFF]">
                OPEN MAPS
              </p>
            </Button>
            <h3 className="text-center font-freight text-[14px] lg:text-[16px] tracking-wide drop-shadow-2xl">
              Please let us know in advance if you prefer to arrange your own
              accommodation.
            </h3>
          </motion.div>
        </div>
        <div className="px-4 text-center sm:px-20">
          <motion.hr
            ref={divider2Ref}
            className="mx-auto mb-8 w-72 border-t border-[#FFFFFF] xl:w-[40%]"
            style={{
              opacity: divider2.opacity,
              y: divider2.y,
            }}
          />
          <motion.h1
            ref={shuttleTitleRef}
            className="mx-auto mb-8 font-cormorant text-[31px] tracking-tight drop-shadow-2xl"
            style={{
              opacity: shuttleTitle.opacity,
              y: shuttleTitle.y,
            }}
          >
            SHUTTLE CAR
          </motion.h1>
          <motion.h3
            ref={shuttleContentRef}
            className="text-center font-freight text-[14px] lg:text-[16px] lg:w-[80%] mx-auto tracking-wide drop-shadow-2xl md:px-10"
            style={{
              opacity: shuttleContent.opacity,
              y: shuttleContent.y,
            }}
          >
            Shuttle services to SKY Ayana available only for those staying at
            the arranged accommodation. Schedule and details to follow.
          </motion.h3>
        </div>
      </div>

      {/* Large screen two-column layout */}
      <div className="hidden xl:relative xl:flex xl:gap-16">
        {/* Left Column - TRAVEL */}
        <div className="flex-1">
          <div className="mb-16 text-center lg:w-[90%] xl:mx-auto">
            <motion.h1
              ref={titleRef}
              className="mb-12 font-cormorant text-[39px] drop-shadow-2xl"
              style={{
                opacity: title.opacity,
                y: title.y,
              }}
            >
              TRAVEL
            </motion.h1>
            <motion.div
              ref={airportRef}
              className="mb-12 text-center"
              style={{
                opacity: airport.opacity,
                y: airport.y,
              }}
            >
              <h3 className="mb-4 font-freight text-[18px] tracking-wide drop-shadow-2xl">
                Fly in to Ngurah Rai International Airport — what to prepare?
              </h3>
              <div className="text-center">
                <li className="mb-2 font-hanken text-[14px] font-light">
                  Passport with at least 6 months before expiry date
                </li>
                <li className="mb-2 font-hanken text-[14px] font-light">
                  Completed eCD form (https://ecd.beacukai.go.id)
                </li>
                <li className="mb-2 font-hanken text-[14px] font-light">
                  Arrival visa VOA application (if required)
                </li>
              </div>
            </motion.div>
            <motion.div
              ref={rimbaRef}
              className="mb-12 text-center"
              style={{
                opacity: rimba.opacity,
                y: rimba.y,
              }}
            >
              <h3 className="mb-4 font-freight text-[18px] tracking-wide drop-shadow-2xl">
                Getting to RIMBA
              </h3>
              <div className="text-center">
                <p className="mb-2 font-hanken text-[14px] font-light">
                  Approx. 30 minutes from Ngurah Rai Airport by car.
                </p>
                <p className="mb-2 font-hanken text-[14px] font-light">
                  Cabs / Ride Hailing services available at the airport.
                </p>
                <p className="mb-2 font-hanken text-[14px] font-light">
                  Check-in time: 3 PM WITA
                </p>
              </div>
            </motion.div>
            <motion.div
              ref={cityRef}
              className="text-center"
              style={{
                opacity: city.opacity,
                y: city.y,
              }}
            >
              <h3 className="mb-4 font-freight text-[18px] tracking-wide drop-shadow-2xl">
                Getting around the City
              </h3>
              <p className="text-center font-hanken text-[14px] font-light">
                Ride Hailing (Grab / Gojek) / Private Car Hire for extra comfort
                / Motorbikes (local rental / ride hailed) to beat Bali traffic.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Vertical divider line */}
        <div className="xl:absolute xl:left-1/2 xl:top-0 xl:h-full xl:w-px xl:-translate-x-1/2 xl:transform xl:bg-[#FFFFFF]"></div>

        {/* Right Column - ACCOMMODATION & SHUTTLE CAR */}
        <div className="flex-1">
          <div className="text-center lg:w-[90%] xl:mx-auto">
            <motion.h1
              ref={accommodationTitleRef}
              className="mb-12 font-cormorant text-[39px] tracking-tight drop-shadow-2xl"
              style={{
                opacity: accommodationTitle.opacity,
                y: accommodationTitle.y,
              }}
            >
              ACCOMMODATION
            </motion.h1>
            <motion.div
              ref={accommodationContentRef}
              className="mb-16"
              style={{
                opacity: accommodationContent.opacity,
                y: accommodationContent.y,
              }}
            >
              <h3 className="mb-8 text-center font-freight text-[16px] tracking-wide drop-shadow-2xl">
                As a token of appreciation, we are offering you 2 nights of
                accommodation from 19-21 June 2026 at:
              </h3>
              <h2 className="mb-2 font-cormorant text-[31px] tracking-tight drop-shadow-2xl">
                RIMBA by AYANA Bali
              </h2>
              <h4 className="mb-6 text-center font-hanken text-[14px] font-light drop-shadow-2xl">
                Sejahtera, Jl. Karang Mas, Jimbaran, South Kuta, Badung Regency,
                Bali 80364, Indonesia
              </h4>
              <Button
                className="group mb-8 rounded-none border-[1px] border-[#1D1A1B] bg-[#F6F4F1] px-5 py-2 hover:bg-[#FFFFFF] active:bg-[#1D1A1B]"
                type="submit"
              >
                <p className="font-cormorant text-[12px] text-[#111111] group-active:text-[#FFFFFF]">
                  OPEN MAPS
                </p>
              </Button>
              <h3 className="text-center font-freight text-[16px] tracking-wide drop-shadow-2xl">
                Please let us know in advance if you prefer to arrange your own
                accommodation.
              </h3>
            </motion.div>

            <motion.h1
              ref={shuttleTitleRef}
              className="mb-8 font-cormorant text-[31px] tracking-tight drop-shadow-2xl"
              style={{
                opacity: shuttleTitle.opacity,
                y: shuttleTitle.y,
              }}
            >
              SHUTTLE CAR
            </motion.h1>
            <motion.h3
              ref={shuttleContentRef}
              className="text-center font-freight text-[16px] tracking-wide drop-shadow-2xl"
              style={{
                opacity: shuttleContent.opacity,
                y: shuttleContent.y,
              }}
            >
              Shuttle services to SKY Ayana available only for those staying at
              the arranged accommodation. Schedule and details to follow.
            </motion.h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
