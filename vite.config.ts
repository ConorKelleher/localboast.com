import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import mkcert from "vite-plugin-mkcert";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    mkcert(),
    svgr({
      include: "**/*.svg?react",
    }),
  ],
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@import "./_mantine"\n`,
      },
    },
  },
  server: {
    port: 9999,
    https: true,
  },
  resolve: {
    alias: {
      src: "/src",
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});
