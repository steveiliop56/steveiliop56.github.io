// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://doesmycode.work",
  base: "/",
  integrations: [tailwind(), icon(), sitemap()],
  markdown: { shikiConfig: { theme: "one-dark-pro" } },
});
