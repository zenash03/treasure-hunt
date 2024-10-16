import type { Config } from "tailwindcss";

const config: Config = {
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
      textStrokeWidth: {
        "1": "1px",
        "2": "2px"
      },
      textStrokeColor: {
        white: "#fff"
      }
    },
  },
  plugins: [
    function ({addUtilities}: {addUtilities: any}) {
      addUtilities({
        '.text-stroke': {
          '-webkit-text-stroke': '1px white'
        }
      })
    }
  ],
};
export default config;
