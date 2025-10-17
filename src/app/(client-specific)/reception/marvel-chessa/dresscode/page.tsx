import { motion } from "motion/react";
import Image from "next/image";

import img3 from "../_images/IMG3.jpg";
import img4 from "../_images/IMG4.jpg";

export default function Dresscode() {
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
      className="flex flex-col bg-[#F6F4F1] pb-20 sm:pb-24 text-[#111111]"
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
        DRESSCODE
      </motion.h1>
      <motion.div
        className="mb-10 flex flex-col items-center"
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        <h3 className="font-freight text-[18px] drop-shadow-2xl">
          Welcome Dinner
        </h3>
        <h5 className="mb-[6px] font-hanken text-[12px] font-light drop-shadow-2xl">
          Casual and Comfortable
        </h5>
      </motion.div>
      <motion.div
        className="mb-20 sm:mb-24 flex flex-col items-center"
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        <h3 className="font-freight text-[18px] drop-shadow-2xl">
          Tea Ceremony, Holy Matrimony, Reception
        </h3>
        <h5 className="mb-[6px] font-hanken text-[12px] font-light drop-shadow-2xl">
          TBC
        </h5>
      </motion.div>
      <motion.div
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        <Image
          className="z-10 w-[60%] sm:ml-20 sm:w-[45%] md:w-[42%] md:ml-24 lg:w-[35%] lg:ml-52"
          src={img3}
          alt="IMG3"
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
          className="-mt-10 ml-auto w-[65%] sm:w-[50%] sm:-mt-16 sm:mr-20 md:w-[45%] md:mr-24 lg:w-[38%] lg:mr-52"
          src={img4}
          alt="IMG4"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
