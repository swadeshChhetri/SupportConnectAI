import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: "dist",
    emptyOutDir: false, // ⚠️ CRITICAL: Do not wipe the admin build
    cssCodeSplit: false, // Keep all widget CSS in one file
    rollupOptions: {
      input: {
        widget: resolve(__dirname, "widget.html"),
      },
      output: {
        // 📦 Force a single bundle for the widget to avoid shared chunk issues
        manualChunks: () => "widget",
        
        entryFileNames: "widget.js",
        chunkFileNames: "widget-chunk.js",
        assetFileNames: (asset) => {
          if (asset.name?.endsWith(".css")) return "widget.css";
          return "assets/widget-[name]-[hash].[ext]";
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
