// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: true,
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            "framer-motion": ["framer-motion"],
            "tanstack": ["@tanstack/react-query", "@tanstack/react-router", "@tanstack/react-start"],
            "ui-radix": ["@radix-ui/react-dialog", "@radix-ui/react-slot", "@radix-ui/react-tooltip", "@radix-ui/react-accordion", "@radix-ui/react-select"],
            "3d-vendor": ["three", "@react-three/fiber", "@splinetool/runtime", "@splinetool/react-spline", "cobe"]
          },
        },
      },
    },
  },
});
