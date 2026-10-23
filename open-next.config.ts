import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  cloudflare: {
    overrideEsbuildConfig: (config) => {
      config.external = [...(config.external || []), "pg-cloudflare"];
      return config;
    },
  },
});