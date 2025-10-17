"use client";

import { motion } from "motion/react";
import Image from "next/image";
import slides from "../_images/IMG5.jpg";

export default function Intro() {
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
    <div className="bg-[#F6F4F1]">
      <motion.div
        className="flex h-screen flex-col justify-center px-8 sm:px-12 md:px-14"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mb-1"
          initial="hidden"
          transition={{ duration: 0.8, ease: "easeOut" }}
          variants={fadeIn}
          viewport={{ once: true, margin: "-100px" }}
          whileInView="visible"
        >
          <h5 className="font-freight text-[18px] italic drop-shadow-2xl md:text-[20px]">
            By the grace of God, we’re getting married!
          </h5>
        </motion.div>
        <motion.div
          initial="hidden"
          transition={{ duration: 0.8, ease: "easeOut" }}
          variants={fadeIn}
          viewport={{ once: true, margin: "-100px" }}
          whileInView="visible"
        >
          <h5 className="font-freight text-[18px] italic drop-shadow-2xl md:text-[20px]">
            We’d love for you to come and share in the joy of our wedding
            celebration.
          </h5>
        </motion.div>
      </motion.div>
      <Image className="w-screen" alt="Photo slides" priority src={slides} />
    </div>
  );
}
