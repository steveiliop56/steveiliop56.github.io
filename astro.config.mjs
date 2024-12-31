// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.VITE_SITE_URL,
  base: "/",
  integrations: [tailwind(), icon()],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro"
    }
  }
});
