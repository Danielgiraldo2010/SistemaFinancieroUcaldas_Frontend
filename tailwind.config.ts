import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/presentation/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/infrastructure/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/core/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Reemplazamos los genéricos por la identidad U. Caldas
        ucaldas: {
          blue: "#003e70", // Azul predominante (Pantone 541C)
          blueDark: "#00284d", // Azul profundo para Sidebars
          gold: "#d5bb87", // Dorado institucional (Pantone 7508C)
          goldLight: "#efd9af", // Tonalidad clara para efectos
          slate: "#F4F7FE", // El fondo gris/azul claro del mockup
        },
        // Mantenemos nombres semánticos para que el código de tus compañeras no rompa
        primary: {
          DEFAULT: "#003e70",
          dark: "#00284d",
          light: "#d5bb87",
        },
      },
      fontFamily: {
        // La guía pide Roboto
        sans: ["var(--font-roboto)", "ui-sans-serif", "system-ui"],
      },
      keyframes: {
        strongZoom: {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.1)" },
        },
      },
      animation: {
        strongZoom: "strongZoom 10s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
export default config;
