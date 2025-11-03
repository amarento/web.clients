"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../_images/logo.png";
import logoBlack from "../_images/logo-black.png";

export default function Header() {
  const router = useRouter();

  const [isHeaderVisible, setIsHeaderVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [scrollingTimeout, setScrollingTimeout] =
    React.useState<NodeJS.Timeout | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const path = "/reception/marvel-chessa";
    router.push(path);
  };

  const handleScroll = React.useCallback(() => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      // Hide header immediately when scrolling down past 100px
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsHeaderVisible(false);
        if (scrollingTimeout) {
          clearTimeout(scrollingTimeout);
          setScrollingTimeout(null);
        }
      }
      // Show header immediately when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
        if (scrollingTimeout) {
          clearTimeout(scrollingTimeout);
          setScrollingTimeout(null);
        }
      }

      setLastScrollY(currentScrollY <= 0 ? 0 : currentScrollY);
    }
  }, [lastScrollY, scrollingTimeout]);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, scrollingTimeout, handleScroll]);

  // Watch for sidebar state changes via body class
  React.useEffect(() => {
    const checkSidebarState = () => {
      const sidebarOpen = document.body.classList.contains("sidebar-open");
      setIsSidebarOpen(sidebarOpen);
    };

    // Check initially
    checkSidebarState();

    // Create a MutationObserver to watch for class changes
    const observer = new MutationObserver(checkSidebarState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);
  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isHeaderVisible && !isSidebarOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mx-[4%] mt-4">
        <div className="mt-xs mb-xs flex items-end justify-start">
          <Image
            alt="Logo"
            className="-ml-3 h-16 w-16 transition duration-300"
            onClick={handleLogoClick}
            src={lastScrollY > 100 ? logoBlack : logo}
          />
        </div>
      </div>
    </header>
  );
}
