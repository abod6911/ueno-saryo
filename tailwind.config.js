/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        matcha: {
          900: "#122416",
          800: "#19321d",
          700: "#29482a",
          600: "#365c3b",
          500: "#49724f",
          muted: "#939458",
          surface: "#1b331f",
          glow: "#26482c",
          border: "rgba(248, 247, 241, 0.12)",
        },
        olive: {
          canvas: "#9b9b57",
          deep: "#8a8a47",
          light: "#a8a865",
        },
        rice: "#f0ede1",
        paper: "#e8e4d6",
        wood: {
          DEFAULT: "#8a6545",
          dark: "#5c412b",
          light: "#b48c68",
        },
        ink: {
          DEFAULT: "#181813",
          light: "#2a2a22",
        },
        cream: {
          DEFAULT: "#f8f7f1",
          muted: "rgba(248, 247, 241, 0.65)",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        arabic: ['Alexandria', 'IBM Plex Sans Arabic', 'system-ui', 'sans-serif'],
        serif: ['"DM Serif Display"', '"Instrument Serif"', 'Georgia', 'serif'],
        headline: ['"DM Serif Display"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Instrument Serif"', '"DM Serif Display"', 'serif'],
        japanese: ['"Noto Sans JP"', '"Noto Serif JP"', '"Hiragino Mincho ProN"', 'sans-serif'],
      },
      borderRadius: {
        'frame': '32px',
        'card': '28px',
        'pill': '9999px',
      },
      boxShadow: {
        'frame': '0 30px 60px -15px rgba(10, 25, 12, 0.45), 0 10px 20px -5px rgba(10, 25, 12, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.08)',
        'card': '0 12px 30px -4px rgba(10, 25, 12, 0.22), 0 4px 10px -2px rgba(10, 25, 12, 0.12)',
        'card-hover': '0 20px 38px -6px rgba(10, 25, 12, 0.28), 0 6px 14px -2px rgba(10, 25, 12, 0.16)',
        'cup-glow': '0 0 50px rgba(41, 72, 42, 0.4)',
        'dock': '0 10px 30px -5px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.12)',
      }
    },
  },
  plugins: [],
}
