import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/graphiql-app", // закоменчивать эту строчку если в режиме разработки. включать эту строчку при деплое
  plugins: [react()],
  json: {
    namedExports: true,
    stringify: true,
  },
});

// export default defineConfig(({ command, mode }) => {
//   if (command === "build") {
//     return {
//       plugins: [react()],
//       base: "/src",
//       publicDir: "/src",
//       json: {
//         namedExports: true,
//         stringify: true
//       },
//       esbuild: {
//         jsxFactory: 'h',
//         jsxFragment: 'Fragment',
//       },
//       server: {
//         cors: false
//       },
//       build: {
//         outDir: "/dist/",
//         // assetsDir: "/assets",
//         // cssCodeSplit: false,
//         manifest: true
//       }
//     };
//   } else {
//     return {
//       plugins: [react()],
//     };
//   }
// });
