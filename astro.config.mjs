// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import { remarkAlert } from "remark-github-blockquote-alert";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://doesmycode.work",
  base: "/",
  integrations: [icon(), sitemap()],
  markdown: {
    shikiConfig: { theme: "one-dark-pro" },
    remarkPlugins: [remarkAlert],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
