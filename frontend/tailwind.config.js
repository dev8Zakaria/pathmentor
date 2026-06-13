/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        primary: "#FF5C00",
        secondary: "#666666",
        accent: "#E55300",
        surface: "#666666",
        border: "#666666",
        mist: "#F8F9F9"
      },
      boxShadow: {
        soft: "8px 8px 0 rgba(102, 102, 102, 0.16)"
      }
    }
  },
  plugins: []
};
