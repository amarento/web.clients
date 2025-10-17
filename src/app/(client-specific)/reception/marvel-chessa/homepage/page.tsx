"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MdOutlineMusicNote, MdOutlineMusicOff } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";

import homepage from "../_images/homepage.png";

const music = "/music-felix-celine.mp3";

export default function Homepage() {
  const showAnimations = true;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, x: 0, y: 0 },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  // Music player state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();

      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();

        setIsPlaying(true);
      } catch (err) {
        // Optionally, surface a non-blocking UI message here
        setIsPlaying(false);
      }
    }
  };

  // Pause music when unmounting
  useEffect(() => {
    const audioElement = audioRef.current;

    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, []);

  // const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  // const [hasScrolled, setHasScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (!hasScrolled && window.scrollY > 40) {
  //       setShowScrollIndicator(false);
  //       setHasScrolled(true);
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [hasScrolled]);

  return (
    <div
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden text-center text-[#F0F0F0]"
      // style={{ height: "calc(100vh - 80px)" }}
    >
      <Image
        alt="Homepage background"
        className="absolute inset-0 -z-10"
        fill
        priority
        src={homepage}
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={showAnimations ? "visible" : "hidden"}
      >
        <motion.h1
          className="font-cormorant text-[20px] lg:text-[22px] drop-shadow-2xl"
          initial="hidden"
          transition={{ duration: 0.8, ease: "easeOut" }}
          variants={fadeIn}
          viewport={{ once: true, margin: "-100px" }}
          whileInView="visible"
        >
          MARVEL <span className="text-[16px] italic"> & </span> CHESSA
        </motion.h1>
        <motion.h5
          className="font-cormorant text-[18px] lg:text-[20px] italic drop-shadow-2xl"
          initial="hidden"
          transition={{ duration: 0.8, ease: "easeOut" }}
          variants={fadeIn}
          viewport={{ once: true, margin: "-100px" }}
          whileInView="visible"
        >
          Bali, 20 June 2026
        </motion.h5>
      </motion.div>

      {/* Scroll indicator */}
      {/* <motion.div
        className="absolute bottom-3 flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate={showAnimations ? "visible" : "hidden"}
        style={{ pointerEvents: "none" }}
      >
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: showScrollIndicator ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            className="font-cormorant text-[16px]"
            variants={fadeIn}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Scroll down
          </motion.p>
          <motion.div
            variants={fadeIn}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <FaChevronDown />
          </motion.div>
        </motion.div>
      </motion.div> */}

      {/* Music player button */}
      <audio loop preload="auto" ref={audioRef} src={music} />
      <button
        aria-label={isPlaying ? "Mute music" : "Play music"}
        className="fixed bottom-6 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#333333] shadow-lg transition hover:bg-[#444] focus:outline-none"
        onClick={toggleMusic}
        type="button"
      >
        {isPlaying ? (
          // Mute icon (simple SVG)
          <MdOutlineMusicNote className="h-5 w-5" />
        ) : (
          // Play icon (simple SVG)
          <MdOutlineMusicOff className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
