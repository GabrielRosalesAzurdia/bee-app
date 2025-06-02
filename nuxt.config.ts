// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "nuxt-toast",
  ],
  app: {
    head: {
      title: "BeeApp", // default fallback title
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  nitro: {
    preset: "node-server",
  },
  runtimeConfig: {
    public: {
      baseURL:
        process.env.NODE_ENV === "production"
          ? "https://bee-app.onrender.com"
          : "http://localhost:3000",
    },
  },
});
