/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly VITE_SITE_TITLE: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_ANALYTICS_ENABLE: string;
  readonly VITE_GISCUS_ENABLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
