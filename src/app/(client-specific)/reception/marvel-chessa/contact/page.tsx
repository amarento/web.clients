import { motion } from "motion/react";

export default function Contact() {
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
    <div className="flex flex-col bg-[#F6F4F1] text-[#111111]">
      <motion.div
        className="px-8 sm:px-12 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
      >
        <motion.hr
          className="mx-auto mb-8 w-72 border-t border-[#111111]"
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
          CONTACT US
        </motion.h1>
        <motion.h3
          className="mb-24 text-center font-freight text-[14px] tracking-wide drop-shadow-2xl"
          initial="hidden"
          transition={{ duration: 0.8, ease: "easeOut" }}
          variants={fadeIn}
          viewport={{ once: true, margin: "-100px" }}
          whileInView="visible"
        >
          For any questions related to schedule, accommodation and shuttle,
          please contact Twogather Wedding Planner (+62 817-9079-090)
        </motion.h3>
      </motion.div>
    </div>
  );
}
