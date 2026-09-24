import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 8080,
  },
  build: {
    outDir: "../server/public",
    emptyOutDir: true,
  },
});
