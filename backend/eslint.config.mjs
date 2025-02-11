import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
  {languageOptions: { globals: globals.node },
    rules : { "quotes": ["error", "double"], // Enforce double quotes
      "semi": ["error", "always"], // Enforce semicolons
      "indent": ["error", 2], // Enforce 2-space indentation
      "no-trailing-spaces": "error", // Disallow trailing whitespace
      "eol-last": ["error", "always"], // Enforce newline at the end of files
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }], // Disallow unused variables, but allow unused function arguments starting with _
      "eqeqeq": ["error", "always"], // Enforce the use of === and !==
      "curly": ["error", "all"], // Enforce consistent brace style for all control statements
    },
  },
  pluginJs.configs.recommended,
];
