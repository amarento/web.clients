"use client";

import { motion } from "motion/react";
import { Button } from "~/components/ui/button";

export default function Thewedding() {
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
      className="flex flex-col bg-[#F6F4F1] py-20 text-[#111111]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="mx-auto mb-8 font-cormorant text-[31px] tracking-tight drop-shadow-2xl"
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        THE WEDDING
      </motion.h1>
      <motion.h3
        className="mb-60 mx-auto font-freight text-[16px] tracking-wide drop-shadow-2xl"
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        Friday, 19 June 2026
      </motion.h3>
      <motion.div
        className="flex flex-col items-center"
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        <h2 className="mb-[6px] font-cormorant text-[20px] tracking-tight drop-shadow-2xl">
          WELCOME DINNER
        </h2>
        <h3 className="mb-[6px] font-freight text-[16px] tracking-wide drop-shadow-2xl">
          5.30 pm — WITA
        </h3>
        <h4 className="mb-[6px] font-hanken text-[12px] font-light drop-shadow-2xl">
          Warung Laota, Jimbaran
        </h4>
        <h5 className="mb-5 font-freight text-[14px] tracking-wide drop-shadow-2xl">
          (family only)
        </h5>
        <Button
          className="group mb-16 rounded-none border-[1px] border-[#555555] bg-[#F6F4F1] px-5 py-2 hover:bg-[#FFFFFF] active:bg-[#1D1A1B]"
          type="submit"
        >
          <p className="font-cormorant text-[12px] text-[#111111] group-active:text-[#FFFFFF]">
            OPEN MAPS
          </p>
        </Button>
      </motion.div>

      <motion.h3
        className="mb-60 mx-auto font-freight text-[16px] tracking-wide drop-shadow-2xl"
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        Saturday, 20 June 2026
      </motion.h3>
      <motion.div
        className="flex flex-col items-center"
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        <h2 className="mb-[6px] font-cormorant text-[20px] tracking-tight drop-shadow-2xl">
          TEA CEREMONY
        </h2>
        <h3 className="mb-[6px] font-freight text-[16px] tracking-wide drop-shadow-2xl">
          2.30 pm — WITA
        </h3>
        <h4 className="mb-[6px] font-hanken text-[12px] font-light drop-shadow-2xl">
          Venue TBC
        </h4>
        <h5 className="mb-5 font-freight text-[14px] tracking-wide drop-shadow-2xl">
          (family only)
        </h5>
        <Button
          className="group mb-60 rounded-none border-[1px] border-[#555555] bg-[#F6F4F1] px-5 py-2 hover:bg-[#FFFFFF] active:bg-[#1D1A1B]"
          type="submit"
        >
          <p className="font-cormorant text-[12px] text-[#111111] group-active:text-[#FFFFFF]">
            OPEN MAPS
          </p>
        </Button>
      </motion.div>

      <motion.div
        className="flex flex-col items-center"
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        <h2 className="mb-[6px] font-cormorant text-[20px] tracking-tight drop-shadow-2xl">
          HOLY MATRIMONY
        </h2>
        <h3 className="mb-[6px] font-freight text-[16px] tracking-wide drop-shadow-2xl">
          4 pm — WITA
        </h3>
        <h4 className="mb-5 font-hanken text-[12px] font-light drop-shadow-2xl">
          SKY Ampitheatre, AYANA Resort Bali
        </h4>
        <Button
          className="group mb-60 rounded-none border-[1px] border-[#555555] bg-[#F6F4F1] px-5 py-2 hover:bg-[#FFFFFF] active:bg-[#1D1A1B]"
          type="submit"
        >
          <p className="font-cormorant text-[12px] text-[#111111] group-active:text-[#FFFFFF]">
            OPEN MAPS
          </p>
        </Button>
      </motion.div>

      <motion.div
        className="flex flex-col items-center"
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        <h2 className="mb-[6px] font-cormorant text-[20px] tracking-tight drop-shadow-2xl">
          COCKTAIL & CANAPES
        </h2>
        <h3 className="mb-[6px] font-freight text-[16px] tracking-wide drop-shadow-2xl">
          5.30 pm — WITA
        </h3>
        <h4 className="mb-5 font-hanken text-[12px] font-light drop-shadow-2xl">
          SKY Lower to Middle Lawn, AYANA Resort Bali
        </h4>
        <Button
          className="group mb-60 rounded-none border-[1px] border-[#555555] bg-[#F6F4F1] px-5 py-2 hover:bg-[#FFFFFF] active:bg-[#1D1A1B]"
          type="submit"
        >
          <p className="font-cormorant text-[12px] text-[#111111] group-active:text-[#FFFFFF]">
            OPEN MAPS
          </p>
        </Button>
      </motion.div>

      <motion.div
        className="flex flex-col items-center"
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        <h2 className="mb-[6px] font-cormorant text-[20px] tracking-tight drop-shadow-2xl">
          DINNER RECEPTION
        </h2>
        <h3 className="mb-[6px] font-freight text-[16px] tracking-wide drop-shadow-2xl">
          7 pm — WITA
        </h3>
        <h4 className="mb-[6px] font-hanken text-[12px] font-light drop-shadow-2xl">
          SKY Upper Lawn, AYANA Resort Bali
        </h4>
        <h3 className="mb-5 font-freight text-[14px] tracking-wide drop-shadow-2xl">
          (family only)
        </h3>
        <Button
          className="group rounded-none border-[1px] border-[#555555] bg-[#F6F4F1] px-5 py-2 hover:bg-[#FFFFFF] active:bg-[#1D1A1B]"
          type="submit"
        >
          <p className="font-cormorant text-[12px] text-[#111111] group-active:text-[#FFFFFF]">
            OPEN MAPS
          </p>
        </Button>
      </motion.div>
    </motion.div>
  );
}
