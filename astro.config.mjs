import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://julianbeck.com",

  integrations: [
    sitemap(),
    tailwind(),
    react({
      include: ["./src/components/react/*"],
    }),
  ],
  redirects: {

    // "/blog": "blog.julianbeck.om",
    "/anify": "apps.apple.com/app/id6744032201",
  },
});
