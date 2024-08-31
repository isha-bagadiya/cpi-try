import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-aave":"linear-gradient(90deg, #2EBAC6, #B6509E)",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          
      },
      colors:{
        "optimism":"#FF0420",
        "compound":"#00D395",
        "uniswap":"#FF007A",
      },
      fontFamily: {
        redhat: ['var(--font-red-hat)'],
        mori: ['var(--font-pp-mori)'],
      },
      borderWidth: {
        '3':"3px",
        '20':"20px"
      }
    },
  },
  plugins: [],
};
export default config;
