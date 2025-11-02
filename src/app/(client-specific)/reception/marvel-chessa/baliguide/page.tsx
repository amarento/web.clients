"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { useState } from "react";

import img10 from "../_images/IMG10.jpg";
import img11 from "../_images/IMG11.jpg";

type TabType =
  | "activities"
  | "cafes"
  | "local"
  | "restaurants"
  | "clubs"
  | "wellness";

export default function Baliguide() {
  const [activeTab, setActiveTab] = useState<TabType>("activities");
  const containerRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLDivElement>(null);
  const tabRow1Ref = useRef<HTMLDivElement>(null);
  const tabRow2Ref = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);

  const useViewportAnimation = (
    ref: React.RefObject<HTMLElement>,
    yValue = 10,
  ) => {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end 90%"],
    });

    const opacityRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);
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
  const image1 = useViewportImageAnimation(image1Ref, 60, 1.2);
  const image2 = useViewportImageAnimation(image2Ref, 100, 1.5);

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col bg-[#F6F4F1] pb-20 pt-24 text-[#111111] md:px-12 md:pb-24 lg:pt-32"
    >
      <div className="text-center">
        <motion.h1
          ref={titleRef}
          className="mx-auto mb-8 lg:mb-10 xl:mb-12 font-cormorant text-[31px] tracking-tight drop-shadow-2xl lg:text-[39px]"
          style={{
            opacity: title.opacity,
            y: title.y,
          }}
        >
          BALI GUIDE
        </motion.h1>

        <div className="mb-10 lg:mb-12 xl:mb-14 flex flex-wrap justify-center gap-4">
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
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Mount Batur Sunrise Trek (Kintamani)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Bali’s volcano featuring sunrise hikes to its summit at dawn.
                Book a trekking operator beforehand — most include hotel pick-up
                and drop-off. Jeep and motorbike tours are also available for
                the less adventurous.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Sacred Monkey Forest & Ubud Art Market (Ubud)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Meet over 1,200 playful monkeys roaming freely in this tranquil
                nature reserve and Hindu temple complex. Afterwards, browse
                local crafts, batik, and souvenirs at the bustling Ubud Art
                Market nearby.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Tegallalang Rice Terrace + Swing Experience (Ubud)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Famous for its emerald-green rice paddies and sweeping views.
                Bike, stroll, or even zip line through the lush greenery — and
                don’t forget to try one of Bali’s iconic jungle swings.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Whitewater Rafting & ATV (Ubud)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                For the thrill seekers: whitewater rafting down the Ayung River
                or ATV rides through rice fields, rivers, and small villages,
                while exploring Bali’s countryside off the beaten path. Book a
                local operator with hotel transfers beforehand for convenience.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Waterfall Trekking Tours (Ubud & North Bali)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Tour around Bali’s jungle waterfalls on scenic treks ranging
                from easy to adventurous. Popular options include Tegenungan
                (Ubud), Tukad Cepung (North Bali), and Sekumpul (North Bali).
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Shopping (Kuta & Pererenan)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Pick up Indonesian snacks and keepsakes at Krisna, Bali’s
                one-stop souvenir center. Alternatively, explore Pererenan’s
                boutique shops and hidden local brands for island-inspired
                fashion and homeware.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Surf Lessons (Canggu & Uluwatu)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Catch some waves at Batu Bolong Beach in Canggu (perfect for
                beginners) or head to Bingin Beach in Uluwatu for more of a
                challenge. Board rentals and surf schools are available along
                the coastline.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Kecak Fire Dance (Uluwatu)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Bali’s iconic traditional dance, famous for its rhythmic
                chanting and fire performance. Set against the backdrop of a
                stunning cliffside of Uluwatu Temple at sunset hour.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Day Trip to Nusa Penida (Offshore Island)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Just a short boat ride from Bali, this island is home to
                dramatic cliffs, turquoise waters, and famous spots like
                Kelingking “T-Rex” Beach. Guided day tours are recommended for
                easy transport between the island’s highlights.
              </p>
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
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                BGS Coffee (Multiple Locations)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                A surfer-favorite hangout known for great coffee and smoothies.
                Chessa’s favourite oat latte in Bali.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Revolver Espresso (Seminyak)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Iconic café serving strong, top-notch coffee. Best for espresso
                and flat whites.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Seniman Coffee Studio (Ubud)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Artisan roastery. Perfect for slow brews, cold drip, and
                single-origin tastings.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Chontea (Ubud & Seminyak)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                A cozy tea-focused café offering artisan blends alongside light
                bites. This is where you get your matcha fix.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Cafe Luneir (Canggu)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Neighborhood favourite for a good classic casual brunch. Another
                spot for a good matcha.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Baked. (Multiple Locations)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Famous for its sourdough bread and croissants. Try their
                scrambled egg dish!
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                7AM Bakers (Ubud & Canggu)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                A little spot serving tasty pastries and baked goods.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                ACME (Canggu & Pererenan)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Trendy brunch café with hearty Australian-style brunches.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Woods (Pererenan)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Rustic café set among greenery, offering wholesome food.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Milk & Madu (Multiple Locations)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Family-friendly café with great pizzas, and brunch classics.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Tukies Coconut Shop (Multiple Locations)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Coconut lovers’ paradise. Well known for its coconut ice cream.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Ettore Gelato (Canggu & Pererenan)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Authentic Italian gelato shop. Specialty flavours include
                pistachio and stracciatella.
              </p>
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
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Bigul Karya Rebo (Kuta)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                A humble warung famous for its crispy, juicy Balinese “babi
                guling” (sucking pig). Chessa & Marvel’s MUST EAT in Bali!!!
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Pink Tempong (Kuta)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                A local hotspot for fiery sambal tempong (chili sauce) served
                with rice, vegetables, and fried chicken or fish. Chessa’s go-to
                when craving for that Indonesian hot sambal.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Warung Wardani (Kuta)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                A beloved spot for “nasi campur” (mixed rice) with generous
                portions of authentic Balinese side dishes.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Sate Bawah Pohon (Kuta)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Legendary street-style satay stall under a tree, known for its
                smoky chicken skewers.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Bebek Tepi Sawah (Kuta & Ubud)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Famous for its crispy duck served with sambal and rice, often
                enjoyed with beautiful rice field views.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Cafe Menega (Jimbaran)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                A must-do beachside seafood BBQ experience, best enjoyed with
                sunset views over Jimbaran Bay. Marvel: You haven’t been to Bali
                if you haven’t tasted their “kerang hijau”!
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Naughty Nuri’s (Multiple Locations)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Iconic for its smoky pork ribs and fun, lively atmosphere.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Nasi Ayam Kedewatan Ibu Mangku (Multiple Locations)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                A classic spot for Balinese chicken rice with rich flavors and
                traditional sides.
              </p>
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
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Home by Chef Wayan (Pererenan)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                A cozy neighborhood spot where Balinese flavors meet modern
                twists, perfect for a relaxed dinner.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Seeds Eatery (Ubud)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Wholesome, plant-forward dishes in a peaceful garden setting,
                great for a mindful lunch.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                M. Mason (Canggu & Uluwatu)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Lively Mediterranean restaurant with wood-fired cooking and a
                fun social atmosphere.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Bokashi (Pererenan)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                A Japanese-inspired restaurant and organic grocery, perfect for
                healthy bites and good coffee.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Sensorium (Canggu)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Creative Asian-fusion brunches in a cool, design-led space —
                very Instagram-worthy.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Mamasan (Seminyak)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                A Bali icon serving bold Southeast Asian flavors in a stylish,
                colonial-style restaurant.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Riviera Bistro (Canggu)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Breezy Mediterranean dining with a coastal vibe, ideal for a
                laid-back evening.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Bartolo (Uluwatu)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                A chic wine bar and modern European restaurant, perfect for
                sunset dinners after the beach.
              </p>
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
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Potato Head Beach Club (Seminyak)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Iconic beachfront club with infinity pools, creative cocktails,
                and sunset DJs.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                The Lawn (Canggu)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Relaxed yet stylish beachfront hangout. Perfect for sundowners
                and casual bites.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Finns Beach Club (Canggu)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Iconic all-day beach club with pools, DJs, and sunset views.
                Best for cocktails and lively energy.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                CP Lounge (Ubud)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                A more relaxed garden-style bar with live music, pool tables,
                and friendly atmosphere.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Rock Bar at AYANA (Jimbaran)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                World-famous clifftop bar at Ayana Resort. Unbeatable for sunset
                cocktails over the ocean.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Savaya (Uluwatu)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Dramatic cliffside beach club with occasional international DJs.
              </p>
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
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Therapy Day Spa (Canggu)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Known for professional treatments and a clean, modern spa
                environment.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Spring Spa (Seminyak, Canggu, Uluwatu)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                New Zealand-born spa chain known for beauty rituals, facials,
                and soothing massages.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Nirvana (Seminyak)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Boutique spa blending traditional Balinese healing with
                contemporary treatments in a serene setting.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Bali Social Club
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                A wellness hub equipped with padel courts, gym, pool and sauna.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                Bali Body Factory
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Fitness center with daily classes, personal training, and an
                outdoor recovery zone featuring ice baths and sauna.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                The Istana (Uluwatu)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Sunset sauna, ice bath, and wellness sanctuary overlooking the
                Indian Ocean.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px] lg:text-[25px] xl:text-[31px]">
                On-call Masseuse (Island-wide)
              </h4>
              <p className="mb-8 lg:mb-10 xl:mb-12 font-hanken text-[12px] font-light lg:text-[14px] xl:text-[16px]">
                Book a masseuse to come directly to your villa for a
                professional Balinese massage in the comfort of your own space.
                Marvel’s favourite activity in Bali (or anywhere else really).
                And the good thing is, it’s so cheap!
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
      <motion.div
        className="relative z-20"
        ref={image1Ref}
        style={{
          y: image1.y,
        }}
      >
        <Image
          className="ml-8 w-[60%] sm:ml-[8%] sm:w-[50%] md:ml-[10%] md:w-[48%] lg:ml-[30%] lg:w-[26%]"
          src={img10}
          alt="IMG10"
          priority
        />
      </motion.div>
      <motion.div
        className="relative z-10"
        ref={image2Ref}
        style={{
          y: image2.y,
        }}
      >
        <Image
          className="-mt-20 ml-auto mr-8 w-[65%] sm:-mt-24 sm:mr-[8%] sm:w-[47%] md:-mt-28 md:mr-[10%] md:w-[50%] lg:-mt-20 lg:mr-[30%] lg:w-[27%]"
          src={img11}
          alt="IMG11"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
