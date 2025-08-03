import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/domain": path.resolve(__dirname, "./src/domain"),
      "@/infrastructure": path.resolve(__dirname, "./src/infrastructure"),
      "@/application": path.resolve(__dirname, "./src/application"),
      "@/presentation": path.resolve(__dirname, "./src/presentation"),
    },
  },
  base: process.env.NODE_ENV === "production" ? "/weather-app/" : "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    minify: "esbuild",
  },
  esbuild: {
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
  },
});
