"use client";

import Lenis from "lenis";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MdOutlineMusicNote, MdOutlineMusicOff } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";

const video = "/vid-marvel-chessa.mp4";
const music = "/music-felix-celine.mp3";

export default function Homepage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.7, // 0.5s delay + 0.2s original delay
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, x: 0, y: 0 },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  // Element refs for viewport-based triggers
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom spring-like easing
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Viewport-based animation hook for text elements - triggers when element is 10% from bottom
  const useViewportAnimation = (
    ref: React.RefObject<HTMLElement>,
    yValue = 60,
  ) => {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end 90%"], // Animation starts when element enters viewport, completes when it's 10% from bottom
    });

    const opacityRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const yRaw = useTransform(scrollYProgress, [0, 1], [yValue, 0]);

    return {
      opacity: useSpring(opacityRaw, { stiffness: 120, damping: 25, mass: 1 }),
      y: useSpring(yRaw, { stiffness: 100, damping: 20, mass: 1 }),
    };
  };

  // Text animations with viewport-based triggers
  const title = useViewportAnimation(titleRef);
  const date = useViewportAnimation(dateRef);

  // Get overall scroll position for fixed homepage animation
  const { scrollY } = useScroll();

  // Three-stage scroll animation with spring physics
  const overlayOpacityRaw = useTransform(scrollY, [0, 100, 200], [0, 0.3, 1]);
  const homepageOpacityRaw = useTransform(scrollY, [0, 100, 200], [1, 1, 0]);

  // Apply spring animation to the transforms for smooth, natural motion
  const overlayOpacity = useSpring(overlayOpacityRaw, {
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  });
  const homepageOpacity = useSpring(homepageOpacityRaw, {
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  });

  // Music player state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Mobile menu state
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

  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 40) {
        setShowScrollIndicator(false);
        setHasScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  return (
    <motion.div
      className="fixed inset-0 z-10 flex h-screen w-full flex-col items-center justify-center overflow-hidden text-center text-[#F0F0F0]"
      style={{
        opacity: homepageOpacity,
        pointerEvents: "none",
      }}
    >
      <video
        autoPlay
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        loop
        muted
        playsInline
        src={video}
      />
      {/* Dark overlay that increases with scroll */}
      <motion.div
        className="-z-5 absolute inset-0 h-screen w-screen bg-black"
        style={{ opacity: overlayOpacity }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
      <motion.div ref={containerRef}>
        <motion.h1
          ref={titleRef}
          className="font-cormorant text-[20px] drop-shadow-2xl lg:text-[25px]"
          style={{
            opacity: title.opacity,
            y: title.y,
          }}
        >
          MARVEL <span className="text-[16px] italic lg:text-[20px]"> & </span>{" "}
          CHESSA
        </motion.h1>
        <motion.h5
          ref={dateRef}
          className="font-cormorant text-[16px] italic drop-shadow-2xl lg:text-[18px]"
          style={{
            opacity: date.opacity,
            y: date.y,
          }}
        >
          Bali, 20 June 2026
        </motion.h5>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-3 flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ pointerEvents: "none" }}
      >
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: showScrollIndicator ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            variants={fadeIn}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-2 xl:mb-4"
          >
            <FaChevronDown className="h-3 w-3 lg:h-4 lg:w-4" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Music player button */}
      <audio loop preload="auto" ref={audioRef} src={music} />
      <button
        aria-label={isPlaying ? "Mute music" : "Play music"}
        className="fixed bottom-6 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#222222]/50 shadow-lg transition hover:bg-[#222222] focus:outline-none"
        style={{ pointerEvents: "auto" }}
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
    </motion.div>
  );
}
