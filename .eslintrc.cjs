/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  root: true,
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  ignorePatterns: ["node_modules/", ".next/", "src/components/ui"],
  rules: {
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    // "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    // "@typescript-eslint/no-unsafe-return": "off",
    // "@typescript-eslint/no-unsafe-assignment": "off",
    // "@typescript-eslint/no-empty-interface": "off",
    // "@typescript-eslint/consistent-type-imports": "off",
    // "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/non-nullable-type-assertion-style": "off",
  },
};

module.exports = config;
