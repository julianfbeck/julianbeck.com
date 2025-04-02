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

    "/anify": {
      status: 302,
      destination: "https://apps.apple.com/app/apple-store/id6744032201?pt=120183609&ct=website&mt=8",
    },
  },
});
