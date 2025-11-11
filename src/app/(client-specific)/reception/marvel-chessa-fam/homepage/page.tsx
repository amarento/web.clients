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
const music = "/music-marvel-chessa.mp3";

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

  // Simple animation values without scroll targeting to avoid hydration issues
  const titleOpacity = useSpring(0, { stiffness: 120, damping: 25, mass: 1 });
  const titleY = useSpring(60, { stiffness: 100, damping: 20, mass: 1 });

  const dateOpacity = useSpring(0, { stiffness: 120, damping: 25, mass: 1 });
  const dateY = useSpring(60, { stiffness: 100, damping: 20, mass: 1 });

  // Set initial values and animate on mount
  useEffect(() => {
    // Animate in with staggered delays
    const titleTimer = setTimeout(() => {
      titleOpacity.set(1);
      titleY.set(0);
    }, 700);

    const dateTimer = setTimeout(() => {
      dateOpacity.set(1);
      dateY.set(0);
    }, 900);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(dateTimer);
    };
  }, [titleOpacity, titleY, dateOpacity, dateY]);

  // Animation objects for consistency with original code
  const title = { opacity: titleOpacity, y: titleY };
  const date = { opacity: dateOpacity, y: dateY };

  // Get overall scroll position for fixed homepage animation
  const { scrollY } = useScroll();

  // Track if user has scrolled
  const [hasScrolledStart, setHasScrolledStart] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolledStart(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Three-stage scroll animation with spring physics
  const overlayOpacityRaw = useTransform(scrollY, [0, 100, 200], [0, 0, 1]);
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
      video.preload = "auto"; // Preload entire video for better pre-rendering

      // Set a black background to prevent gray flash
      video.style.backgroundColor = "#000000";

      // Force load the video immediately
      video.load();

      // Multiple attempts to ensure video plays
      const attemptPlay = async () => {
        try {
          // Wait for video to be ready
          if (video.readyState >= 2) {
            await video.play();
          } else {
            // Wait for video to load then play
            video.addEventListener(
              "loadeddata",
              () => {
                void video.play();
              },
              { once: true },
            );

            // Also listen for canplay for earlier playback
            video.addEventListener(
              "canplay",
              () => {
                void video.play();
              },
              { once: true },
            );
          }
        } catch (error) {
          console.log("Initial autoplay failed, trying fallbacks:", error);

          // Fallback: Try playing on next tick
          setTimeout(() => {
            video.play().catch(() => {
              setupUserInteractionFallback();
            });
          }, 100);
        }
      };

      const setupUserInteractionFallback = () => {
        const playOnInteraction = () => {
          void video.play();
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
  const [isHeaderNavVisible, setIsHeaderNavVisible] = useState(true);
  const [scrollingTimeout, setScrollingTimeout] =
    useState<NodeJS.Timeout | null>(null);

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [authError, setAuthError] = useState("");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const correctCode = "MCUnited"; // Password is case insensitive

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authCode.toLowerCase() === correctCode.toLowerCase()) {
      // Add a small delay for smooth exit animation
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 300);
      setAuthError("");
    } else {
      setAuthError("Invalid code. Please try again.");
      setAuthCode("");
    }
  };

  const handleAuthCodeChange = (value: string) => {
    // Allow letters and numbers, no length limit for text password
    setAuthCode(value);
    setAuthError("");
  };

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

  // Prevent scrolling when authentication modal is open
  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    if (!isAuthenticated) {
      document.body.classList.add("auth-modal-open");
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      // Add event listeners to prevent scroll
      document.addEventListener("wheel", preventScroll, { passive: false });
      document.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      document.body.classList.remove("auth-modal-open");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      // Remove event listeners
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("auth-modal-open");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
    };
  }, [isAuthenticated]);

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

      // Header navigation visibility
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsHeaderNavVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsHeaderNavVisible(true);
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
      {/* Authentication Modal */}
      <AnimatePresence>
        {!isAuthenticated && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-full max-w-md rounded-2xl p-8 text-center"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1, opacity: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.h1
                className="mb-10 font-cormorant text-[20px] text-white lg:text-[25px] xl:text-[31px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                MARVEL & CHESSA
              </motion.h1>
              <motion.p
                className="mb-4 font-freight text-[18px] text-white/80 lg:text-[20px] xl:mb-5 xl:text-[25px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Please enter the passcode
              </motion.p>

              <motion.form
                onSubmit={handleAuthSubmit}
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <div className="mb-4">
                  <input
                    type="text"
                    value={authCode}
                    onChange={(e) => handleAuthCodeChange(e.target.value)}
                    placeholder="Enter passcode"
                    className="w-48 bg-transparent p-2 text-center font-freight text-[20px] tracking-wide text-white placeholder-white/50 outline-none xl:text-[25px]"
                    autoComplete="off"
                  />
                </div>

                {authError && (
                  <motion.p
                    className="-mt-3 mb-4 font-freight text-[14px] text-red-300 lg:text-[16px] xl:-mt-1 xl:mb-6 xl:text-[18px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {authError}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  disabled={authCode.length === 0}
                  className="border-1 mx-auto block border px-8 py-[6px] font-cormorant text-[14px] text-[#F0F0F0] transition-all duration-200 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 lg:text-[16px] xl:text-[18px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ENTER
                </motion.button>
              </motion.form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Only show when authenticated */}
      {isAuthenticated && (
        <>
          {/* Header Navigation Links - Large screens only */}
          <nav
            className={`fixed inset-x-0 top-6 z-50 mt-3 hidden duration-300 lg:block ${
              isHeaderNavVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-center justify-center space-x-8">
              <button
                onClick={() => scrollToSection("our-story")}
                className="font-cormorant text-sm text-[#F0F0F0] transition-colors duration-200 hover:text-white"
                style={{
                  color: `rgb(${246 - Math.min(229, Math.max(0, ((lastScrollY - 100) / 100) * 229))}, ${244 - Math.min(227, Math.max(0, ((lastScrollY - 100) / 100) * 227))}, ${241 - Math.min(224, Math.max(0, ((lastScrollY - 100) / 100) * 224))})`,
                }}
              >
                OUR STORY
              </button>
              <button
                onClick={() => scrollToSection("the-wedding")}
                className="font-cormorant text-sm text-[#F0F0F0] transition-colors duration-200 hover:text-white"
                style={{
                  color: `rgb(${246 - Math.min(229, Math.max(0, ((lastScrollY - 100) / 100) * 229))}, ${244 - Math.min(227, Math.max(0, ((lastScrollY - 100) / 100) * 227))}, ${241 - Math.min(224, Math.max(0, ((lastScrollY - 100) / 100) * 224))})`,
                }}
              >
                THE WEDDING
              </button>
              <button
                onClick={() => scrollToSection("dresscode")}
                className="font-cormorant text-sm text-[#F0F0F0] transition-colors duration-200 hover:text-white"
                style={{
                  color: `rgb(${246 - Math.min(229, Math.max(0, ((lastScrollY - 100) / 100) * 229))}, ${244 - Math.min(227, Math.max(0, ((lastScrollY - 100) / 100) * 227))}, ${241 - Math.min(224, Math.max(0, ((lastScrollY - 100) / 100) * 224))})`,
                }}
              >
                DRESSCODE
              </button>
              <button
                onClick={() => scrollToSection("bali-guide")}
                className="font-cormorant text-sm text-[#F0F0F0] transition-colors duration-200 hover:text-white"
                style={{
                  color: `rgb(${246 - Math.min(229, Math.max(0, ((lastScrollY - 100) / 100) * 229))}, ${244 - Math.min(227, Math.max(0, ((lastScrollY - 100) / 100) * 227))}, ${241 - Math.min(224, Math.max(0, ((lastScrollY - 100) / 100) * 224))})`,
                }}
              >
                BALI GUIDE
              </button>
              <button
                onClick={() => scrollToSection("love-letters")}
                className="font-cormorant text-sm text-[#F0F0F0] transition-colors duration-200 hover:text-white"
                style={{
                  color: `rgb(${246 - Math.min(229, Math.max(0, ((lastScrollY - 100) / 100) * 229))}, ${244 - Math.min(227, Math.max(0, ((lastScrollY - 100) / 100) * 227))}, ${241 - Math.min(224, Math.max(0, ((lastScrollY - 100) / 100) * 224))})`,
                }}
              >
                LOVE LETTERS
              </button>
            </div>
          </nav>

          {/* Hamburger menu button - Small screens only */}
          {!isSidebarOpen && (
            <button
              aria-label="Open menu"
              className={`fixed right-4 top-6 z-50 flex h-12 w-12 items-center justify-center duration-300 lg:hidden ${
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

          {/* Sidebar - Small screens only */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                className="fixed inset-0 z-40 lg:hidden"
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
                          transition: {
                            staggerChildren: 0.1,
                            delayChildren: 0.3,
                          },
                        },
                        hidden: {
                          transition: {
                            staggerChildren: 0.03,
                            staggerDirection: -1,
                          },
                        },
                      }}
                    >
                      <motion.button
                        className="mx-auto block py-2 font-cormorant text-[25px] text-[#F0F0F0] hover:text-white lg:text-[31px]"
                        onClick={() => scrollToSection("our-story")}
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        OUR STORY
                      </motion.button>
                      <motion.button
                        className="mx-auto block py-2 font-cormorant text-[25px] text-[#F0F0F0] hover:text-white lg:text-[31px]"
                        onClick={() => scrollToSection("the-wedding")}
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        THE WEDDING
                      </motion.button>
                      <motion.button
                        className="mx-auto block py-2 font-cormorant text-[25px] text-[#F0F0F0] hover:text-white lg:text-[31px]"
                        onClick={() => scrollToSection("dresscode")}
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        DRESS CODE
                      </motion.button>
                      <motion.button
                        className="mx-auto block py-2 font-cormorant text-[25px] text-[#F0F0F0] hover:text-white lg:text-[31px]"
                        onClick={() => scrollToSection("bali-guide")}
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        BALI GUIDE
                      </motion.button>
                      <motion.button
                        className="mx-auto block py-2 font-cormorant text-[25px] text-[#F0F0F0] hover:text-white lg:text-[31px]"
                        onClick={() => scrollToSection("love-letters")}
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        LOVE LETTERS
                      </motion.button>
                    </motion.nav>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="fixed inset-0 z-10 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-center text-[#F0F0F0]"
            style={{
              opacity: homepageOpacity,
              pointerEvents: "none",
            }}
          >
            {/* Black background div that's always present behind video */}
            <div className="absolute inset-0 h-full w-full bg-black" />

            <video
              ref={videoRef}
              autoPlay
              className="absolute inset-0 h-full w-full bg-black object-cover"
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
              onLoadStart={() => {
                // Ensure video container has proper background immediately
                const videoEl = videoRef.current;
                if (videoEl) {
                  videoEl.style.backgroundColor = "#000000";
                }
              }}
              onLoadedData={() => {
                // Mark video as loaded when first frame is available
                setVideoLoaded(true);
              }}
              onLoadedMetadata={() => {
                // Try to play as soon as metadata is loaded
                const videoEl = videoRef.current;
                if (videoEl) {
                  videoEl
                    .play()
                    .catch((err) => console.log("Metadata play failed:", err));
                }
              }}
              onCanPlay={() => {
                // Another opportunity to start playback
                const videoEl = videoRef.current;
                if (videoEl?.paused) {
                  videoEl
                    .play()
                    .catch((err) => console.log("CanPlay play failed:", err));
                }
              }}
            />
            {/* Dark overlay that increases with scroll - only render after scrolling starts */}
            {hasScrolledStart && (
              <motion.div
                className="absolute inset-0 h-screen w-screen bg-black"
                initial={{ opacity: 0 }}
                style={{ opacity: overlayOpacity }}
              />
            )}
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
          </motion.div>

          {/* Music player button - outside homepage motion.div to stay sticky on viewport */}
          <button
            aria-label={isPlaying ? "Mute music" : "Play music"}
            className="fixed bottom-6 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#222222]/50 text-white shadow-lg transition hover:bg-[#222222] focus:outline-none xl:right-6 xl:h-12 xl:w-12"
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
        </>
      )}
    </>
  );
}
