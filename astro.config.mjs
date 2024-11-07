// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://doesmycodework.com",
  base: "/",
  integrations: [tailwind(), icon()],
});
