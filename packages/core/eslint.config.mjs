// @ts-check
import { defineConfig } from "eslint/config";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  { files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"] },
  tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactHooks.configs.flat.recommended,
  eslintPluginPrettierRecommended,
]);

export default eslintConfig;
