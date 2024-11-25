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
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      }
    },
    container: {
      center: true,
      padding: "2rem"
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["night"]
  }
};
export default config;
