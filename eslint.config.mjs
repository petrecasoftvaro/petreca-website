import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "airbnb", "airbnb/hooks"),
  ...compat.config({
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "ident": ["error", 2],
      "no-console": 0,
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "single", { avoidEscape: true }],
      "semi": ["error", "always"],
    },
  }),
  ];

export default eslintConfig;
