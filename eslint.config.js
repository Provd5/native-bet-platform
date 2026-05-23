const js = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tsEslintPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const simpleImportSort = require("eslint-plugin-simple-import-sort");
const unusedImports = require("eslint-plugin-unused-imports");

module.exports = defineConfig([
  {
    ignores: ["node_modules/**", ".expo/**", "dist/**", "coverage/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        __DEV__: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsEslintPlugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    rules: {
      "require-await": "error",
      "no-console": "warn",
      "no-undef": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "unused-imports/no-unused-imports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^@react", "^expo", "^@expo", "^@", "^\\w"],
            ["^(type|types|~/type|~/types)"],
            ["^~/"],
          ],
        },
      ],
    },
  },
]);
