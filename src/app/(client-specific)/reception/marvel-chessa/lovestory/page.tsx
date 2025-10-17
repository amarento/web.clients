"use client";

import { motion } from "motion/react";
import Image from "next/image";
import img1 from "../_images/IMG1.jpg";
import img2 from "../_images/IMG2.jpg";

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
      className="flex flex-col bg-[#1D1A1B] py-20 text-[#EEEEEE] md:pb-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="mx-auto mb-8"
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        <h1 className="font-cormorant text-[31px] drop-shadow-2xl">
          HOW IT ALL BEGAN
        </h1>
        <h5 className="font-freight text-[14px] tracking-wide drop-shadow-2xl">
          told by Marvel’s Sister and Chessa’s Best Friend (Marcelyn)
        </h5>
      </motion.div>
      <motion.div
        className="mb-10 px-8 sm:px-12 md:px-14"
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        <h3 className="mb-[6px] font-freight text-[20px]">2019 — Aug</h3>
        <h5 className="font-hanken text-[12px] leading-relaxed">
          Marvel’s POV: “She was a friend of a friend”. Chessa’s intrigued and
          slightly befuddled inner monologue: “Who wears his name on a T-shirt?”
          (IYKYK)
        </h5>
      </motion.div>
      <motion.div
        className="mb-10 px-8 sm:px-12 md:px-14"
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        <h3 className="mb-[6px] font-freight text-[20px]">2020 — Apr</h3>
        <h5 className="font-hanken text-[12px] leading-relaxed">
          Marvel, ever the strategist, picked the perfect moment to confess his
          feelings: mere hours before the infamous lockdown. It was the modern
          day Romeo & Juliet: if feuding families can’t separate these
          star-crossed lovers, what chance did the COVID pandemic have?
        </h5>
      </motion.div>
      <motion.div
        className="mb-10 px-8 sm:px-12 md:px-14"
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        <h3 className="mb-[6px] font-freight text-[20px]">2020 — Sep</h3>
        <h5 className="font-hanken text-[12px] leading-relaxed">
          Social distancing kept them 2 metres apart, but hearts don&apos;t
          follow government guidelines. At Hai Di Lao, Marvel poured his heart
          out in a handwritten letter and asked Chessa to be his girlfriend. She
          said yes, and hotpot never tasted so shiok!
          <br />
          <br />
          Marvel likes football, Chessa likes K-drama. Two very different people
          but on occasion, two lines cross in sweet intersections. And as they
          journeyed through life together, 5 years went by.
        </h5>
      </motion.div>
      <motion.div
        className="mb-20 px-8 sm:mb-24 sm:px-12 md:px-14"
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        <h3 className="mb-[6px] font-freight text-[20px]">2025 — May</h3>
        <h5 className="font-hanken text-[12px] leading-relaxed">
          Marvel’s sense of timing struck again. He planned to propose… but the
          day before, Chessa fell sick (don’t worry, not COVID). The big moment
          was postponed. On D+1 month, she rocked up with perfectly washed hair
          and freshly manicured nails, not suspecting a thing, but with a gut
          instinct even Marvel couldn’t predict. 
          <br />
          <br />
          He got down on one knee, and the rest is history.
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
          className="z-10 w-[60%] sm:ml-20 sm:w-[40%] md:ml-24 md:w-[38%] lg:w-[32%] lg:ml-56"
          src={img1}
          alt="IMG1"
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
          className="-mt-10 ml-auto w-[65%] sm:-mt-16 sm:mr-20 sm:w-[45%] md:mr-24 md:w-[42%] lg:w-[35%] lg:mr-56"
          src={img2}
          alt="IMG2"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
