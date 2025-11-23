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
        <h3 className="font-cormorant text-[16px] tracking-tight lg:text-[18px] 2xl:text-[25px]">
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
      question: "WHAT IS THE DRESS CODE?",
      answer:
        "We request our guests to dress in formal attire. For gentlemen, a suit and tie or traditional formal wear. For ladies, cocktail dresses, evening gowns, or traditional formal attire. Please avoid wearing white or ivory as these colors are reserved for the bride.",
    },
    {
      question: "CAN I BRING A PLUS ONE?",
      answer:
        "We have made our invitations based on our venue capacity. If your invitation includes a plus one, it will be indicated on your invitation. If you have any questions, please contact us directly.",
    },
    {
      question: "WILL TRANSPORTATION BE PROVIDED?",
      answer:
        "Shuttle services to SKY Ayana will be available only for guests staying at the arranged accommodation (Bali Paragon Resort Hotel). Detailed schedule and pickup points will be shared closer to the wedding date.",
    },
    {
      question: "WHAT TIME SHOULD I ARRIVE?",
      answer:
        "We recommend arriving at least 30 minutes before the ceremony starts to allow time for parking and finding your seats. The Holy Matrimony begins at 4:00 PM WITA.",
    },
    {
      question: "IS THE VENUE CHILD-FRIENDLY?",
      answer:
        "Yes, children are welcome at our wedding. However, please note that the venue has outdoor areas near water features, so parental supervision is essential for the safety of younger guests.",
    },
    {
      question: "ARE PHOTOS AND VIDEOS ALLOWED DURING THE CEREMONY?",
      answer:
        "We have hired professional photographers and videographers to capture our special day. We kindly ask that you enjoy the ceremony unplugged and refrain from taking photos during the ceremony itself. Feel free to take photos during the reception!",
    },
    {
      question: "WHAT ABOUT DIETARY RESTRICTIONS?",
      answer:
        "We will be serving a variety of dishes at the reception. If you have specific dietary requirements or allergies, please inform us in advance so we can coordinate with our caterers.",
    },
    {
      question: "WHERE CAN I PARK?",
      answer:
        "Parking is available at AYANA Resort. Valet parking services will be provided for guests attending the wedding. Please follow the signage and staff directions upon arrival.",
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
