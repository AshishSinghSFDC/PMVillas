/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/components/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/pages/**/*.{ts,tsx,js,jsx,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1280px" }
    },
    extend: {
      colors: {
        charcoal: "#1C1C1C",
        ivory: "#FAF9F6",
        gold: "#C9A227"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"]
      },
      borderRadius: {
        lg: "12px",
        md: "10px",
        sm: "8px"
      }
    }
  },
  plugins: []
}
