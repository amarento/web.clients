import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // white: "#F8F9F5",
        // grey: "#242827",
        // black: "#1D201F",

        "light-green": {
          lighter: "#EEF8EA",
          light: "#DDF2D5",
          dark: "#ACDC96",
          darker: "#A9FF9B",
        },
        "dark-green": {
          light: "#278461",
          base: "#00613A",
          dark: "#154734",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif', ...fontFamily.sans],
        cormorant: ['var(--font-cormorant)', 'serif', ...fontFamily.serif],
        beau: ['var(--font-beau)', 'serif', ...fontFamily.serif],
        marjorie: ['var(--font-marjorie)', 'serif', ...fontFamily.serif],
        marjorieSemiBold: ['var(--font-marjorie-semibold)', 'serif', ...fontFamily.serif],
        lastik: ['var(--font-lastik)', 'serif', ...fontFamily.serif],
        melodrame: ['var(--font-melodrame)', 'serif', ...fontFamily.serif],
        retrofans: ['var(--font-retrofans)', 'serif', ...fontFamily.serif],
        bellefair: ['var(--font-bellefair)', 'serif', ...fontFamily.serif],
        bodoni: ['var(--font-bodoni)', 'serif', ...fontFamily.serif],
        queensila: ['var(--font-queensila)', 'serif', ...fontFamily.serif],
        snell: ['var(--font-snell)', 'serif', ...fontFamily.serif],
        beth: ['var(--font-beth)', 'serif', ...fontFamily.serif],
        apple: ['var(--font-apple)', 'serif', ...fontFamily.serif],
        schoolbell: ['var(--font-schoolbell)', 'serif', ...fontFamily.serif],
        hanken: ['var(--font-hanken)', 'sans-serif', ...fontFamily.sans],
        freight: ['var(--font-freight)', 'serif', ...fontFamily.serif],
        foret: ['var(--font-foret)', 'serif', ...fontFamily.serif],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        blink: {
          "0%": {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        blink: "blink 2s infinite both",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "stary-night": "url('./stary-night.jpg')",
        "stary-night-plain": "url('./stary-night-plain.jpg')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
