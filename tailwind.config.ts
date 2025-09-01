import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        tablet: { max: "900px" },
        mobile: { max: "500px" },
      },
    },
  },
  plugins: [],
};

export default config;
