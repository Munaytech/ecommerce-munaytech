import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D23F57",
        secundary: "#2B3445",
        tertiary: "#4B566B",
        // background: "var(--background)",
        // foreground: "var(--foreground)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"], // Asegúrate de que Inter esté configurado
        publicSans: ["Public San", "sans-serif"],
      },
      fontSize: {
        supertitle: ["50px", { lineHeight: "60px", fontWeight: "700" }], // EJEMPLP
        paragraph: ["14px", { lineHeight: "21px", fontWeight: "400" }], // EJEMPLP
      },
    },
  },
  plugins: [],
} satisfies Config;
