import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const ENV_VARIABLES = loadEnv(mode, path.resolve(__dirname, "envs"), "");

  return {
    envDir: "./envs",

    server: {
      strictPort: true,
      port: parseInt(ENV_VARIABLES.VITE_APP_DASHBOARD_SERVER_PORT, 10),
      proxy: {
        "/server-api": {
          target: ENV_VARIABLES.VITE_APP_SERVER_DOMAIN,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/server-api/, "/api"),
        },
        "/server-account-auth-api": {
          target: ENV_VARIABLES.VITE_APP_SERVER_DOMAIN,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/server-account-auth-api/, "/api"),
        },
      },
    },

    plugins: [react()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              return id.toString().split("node_modules/")[1].split("/")[0].toString();
            }
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
    },
  };
});
