"use client";

import { motion } from "motion/react";
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
      className="flex flex-col bg-[#F6F4F1] pb-20 pt-24 lg:pt-32 text-[#111111] md:px-14"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="text-center">
        <motion.h1
          className="mx-auto mb-8 font-cormorant text-[31px] tracking-tight drop-shadow-2xl"
          initial="hidden"
          transition={{ duration: 0.8, ease: "easeOut" }}
          variants={fadeIn}
          viewport={{ once: true, margin: "-100px" }}
          whileInView="visible"
        >
          BALI GUIDE
        </motion.h1>

        {/* Tab Buttons */}
        <div className="mb-10 flex flex-wrap justify-center gap-4">
          <motion.div
            className="flex gap-5"
            initial="hidden"
            transition={{ duration: 0.8, ease: "easeOut" }}
            variants={fadeIn}
            viewport={{ once: true, margin: "-100px" }}
            whileInView="visible"
          >
            <Button
              type="button"
              className={`group rounded-none border-[1px] border-[#555555] px-5 py-2 transition-colors active:bg-[#1D1A1B] ${
                activeTab === "activities"
                  ? "bg-[#1D1A1B] text-[#FFFFFF] hover:bg-[#1D1A1B]"
                  : "bg-[#F6F4F1] hover:bg-[#F6F4F1]"
              }`}
              onClick={() => setActiveTab("activities")}
            >
              <p
                className={`font-cormorant text-[10px] group-active:text-[#FFFFFF] ${
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
              className={`group rounded-none border-[1px] border-[#555555] px-5 py-2 transition-colors active:bg-[#1D1A1B] ${
                activeTab === "cafes"
                  ? "bg-[#1D1A1B] text-[#FFFFFF] hover:bg-[#1D1A1B]"
                  : "bg-[#F6F4F1] hover:bg-[#F6F4F1]"
              }`}
              onClick={() => setActiveTab("cafes")}
            >
              <p
                className={`font-cormorant text-[10px] group-active:text-[#FFFFFF] ${
                  activeTab === "cafes" ? "text-[#FFFFFF]" : "text-[#111111]"
                }`}
              >
                CAFÉS
              </p>
            </Button>
            <Button
              type="button"
              className={`group rounded-none border-[1px] border-[#555555] px-5 py-2 transition-colors active:bg-[#1D1A1B] ${
                activeTab === "local"
                  ? "bg-[#1D1A1B] text-[#FFFFFF] hover:bg-[#1D1A1B]"
                  : "bg-[#F6F4F1] hover:bg-[#F6F4F1]"
              }`}
              onClick={() => setActiveTab("local")}
            >
              <p
                className={`font-cormorant text-[10px] group-active:text-[#FFFFFF] ${
                  activeTab === "local" ? "text-[#FFFFFF]" : "text-[#111111]"
                }`}
              >
                LOCAL FAVOURITES
              </p>
            </Button>
          </motion.div>
          <motion.div
            className="flex gap-4"
            initial="hidden"
            transition={{ duration: 0.8, ease: "easeOut" }}
            variants={fadeIn}
            viewport={{ once: true, margin: "-100px" }}
            whileInView="visible"
          >
            <Button
              type="button"
              className={`group rounded-none border-[1px] border-[#555555] px-5 py-2 transition-colors active:bg-[#1D1A1B] ${
                activeTab === "restaurants"
                  ? "bg-[#1D1A1B] text-[#FFFFFF] hover:bg-[#1D1A1B]"
                  : "bg-[#F6F4F1] hover:bg-[#F6F4F1]"
              }`}
              onClick={() => setActiveTab("restaurants")}
            >
              <p
                className={`font-cormorant text-[10px] group-active:text-[#FFFFFF] ${
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
              className={`group rounded-none border-[1px] border-[#555555] px-5 py-2 transition-colors active:bg-[#1D1A1B] ${
                activeTab === "clubs"
                  ? "bg-[#1D1A1B] text-[#FFFFFF] hover:bg-[#1D1A1B]"
                  : "bg-[#F6F4F1] hover:bg-[#F6F4F1]"
              }`}
              onClick={() => setActiveTab("clubs")}
            >
              <p
                className={`font-cormorant text-[10px] group-active:text-[#FFFFFF] ${
                  activeTab === "clubs" ? "text-[#FFFFFF]" : "text-[#111111]"
                }`}
              >
                CLUBS & BARS
              </p>
            </Button>
            <Button
              type="button"
              className={`group rounded-none border-[1px] border-[#555555] px-5 py-2 transition-colors active:bg-[#1D1A1B] ${
                activeTab === "wellness"
                  ? "bg-[#1D1A1B] text-[#FFFFFF] hover:bg-[#1D1A1B]"
                  : "bg-[#F6F4F1] hover:bg-[#F6F4F1]"
              }`}
              onClick={() => setActiveTab("wellness")}
            >
              <p
                className={`font-cormorant text-[10px] group-active:text-[#FFFFFF] ${
                  activeTab === "wellness" ? "text-[#FFFFFF]" : "text-[#111111]"
                }`}
              >
                WELLNESS
              </p>
            </Button>
          </motion.div>
        </div>

        {/* Tab Content */}
        <motion.div
          className="mb-20 min-h-[400px] px-8 sm:px-12 md:px-14"
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "activities" && (
            <motion.div
              className="text-left"
              initial="hidden"
              transition={{ duration: 0.8, ease: "easeOut" }}
              variants={fadeIn}
              viewport={{ once: true, margin: "-100px" }}
              whileInView="visible"
            >
              <h4 className="mb-[6px] font-freight text-[20px]">
                Mount Batur Sunrise Trek (Kintamani)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Bali’s volcano featuring sunrise hikes to its summit at dawn.
                Book a trekking operator beforehand — most include hotel pick-up
                and drop-off. Jeep and motorbike tours are also available for
                the less adventurous.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Sacred Monkey Forest & Ubud Art Market (Ubud)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Meet over 1,200 playful monkeys roaming freely in this tranquil
                nature reserve and Hindu temple complex. Afterwards, browse
                local crafts, batik, and souvenirs at the bustling Ubud Art
                Market nearby.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Tegallalang Rice Terrace + Swing Experience (Ubud)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Famous for its emerald-green rice paddies and sweeping views.
                Bike, stroll, or even zip line through the lush greenery — and
                don’t forget to try one of Bali’s iconic jungle swings.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Whitewater Rafting & ATV (Ubud)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                For the thrill seekers: whitewater rafting down the Ayung River
                or ATV rides through rice fields, rivers, and small villages,
                while exploring Bali’s countryside off the beaten path. Book a
                local operator with hotel transfers beforehand for convenience.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Waterfall Trekking Tours (Ubud & North Bali)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Tour around Bali’s jungle waterfalls on scenic treks ranging
                from easy to adventurous. Popular options include Tegenungan
                (Ubud), Tukad Cepung (North Bali), and Sekumpul (North Bali).
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Shopping (Kuta & Pererenan)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Pick up Indonesian snacks and keepsakes at Krisna, Bali’s
                one-stop souvenir center. Alternatively, explore Pererenan’s
                boutique shops and hidden local brands for island-inspired
                fashion and homeware.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Surf Lessons (Canggu & Uluwatu)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Catch some waves at Batu Bolong Beach in Canggu (perfect for
                beginners) or head to Bingin Beach in Uluwatu for more of a
                challenge. Board rentals and surf schools are available along
                the coastline.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Kecak Fire Dance (Uluwatu)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Bali’s iconic traditional dance, famous for its rhythmic
                chanting and fire performance. Set against the backdrop of a
                stunning cliffside of Uluwatu Temple at sunset hour.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Day Trip to Nusa Penida (Offshore Island)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Just a short boat ride from Bali, this island is home to
                dramatic cliffs, turquoise waters, and famous spots like
                Kelingking “T-Rex” Beach. Guided day tours are recommended for
                easy transport between the island’s highlights.
              </p>
            </motion.div>
          )}

          {activeTab === "cafes" && (
            <motion.div
              className="text-left"
              initial="hidden"
              transition={{ duration: 0.8, ease: "easeOut" }}
              variants={fadeIn}
              viewport={{ once: true, margin: "-100px" }}
              whileInView="visible"
            >
              <h4 className="mb-[6px] font-freight text-[20px]">
                BGS Coffee (Multiple Locations)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                A surfer-favorite hangout known for great coffee and smoothies.
                Chessa’s favourite oat latte in Bali.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Revolver Espresso (Seminyak)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Iconic café serving strong, top-notch coffee. Best for espresso
                and flat whites.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Seniman Coffee Studio (Ubud)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Artisan roastery. Perfect for slow brews, cold drip, and
                single-origin tastings.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Chontea (Ubud & Seminyak)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                A cozy tea-focused café offering artisan blends alongside light
                bites. This is where you get your matcha fix.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Cafe Luneir (Canggu)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Neighborhood favourite for a good classic casual brunch. Another
                spot for a good matcha.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Baked. (Multiple Locations)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Famous for its sourdough bread and croissants. Try their
                scrambled egg dish!
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                7AM Bakers (Ubud & Canggu)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                A little spot serving tasty pastries and baked goods.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                ACME (Canggu & Pererenan)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Trendy brunch café with hearty Australian-style brunches.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Woods (Pererenan)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Rustic café set among greenery, offering wholesome food.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Milk & Madu (Multiple Locations)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Family-friendly café with great pizzas, and brunch classics.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Tukies Coconut Shop (Multiple Locations)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Coconut lovers’ paradise. Well known for its coconut ice cream.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Ettore Gelato (Canggu & Pererenan)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Authentic Italian gelato shop. Specialty flavours include
                pistachio and stracciatella.
              </p>
            </motion.div>
          )}

          {activeTab === "local" && (
            <motion.div
              className="text-left"
              initial="hidden"
              transition={{ duration: 0.8, ease: "easeOut" }}
              variants={fadeIn}
              viewport={{ once: true, margin: "-100px" }}
              whileInView="visible"
            >
              <h4 className="mb-[6px] font-freight text-[20px]">
                Bigul Karya Rebo (Kuta)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                A humble warung famous for its crispy, juicy Balinese “babi
                guling” (sucking pig). Chessa & Marvel’s MUST EAT in Bali!!!
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Pink Tempong (Kuta)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                A local hotspot for fiery sambal tempong (chili sauce) served
                with rice, vegetables, and fried chicken or fish. Chessa’s go-to
                when craving for that Indonesian hot sambal.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Warung Wardani (Kuta)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                A beloved spot for “nasi campur” (mixed rice) with generous
                portions of authentic Balinese side dishes.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Sate Bawah Pohon (Kuta)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Legendary street-style satay stall under a tree, known for its
                smoky chicken skewers.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Bebek Tepi Sawah (Kuta & Ubud)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Famous for its crispy duck served with sambal and rice, often
                enjoyed with beautiful rice field views.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Cafe Menega (Jimbaran)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                A must-do beachside seafood BBQ experience, best enjoyed with
                sunset views over Jimbaran Bay. Marvel: You haven’t been to Bali
                if you haven’t tasted their “kerang hijau”!
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Naughty Nuri’s (Multiple Locations)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Iconic for its smoky pork ribs and fun, lively atmosphere.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Nasi Ayam Kedewatan Ibu Mangku (Multiple Locations)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                A classic spot for Balinese chicken rice with rich flavors and
                traditional sides.
              </p>
            </motion.div>
          )}

          {activeTab === "restaurants" && (
            <motion.div
              className="text-left"
              initial="hidden"
              transition={{ duration: 0.8, ease: "easeOut" }}
              variants={fadeIn}
              viewport={{ once: true, margin: "-100px" }}
              whileInView="visible"
            >
              <h4 className="mb-[6px] font-freight text-[20px]">
                Home by Chef Wayan (Pererenan)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                A cozy neighborhood spot where Balinese flavors meet modern
                twists, perfect for a relaxed dinner.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Seeds Eatery (Ubud)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Wholesome, plant-forward dishes in a peaceful garden setting,
                great for a mindful lunch.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                M. Mason (Canggu & Uluwatu)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Lively Mediterranean restaurant with wood-fired cooking and a
                fun social atmosphere.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Bokashi (Pererenan)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                A Japanese-inspired restaurant and organic grocery, perfect for
                healthy bites and good coffee.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Sensorium (Canggu)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Creative Asian-fusion brunches in a cool, design-led space —
                very Instagram-worthy.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Mamasan (Seminyak)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                A Bali icon serving bold Southeast Asian flavors in a stylish,
                colonial-style restaurant.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Riviera Bistro (Canggu)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Breezy Mediterranean dining with a coastal vibe, ideal for a
                laid-back evening.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Bartolo (Uluwatu)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                A chic wine bar and modern European restaurant, perfect for
                sunset dinners after the beach.
              </p>
            </motion.div>
          )}

          {activeTab === "clubs" && (
            <motion.div
              className="text-left"
              initial="hidden"
              transition={{ duration: 0.8, ease: "easeOut" }}
              variants={fadeIn}
              viewport={{ once: true, margin: "-100px" }}
              whileInView="visible"
            >
              <h4 className="mb-[6px] font-freight text-[20px]">
                Potato Head Beach Club (Seminyak)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Iconic beachfront club with infinity pools, creative cocktails,
                and sunset DJs.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                The Lawn (Canggu)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Relaxed yet stylish beachfront hangout. Perfect for sundowners
                and casual bites.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Finns Beach Club (Canggu)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Iconic all-day beach club with pools, DJs, and sunset views.
                Best for cocktails and lively energy.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                CP Lounge (Ubud)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                A more relaxed garden-style bar with live music, pool tables,
                and friendly atmosphere.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Rock Bar at AYANA (Jimbaran)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                World-famous clifftop bar at Ayana Resort. Unbeatable for sunset
                cocktails over the ocean.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Savaya (Uluwatu)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Dramatic cliffside beach club with occasional international DJs.
              </p>
            </motion.div>
          )}

          {activeTab === "wellness" && (
            <motion.div
              className="text-left"
              initial="hidden"
              transition={{ duration: 0.8, ease: "easeOut" }}
              variants={fadeIn}
              viewport={{ once: true, margin: "-100px" }}
              whileInView="visible"
            >
              <h4 className="mb-[6px] font-freight text-[20px]">
                Therapy Day Spa (Canggu)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Known for professional treatments and a clean, modern spa
                environment.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Spring Spa (Seminyak, Canggu, Uluwatu)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                New Zealand-born spa chain known for beauty rituals, facials,
                and soothing massages.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Nirvana (Seminyak)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Boutique spa blending traditional Balinese healing with
                contemporary treatments in a serene setting.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Bali Social Club
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                A wellness hub equipped with padel courts, gym, pool and sauna.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                Bali Body Factory
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Fitness center with daily classes, personal training, and an
                outdoor recovery zone featuring ice baths and sauna.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                The Istana (Uluwatu)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
                Sunset sauna, ice bath, and wellness sanctuary overlooking the
                Indian Ocean.
              </p>
              <h4 className="mb-[6px] font-freight text-[20px]">
                On-call Masseuse (Island-wide)
              </h4>
              <p className="mb-8 font-hanken text-[12px] font-light">
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
        initial="hidden"
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeIn}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        <Image
          className="z-10 w-[50%] sm:ml-20 sm:w-[45%] md:ml-24 md:w-[40%] lg:ml-48 lg:w-[35%]"
          src={img10}
          alt="IMG10"
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
          className="-mt-10 ml-auto w-[55%] sm:-mt-12 sm:mr-20 sm:w-[50%] md:-mt-16 md:mr-24 md:w-[43%] lg:mr-48 lg:w-[38%]"
          src={img11}
          alt="IMG11"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
