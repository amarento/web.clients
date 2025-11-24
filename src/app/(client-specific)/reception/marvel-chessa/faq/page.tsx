"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef, useState } from "react";

const FAQItem = ({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="mb-6 border-b border-[#FFFFFF]/50 pb-6">
      <button
        onClick={onToggle}
        className="flex w-full justify-center"
        type="button"
      >
        <h3 className="font-cormorant text-[16px] tracking-tight lg:text-[18px] 2xl:text-[20px]">
          {question}
        </h3>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="mt-4 text-center font-freight text-[14px] leading-relaxed lg:text-[16px] 2xl:text-[18px]">
          {answer}
        </p>
      </motion.div>
    </div>
  );
};

export default function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Element refs for viewport-based triggers
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const faqTitleRef = useRef<HTMLDivElement>(null);
  const faqContentRef = useRef<HTMLDivElement>(null);

  // Viewport-based animation hook
  const useViewportAnimation = (
    ref: React.RefObject<HTMLElement>,
    yValue = 10,
  ) => {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end 90%"],
    });

    const opacityRaw = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
    const yRaw = useTransform(scrollYProgress, [0, 1], [yValue, 0]);

    return {
      opacity: useSpring(opacityRaw, { stiffness: 120, damping: 25, mass: 1 }),
      y: useSpring(yRaw, { stiffness: 100, damping: 20, mass: 1 }),
    };
  };

  // All animations with viewport-based triggers
  const title = useViewportAnimation(titleRef);
  const description = useViewportAnimation(descriptionRef);
  const faqTitle = useViewportAnimation(faqTitleRef);
  const faqContent = useViewportAnimation(faqContentRef);

  const faqs = [
    {
      question: "WHAT IS THE CHECK-IN AND CHECK-OUT TIME OF THE ACCOMMODATION?",
      answer: "Check-in begins at 3:00 PM, and check-out is at 12:00 PM.",
    },
    {
      question: "CAN I BRING A PLUS ONE?",
      answer:
        "We’d love to include everyone, but unfortunately our venue capacity is limited. If your invitation includes a plus one, you’ll see it indicated in your RSVP form. If you’re unsure, feel free to reach out to us directly!",
    },
    {
      question: "WILL WE BE ASSIGNED ROOMMATES?",
      answer:
        "We’ll ask for your preference in the RSVP form. Otherwise, we’ll allocate the room accordingly.",
    },
    {
      question: "IS BREAKFAST PROVIDED?",
      answer:
        "Yes, hotel breakfast is included for all guests staying at our arranged accommodations.",
    },
    {
      question: "IS THE VENUE INDOOR OR OUTDOOR?",
      answer:
        "It’s a fully outdoor venue. We recommend comfortable shoes or block heels since there’s plenty of grass.",
    },
    {
      question: "WHAT TIME SHOULD WE ARRIVE BEFORE THE CEREMONY STARTS?",
      answer:
        "Seating for the holy matrimony is limited and on a first-come, first-served basis. Please arrive 15 minutes early.",
    },
    {
      question: "ARE BABIES ALLOWED AT THE WEDDING?",
      answer:
        "Yes, little ones are welcome! Just let us know beforehand so we can make any necessary arrangements.",
    },
    {
      question: "WHAT TIME DOES THE RECEPTION END?",
      answer:
        "Dinner will be followed by an after-party. You’re welcome to stay as long as you’d like or head off earlier — just remember to say goodbye so we can get a photo with you!",
    },
    {
      question: "ANY BALI-RELEVANT PRECAUTIONS WE NEED TO TAKE NOTE OFF?",
      answer:
        "Please be mindful of “Bali Belly” — avoid tap water and stick to bottled water. The sun can get strong around midday, so sunscreen is recommended. It’s also a good idea to use mosquito repellent, especially for outdoor areas and evenings.",
    },
  ];

  return (
    <div className="flex flex-col bg-[#1D1A1B] pt-16 text-[#EEEEEE] lg:pt-20">
      <div className="mx-auto">
        <motion.h2
          ref={faqTitleRef}
          className="mx-auto mb-12 text-center font-cormorant text-[31px] tracking-tight drop-shadow-2xl md:mb-16 lg:mb-20 lg:text-[31px] 2xl:text-[49px]"
          style={{
            opacity: faqTitle.opacity,
            y: faqTitle.y,
          }}
        >
          <span className="lg:hidden">FAQ</span>
          <span className="hidden lg:inline">FREQUENTLY ASKED QUESTIONS</span>
        </motion.h2>
        <motion.div
          ref={faqContentRef}
          className="mx-auto mb-16 max-w-[80%] md:max-w-[75%] lg:max-w-[65%]"
          style={{
            opacity: faqContent.opacity,
            y: faqContent.y,
          }}
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>

        {/* Contact Us Section */}
        <motion.div ref={containerRef} className="px-8 text-center sm:px-12">
          <motion.h1
            ref={titleRef}
            className="mx-auto mb-8 font-cormorant text-[25px] tracking-tight drop-shadow-2xl xl:text-[31px] 2xl:text-[39px]"
            style={{
              opacity: title.opacity,
              y: title.y,
            }}
          >
            CONTACT US
          </motion.h1>
          <motion.p
            ref={descriptionRef}
            className="mx-auto mb-24 text-center font-freight text-[14px] tracking-wide drop-shadow-2xl md:w-[70%] lg:w-[55%] lg:text-[16px] xl:w-[45%] xl:text-[18px] 2xl:text-[20px]"
            style={{
              opacity: description.opacity,
              y: description.y,
            }}
          >
            For any questions related to schedule, accommodation and shuttle,
            please contact Twogather Wedding Planner (+62 817-9079-090)
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
