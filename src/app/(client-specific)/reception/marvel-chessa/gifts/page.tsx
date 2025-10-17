"use client";

import { motion } from "motion/react";

export default function LoveStory() {
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
      className="flex flex-col bg-[#1D1A1B] py-20 text-[#EEEEEE]"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
    >
      <div className="mx-auto px-8 sm:px-12 md:px-14">
        <motion.h1
          className="mb-8 text-center font-cormorant text-[31px] drop-shadow-2xl"
          initial="hidden"
          transition={{ duration: 0.8, ease: "easeOut" }}
          variants={fadeIn}
          viewport={{ once: true, margin: "-100px" }}
          whileInView="visible"
        >
          LOVE GIFTS
        </motion.h1>
        <motion.h5
          className="mb-10 lg:w-[80%] mx-auto text-center font-freight text-[14px] tracking-wide drop-shadow-2xl"
          initial="hidden"
          transition={{ duration: 0.8, ease: "easeOut" }}
          variants={fadeIn}
          viewport={{ once: true, margin: "-100px" }}
          whileInView="visible"
        >
          Having you join us on our special day is truly enough, but if you wish
          to share a gift, you may do so through the feature below.
          Alternatively, you’re most welcome to present your gift in person on
          the wedding day.
        </motion.h5>
        <div className="md:flex md:justify-center md:gap-20 lg:gap-52">
          <motion.div
            className="pb-8 text-center md:flex md:flex-col md:text-left"
            initial="hidden"
            transition={{ duration: 0.8, ease: "easeOut" }}
            variants={fadeIn}
            viewport={{ once: true, margin: "-100px" }}
            whileInView="visible"
          >
            <h2 className="font-freight text-[25px] drop-shadow-2xl">
              PayNow / PayLah
            </h2>
            <h4 className="font-hanken text-[12px] font-light drop-shadow-2xl">
              Phone Number: +65 98660013
            </h4>
          </motion.div>
          <motion.div
            className="text-center md:flex md:flex-col md:text-left"
            initial="hidden"
            transition={{ duration: 0.8, ease: "easeOut" }}
            variants={fadeIn}
            viewport={{ once: true, margin: "-100px" }}
            whileInView="visible"
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
