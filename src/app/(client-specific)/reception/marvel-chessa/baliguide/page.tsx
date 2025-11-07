"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef, useLayoutEffect, useState } from "react";
import { Button } from "~/components/ui/button";

type TabType =
  | "activities"
  | "cafes"
  | "local"
  | "restaurants"
  | "clubs"
  | "wellness";

export default function Baliguide() {
  const [activeTab, setActiveTab] = useState<TabType>("activities");
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLDivElement>(null);
  const tabRow1Ref = useRef<HTMLDivElement>(null);
  const tabRow2Ref = useRef<HTMLDivElement>(null);

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

  const useViewportImageAnimation = (
    ref: React.RefObject<HTMLDivElement>,
    startY = 20,
    parallaxMultiplier = 1,
  ) => {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start 120%", "end -20%"],
    });

    const yRaw = useTransform(
      scrollYProgress,
      [0, 1],
      [startY, -startY * 0.5 * parallaxMultiplier],
    );

    return {
      y: useSpring(yRaw, { stiffness: 120, damping: 25, mass: 0.8 }),
    };
  };

  const fadeIn = {
    hidden: { opacity: 0, x: 0, y: 0 },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  const title = useViewportAnimation(titleRef);
  const tabRow1 = useViewportAnimation(tabRow1Ref);
  const tabRow2 = useViewportAnimation(tabRow2Ref);
  // const image1 = useViewportImageAnimation(image1Ref, 60, 1.2);
  // const image2 = useViewportImageAnimation(image2Ref, 100, 1.5);

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => {
      const newSet = new Set<string>();
      if (!prev.has(id)) {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const AccordionItem = ({
    id,
    title,
    content,
  }: {
    id: string;
    title: string;
    content: string;
  }) => {
    const isOpen = openAccordions.has(id);
    const rootRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [measuredHeight, setMeasuredHeight] = useState(0);

    // Measure content height (dynamic content safe)
    useLayoutEffect(() => {
      if (contentRef.current) {
        const h = contentRef.current.scrollHeight;
        if (h !== measuredHeight) setMeasuredHeight(h);
      }
    }, [content, measuredHeight]);

    // Symmetric animation variants
    const containerVariants = {
      open: {
        height: measuredHeight,
        transition: {
          height: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
          when: "beforeChildren" as const,
        },
      },
      closed: {
        height: 0,
        transition: {
          height: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
          when: "afterChildren" as const,
        },
      },
    } as const;

    const contentVariants = {
      open: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: "easeOut" },
      },
      closed: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.3, ease: "easeIn" },
      },
    } as const;

    const handleClick = () => {
      // Ensure measurement before animating open
      if (!isOpen && contentRef.current) {
        setMeasuredHeight(contentRef.current.scrollHeight);
      }
      toggleAccordion(id);
    };

    return (
      <motion.div ref={rootRef} className="mb-4 pb-4" initial={false}>
        <motion.button
          className="group w-full text-center"
          onClick={handleClick}
          type="button"
          aria-expanded={isOpen}
          aria-controls={`panel-${id}`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.h4
            className="text-center font-freight text-[20px] transition-colors group-hover:text-[#555555] lg:text-[25px] xl:text-[31px]"
            animate={{ y: isOpen ? -1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {title}
          </motion.h4>
        </motion.button>
        {/* Persistent container for symmetric open/close */}
        <motion.div
          className="overflow-hidden"
          role="region"
          id={`panel-${id}`}
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={containerVariants}
          style={{ willChange: "height" }}
        >
          <motion.div
            ref={contentRef}
            className="pt-4"
            variants={contentVariants}
            style={{ willChange: "opacity, transform" }}
          >
            <p className="font-hanken text-[12px] font-light leading-relaxed lg:text-[14px] xl:text-[16px]">
              {content}
            </p>
            <div
              className="mt-4 w-full"
              style={{
                height: 1,
                backgroundColor: "rgba(85,85,85,0.2)",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col bg-[#F6F4F1] pb-20 pt-24 text-[#111111] md:px-12 md:pb-24 lg:pt-32"
    >
      <div className="text-center">
        <motion.h1
          ref={titleRef}
          className="mx-auto mb-8 font-cormorant text-[31px] tracking-tight drop-shadow-2xl lg:mb-10 lg:text-[39px] xl:mb-12"
          style={{
            opacity: title.opacity,
            y: title.y,
          }}
        >
          BALI GUIDE
        </motion.h1>

        <div className="mb-10 flex flex-wrap justify-center gap-4 lg:mb-12 xl:mb-14">
          <motion.div
            ref={tabRow1Ref}
            className="flex gap-5"
            style={{
              opacity: tabRow1.opacity,
              y: tabRow1.y,
            }}
          >
            <Button
              type="button"
              className={`group rounded-none border-[1px] border-[#555555] px-5 py-2 transition-colors active:bg-[#1D1A1B] lg:px-6 lg:py-3 xl:px-7 xl:py-4 ${
                activeTab === "activities"
                  ? "bg-[#1D1A1B] text-[#FFFFFF] hover:bg-[#1D1A1B]"
                  : "bg-[#F6F4F1] hover:bg-[#F6F4F1]"
              }`}
              onClick={() => setActiveTab("activities")}
            >
              <p
                className={`font-cormorant text-[10px] group-active:text-[#FFFFFF] lg:text-[12px] xl:text-[14px] ${
                  activeTab === "activities"
                    ? "text-[#FFFFFF]"
                    : "text-[#111111]"
                }`}
              >
                ACTIVITIES
              </p>
            </Button>
            <Button
              type="button"
              className={`group rounded-none border-[1px] border-[#555555] px-5 py-2 transition-colors active:bg-[#1D1A1B] lg:px-6 lg:py-3 xl:px-7 xl:py-4 ${
                activeTab === "cafes"
                  ? "bg-[#1D1A1B] text-[#FFFFFF] hover:bg-[#1D1A1B]"
                  : "bg-[#F6F4F1] hover:bg-[#F6F4F1]"
              }`}
              onClick={() => setActiveTab("cafes")}
            >
              <p
                className={`font-cormorant text-[10px] group-active:text-[#FFFFFF] lg:text-[12px] xl:text-[14px] ${
                  activeTab === "cafes" ? "text-[#FFFFFF]" : "text-[#111111]"
                }`}
              >
                CAFÉS
              </p>
            </Button>
            <Button
              type="button"
              className={`group rounded-none border-[1px] border-[#555555] px-5 py-2 transition-colors active:bg-[#1D1A1B] lg:px-6 lg:py-3 xl:px-7 xl:py-4 ${
                activeTab === "local"
                  ? "bg-[#1D1A1B] text-[#FFFFFF] hover:bg-[#1D1A1B]"
                  : "bg-[#F6F4F1] hover:bg-[#F6F4F1]"
              }`}
              onClick={() => setActiveTab("local")}
            >
              <p
                className={`font-cormorant text-[10px] group-active:text-[#FFFFFF] lg:text-[12px] xl:text-[14px] ${
                  activeTab === "local" ? "text-[#FFFFFF]" : "text-[#111111]"
                }`}
              >
                LOCAL FAVOURITES
              </p>
            </Button>
          </motion.div>
          <motion.div
            ref={tabRow2Ref}
            className="flex gap-4"
            style={{
              opacity: tabRow2.opacity,
              y: tabRow2.y,
            }}
          >
            <Button
              type="button"
              className={`group rounded-none border-[1px] border-[#555555] px-5 py-2 transition-colors active:bg-[#1D1A1B] lg:px-6 lg:py-3 xl:px-7 xl:py-4 ${
                activeTab === "restaurants"
                  ? "bg-[#1D1A1B] text-[#FFFFFF] hover:bg-[#1D1A1B]"
                  : "bg-[#F6F4F1] hover:bg-[#F6F4F1]"
              }`}
              onClick={() => setActiveTab("restaurants")}
            >
              <p
                className={`font-cormorant text-[10px] group-active:text-[#FFFFFF] lg:text-[12px] xl:text-[14px] ${
                  activeTab === "restaurants"
                    ? "text-[#FFFFFF]"
                    : "text-[#111111]"
                }`}
              >
                RESTAURANTS
              </p>
            </Button>
            <Button
              type="button"
              className={`group rounded-none border-[1px] border-[#555555] px-5 py-2 transition-colors active:bg-[#1D1A1B] lg:px-6 lg:py-3 xl:px-7 xl:py-4 ${
                activeTab === "clubs"
                  ? "bg-[#1D1A1B] text-[#FFFFFF] hover:bg-[#1D1A1B]"
                  : "bg-[#F6F4F1] hover:bg-[#F6F4F1]"
              }`}
              onClick={() => setActiveTab("clubs")}
            >
              <p
                className={`font-cormorant text-[10px] group-active:text-[#FFFFFF] lg:text-[12px] xl:text-[14px] ${
                  activeTab === "clubs" ? "text-[#FFFFFF]" : "text-[#111111]"
                }`}
              >
                CLUBS & BARS
              </p>
            </Button>
            <Button
              type="button"
              className={`group rounded-none border-[1px] border-[#555555] px-5 py-2 transition-colors active:bg-[#1D1A1B] lg:px-6 lg:py-3 xl:px-7 xl:py-4 ${
                activeTab === "wellness"
                  ? "bg-[#1D1A1B] text-[#FFFFFF] hover:bg-[#1D1A1B]"
                  : "bg-[#F6F4F1] hover:bg-[#F6F4F1]"
              }`}
              onClick={() => setActiveTab("wellness")}
            >
              <p
                className={`font-cormorant text-[10px] group-active:text-[#FFFFFF] lg:text-[12px] xl:text-[14px] ${
                  activeTab === "wellness" ? "text-[#FFFFFF]" : "text-[#111111]"
                }`}
              >
                WELLNESS
              </p>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="mb-20 min-h-[400px] px-8 sm:px-12 md:px-14"
          key={activeTab}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {activeTab === "activities" && (
            <motion.div
              className="text-center lg:mx-auto lg:w-[80%] xl:w-[70%]"
              initial="hidden"
              transition={{ duration: 0.8, ease: "easeOut" }}
              variants={fadeIn}
              viewport={{ once: true, margin: "-100px" }}
              whileInView="visible"
            >
              <AccordionItem
                id="activities-1"
                title="Mount Batur Sunrise Trek (Kintamani)"
                content="Bali's volcano featuring sunrise hikes to its summit at dawn. Book a trekking operator beforehand — most include hotel pick-up and drop-off. Jeep and motorbike tours are also available for the less adventurous."
              />
              <AccordionItem
                id="activities-2"
                title="Sacred Monkey Forest & Ubud Art Market (Ubud)"
                content="Meet over 1,200 playful monkeys roaming freely in this tranquil nature reserve and Hindu temple complex. Afterwards, browse local crafts, batik, and souvenirs at the bustling Ubud Art Market nearby."
              />
              <AccordionItem
                id="activities-3"
                title="Tegallalang Rice Terrace + Swing Experience (Ubud)"
                content="Famous for its emerald-green rice paddies and sweeping views. Bike, stroll, or even zip line through the lush greenery — and don't forget to try one of Bali's iconic jungle swings."
              />
              <AccordionItem
                id="activities-4"
                title="Whitewater Rafting & ATV (Ubud)"
                content="For the thrill seekers: whitewater rafting down the Ayung River or ATV rides through rice fields, rivers, and small villages, while exploring Bali's countryside off the beaten path. Book a local operator with hotel transfers beforehand for convenience."
              />
              <AccordionItem
                id="activities-5"
                title="Waterfall Trekking Tours (Ubud & North Bali)"
                content="Tour around Bali's jungle waterfalls on scenic treks ranging from easy to adventurous. Popular options include Tegenungan (Ubud), Tukad Cepung (North Bali), and Sekumpul (North Bali)."
              />
              <AccordionItem
                id="activities-6"
                title="Shopping (Kuta & Pererenan)"
                content="Pick up Indonesian snacks and keepsakes at Krisna, Bali's one-stop souvenir center. Alternatively, explore Pererenan's boutique shops and hidden local brands for island-inspired fashion and homeware."
              />
              <AccordionItem
                id="activities-7"
                title="Surf Lessons (Canggu & Uluwatu)"
                content="Catch some waves at Batu Bolong Beach in Canggu (perfect for beginners) or head to Bingin Beach in Uluwatu for more of a challenge. Board rentals and surf schools are available along the coastline."
              />
              <AccordionItem
                id="activities-8"
                title="Kecak Fire Dance (Uluwatu)"
                content="Bali's iconic traditional dance, famous for its rhythmic chanting and fire performance. Set against the backdrop of a stunning cliffside of Uluwatu Temple at sunset hour."
              />
              <AccordionItem
                id="activities-9"
                title="Day Trip to Nusa Penida (Offshore Island)"
                content="Just a short boat ride from Bali, this island is home to
                dramatic cliffs, turquoise waters, and famous spots like
                Kelingking “T-Rex” Beach. Guided day tours are recommended for
                easy transport between the island’s highlights."
              />
            </motion.div>
          )}

          {activeTab === "cafes" && (
            <motion.div
              className="text-center lg:mx-auto lg:w-[80%] xl:w-[70%]"
              initial="hidden"
              transition={{ duration: 0.8, ease: "easeOut" }}
              variants={fadeIn}
              viewport={{ once: true, margin: "-100px" }}
              whileInView="visible"
            >
              <AccordionItem
                id="cafes-1"
                title="BGS Coffee (Multiple Locations)"
                content="A surfer-favorite hangout known for great coffee and smoothies. Chessa's favourite oat latte in Bali."
              />
              <AccordionItem
                id="cafes-2"
                title="Revolver Espresso (Seminyak)"
                content="Iconic café serving strong, top-notch coffee. Best for espresso and flat whites."
              />
              <AccordionItem
                id="cafes-3"
                title="Seniman Coffee Studio (Ubud)"
                content="Artisan roastery. Perfect for slow brews, cold drip, and single-origin tastings."
              />
              <AccordionItem
                id="cafes-4"
                title="Chontea (Ubud & Seminyak)"
                content="A cozy tea-focused café offering artisan blends alongside light bites. This is where you get your matcha fix."
              />
              <AccordionItem
                id="cafes-5"
                title="Cafe Luneir (Canggu)"
                content="Neighborhood favourite for a good classic casual brunch. Another spot for a good matcha."
              />
              <AccordionItem
                id="cafes-6"
                title="Baked. (Multiple Locations)"
                content="Famous for its sourdough bread and croissants. Try their scrambled egg dish!"
              />
              <AccordionItem
                id="cafes-7"
                title="7AM Bakers (Ubud & Canggu)"
                content="A little spot serving tasty pastries and baked goods."
              />
              <AccordionItem
                id="cafes-8"
                title="ACME (Canggu & Pererenan)"
                content="Trendy brunch café with hearty Australian-style brunches."
              />
              <AccordionItem
                id="cafes-9"
                title="Woods (Pererenan)"
                content="Rustic café set among greenery, offering wholesome food."
              />
              <AccordionItem
                id="cafes-10"
                title="Milk & Madu (Multiple Locations)"
                content="Rustic café set among greenery, offering wholesome food."
              />
              <AccordionItem
                id="cafes-11"
                title="Tukies Coconut Shop (Multiple Locations)"
                content="Coconut lovers’ paradise. Well known for its coconut ice cream."
              />
              <AccordionItem
                id="cafes-12"
                title="Ettore Gelato (Canggu & Pererenan)"
                content="Authentic Italian gelato shop. Specialty flavours include pistachio and stracciatella."
              />
            </motion.div>
          )}

          {activeTab === "local" && (
            <motion.div
              className="text-center lg:mx-auto lg:w-[80%] xl:w-[70%]"
              initial="hidden"
              transition={{ duration: 0.8, ease: "easeOut" }}
              variants={fadeIn}
              viewport={{ once: true, margin: "-100px" }}
              whileInView="visible"
            >
              <AccordionItem
                id="local-1"
                title="Bigul Karya Rebo (Kuta)"
                content="A humble warung famous for its crispy, juicy Balinese 'babi guling' (sucking pig). Chessa & Marvel's MUST EAT in Bali!!!"
              />
              <AccordionItem
                id="local-2"
                title="Pink Tempong (Kuta)"
                content="A local hotspot for fiery sambal tempong (chili sauce) served with rice, vegetables, and fried chicken or fish. Chessa's go-to when craving for that Indonesian hot sambal."
              />
              <AccordionItem
                id="local-3"
                title="Warung Wardani (Kuta)"
                content="A beloved spot for 'nasi campur' (mixed rice) with generous portions of authentic Balinese side dishes."
              />
              <AccordionItem
                id="local-4"
                title="Sate Bawah Pohon (Kuta)"
                content="Legendary street-style satay stall under a tree, known for its smoky chicken skewers."
              />
              <AccordionItem
                id="local-5"
                title="Bebek Tepi Sawah (Kuta & Ubud)"
                content="Famous for its crispy duck served with sambal and rice, often enjoyed with beautiful rice field views."
              />
              <AccordionItem
                id="local-6"
                title="Cafe Menega (Jimbaran)"
                content="A must-do beachside seafood BBQ experience, best enjoyed with sunset views over Jimbaran Bay. Marvel: You haven't been to Bali if you haven't tasted their 'kerang hijau'!"
              />
              <AccordionItem
                id="local-7"
                title="Naughty Nuri's (Multiple Locations)"
                content="Iconic for its smoky pork ribs and fun, lively atmosphere."
              />
              <AccordionItem
                id="local-8"
                title="Nasi Ayam Kedewatan Ibu Mangku (Multiple Locations)"
                content="A classic spot for Balinese chicken rice with rich flavors and traditional sides."
              />
            </motion.div>
          )}

          {activeTab === "restaurants" && (
            <motion.div
              className="text-center lg:mx-auto lg:w-[80%] xl:w-[70%]"
              initial="hidden"
              transition={{ duration: 0.8, ease: "easeOut" }}
              variants={fadeIn}
              viewport={{ once: true, margin: "-100px" }}
              whileInView="visible"
            >
              <AccordionItem
                id="restaurant-1"
                title="Home by Chef Wayan (Pererenan)"
                content="A cozy neighborhood spot where Balinese flavors meet modern twists, perfect for a relaxed dinner."
              />
              <AccordionItem
                id="restaurant-2"
                title="Seeds Eatery (Ubud)"
                content="Wholesome, plant-forward dishes in a peaceful garden setting, great for a mindful lunch."
              />
              <AccordionItem
                id="restaurant-3"
                title="M. Mason (Canggu & Uluwatu)"
                content="Lively Mediterranean restaurant with wood-fired cooking and a fun social atmosphere."
              />
              <AccordionItem
                id="restaurant-4"
                title="Bokashi (Pererenan)"
                content="A Japanese-inspired restaurant and organic grocery, perfect for healthy bites and good coffee."
              />
              <AccordionItem
                id="restaurant-5"
                title="Sensorium (Canggu)"
                content="Creative Asian-fusion brunches in a cool, design-led space — very Instagram-worthy."
              />
              <AccordionItem
                id="restaurant-6"
                title="Mamasan (Seminyak)"
                content="A Bali icon serving bold Southeast Asian flavors in a stylish, colonial-style restaurant."
              />
              <AccordionItem
                id="restaurant-7"
                title="Riviera Bistro (Canggu)"
                content="Breezy Mediterranean dining with a coastal vibe, ideal for a laid-back evening."
              />
              <AccordionItem
                id="restaurant-8"
                title="Bartolo (Uluwatu)"
                content="A chic wine bar and modern European restaurant, perfect for sunset dinners after the beach."
              />
            </motion.div>
          )}

          {activeTab === "clubs" && (
            <motion.div
              className="text-center lg:mx-auto lg:w-[80%] xl:w-[70%]"
              initial="hidden"
              transition={{ duration: 0.8, ease: "easeOut" }}
              variants={fadeIn}
              viewport={{ once: true, margin: "-100px" }}
              whileInView="visible"
            >
              <AccordionItem
                id="clubs-1"
                title="Potato Head Beach Club (Seminyak)"
                content="Iconic beachfront club with infinity pools, creative cocktails, and sunset DJs."
              />
              <AccordionItem
                id="clubs-2"
                title="The Lawn (Canggu)"
                content="Relaxed yet stylish beachfront hangout. Perfect for sundowners and casual bites."
              />
              <AccordionItem
                id="clubs-3"
                title="Finns Beach Club (Canggu)"
                content="Iconic all-day beach club with pools, DJs, and sunset views. Best for cocktails and lively energy."
              />
              <AccordionItem
                id="clubs-4"
                title="CP Lounge (Ubud)"
                content="A more relaxed garden-style bar with live music, pool tables, and friendly atmosphere."
              />
              <AccordionItem
                id="clubs-5"
                title="Rock Bar at AYANA (Jimbaran)"
                content="World-famous clifftop bar at Ayana Resort. Unbeatable for sunset cocktails over the ocean."
              />
              <AccordionItem
                id="clubs-6"
                title="Savaya (Uluwatu)"
                content="Dramatic cliffside beach club with occasional international DJs."
              />
            </motion.div>
          )}

          {activeTab === "wellness" && (
            <motion.div
              className="text-center lg:mx-auto lg:w-[80%] xl:w-[70%]"
              initial="hidden"
              transition={{ duration: 0.8, ease: "easeOut" }}
              variants={fadeIn}
              viewport={{ once: true, margin: "-100px" }}
              whileInView="visible"
            >
              <AccordionItem
                id="wellness-1"
                title="Therapy Day Spa (Canggu)"
                content="Known for professional treatments and a clean, modern spa environment."
              />
              <AccordionItem
                id="wellness-2"
                title="Spring Spa (Seminyak, Canggu, Uluwatu)"
                content="New Zealand-born spa chain known for beauty rituals, facials, and soothing massages."
              />
              <AccordionItem
                id="wellness-3"
                title="Nirvana (Seminyak)"
                content="Boutique spa blending traditional Balinese healing with contemporary treatments in a serene setting."
              />
              <AccordionItem
                id="wellness-4"
                title="Bali Social Club"
                content="A wellness hub equipped with padel courts, gym, pool and sauna."
              />
              <AccordionItem
                id="wellness-5"
                title="Bali Body Factory"
                content="Fitness center with daily classes, personal training, and an outdoor recovery zone featuring ice baths and sauna."
              />
              <AccordionItem
                id="wellness-6"
                title="The Istana (Uluwatu)"
                content="Sunset sauna, ice bath, and wellness sanctuary overlooking the Indian Ocean."
              />
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                On-call Masseuse (Island-wide)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light lg:mb-10 lg:text-[14px] xl:mb-12 xl:text-[16px]">
                Book a masseuse to come directly to your villa for a
                professional Balinese massage in the comfort of your own space.
                Marvel’s favourite activity in Bali (or anywhere else really).
                And the good thing is, it’s so cheap!
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
