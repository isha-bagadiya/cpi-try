import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      minHeight: {
        'hero-height': 'calc(100vh - 8rem)',
      },
      dropShadow: {
        'custom': '0px 4.65px 3.84px 0px rgba(0, 0, 0, 0.1)', // Add custom shadow
      },
      fontSize: {
        '10xl': ['11rem', {
          lineHeight: '12rem',
          letterSpacing: '-0.05em',
          fontWeight: '600',
        }],
        '8xl': ['8rem', {
          lineHeight: '10rem',
          letterSpacing: '-0.05em',
          fontWeight: '600',
        }],
      },
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
        "dark-gray":"#0E100F"
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
