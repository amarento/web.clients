"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef, useLayoutEffect, useState, useEffect } from "react";
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
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(
    new Set(["activities-1"]),
  );
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

  const fadeIn = {
    hidden: { opacity: 0, x: 0, y: 0 },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  const title = useViewportAnimation(titleRef);
  const tabRow1 = useViewportAnimation(tabRow1Ref);
  const tabRow2 = useViewportAnimation(tabRow2Ref);

  // Open first accordion when tab changes
  useEffect(() => {
    const firstAccordionId = `${activeTab}-1`;
    setOpenAccordions(new Set([firstAccordionId]));
  }, [activeTab]);

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => {
      // If clicking the currently open accordion and it's the only one open, do nothing
      if (prev.has(id) && prev.size === 1) {
        return prev;
      }

      // Otherwise, close all and open the clicked one
      const newSet = new Set<string>();
      newSet.add(id);
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
    const [isMeasured, setIsMeasured] = useState(false);

    // Measure content height immediately and whenever it changes
    useLayoutEffect(() => {
      if (contentRef.current) {
        const h = contentRef.current.scrollHeight;
        setMeasuredHeight(h + 20);
        setIsMeasured(true);
      }
    }, [content, isOpen]);

    // Symmetric animation variants
    const containerVariants = {
      open: {
        height: measuredHeight,
        transition: {
          height: { duration: isMeasured ? 0.5 : 0, ease: "easeOut" },
        },
      },
      closed: {
        height: 0,
        transition: {
          height: { duration: 0.5, ease: "easeIn" },
        },
      },
    } as const;

    const contentVariants = {
      open: {
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut", delay: 0.1 },
      },
      closed: {
        opacity: 0,
        transition: { duration: 1, ease: "easeIn", delay: 0.1 },
      },
    } as const;

    const handleClick = () => {
      if (!isOpen && contentRef.current) {
        setMeasuredHeight(contentRef.current.scrollHeight);
      }
      toggleAccordion(id);
    };

    return (
      <motion.div ref={rootRef} className="mb-4 pb-4 2xl:pb-6" initial={false}>
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
          initial={isOpen ? "open" : "closed"}
          animate={isOpen ? "open" : "closed"}
          variants={containerVariants}
          style={{ willChange: "height" }}
        >
          <motion.div
            ref={contentRef}
            className="pb-2 pt-4"
            initial={isOpen ? "open" : "closed"}
            variants={contentVariants}
            style={{ willChange: "opacity" }}
          >
            <p className="mx-auto font-hanken text-[12px] font-light leading-relaxed lg:text-[14px] xl:text-[16px] 2xl:w-[80%]">
              {content}
            </p>
            <div
              className="mt-4 w-full md:mt-5 lg:mt-6"
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
      className="flex flex-col bg-[#F6F4F1] pt-16 text-[#111111] md:px-12 lg:pt-20"
    >
      <div className="text-center">
        <motion.h1
          ref={titleRef}
          className="mx-auto mb-8 font-cormorant text-[31px] tracking-tight drop-shadow-2xl lg:mb-10 lg:text-[39px] xl:mb-12 2xl:text-[49px]"
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
                className={`font-cormorant text-[10px] group-active:text-[#FFFFFF] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] ${
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
                className={`font-cormorant text-[10px] group-active:text-[#FFFFFF] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] ${
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
                className={`font-cormorant text-[10px] group-active:text-[#FFFFFF] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] ${
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
                className={`font-cormorant text-[10px] group-active:text-[#FFFFFF] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] ${
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
                className={`font-cormorant text-[10px] group-active:text-[#FFFFFF] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] ${
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
                className={`font-cormorant text-[10px] group-active:text-[#FFFFFF] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] ${
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
              className="text-center lg:mx-auto lg:w-[80%] xl:w-[70%] 2xl:w-[50%]"
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
              className="text-center lg:mx-auto lg:w-[80%] xl:w-[70%] 2xl:w-[50%]"
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
                content="Iconic café serving strong, top-notch coffee. Best for espresso and flat whites. A no-frills haven for serious coffee lovers who appreciate expertly pulled shots."
              />
              <AccordionItem
                id="cafes-3"
                title="Seniman Coffee Studio (Ubud)"
                content="Artisan roastery. Perfect for slow brews, cold drip, and single-origin tastings. A must-visit for coffee enthusiasts looking to explore Indonesia's finest beans."
              />
              <AccordionItem
                id="cafes-4"
                title="Chontea (Ubud & Seminyak)"
                content="A cozy tea-focused café offering artisan blends alongside light bites. This is where you get your matcha fix. The serene ambience makes it perfect for a peaceful afternoon pause."
              />
              <AccordionItem
                id="cafes-5"
                title="Cafe Luneir (Canggu)"
                content="Neighborhood favourite for a good classic casual brunch. Another spot for a good matcha. A welcoming space that feels like your home away from home."
              />
              <AccordionItem
                id="cafes-6"
                title="Baked. (Multiple Locations)"
                content="Famous for its sourdough bread and croissants. Try their scrambled egg dish! Their perfectly baked goods and comforting breakfast staples never disappoint."
              />
              <AccordionItem
                id="cafes-7"
                title="7AM Bakers (Ubud & Canggu)"
                content="A little spot serving tasty pastries and baked goods. Simple, satisfying treats that hit the spot every time."
              />
              <AccordionItem
                id="cafes-8"
                title="ACME (Canggu & Pererenan)"
                content="Trendy brunch café with hearty Australian-style brunches. A lively spot where quality ingredients and generous portions create the perfect start to your day."
              />
              <AccordionItem
                id="cafes-9"
                title="Woods (Pererenan)"
                content="Rustic café set among greenery, offering wholesome food. A nature-embraced hideaway where fresh flavors meet tranquil surroundings."
              />
              <AccordionItem
                id="cafes-10"
                title="Milk & Madu (Multiple Locations)"
                content="Rustic café set among greenery, offering wholesome food. A family-friendly favorite where healthy meets delicious in every dish."
              />
              <AccordionItem
                id="cafes-11"
                title="Tukies Coconut Shop (Multiple Locations)"
                content="Coconut lovers' paradise. Well known for its coconut ice cream. A refreshing tropical treat that's both indulgent and naturally delicious."
              />
              <AccordionItem
                id="cafes-12"
                title="Ettore Gelato (Canggu & Pererenan)"
                content="Authentic Italian gelato shop. Specialty flavours include pistachio and stracciatella. Creamy, traditional Italian gelato that transports you straight to Rome with every scoop."
              />
              <AccordionItem
                id="cafes-13"
                title="Gigi Susu (Canggu)"
                content="Freshly made pastries and beloved local favorites crafted to brighten your mood. A warm, easygoing spot where every bite feels like a little lift in your day."
              />
              <AccordionItem
                id="cafes-14"
                title="32do Bali (Kerobokan)"
                content="A modern-Korean gem famed for its finely crafted pastries and matcha so smooth it feels unreal. A must-visit haven for creators, with its iconic side-fountain entrance made for the perfect shot."
              />
            </motion.div>
          )}

          {activeTab === "local" && (
            <motion.div
              className="text-center lg:mx-auto lg:w-[80%] xl:w-[70%] 2xl:w-[50%]"
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
                content="A beloved spot for 'nasi campur' (mixed rice) with generous portions of authentic Balinese side dishes. A longtime local favorite where every plate feels like a true taste of home."
              />
              <AccordionItem
                id="local-4"
                title="Sate Bawah Pohon (Kuta)"
                content="Legendary street-style satay stall under a tree, known for its smoky chicken skewers. Delivers bold flavors with every perfectly charred bite."
              />
              <AccordionItem
                id="local-5"
                title="Bebek Tepi Sawah (Kuta & Ubud)"
                content="Famous for its crispy duck served with sambal and rice, often enjoyed with beautiful rice field views. A serene dining experience where every bite pairs perfectly with the calm of Bali’s lush greenery."
              />
              <AccordionItem
                id="local-6"
                title="Cafe Menega (Jimbaran)"
                content="A must-do beachside seafood BBQ experience, best enjoyed with sunset views over Jimbaran Bay. Marvel: You haven't been to Bali if you haven't tasted their 'kerang hijau'!"
              />
              <AccordionItem
                id="local-7"
                title="Naughty Nuri's (Multiple Locations)"
                content="Iconic for its smoky pork ribs and fun, lively atmosphere. A must-try classic where big flavors and good vibes always take center stage."
              />
              <AccordionItem
                id="local-8"
                title="Nasi Ayam Kedewatan Ibu Mangku (Multiple Locations)"
                content="A classic spot for Balinese chicken rice with rich flavors and traditional sides. A timeless go-to for savoring Bali’s heritage in its most comforting form."
              />
            </motion.div>
          )}

          {activeTab === "restaurants" && (
            <motion.div
              className="text-center lg:mx-auto lg:w-[80%] xl:w-[70%] 2xl:w-[50%]"
              initial="hidden"
              transition={{ duration: 0.8, ease: "easeOut" }}
              variants={fadeIn}
              viewport={{ once: true, margin: "-100px" }}
              whileInView="visible"
            >
              <AccordionItem
                id="restaurants-1"
                title="Home by Chef Wayan (Pererenan)"
                content="A cozy neighborhood spot where Balinese flavors meet modern twists, perfect for a relaxed dinner. Chef Wayan's creative take on traditional recipes brings warmth and authenticity to every plate."
              />
              <AccordionItem
                id="restaurants-2"
                title="Seeds Eatery (Ubud)"
                content="Wholesome, plant-forward dishes in a peaceful garden setting, great for a mindful lunch. Fresh ingredients and nourishing bowls make this a go-to for healthy eating with soul."
              />
              <AccordionItem
                id="restaurants-3"
                title="M. Mason (Canggu & Uluwatu)"
                content="Lively Mediterranean restaurant with wood-fired cooking and a fun social atmosphere. Expect vibrant flavors and a buzzing crowd that keeps the energy high."
              />
              <AccordionItem
                id="restaurants-4"
                title="Bokashi (Pererenan)"
                content="A Japanese-inspired restaurant and organic grocery, perfect for healthy bites and good coffee. The calm, minimalist space invites you to slow down and savor clean, seasonal ingredients."
              />
              <AccordionItem
                id="restaurants-5"
                title="Sensorium (Canggu)"
                content="Creative Asian-fusion brunches in a cool, design-led space — very Instagram-worthy. Bold flavors and artful presentation make every dish as photogenic as it is delicious."
              />
              <AccordionItem
                id="restaurants-6"
                title="Mamasan (Seminyak)"
                content="A Bali icon serving bold Southeast Asian flavors in a stylish, colonial-style restaurant. The mood is sophisticated yet welcoming, with dishes that pack a punch in both taste and presentation."
              />
              <AccordionItem
                id="restaurants-7"
                title="Riviera Bistro (Canggu)"
                content="Breezy Mediterranean dining with a coastal vibe, ideal for a laid-back evening. Where sun-kissed flavors, relaxed rhythms, and effortless charm come together in every moment."
              />
              <AccordionItem
                id="restaurants-8"
                title="Bartolo (Uluwatu)"
                content="A chic wine bar and modern European restaurant, perfect for sunset dinners after the beach. The carefully curated wine list and elegant dishes create an intimate, upscale experience."
              />
              <AccordionItem
                id="restaurants-9"
                title="Meimei (Canggu)"
                content="A cozy hideaway with warm ambience, brings you comforting Southeast Asian fusion dishes that feel both familiar and unforgettable."
              />
            </motion.div>
          )}

          {activeTab === "clubs" && (
            <motion.div
              className="text-center lg:mx-auto lg:w-[80%] xl:w-[70%] 2xl:w-[50%]"
              initial="hidden"
              transition={{ duration: 0.8, ease: "easeOut" }}
              variants={fadeIn}
              viewport={{ once: true, margin: "-100px" }}
              whileInView="visible"
            >
              <AccordionItem
                id="clubs-1"
                title="Potato Head Beach Club (Seminyak)"
                content="Iconic beachfront club with infinity pools, creative cocktails, and sunset DJs. A must-visit destination where beach culture meets world-class music and design."
              />
              <AccordionItem
                id="clubs-2"
                title="The Lawn (Canggu)"
                content="Relaxed yet stylish beachfront hangout. Perfect for sundowners and casual bites. The laid-back vibe and ocean views make it ideal for unwinding after a day at the beach."
              />
              <AccordionItem
                id="clubs-3"
                title="Finns Beach Club (Canggu)"
                content="Iconic all-day beach club with pools, DJs, and sunset views. Best for cocktails and lively energy. A vibrant hub where the party flows from day to night with an effortlessly cool atmosphere."
              />
              <AccordionItem
                id="clubs-4"
                title="CP Lounge (Ubud)"
                content="A more relaxed garden-style bar with live music, pool tables, and friendly atmosphere. For those who seek a chilled evening without the beach club scene."
              />
              <AccordionItem
                id="clubs-5"
                title="Rock Bar at AYANA (Jimbaran)"
                content="World-famous clifftop bar at Ayana Resort. Unbeatable for sunset cocktails over the ocean. Arrive early to secure a spot and witness one of Bali's most breathtaking sunset views."
              />
              <AccordionItem
                id="clubs-6"
                title="Savaya (Uluwatu)"
                content="Dramatic cliffside beach club with occasional international DJs. A stunning venue that combines natural beauty with world-class entertainment and sophisticated vibes."
              />
            </motion.div>
          )}

          {activeTab === "wellness" && (
            <motion.div
              className="text-center lg:mx-auto lg:w-[80%] xl:w-[70%] 2xl:w-[50%]"
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
              <AccordionItem
                id="wellness-7"
                title="On-call Masseuse (Island-wide)"
                content="Book a masseuse to come directly to your villa for a
                professional Balinese massage in the comfort of your own space.
                Marvel’s favourite activity in Bali (or anywhere else really).
                And the good thing is, it’s so cheap!"
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
