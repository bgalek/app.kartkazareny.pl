import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
import reactCssModule from "vite-plugin-react-css-modules";
import { VitePWA } from "vite-plugin-pwa";
const generateScopedName = "[name]__[local]___[hash:base64:5]";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    reactCssModule({
      generateScopedName,
      filetypes: {
        "module.css": {
          syntax: "sugarss",
        },
      },
    }),
    reactRefresh(),
    VitePWA({
      includeAssets: ["favicon.svg", "favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "Kartka z Areny",
        short_name: "Arena",
        description: "Application to manage Arena warehouse",
        theme_color: "#e5edfb",
        icons: [
          {
            src: "./src/assets/icons/icon_192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./src/assets/icons/icon_512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "./src/assets/icons/icon_512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  css: {
    modules: {
      generateScopedName,
    },
  },
});
