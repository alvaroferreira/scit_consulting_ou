import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignore: ['src/components/ui/**', 'src/routeTree.gen.ts', 'functions/**'],
  ignoreDependencies: ["tailwindcss", "tw-animate-css", "@cloudflare/workers-types"]
};

export default config;