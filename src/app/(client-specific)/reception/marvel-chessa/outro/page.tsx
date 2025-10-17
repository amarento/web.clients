import { motion } from "motion/react";
import Image from "next/image";

import img4 from "../_images/IMG4.jpg";

export default function Outro() {
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
      className="relative flex h-[70vh] w-full flex-col pt-[304px] sm:pt-[360px] text-[#111111]"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
    >
      <Image
        alt="Outro background"
        className="absolute inset-0 -z-10"
        fill
        priority
        src={img4}
        style={{
          objectFit: "cover",
          objectPosition: "center top",
        }}
      />
      <div className="-z-5 absolute inset-0 bg-black/20" />
      <motion.h4
        className="relative z-10 text-center font-freight text-[18px] sm:text-[20px] text-[#FFFFFF]"
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        We can&apos;t wait to see you there!
      </motion.h4>
      <motion.h5
        className="relative z-10 text-center font-cormorant text-[12px] sm:text-[14px] text-[#FFFFFF]"
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        MARVEL & CHESSA
      </motion.h5>
    </motion.div>
  );
}
