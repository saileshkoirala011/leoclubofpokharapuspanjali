import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  base: "/",

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: { "react-native": "react-native-web" },
    extensions: [".web.js", ".js", ".jsx", ".json"],
  },

  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-router")) return "router";
          if (id.includes("react")) return "react";
          if (id.includes("react-icons")) return "icons";
          return "vendor";
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
  },
}));
