"use client";

import Lenis from "lenis";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MdOutlineMusicNote, MdOutlineMusicOff } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

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
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  // Force video autoplay immediately
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Set video properties for better autoplay compatibility
      video.muted = true;
      video.playsInline = true;
      video.loop = true;

      // Multiple attempts to ensure video plays
      const attemptPlay = async () => {
        try {
          // Wait for video to be ready
          if (video.readyState >= 2) {
            await video.play();
            console.log("Video autoplay successful");
          } else {
            // Wait for video to load then play
            video.addEventListener(
              "loadedData",
              () => {
                video
                  .play()
                  .then(() => console.log("Video playing after loadedData"))
                  .catch((err) =>
                    console.log("Play failed after loadedData:", err),
                  );
              },
              { once: true },
            );
          }
        } catch (error) {
          console.log("Initial autoplay failed, trying fallbacks:", error);

          // Fallback: Try playing on next tick
          setTimeout(() => {
            video
              .play()
              .then(() => console.log("Video playing after timeout"))
              .catch((err) => {
                console.log("Timeout play failed:", err);
                setupUserInteractionFallback();
              });
          }, 100);
        }
      };

      const setupUserInteractionFallback = () => {
        const playOnInteraction = () => {
          video
            .play()
            .then(() => console.log("Video playing after user interaction"))
            .catch((err) =>
              console.error("User interaction play failed:", err),
            );
        };

        // Listen for various interaction events
        document.addEventListener("click", playOnInteraction, { once: true });
        document.addEventListener("touchstart", playOnInteraction, {
          once: true,
        });
        document.addEventListener("keydown", playOnInteraction, { once: true });
      };

      // Start the play attempts
      void attemptPlay();
    }
  }, []);

  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHamburgerVisible, setIsHamburgerVisible] = useState(true);
  const [scrollingTimeout, setScrollingTimeout] =
    useState<NodeJS.Timeout | null>(null);

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    setIsSidebarOpen(false);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        let elementPosition;

        if (sectionId === "the-wedding") {
          // For the-wedding, scroll to 20px above the section
          elementPosition = element.offsetTop - 20;
        } else if (sectionId === "bali-guide") {
          // For bali-guide, scroll to 24px below the section
          elementPosition = element.offsetTop + 24;
        } else if (sectionId === "dresscode") {
          // For dresscode, scroll to 60px above the section
          elementPosition = element.offsetTop - 60;
        } else {
          // For other sections, use default scroll behavior
          element.scrollIntoView({ behavior: "smooth" });
          return;
        }

        // Use custom scroll position for sections with specific offsets
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
    }, 300); // Wait for sidebar close animation
  };

  // Prevent scrolling when sidebar is open using event listeners
  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    if (isSidebarOpen) {
      document.body.classList.add("sidebar-open");

      // Add event listeners to prevent scroll
      document.addEventListener("wheel", preventScroll, { passive: false });
      document.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      document.body.classList.remove("sidebar-open");

      // Remove event listeners
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("sidebar-open");
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setLastScrollY(currentScrollY);

      // Hide hamburger immediately when scrolling down past 50px
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsHamburgerVisible(false);
        if (scrollingTimeout) {
          clearTimeout(scrollingTimeout);
          setScrollingTimeout(null);
        }
      }
      // Show hamburger immediately when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsHamburgerVisible(true);
        if (scrollingTimeout) {
          clearTimeout(scrollingTimeout);
          setScrollingTimeout(null);
        }
      }

      if (!hasScrolled && currentScrollY > 40) {
        setShowScrollIndicator(false);
        setHasScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled, lastScrollY, scrollingTimeout]);

  return (
    <>
      {/* Hamburger menu button */}
      {!isSidebarOpen && (
        <button
          aria-label="Open menu"
          className={`fixed right-4 top-6 z-50 flex h-12 w-12 items-center justify-center duration-300 ${
            isHamburgerVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsSidebarOpen(true)}
          type="button"
          style={{
            color: `rgb(${246 - Math.min(229, Math.max(0, ((lastScrollY - 100) / 100) * 229))}, ${244 - Math.min(227, Math.max(0, ((lastScrollY - 100) / 100) * 227))}, ${241 - Math.min(224, Math.max(0, ((lastScrollY - 100) / 100) * 224))})`,
          }}
        >
          <RxHamburgerMenu className="h-6 w-6 transition-colors duration-300" />
        </button>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Full Screen Sidebar Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black/80 backdrop-blur-lg"
              onClick={() => setIsSidebarOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {/* Sidebar content container */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              onClick={() => setIsSidebarOpen(false)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                mass: 0.8,
                delay: 0.2,
              }}
            >
              <div className="w-full max-w-md px-8 py-12 text-center">
                <motion.nav
                  className="space-y-8"
                  onClick={(e) => e.stopPropagation()}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.15, delayChildren: 0.4 },
                    },
                    hidden: {
                      transition: {
                        staggerChildren: 0.05,
                        staggerDirection: -1,
                      },
                    },
                  }}
                >
                  <motion.button
                    className="mx-auto block py-2 font-cormorant text-3xl text-[#F0F0F0] transition-all duration-200 hover:text-white lg:text-4xl"
                    onClick={() => scrollToSection("our-story")}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                  >
                    Our Story
                  </motion.button>
                  <motion.button
                    className="mx-auto block py-2 font-cormorant text-3xl text-[#F0F0F0] transition-all duration-200 hover:text-white lg:text-4xl"
                    onClick={() => scrollToSection("the-wedding")}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                  >
                    The Wedding
                  </motion.button>
                  <motion.button
                    className="mx-auto block py-2 font-cormorant text-3xl text-[#F0F0F0] transition-all duration-200 hover:text-white lg:text-4xl"
                    onClick={() => scrollToSection("dresscode")}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                  >
                    Dresscode
                  </motion.button>
                  <motion.button
                    className="mx-auto block py-2 font-cormorant text-3xl text-[#F0F0F0] transition-all duration-200 hover:text-white lg:text-4xl"
                    onClick={() => scrollToSection("bali-guide")}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                  >
                    Bali Guide
                  </motion.button>
                  <motion.button
                    className="mx-auto block py-2 font-cormorant text-3xl text-[#F0F0F0] transition-all duration-200 hover:text-white lg:text-4xl"
                    onClick={() => scrollToSection("love-letters")}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                  >
                    Love Letters
                  </motion.button>
                </motion.nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed inset-0 z-10 flex h-screen w-full flex-col items-center justify-center overflow-hidden text-center text-[#F0F0F0]"
        style={{
          opacity: homepageOpacity,
          pointerEvents: "none",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          webkit-playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
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
            MARVEL{" "}
            <span className="text-[16px] italic lg:text-[20px]"> & </span>{" "}
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
    </>
  );
}
