import { defineAppConfig } from "@opennextjs/cloudflare";

export default defineAppConfig({
  build: {
    overrideEsbuildConfig: (config) => {
      config.external = [...(config.external || []), "pg-cloudflare"];
      return config;
    },
  },
});