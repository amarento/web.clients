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

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const path = "/reception/marvel-chessa";
    router.push(path);
  };

  const handleScroll = React.useCallback(() => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        if (!scrollingTimeout) {
          const timeout = setTimeout(() => {
            setIsHeaderVisible(false);
          }, 200);
          setScrollingTimeout(timeout);
        }
      } else {
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
  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isHeaderVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mx-[4%] mt-4">
        <div className="mt-xs mb-xs flex items-end justify-start">
          <Image
            alt="Logo"
            className="h-10 w-10 transition duration-300"
            onClick={handleLogoClick}
            src={lastScrollY > 900 ? logoBlack : logo}
          />
        </div>
      </div>
    </header>
  );
}
