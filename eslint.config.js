import js from "@eslint/js"
import globals from "globals"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "react/no-unknown-property": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      // Правила для форматирования кода
      indent: ["error", 2], // отступы 2 пробела
      quotes: ["error", "single"], // одиночные кавычки
      semi: ["error", "never"], // без точки с запятой
      "max-len": ["off"], // максимальная длина строки выключил так как svg
      "comma-dangle": ["error", "never"], // без запятой в конце
      "arrow-parens": ["error", "always"], // всегда использовать скобки вокруг параметров стрелочных функций
      "no-mixed-spaces-and-tabs": "error", // запрещает смешивание пробелов и табуляций
      "eol-last": ["error", "always"] // обязательный перевод строки в конце файла
    }
  }
)
