/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172026",
        pine: "#0f766e",
        coral: "#e15f41",
        gold: "#d99a2b",
        mist: "#f4f7f8"
      },
      boxShadow: {
        soft: "0 16px 40px rgba(23, 32, 38, 0.10)"
      }
    }
  },
  plugins: []
};
