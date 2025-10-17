import { motion } from "motion/react";
import Image from "next/image";

import img5 from "../_images/IMG5.jpg";
import img6 from "../_images/IMG6.jpg";
import img7 from "../_images/IMG7.jpg";
import img8 from "../_images/IMG8.jpg";
import img9 from "../_images/IMG9.jpg";

export default function PhotoAlbum() {
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
      className="flex flex-col bg-[#F6F4F1] pt-20 text-[#111111] sm:pt-24 lg:pt-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        <Image
          className="w-[80%] sm:w-[65%] md:w-[60%] lg:w-[50%]"
          src={img5}
          alt="IMG5"
          priority
        />
      </motion.div>
      <motion.div
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        <Image
          className="ml-auto mt-10 w-[65%] sm:mt-24 sm:w-[48%] md:w-[45%] lg:mt-24 lg:w-[42%]"
          src={img6}
          alt="IMG6"
          priority
        />
      </motion.div>
      <motion.div
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        <Image
          className="mt-20 sm:mt-28 w-[46%] sm:w-[45%] md:w-[42%] lg:mt-32"
          src={img7}
          alt="IMG7"
          priority
        />
      </motion.div>
      <motion.div
        className="relative"
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        <Image
          className="relative z-20 -mt-36 ml-auto w-[47%] sm:-mt-[360px] sm:w-[45%] md:-mt-[410px] md:w-[42%] lg:-mt-[580px]"
          src={img8}
          alt="IMG8"
          priority
        />
      </motion.div>
      <motion.div
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        <Image
          className="relative z-10 -mt-40 ml-[15%] w-[45%] sm:-mt-32 sm:ml-[25%] sm:w-[42%] md:w-[40%]"
          src={img9}
          alt="IMG9"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
