"use client";

import { motion } from "motion/react";
import { Button } from "~/components/ui/button";

export default function Travel() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, x: 0, y: 0 },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <motion.div
      className="flex flex-col bg-[#1D1A1B] px-8 py-20 text-[#EEEEEE]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col px-5 sm:px-24">
        <div className="mx-auto mb-8">
          <motion.h1
            className="font-cormorant text-[31px] drop-shadow-2xl"
            initial="hidden"
            transition={{ duration: 0.8, ease: "easeOut" }}
            variants={fadeIn}
            viewport={{ once: true, margin: "-100px" }}
            whileInView="visible"
          >
            TRAVEL
          </motion.h1>
        </div>
        <motion.div
          className="text-center mb-8"
          initial="hidden"
          transition={{ duration: 0.8, ease: "easeOut" }}
          variants={fadeIn}
          viewport={{ once: true, margin: "-100px" }}
          whileInView="visible"
        >
          <h3 className="mb-2 font-freight text-[16px] tracking-wide drop-shadow-2xl">
            Fly in to Ngurah Rai International Airport — what to prepare?
          </h3>
          <div className="mx-auto">
            <li className="mb-1 font-hanken text-[12px] font-light">
              Passport with at least 6 months before expiry date
            </li>
            <li className="mb-1 font-hanken text-[12px] font-light">
              Completed eCD form (https://ecd.beacukai.go.id)
            </li>
            <li className="mb-1 font-hanken text-[12px] font-light">
              Arrival visa VOA application (if required)
            </li>
          </div>
        </motion.div>
        <motion.div
          className="text-center mb-8"
          initial="hidden"
          transition={{ duration: 0.8, ease: "easeOut" }}
          variants={fadeIn}
          viewport={{ once: true, margin: "-100px" }}
          whileInView="visible"
        >
          <h3 className="mb-2 font-freight text-[16px] tracking-wide drop-shadow-2xl">
            Getting to RIMBA
          </h3>
          <p className="mb-1 font-hanken text-[12px] font-light">
            Approx. 30 minutes from Ngurah Rai Airport by car.
          </p>
          <p className="mb-1 font-hanken text-[12px] font-light">
            Cabs / Ride Hailing services available at the airport.
          </p>
          <p className="mb-1 font-hanken text-[12px] font-light">
            Check-in time: 3 PM WITA
          </p>
        </motion.div>
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          transition={{ duration: 0.8, ease: "easeOut" }}
          variants={fadeIn}
          viewport={{ once: true, margin: "-100px" }}
          whileInView="visible"
        >
          <h3 className="mb-2 font-freight text-[16px] tracking-wide drop-shadow-2xl">
            Getting around the City
          </h3>
          <p className="font-hanken text-[12px] font-light">
            Ride Hailing (Grab / Gojek) / Private Car Hire for extra comfort /
            Motorbikes (local rental / ride hailed) to beat Bali traffic.
          </p>
        </motion.div>
      </div>
      <motion.hr
        className="mx-auto mb-8 w-72 border-t border-[#FFFFFF]"
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      />
      <div className="px-4 pb-16 text-center sm:px-20">
        <motion.h1
          className="mx-auto mb-8 font-cormorant text-[31px] tracking-tight drop-shadow-2xl"
          initial="hidden"
          transition={{ duration: 0.8, ease: "easeOut" }}
          variants={fadeIn}
          viewport={{ once: true, margin: "-100px" }}
          whileInView="visible"
        >
          ACCOMMODATION
        </motion.h1>
        <motion.div
          className="mx-auto lg:w-[60%]"
          initial="hidden"
          transition={{ duration: 0.8, ease: "easeOut" }}
          variants={fadeIn}
          viewport={{ once: true, margin: "-100px" }}
          whileInView="visible"
        >
          <h3 className="mb-10 text-center font-freight text-[14px] tracking-wide drop-shadow-2xl sm:mx-4">
            As a token of appreciation, we are offering you 2 nights of
            accommodation from 19-21 June 2026 at:
          </h3>
          <h2 className="mx-auto mb-[6px] font-cormorant text-[25px] tracking-tight drop-shadow-2xl">
            RIMBA by AYANA Bali
          </h2>
          <h4 className="mb-5 text-center font-hanken text-[12px] font-light drop-shadow-2xl sm:mx-4">
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
          <h3 className="text-center font-freight text-[14px] tracking-wide drop-shadow-2xl">
            Please let us know in advance if you prefer to arrange your own
            accommodation.
          </h3>
        </motion.div>
      </div>
      <div className="text-center px-4 sm:px-20 lg:w-[70%]">
        <motion.hr
          className="mx-auto mb-8 w-72 border-t border-[#FFFFFF]"
          initial="hidden"
          transition={{ duration: 0.8, ease: "easeOut" }}
          variants={fadeIn}
          viewport={{ once: true, margin: "-100px" }}
          whileInView="visible"
        />
        <motion.h1
          className="mx-auto mb-8 font-cormorant text-[31px] tracking-tight drop-shadow-2xl"
          initial="hidden"
          transition={{ duration: 0.8, ease: "easeOut" }}
          variants={fadeIn}
          viewport={{ once: true, margin: "-100px" }}
          whileInView="visible"
        >
          SHUTTLE CAR
        </motion.h1>
        <motion.h3
          className="text-center font-freight text-[14px] tracking-wide drop-shadow-2xl md:px-10"
          initial="hidden"
          transition={{ duration: 0.8, ease: "easeOut" }}
          variants={fadeIn}
          viewport={{ once: true, margin: "-100px" }}
          whileInView="visible"
        >
          Shuttle services to SKY Ayana available only for those staying at the
          arranged accommodation. Schedule and details to follow.
        </motion.h3>
      </div>
    </motion.div>
  );
}
