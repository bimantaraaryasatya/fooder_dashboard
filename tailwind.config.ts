import { url } from "inspector";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'login': "url('/images/wallpaper.jpg')"
      },
      backgroundColor: {
        'primary': '#F4A261',
      },
      borderColor: {
        'primary' : '#F4A261',
      },
      textColor:{
        'primary' : '#F4A261'
      },
    },
  },
  plugins: [],
} satisfies Config;
