import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/graphiql-app",
  plugins: [react()],

  build: {
    target: ["es2019", "edge88", "firefox78", "chrome87", "safari13.1"],
    polyfillModulePreload: true,
    assetsDir: "assets",
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    cssTarget: ["es2019", "edge88", "firefox78", "chrome87", "safari13.1"],
    sourcemap: false,
  },
});
