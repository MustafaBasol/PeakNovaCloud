/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#0D9DDA",
        navy: "#032D60",
        hovered: "#021f43",
        light: "#e6f5fb",
        sales: "rgb(4, 225, 203)",
        service: "rgb(255, 82, 137)",
        marketing: "rgb(254, 147, 57)",
        commerce: "rgb(65, 182, 88)",
        tableau: "rgb(1, 118, 211)",
        einstein: "rgb(11, 92, 171)",
        mulesoft: "rgb(15, 156, 220)",
        slack: "rgb(236, 178, 46)",
        data: "rgb(106, 40, 114)",
      },
      fontFamily: {
        site: ["var(--font-montserrat)", "Avenir Next", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
