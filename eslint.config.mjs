import { defineConfig, globalIgnores } from "eslint/config";
import { fixupPluginRules } from "@eslint/compat";
import nextPluginModule from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

const nextPlugin = fixupPluginRules(nextPluginModule);

const eslintConfig = defineConfig([
  ...tseslint.configs.recommended,
  // Keep generated build output out of linting.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: nextPluginModule.configs.recommended.rules,
  },
]);

export default eslintConfig;
