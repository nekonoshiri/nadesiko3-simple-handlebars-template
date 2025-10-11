import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  globalIgnores(["nadesiko3-simple-handlebars-template.js"]),

  {
    files: ["**/*.{js,mjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      js,
    },
    extends: ["js/recommended"],
  },

  // 最後に置くのが推奨されている (see: https://github.com/prettier/eslint-config-prettier)
  eslintConfigPrettier,
]);
